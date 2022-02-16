import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-library-detail',
  templateUrl: './library-detail.page.html',
  styleUrls: ['./library-detail.page.scss'],
})
export class LibraryDetailPage implements OnInit {
  library;
  eventSource;
  currentDate;
  titleMonth;
  calendar;

  constructor(
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    public translate: TranslateService
    ) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      const promiseObservable = this.route.data;
      if (promiseObservable) {
        promiseObservable.subscribe(promiseValue => {
          const libraryPromise = promiseValue.data.library;
          libraryPromise.then(library => {
            this.library = library;
            this.library.occupancyRate = promiseValue.data.queryParams.occupancyRate;
            this.library.distance = {
              distance: promiseValue.data.queryParams.distance,
              type: promiseValue.data.queryParams.distanceType
            };
            this.library.color = promiseValue.data.queryParams.color;

            this.eventSource = this.loadHours();
            this.currentDate = moment();
          });
        });
      } else {
        console.warn('No promiseObservable coming from Route Resolver data');
      }
    } else {
      console.warn('No data coming from Route Resolver');
    }

    this.calendar = {
      mode: 'month',
      currentDate: new Date(),
      startingDay: 1,
      startHour: 7,
      endHour: 18,
      showEvent: false,
      showDetail: false,
      locale: this.translate.currentLang,
      lockSwipe: false,
    };
  }

  loadHours() {

    const events = [];
    for (const month of this.library.months){
      for (const day of month.dates) {
        events.push({
          startTime: moment(this.utilsService.formatDateToCalendarWithoutTime(day.day)).toDate(),
          endTime: moment(this.utilsService.formatDateToCalendarWithoutTime(day.day)).toDate(),
          allDay: false,
          backgroundColor: day.tag.backgroundColor,
          textColor: day.tag.textColor,
        });
      }
    }


    return events;
  }

  async openNavigation() {
    // await this.utilsService.openMapsSystem('https://www.google.com/maps/search/' + item.name);
    await this.utilsService.openMapsSystem('https://www.google.com/maps/search/' + this.library.data.latitude + ',' + this.library.data.longitude);
  }

  goToWeb() {
    this.utilsService.openBrowserInApp(`https://bibliotecnica.upc.edu/${this.library.id}`);
  }

  goToReservas() {
    this.utilsService.openBrowserInApp(`${this.library.data.spacesReservationUrl}`);
    //this.utilsService.openBrowserInApp(`https://apps.bibliotecnica.upc.edu/reserva_sales/`);
  }


  goToStudent() {
    this.utilsService.openBrowserInApp(this.translate.currentLang === 'ca' ? `https://bibliotecnica.upc.edu/serveis-no-presencials-estudiants` : (`https://bibliotecnica.upc.edu/` + this.translate.currentLang + `/serveis-no-presencials-estudiants`));
    //this.utilsService.openBrowserInApp(`https://bibliotecnica.upc.edu/estudiants`);
  }

  goToCovid() {
    this.utilsService.openBrowserInApp(this.translate.currentLang === 'ca' ? `https://bibliotecnica.upc.edu/serveis-no-presencials-estudiants` : (`https://bibliotecnica.upc.edu/` + this.translate.currentLang + `/biblioteques-durant-crisi-covid-19`));
  }

  goToInternationalStudent() {
    this.utilsService.openBrowserInApp(`https://bibliotecnica.upc.edu/en/international-student`);
  }


  goToDoctorand() {
    this.utilsService.openBrowserInApp(`https://bibliotecnica.upc.edu/doctorands`);
  }

  onViewTitleChanged(title) {
    this.titleMonth = title;
  }

  // openMatricula() {
  //   // const options = 'location=no, enableViewportScale=no, usewkwebview=yes, zoom=no';

  //   const browser = this.iab.create('https://www.upc.edu/ca/graus/matricula', '_blank', this.options);
  //   browser.on('loadstop').subscribe(event => {
  //     browser.insertCSS({code: this.cssMatriculacio }); // check if is working with file
  //   });
  // }
}
