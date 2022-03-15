import { ApiErrors } from 'src/app/shared/api-errors.enum';
import { NavController } from '@ionic/angular';
import { Component, OnInit, NgZone } from '@angular/core';
import { ScholarshipsService } from 'src/app/services/scholarships/scholarships.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-scholarships-list',
  templateUrl: './scholarships-list.page.html',
  styleUrls: ['./scholarships-list.page.scss'],
})
export class ScholarshipsListPage implements OnInit {

  scholarships;
  scholarshipsCopy = null;
  scholarShipsMobility = null;
  scholarShipsMobilityCopy = null;
  scholarShipsEstudis = null;
  scholarShipsEstudisCopy = null;
  segmentSelected = 'estudis';
  errorNoResults;

  scholarshipsStatus = [{
    state: 'SCHOLARSHIPS.OPENED',
    class: 'opened'
  }, {

    state: 'SCHOLARSHIPS.CLOSED',
    class: 'closed'
  }, {
    state: 'SCHOLARSHIPS.UNDEFINED',
    class: 'undefined'
  }, {
    state: 'SCHOLARSHIPS.OPEN_SOON',
    class: 'open-soon'
  }];

  constructor(
    private route: ActivatedRoute,
    private scholarshipService: ScholarshipsService,
    private storage: Storage,
    private utilsService: UtilsService,
    public translate: TranslateService,
    private navCtrl: NavController,
    private zone: NgZone,
    )   { }

  async ngOnInit() {

    await this.scholarshipService.getScholarships().subscribe(
      async res => {
        this.scholarships = res['items'];
        await this.splitScholarships();
      },
      error => {
        this.navCtrl.navigateRoot('pages/error/', {queryParams: {error, backPage: 'pages/home'}});
      }
    );


    const language = await this.storage.get('lang');
    if ( language === 'en') {
      this.utilsService.showOnceToast('<ion-icon name="warning" mode="ios"></ion-icon> ' + this.translate.instant('SCHOLARSHIPS.LANGUAGE_ALERT'));
    }
    // if (this.route && this.route.data) {
    //   const promiseObservable = this.route.data;
    //   if (promiseObservable) {
    //     promiseObservable.subscribe(async promiseValue => {
    //       const dataObservable = promiseValue.data;
    //       // Get from resolver
    //       this.scholarships = dataObservable.items;
    //       this.splitScholarships();
    //     });

    //   } else {
    //     console.warn('No promiseObservable coming from Route Resolver data');
    //   }
    // } else {
    //   console.warn('No data coming from Route Resolver');
    // }

  }

  segmentChanged(event) {
    this.segmentSelected = event.detail.value;
    event.detail.value === 'estudis' ? this.scholarships = this.scholarShipsEstudis : this.scholarships = this.scholarShipsMobility;
  }

  splitScholarships() {
    this.scholarShipsEstudis = [];
    this.scholarShipsMobility = [];
    this.scholarshipsCopy = this.scholarships;
    for (const item of this.scholarships) {
      if (item.scolarshipType === 'Estudis') {
        this.scholarShipsEstudis.push(item);
      } else if (item.scolarshipType === 'Mobilitat') {
        this.scholarShipsMobility.push(item);
      }
    }

    this.scholarShipsEstudis.sort((a, b) => this.orderItems(a, b));
    this.scholarShipsMobility.sort((a, b) => this.orderItems(a, b));

    this.scholarShipsEstudisCopy = this.scholarShipsEstudis;
    this.scholarShipsMobilityCopy = this.scholarShipsMobility;
    if (this.segmentSelected === 'estudis') {
      this.scholarships = this.scholarShipsEstudis;
    } else {
      this.scholarships = this.scholarShipsMobility;
    }
  }

  orderItems(itemA, itemB) {
    const ordenItemA = this.scholarshipService.getOrder(itemA.startDate, itemA.endDate);
    const ordenItemB = this.scholarshipService.getOrder(itemB.startDate, itemB.endDate);

    if (ordenItemA === ordenItemB) {
      if (ordenItemA === 0 || ordenItemA === 2) {
        return moment(itemA.endDate).isBefore(itemB.endDate) ? -1 : 1;
      } else if (ordenItemA === 1) {
        return moment(itemA.startDate).isBefore(itemB.startDate) ? -1 : 1;
      }
    }

    return (ordenItemA < ordenItemB) ? -1 : 1;
  }

  filterItems(ev) {
    // set val to the value of the searchbar
    const val = ev.target.value;
    let filter;
    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      if (this.segmentSelected === 'estudis') {
        this.scholarships = this.scholarShipsEstudis.filter((item) => {
          return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      } else {
        this.scholarships = this.scholarShipsMobility.filter((item) => {
          return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
      }
      if (this.scholarships.length === 0) {
        this.errorNoResults = ApiErrors.SCHOLARSHIPS_SEARCH_NO_RESULTS;
      } else {
        this.errorNoResults = null;
      }
      return filter;
    } else if (val === '') {
      this.zone.run(() => {
        if (this.segmentSelected === 'estudis') {
          this.scholarships = this.scholarShipsEstudisCopy;
        } else {
          this.scholarships = this.scholarShipsMobilityCopy;
        }
        this.errorNoResults = null;
      });
    }
  }
}
