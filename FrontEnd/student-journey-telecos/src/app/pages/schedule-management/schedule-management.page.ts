import { ApiErrors } from 'src/app/shared/api-errors.enum';
import { Component, OnInit, ViewChild, ɵConsole, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, NavigationExtras } from '@angular/router';
import { ScheduleManagementService } from 'src/app/services/schedule-management/schedule-management.service';
import { IonContent, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.page.html',
  styleUrls: ['./schedule-management.page.scss'],
})
export class ScheduleManagementPage implements OnInit {

  active = true;
  titleMonth;
  calendar;
  eventSource;
  tipoVista = 'week';

  hayError = false;

  currentDaySelected;
  actividadesList;

  ngfor = false;
  daySelectedChanged = false;
  goToCurrentDayState = false;

  lastUpdated;

  error;

  isIos;

  loading: boolean = false;

  @ViewChild(IonContent, null) content: IonContent;

  constructor(private ngZone: NgZone, public platform: Platform, private navCtrl: NavController, public translate: TranslateService, private store: Store<AppState>, private router: Router, private scheduleManagementService: ScheduleManagementService, private storage: Storage) { }

  ngOnInit() {
    this.content.scrollY = false;

    this.isIos = this.platform.is('ios');

    this.calendar = {
      mode: 'week',
      currentDate: new Date(),
      startingDay: 1,
      startHour: 7,
      endHour: 24,
      showEvent: true,
      locale: this.translate.currentLang,
    };

    this.currentDaySelected = this.calendar.currentDate;

    setTimeout( () => {
      this.active = false;
    }, 10);

    this.ngZone.run(() => {
      this.loading = true;
    });

    this.loadEvents();
  }

  ionViewDidEnter() {
    if (this.hayError) {
      this.ngZone.run(() => {
        this.loading = true;
      });
      try {
        this.loadEvents();
      } catch (error) {
      }
    }
  }

  async loadEvents() {
    const student = await this.storage.get('student');

    this.scheduleManagementService.getSchedule().subscribe(
      res => {
        try {
          this.hayError = false;

          let events;
          events = res['items'];
          this.actividadesList = [];

          for (const event of events) {
            event.professors = event.professors ? event.professors.filter(p => p.grup === event.grup) : [];

            event['professorsText'] = event.professors.map(p => (p.nom + ' ' + p.cognoms)).join(', ');

            event.startTime = new Date(event.startTime);
            event.endTime = new Date(event.endTime);

            const actividadesListFiltered = this.actividadesList.findIndex(a => a.date.getDate() === event.startTime.getDate() && a.date.getMonth() === event.startTime.getMonth() && a.date.getFullYear() === event.startTime.getFullYear());

            if (actividadesListFiltered !== -1) {
              this.actividadesList[actividadesListFiltered].events.push(event);
            } else {
              this.actividadesList.push({date: event.startTime, events: [event]});
            }
          }

          const now = new Date();
          const actividadesListFiltered = this.actividadesList.findIndex(a => a.date.getDate() === now.getDate() && a.date.getMonth() === now.getMonth() && a.date.getFullYear() === now.getFullYear());

          if (actividadesListFiltered === -1) {
            this.actividadesList.push({date: now, events: []});
          }

          this.actividadesList = this.actividadesList.sort((a1, a2) => a1.date < a2.date ? -1 : 1);

          this.getColors(events);

          let language = '';

          this.store.select('language').subscribe( lang => {
            switch (lang) {
              case 'ca':
                language = 'nomCat';
                break;
              case 'es':
                language = 'nomEsp';
                break;
              case 'en':
                language = 'nomEng';
                break;
            }

            for (let event of events) {
              event['title'] = event[language];
            }

            this.ngZone.run(() => {
              this.loading = false;
            });

            this.eventSource = events;

            if (res && res['lastUpdated']) {
              this.lastUpdated = moment(res['lastUpdated']);
            }

            this.changeView('list');
          });
        } catch (error) {
          this.ngZone.run(() => {
            this.loading = false;
          });

          this.hayError = true;
          this.error = {errorCodeApp: ApiErrors.SCHEDULE_INTERNAL_SERVER_ERROR};
        }
      },
      error => {
        this.ngZone.run(() => {
          this.loading = false;
        });

        this.hayError = true;

        this.error = error.error;
        // console.log(this.error);
        // this.navCtrl.navigateRoot('/pages/error', {queryParams: {error, backPage: 'pages/home'}});
      }
    );
  }

