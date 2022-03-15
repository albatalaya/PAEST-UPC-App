import { Component, OnInit, ViewChild } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import * as moment from 'moment';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonCardContent } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { extendMoment } from 'moment-range';
import * as EventsActions from '../events.actions';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { ApiErrors } from 'src/app/shared/api-errors.enum';

const extMoment = extendMoment(moment);
const TITLE_SIZE = 31;
const MARGIN = 9;
const EVENT_SIZE = 57;
@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.page.html',
  styleUrls: ['./events-calendar.page.scss'],
})
export class EventsCalendarPage implements OnInit {
  hasPrevious;
  eventSource;
  apiEvents;
  currentWeek = [];
  nextWeek = [];
  previousWeek = [];
  active;
  selectedDay;
  eventsForDay = [];
  todayDate;
  ready = true;
  errorEvents;
  titleMonth;
  subscriptionLoadEvents;
  subscriptionScroll;
  myCalendar;
  events

  @ViewChild(IonContent, null) content: IonContent;
  calendar;
  constructor(
    private eventsService: EventsService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    public translate: TranslateService
  ) {
    this.calendar = {
      mode: 'week',
      currentDate: new Date(),
      startingDay: 1,
      startHour: 7,
      endHour: 22,
      showEvent: false,
      locale: this.translate.currentLang,
      lockSwipe: false,
    };
  }

  async ngOnInit() {
    this.hasPrevious = this.route.snapshot.queryParams.back;
    this.todayDate = this.utilsService.getTodayDate();
    this.eventsService.getEventsDate().subscribe( async events => {
      if (events) {
        this.events = events;
      }

      this.store.select('events').subscribe(async eventsRx => {
  
          const fecha = new DatePipe(this.translate.currentLang).transform(eventsRx.currentMonth, 'LLLL yyyy');
          this.titleMonth = fecha.charAt(0).toUpperCase() + fecha.slice(1);
          const monthDate = moment(eventsRx.currentMonth).startOf('month').format('YYYY-MM-DD');
          if (moment(monthDate).format('YYYY-MM') !== moment(this.todayDate).format('YYYY-MM')) {
            this.todayDate = monthDate;
            this.eventsForDay = [];
            this.loadEvents(await this.events['data']);

          }
        });
        // this.eventSource = await this.loadEvents(promiseValue.data.data);
        // this.apiEvents = await promiseValue.data.data;
      this.loadEvents(await this.events['data']);
      this.store.select('events').subscribe(events => {
        this.active = events.isMonthCalendarOpened;
        if (this.selectedDay !== events.selectedDay) {
          this.selectedDay = events.selectedDay;
          this.scrollToDay(this.selectedDay);
        }
      });
    })

  }

  logScrolling(event) {
    if (this.active) {
      this.toggleTitleMonth();
    }
  }

  disableScroll() {
    this.content.scrollEvents = false;

    setTimeout(() => {
      this.content.scrollEvents = true;
    }, 500);
  }

  async loadEvents(events) {
    this.errorEvents = undefined;

    const eventsDay = [];
    const eventsRange = [];
    // It filters the events that it has in the resolver in 2 new arrays depending on if that event is a single event or a range event.
    for (const event of events) {
      if (this.utilsService.formatDateToCalendarWithoutTime(event['startDate']) === this.utilsService.formatDateToCalendarWithoutTime(event['endDate'])) {
        eventsDay.push(event);
      } else if (this.utilsService.formatDateToCalendarWithoutTime(event['startDate']) !== this.utilsService.formatDateToCalendarWithoutTime(event['endDate'])) {
        eventsRange.push(event);
      }
    }
    // It build the finaly object well structured, on each day it will have the Day title, 
    // the events that only will happen that day, and the events that that day is between it effective days.
    for (const m = moment(this.todayDate); m.diff(moment(this.todayDate).endOf('month')) <= 0; m.add(1, 'days')) {
      const day = [];
      day['day'] = m.format('DD MMMM YYYY');
      day['eventsToday'] = [];
      day['eventsInRange'] = [];

      for (const event of eventsDay) {
        if (this.utilsService.formatDateToCalendarWithoutTime(event['startDate']) === this.utilsService.formatDateToCalendarWithoutTime(day['day'])) {
          day['eventsToday'].push(event);
        }
      }

      for (const event of eventsRange) {
        const range = extMoment.range(moment(event['startDate'], 'YYYY-MM-DD'), moment(event['endDate'], 'YYYY-MM-DD'));
        if (range.contains(moment(day['day']))) {
          day['eventsInRange'].push(event);
        }
      }
      // Finally check if the day has events so it is necessary to be in the array.
      if (day['eventsToday'].length > 0 || day['eventsInRange'].length > 0) {
        this.eventsForDay.push(day);
      }
    }


    if (!this.eventsForDay.length) {
      this.errorEvents = ApiErrors.NO_EVENTS;
    }
  }

