import { ApiErrors } from 'src/app/shared/api-errors.enum';
import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { GeolocationService } from 'src/app/shared/geolocation/geolocation.service';
import * as geolib from 'geolib';
import { LibrariesService } from 'src/app/services/libraries/libraries.service';

@Component({
  selector: 'app-library-list',
  templateUrl: './library-list.page.html',
  styleUrls: ['./library-list.page.scss'],
})
export class LibraryListPage implements OnInit {


  libraries: Library[];
  occupancyRateLibraries: any;
  librariesCopy: any;

  isItemAvailable = false; // initialize the items with false (SearchBar)
  userCoordinates = null;

  errorNoResults;
  constructor(
    private route: ActivatedRoute,
    private geolocation: GeolocationService,
    private librariesService: LibrariesService,
    private zone: NgZone,
    ) { }

  ngOnInit() {
    
  }
  ionViewWillEnter() {
    if (this.route && this.route.data) {

      const promiseObservable = this.route.data;

      if (promiseObservable) {
        promiseObservable.subscribe(async promiseValue => {
          const dataObservable = await promiseValue.data;
          // Get from resolver
          const libraries = await dataObservable.libraries;
          // resolve state Library
          await this.getStateLibraries(libraries);
          await this.getLibrariesDistance();
          // await this.getUserCoordinates();
          // this.libraries.map(library => {
          //   const dist = this.getLibraryDistance(library, this.userCoordinates);
          //   library.distance = dist;
          // });
          // Get from resolver
          const occupancyRateLibraries = await dataObservable.occupancyRate;
          await this.getOccupancyRateLibrariesAndSort(occupancyRateLibraries);
          // this.libraries.map(library => {
          //   const occ = this.getOccupancyRateLibrary(library);
          //   library.occupancyRate = occ.occupancyRate;
          //   library.colorOccupancy = occ.color;
          // });
          // this.librariesCopy = this.libraries;
          // this.libraries.sort((a, b) => (a.distance.distanceMeters > b.distance.distanceMeters) ? 1 : ((b.distance.distanceMeters > a.distance.distanceMeters) ? -1 : 0));
        });
      } else {
        console.warn('No promiseObservable coming from Route Resolver data');
      }
    } else {
      console.warn('No data coming from Route Resolver');
    }
  }

  async refreshLibrariesInfo(event) {
     this.librariesService.getLibraries().subscribe(async (res) => {

      const libraries = res;
      this.librariesService.getLibrariesOccupancyRate().subscribe(async (res) => {
         const occupancyRate = res;
         await this.getStateLibraries(libraries);
         await this.getLibrariesDistance();
         await this.getOccupancyRateLibrariesAndSort(occupancyRate);
         event.target.complete();
       });

    })
    
  }

  async getStateLibraries(libraries) {
    
    libraries.map(objLibrary => {
      const state = this.getState(objLibrary);
      objLibrary.openingTime = state.openingTime;
      objLibrary.closingTime = state.closingTime;
      objLibrary.stateOccupancy = state.state;
    });
    this.libraries = libraries;
  }

  async getLibrariesDistance() {
    await this.getUserCoordinates();
    this.libraries.map(library => {
      const dist = this.getLibraryDistance(library, this.userCoordinates);
      library.distance = dist;
    });
  }

  getOccupancyRateLibrariesAndSort(occupancyRateLibraries) {
    this.occupancyRateLibraries = occupancyRateLibraries;
    this.libraries.map(library => {
      const occ = this.getOccupancyRateLibrary(library);
      library.occupancyRate = occ.occupancyRate;
      library.colorOccupancy = occ.color;
    });
    this.librariesCopy = this.libraries;
    this.libraries.sort((a, b) => (a.distance.distanceMeters > b.distance.distanceMeters) ? 1 : ((b.distance.distanceMeters > a.distance.distanceMeters) ? -1 : 0));
  }

  getOccupancyRateLibrary(library) {
    const occupancyRate = this.occupancyRateLibraries.find(x => x.id === library.id);

    if (occupancyRate) {
      let color;
      if (occupancyRate.occupancyRate < 45) {
        color = '#C8C61C';
      } else if (occupancyRate.occupancyRate >= 45 && occupancyRate.occupancyRate < 75)  {
        color = '#FFB65A';
      } else {
        color = '#F45A71';
      }
      return {color, occupancyRate: occupancyRate.occupancyRate};
    } else {
      return {color: '#FF3648', occupancyRate: 0};
    }
  }

  getState(library) {

    let openingTime = null; // library.timetable.today.split(' - ')[0];
    let closingTime = null; // library.timetable.today.split(' - ')[1];
    let state = null;
    if (library.timetable.today !== 'Tancada') {
      openingTime = library.timetable.today.split(' - ')[0];
      closingTime = library.timetable.today.split(' - ')[1];
      state = this.checkCurrentTimeIsBetween(openingTime, closingTime);
    } else {
      state = 'Tancada';
    }
    return {openingTime, closingTime, state};
  }

  checkCurrentTimeIsBetween(init, end) {
    const format = 'hh:mm';
    const currentTime = moment();
    const initTime = moment(init, format);
    const closeTime = moment(end, format);
    let state = null;

    // The state 1 = Will open today at initTime
    // The state 2 = At current time is opened
    // The state 3 = At current time is already closed
    if (currentTime.isBefore(initTime)) {
      state = 1;
    } else if (currentTime.isBetween(initTime, closeTime)) {
      state = 2;
    } else {
      state = 3;
    }
    return state;
  }

  // Functions for searchBar
  initializeItems() {
    this.libraries = this.librariesCopy;
    this.libraries = this.libraries.sort((a, b) => (a.distance.distanceMeters > b.distance.distanceMeters) ? 1 : ((b.distance.distanceMeters > a.distance.distanceMeters) ? -1 : 0));
  }
  getItems(ev: any) {
    // // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;
    // if the value is an empty string don't filter the items
    let libraries;
    if (val && val.trim() !== '') {
      this.isItemAvailable = true;
      this.libraries = this.libraries.filter((item) => {
        return (item.data.name.toLowerCase().indexOf(val.toLowerCase()) > -1 || item.id.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });
      if (this.libraries.length === 0) {
        this.errorNoResults = ApiErrors.LIBRARIES_SEARCH_NO_RESULTS;
      }
      return this.libraries;
    } else if (val === '') {
      this.zone.run(() => {
        this.libraries = this.librariesCopy;
        this.errorNoResults = null;
      });
    }
  }

  async getUserCoordinates() {
    const geoPosition = await this.geolocation.internalGetCurrentPosition(); // await this.geolocation.getCurrentPosition();
    this.userCoordinates = geoPosition.coords;
    return this.userCoordinates;
  }
  getLibraryDistance(library, userCoordinates) {
    let type = 'm';
    let distance = geolib.getDistance(
      {latitude: library.data.latitude, longitude: library.data.longitude},
      {latitude: userCoordinates.latitude, longitude: userCoordinates.longitude});
    const distanceMeters = distance;
    if (distance >= 1000) {
      distance = Number(geolib.convertDistance(distance, 'km').toFixed(2));
      type = 'km';
    }
    return {distance, type, distanceMeters};
  }
}

export interface Library {
  id: string;
  timetable: any;
  legend: any[];
  months: any[];
  data: any;
  closingTime: string;
  colorOccupancy: string;
  distance: any;
  occupancyRate: number;
  openingTime: string;
  stateOccupancy: number;
}