  ngForFinalizado() {
    if (document.getElementById('currentDayListView') && this.ngfor) {
      setTimeout(() => {
        this.content.scrollY = true;
        const element = document.getElementById('currentDayListView');
        this.content.scrollToPoint(0, element.offsetTop, 0);
        this.ngfor = false;
      }, 100);
    }

    return '';
  }

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  getColors(events) {
    const colors = ['FADC9F', '9FE7FA' , 'FA9FA7', 'CBECAD', 'D9B3E6', 'FABE9F', '9FC9FA', 'FA9FC0', 'E1E093', 'FAAB9F', 'BEB9FC', 'A8E9E5', 'F6F1A2', '97B4F9'];

    let i = 0;

    for (const id of new Set(events.map(e => e.id))) {

      const eventsFilter = events.filter(e => e.id === id);

      const index: number = <number>((i <= colors.length ? i : Math.floor(Math.random() * colors.length)));

      const colorRange = this.generateColor('#3E3E3E', colors[index], 15);
      const colorRangeBlanco = this.generateColor('#FAF8F8', colors[index], 15);

      for (const event of eventsFilter) {
        event['color'] = '#' + colorRangeBlanco[2];
        event['colorSombra'] = '#' + colorRange[2];
        event['colorLetra'] = '#' + colorRange[13];
        event['colorCaja'] = '#' + colorRange[0];
      }

      i++;
    }
  }

  hex(c) {
    let s = '0123456789abcdef';
    let i = parseInt (c);
    if (i === 0 || isNaN (c)) {
      return '00';
    }
    i = Math.round (Math.min (Math.max (0, i), 255));
    return s.charAt ((i - i % 16) / 16) + s.charAt (i % 16);
  }

  /* Convert an RGB triplet to a hex string */
  convertToHex (rgb) {
    return this.hex(rgb[0]) + this.hex(rgb[1]) + this.hex(rgb[2]);
  }

  /* Remove '#' in color hex string */
  trim(s) { return (s.charAt(0) === '#') ? s.substring(1, 7) : s }

  /* Convert a hex string to an RGB triplet */
  convertToRGB (hex) {
    let color = [];
    color[0] = parseInt ((this.trim(hex)).substring (0, 2), 16);
    color[1] = parseInt ((this.trim(hex)).substring (2, 4), 16);
    color[2] = parseInt ((this.trim(hex)).substring (4, 6), 16);
    return color;
  }

  generateColor(colorStart, colorEnd, colorCount){

    // The beginning of your gradient
    let start = this.convertToRGB(colorStart);

    // The end of your gradient
    let end   = this.convertToRGB(colorEnd);

    // The number of colors to compute
    let len = colorCount;

    //Alpha blending amount
    let alpha = 0.0;

    let saida = [];

    for (let i = 0; i < len; i++) {
      let c = [];
      alpha += (1.0 / len);

      c[0] = start[0] * alpha + (1 - alpha) * end[0];
      c[1] = start[1] * alpha + (1 - alpha) * end[1];
      c[2] = start[2] * alpha + (1 - alpha) * end[2];

      saida.push(this.convertToHex(c));
    }

    return saida;
  }

  toggleTitleMonth(state?: boolean) {
    if (this.tipoVista !== 'month' && this.tipoVista !== 'list') {
      this.active = !this.active;
    }
  }

  changeView(view: string) {
    if (view === 'list') {
      this.ngfor = true;
    }
    this.calendar.mode = view;
    this.tipoVista = view;
  }

  onTimeSelected(event) {
    if (!this.daySelectedChanged) {
      this.calendar.currentDate = event.selectedTime;
      this.daySelectedChanged = true;
      setTimeout(() => {this.daySelectedChanged = false; }, 500);
    }
  }

  logScrolling(event) {
    if (this.active) {
      this.active = false;
    }

    /*if (this.tipoVista === 'list') {
      this.goToCurrentDayState = true;
    }*/
  }

  onViewTitleChanged(title) {
    this.titleMonth = title;
  }

  isCurrentDay(date) {
    return date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
  }

  actividadDetail(actividad) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        special: JSON.stringify(actividad)
      }
    };
    this.router.navigate(['/pages/schedule-management/schedule-detail'], navigationExtras);
  }

  onCurrentDateChanged(date) {
    this.currentDaySelected = date;

    if (!this.isCurrentDay(this.currentDaySelected)) {
      this.goToCurrentDayState = true;
    }
  }

  goToCurrentDay() {
    this.goToCurrentDayState = false;
    this.calendar.currentDate = new Date();
    this.daySelectedChanged = true;

    if (this.tipoVista === 'list') {
      const element = document.getElementById('currentDayListView');
      this.content.scrollToPoint(0, element.offsetTop, 0);
    }

    setTimeout(() => {this.daySelectedChanged = false; }, 500);
  }
}