  scrollToDay(selectedDay) {
    if (document.getElementById(moment(selectedDay).format('DD-MMMM-YYYY'))) {
      const element = document.getElementById(moment(selectedDay).format('DD-MMMM-YYYY'));
      this.content.scrollToPoint(0, element.offsetTop - 353, 1500);
    } else {
      let fecha = moment(selectedDay).subtract(1, 'd');
      while (moment(selectedDay).startOf('month').diff(fecha, 'days') !== 1) {
        const element = document.getElementById(moment(fecha).format('DD-MMMM-YYYY'));
        if (element) {
          if (document.getElementById('no-events')) {
            document.getElementById('no-events').remove();
          }
          const htmlElement = "<div id='no-events'><ion-row style='padding: 2.5%; align-items: center;background-color: var(--ion-color-background-card);padding-bottom: 2.5%;'><ion-col size='8'><div style='font-size: 1.125em;font-weight: 500;'>" + new DatePipe(this.translate.currentLang).transform(selectedDay, 'dd LLLL yyyy') + "</div></ion-col></ion-row><ion-row style='margin: 2.5%;border-left: 5px var(--ion-color-primary) solid;display: flex;background-color: white;justify-content: center;-webkit-box-align: stretch;align-items: stretch;height: 50px'><span style='margin-top: 18px'>" + this.translate.instant('EVENTS.NO_EVENTS') + "</span></ion-row></div>";
          element.insertAdjacentHTML('beforeend', htmlElement);
          this.content.scrollToPoint(0, document.getElementById('no-events').offsetTop - 353, 1500);
          break;
        } else {
          fecha = moment(fecha).subtract(1, 'd');
        }
      }
    }
  }

  toggleTitleMonth(state?: boolean) {
    this.disableScroll();
    if (this.active) {
      this.store.dispatch(new EventsActions.CloseMonthCalendar());
    } else {
      this.store.dispatch(new EventsActions.OpenMonthCalendar());
    }
    // await this.localStorageService.setItem('activeTitleCalendar', this.active);
    // state !== undefined ? this.active = state : this.active = !this.active;
    // this.calendar.lockSwipe = this.active;
  }
  async goToPreviousMonth() {
    // await this.store.dispatch(new EventsActions.ChangeCurrentMonth(moment(this.selectedDay).subtract(1, 'months').format('YYYY-MM')));
    // await this.store.dispatch(new EventsActions.ChangeSelectedDay(moment(this.selectedDay).subtract(1, 'months').format('YYYY-MM-DD')));

    this.myCalendar.slidePrev();
  }

  async goToNextMonth() {
    this.myCalendar.slideNext();
    // await this.store.dispatch(new EventsActions.ChangeCurrentMonth(moment(this.selectedDay).add(1, 'months').format('YYYY-MM')));
    // await this.store.dispatch(new EventsActions.ChangeSelectedDay(moment(this.selectedDay).add(1, 'months').format('YYYY-MM-DD')));
  }

  exportMyCalendar(event) {
    this.myCalendar = event;
  }
}
