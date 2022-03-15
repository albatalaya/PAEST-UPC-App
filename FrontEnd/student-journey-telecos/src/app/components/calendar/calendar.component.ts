import { Component, OnInit, ViewChild, Directive, Input, Output, EventEmitter } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';

import * as EventsActions from '../../pages/events/events.actions';
import { EventsState } from 'src/app/pages/events/events.state';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import * as moment from 'moment';
import { ICalendarComponent } from '../calendar-custom/calendar';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})

export class CalendarComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private utilsService: UtilsService
    ) {
    
  }
  @ViewChild('calendario', null) myCalendar: ICalendarComponent;
  @Output() exportMyCalendar = new EventEmitter<any>();
  @Input() public eventSource;
  @Input() public calendar;
  @Input() public altura;
  titleMonth: string;
  ready = false;

  active = false;
  testDate;
  
  selectedDay;
  currentMonth;
  subscription;

  onViewTitleChanged(title) {
    if (title === this.titleMonth || this.titleMonth === undefined) {
      this.titleMonth = title;
    }
  }

  async onTimeSelected(event) {
    let clickCurrentMonth;
    if (moment(event.selectedTime).format('YYYY-MM').toString() === this.currentMonth.toString()) {
      clickCurrentMonth = true;
    } else {
      clickCurrentMonth = false;
    }

    if (event.selectedTime) {
      // console.log(moment(event.selectedTime).format('YYYY-MM-DD'));
      await this.store.dispatch(new EventsActions.ChangeSelectedDay(moment(event.selectedTime).format('YYYY-MM-DD')));
      this.calendar.currentDate = event.selectedTime;
      this.toggleTitleMonth(false);
      this.ready = false;
    }
  }

  async ngOnInit() {
    this.eventSource = this.loadEvents();
    this.subscription = await this.store.select('events').subscribe(events => {
      this.active = events.isMonthCalendarOpened;
      this.selectedDay = this.utilsService.getTodayDate();
      this.currentMonth = events.currentMonth;
    });
    this.calendar.currentDate = moment(this.selectedDay).toDate();
    this.exportMyCalendar.emit(this.myCalendar);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  loadEvents() {
    // var events = [];
    // events.push({
    //   title: 'Test',
    //   startTime: new Date(Date.UTC(2019, 10, 21, 11, 0)),
    //   endTime: new Date(Date.UTC(2019, 10, 21, 13, 0)),
    //   allDay: false
    // });
    // events.push({
    //   title: 'Test222222',
    //   startTime: new Date(Date.UTC(2019, 10, 21, 12, 0)),
    //   endTime: new Date(Date.UTC(2019, 10, 21, 13, 0)),
    //   allDay: false
    // });
    // console.log(events);
    // return events;
  }

  toggleTitleMonth(state?: boolean) {
    this.ready = true;
    if (this.active) {
      this.store.dispatch(new EventsActions.CloseMonthCalendar());
    } else {
      this.store.dispatch(new EventsActions.OpenMonthCalendar());
    }
    this.ready = true;
    // await this.localStorageService.setItem('activeTitleCalendar', this.active);
    // state !== undefined ? this.active = state : this.active = !this.active;
    this.calendar.lockSwipe = this.active;
  }

  onCurrentDateChanged(event) {
    if (this.currentMonth !== moment(event).format('YYYY-MM')) {
      this.store.dispatch(new EventsActions.ChangeCurrentMonth(moment(event).format('YYYY-MM')));
    }
  }
}
