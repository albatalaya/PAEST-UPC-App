import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges, ViewChild, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';
import { IonSlides } from '@ionic/angular';

import { ICalendarComponent, IEvent, IMonthView, IMonthViewRow, ITimeSelected, IRange, CalendarMode, IDateFormatter } from './calendar';
import { CalendarService } from './calendar.service';
import { IMonthViewDisplayEventTemplateContext } from "./calendar";
import * as moment from 'moment';

@Component({
    selector: 'monthview',
    template: `
        <div>
            <ion-slides #monthSlider [options]="sliderOptions" [dir]="dir" (ionSlideDidChange)="onSlideChanged()">
                <ion-slide>
                    <table *ngIf="0===currentViewIndex" class="table table-bordered table-fixed monthview-datetable">
                        <thead>
                        <tr>
                            <th *ngFor="let dayHeader of views[0].dayHeaders">
                                <small>{{dayHeader}}</small>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let row of [0,1,2,3,4,5]">
                            <td class="margin-numero" *ngFor="let col of [0,1,2,3,4,5,6]" tappable (click)="select(views[0].dates[row*7+col])"
                                [ngClass]="getHighlightClass(views[0].dates[row*7+col])"
                                [style.background]="getBackGroundColor(views[0].dates[row*7+col])"
                                [style.color]="getTextColor(views[0].dates[row*7+col])">
                                <ng-template [ngTemplateOutlet]="monthviewDisplayEventTemplate"
                                [ngTemplateOutletContext]="{view: views[0], row: row, col: col}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table *ngIf="0!==currentViewIndex" class="table table-bordered table-fixed monthview-datetable">
                        <thead>
                        <tr class="text-center">
                            <th *ngFor="let dayHeader of views[0].dayHeaders">
                                <small>{{dayHeader}}</small>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let row of [0,1,2,3,4,5]">
                            <td class="margin-numero" *ngFor="let col of [0,1,2,3,4,5,6]">
                                <ng-template [ngTemplateOutlet]="monthviewInactiveDisplayEventTemplate"
                                [ngTemplateOutletContext]="{view: views[0], row: row, col: col}">
                                </ng-template>
                            </td>
                        <tr>
                        </tbody>
                    </table>
                </ion-slide>
                <ion-slide>
                    <table *ngIf="1===currentViewIndex" class="table table-bordered table-fixed monthview-datetable">
                        <thead>
                        <tr>
                            <th *ngFor="let dayHeader of views[1].dayHeaders">
                                <small>{{dayHeader}}</small>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let row of [0,1,2,3,4,5]">
                            <td class="margin-numero" *ngFor="let col of [0,1,2,3,4,5,6]" tappable (click)="select(views[1].dates[row*7+col])"
                                [ngClass]="getHighlightClass(views[1].dates[row*7+col])"
                                [style.background]="getBackGroundColor(views[1].dates[row*7+col])"
                                [style.color]="getTextColor(views[1].dates[row*7+col])">
                                <ng-template [ngTemplateOutlet]="monthviewDisplayEventTemplate"
                                [ngTemplateOutletContext]="{view: views[1], row: row, col: col}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table *ngIf="1!==currentViewIndex" class="table table-bordered table-fixed monthview-datetable">
                        <thead>
                        <tr class="text-center">
                            <th *ngFor="let dayHeader of views[1].dayHeaders">
                                <small>{{dayHeader}}</small>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let row of [0,1,2,3,4,5]">
                            <td class="margin-numero" *ngFor="let col of [0,1,2,3,4,5,6]">
                                <ng-template [ngTemplateOutlet]="monthviewInactiveDisplayEventTemplate"
                                [ngTemplateOutletContext]="{view: views[1], row: row, col: col}">
                                </ng-template>
                            </td>
                        <tr>
                        </tbody>
                    </table>
                </ion-slide>
                <ion-slide>
                    <table *ngIf="2===currentViewIndex" class="table table-bordered table-fixed monthview-datetable">
                        <thead>
                        <tr>
                            <th *ngFor="let dayHeader of views[2].dayHeaders">
                                <small>{{dayHeader}}</small>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let row of [0,1,2,3,4,5]">
                            <td class="margin-numero" *ngFor="let col of [0,1,2,3,4,5,6]" tappable (click)="select(views[2].dates[row*7+col])"
                                [ngClass]="getHighlightClass(views[2].dates[row*7+col])"
                                [style.background]="getBackGroundColor(views[2].dates[row*7+col])"
                                [style.color]="getTextColor(views[2].dates[row*7+col])">
                                <ng-template [ngTemplateOutlet]="monthviewDisplayEventTemplate"
                                [ngTemplateOutletContext]="{view: views[2], row: row, col: col}">
                                </ng-template>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <table *ngIf="2!==currentViewIndex" class="table table-bordered table-fixed monthview-datetable">
                        <thead>
                        <tr class="text-center">
                            <th *ngFor="let dayHeader of views[2].dayHeaders">
                                <small>{{dayHeader}}</small>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr *ngFor="let row of [0,1,2,3,4,5]">
                            <td class="margin-numero" *ngFor="let col of [0,1,2,3,4,5,6]">
                                <ng-template [ngTemplateOutlet]="monthviewInactiveDisplayEventTemplate"
                                [ngTemplateOutletContext]="{view: views[2], row: row, col: col}">
                                </ng-template>
                            </td>
                        <tr>
                        </tbody>
                    </table>
                </ion-slide>
            </ion-slides>
            <ng-template [ngTemplateOutlet]="monthviewEventDetailTemplate"
            [ngTemplateOutletContext]="{showEventDetail:showEventDetail, selectedDate: selectedDate, noEventsLabel: noEventsLabel}">
            </ng-template>
        </div>
    `,
    styles: [`
        .margin-numero{
            border: 5px solid white !important;
            border-bottom: 10px solid white !important;
            font-size: 80%;
            letter-spacing: -0.5px;
        }

        .text-muted {
          color: #999;
        }

        .table-fixed {
          table-layout: fixed;
        }

        .table {
          width: 100%;
          max-width: 100%;
          background-color: stransparent;
        }

        .table > thead > tr > th, .table > tbody > tr > th, .table > tfoot > tr > th, .table > thead > tr > td,
        .table > tbody > tr > td, .table > tfoot > tr > td {
          padding: 8px;
          line-height: 20px;
          vertical-align: top;
        }

        .table > thead > tr > th {
          vertical-align: bottom;
          border-bottom: 2px solid #ddd;
        }

        .table > thead:first-child > tr:first-child > th, .table > thead:first-child > tr:first-child > td {
          border-top: 0
        }

        .table > tbody + tbody {
          border-top: 2px solid #ddd;
        }

        .table-bordered {
          border: 1px solid #ddd;
        }

        .table-bordered > thead > tr > th, .table-bordered > tbody > tr > th, .table-bordered > tfoot > tr > th,
        .table-bordered > thead > tr > td, .table-bordered > tbody > tr > td, .table-bordered > tfoot > tr > td {
          border: 1px solid #ddd;
        }

        .table-bordered > thead > tr > th, .table-bordered > thead > tr > td {
          border-bottom-width: 2px;
        }

        .table-striped > tbody > tr:nth-child(odd) > td, .table-striped > tbody > tr:nth-child(odd) > th {
          background-color: #f9f9f9
        }

        .monthview-primary-with-event {
          background-color: #3a87ad;
          color: #2d2c2c;
        }

        .monthview-current-with-event {
            background-color: #3a87ad;
            color: white;
          }

        .monthview-current {
          background-color: #f0f0f0;
          color: black;
        }

        .monthview-selected {
          background-color: #009900;
          color: white;
        }

        .monthview-datetable td.monthview-disabled {
            color: lightgrey;
            cursor: default;
        }

        .monthview-datetable th {
          text-align: center;
        }

        .monthview-datetable td {
          cursor: pointer;
          text-align: center;
        }

        .monthview-secondary-with-event {
          background-color: #d9edf7;
        }

        ::-webkit-scrollbar,
        *::-webkit-scrollbar {
          display: none;
        }
    `]
})
export class MonthViewComponent implements ICalendarComponent, OnInit, OnChanges {
    @ViewChild('monthSlider', null) slider:IonSlides;

    @Input() monthviewDisplayEventTemplate:TemplateRef<IMonthViewDisplayEventTemplateContext>;
    @Input() monthviewInactiveDisplayEventTemplate:TemplateRef<IMonthViewDisplayEventTemplateContext>;
    @Input() monthviewEventDetailTemplate:TemplateRef<IMonthViewDisplayEventTemplateContext>;

    @Input() formatDay:string;
    @Input() formatDayHeader:string;
    @Input() formatMonthTitle:string;
    @Input() eventSource:IEvent[];
    @Input() startingDayMonth:number;
    @Input() showEventDetail:boolean;
    @Input() noEventsLabel:string;
    @Input() autoSelect:boolean = true;
    @Input() markDisabled:(date:Date) => boolean;
    @Input() locale:string;
    @Input() maxSlides:number;
    @Input() dateFormatter:IDateFormatter;
    @Input() dir:string = "";
    @Input() lockSwipeToPrev:boolean;
    @Input() lockSwipes:boolean;
    @Input() sliderOptions:any;

    @Output() onRangeChanged = new EventEmitter<IRange>();
    @Output() onEventSelected = new EventEmitter<IEvent>();
    @Output() onTimeSelected = new EventEmitter<ITimeSelected>(true);
    @Output() onTitleChanged = new EventEmitter<string>(true);

    public views:IMonthView[] = [];
    public currentViewIndex = 0;
    public selectedDate:IMonthViewRow;
    public range:IRange;
    public mode:CalendarMode = 'month';
    public direction = 0;

    private moveOnSelected = false;
    private inited = false;
    private callbackOnInit = true;
    private currentDateChangedFromParentSubscription:Subscription;
    private eventSourceChangedSubscription:Subscription;
    private slideChangedSubscription:Subscription;

    private formatDayLabel:(date:Date) => string;
    private formatDayHeaderLabel:(date:Date) => string;
    private formatTitle:(date:Date) => string;

    constructor(private calendarService:CalendarService) {
    }

    ngOnInit() {
        if(!this.sliderOptions) {
            this.sliderOptions = {};
        }
        this.sliderOptions.loop = true;

        if (this.dateFormatter && this.dateFormatter.formatMonthViewDay) {
            this.formatDayLabel = this.dateFormatter.formatMonthViewDay;
        } else {
            let dayLabelDatePipe = new DatePipe('en-US');
            this.formatDayLabel = function (date:Date) {
                return dayLabelDatePipe.transform(date, this.formatDay);
            };
        }

        if (this.dateFormatter && this.dateFormatter.formatMonthViewDayHeader) {
            this.formatDayHeaderLabel = this.dateFormatter.formatMonthViewDayHeader;
        } else {
            let datePipe = new DatePipe(this.locale);
            this.formatDayHeaderLabel = function (date:Date) {
                return datePipe.transform(date, this.formatDayHeader);
            };
        }

        if (this.dateFormatter && this.dateFormatter.formatMonthViewTitle) {
            this.formatTitle = this.dateFormatter.formatMonthViewTitle;
        } else {
            let datePipe = new DatePipe(this.locale);
            this.formatTitle = function (date:Date) {
                return datePipe.transform(date, this.formatMonthTitle);
            };
        }

        if (this.lockSwipeToPrev || this.maxSlides) {
            this.slider.lockSwipeToPrev(true);
        }

        if (this.lockSwipes) {
            this.slider.lockSwipes(true);
        }

        this.refreshView();
        this.inited = true;

        this.currentDateChangedFromParentSubscription = this.calendarService.currentDateChangedFromParent$.subscribe(currentDate => {
            this.refreshView();
        });

        this.eventSourceChangedSubscription = this.calendarService.eventSourceChanged$.subscribe(() => {
            this.onDataLoaded();
        });

        this.slideChangedSubscription = this.calendarService.slideChanged$.subscribe(direction => {
           if(direction == 1) {
               this.slider.slideNext();
           } else if(direction == -1) {
               this.slider.slidePrev();
           }
        });
    }

    ngOnDestroy() {
        if (this.currentDateChangedFromParentSubscription) {
            this.currentDateChangedFromParentSubscription.unsubscribe();
            this.currentDateChangedFromParentSubscription = null;
        }

        if (this.eventSourceChangedSubscription) {
            this.eventSourceChangedSubscription.unsubscribe();
            this.eventSourceChangedSubscription = null;
        }

        if(this.slideChangedSubscription) {
            this.slideChangedSubscription.unsubscribe();
            this.slideChangedSubscription = null;
        }
    }

    ngOnChanges(changes:SimpleChanges) {
        if (!this.inited) return;

        let eventSourceChange = changes['eventSource'];
        if (eventSourceChange && eventSourceChange.currentValue) {
            this.onDataLoaded();
        }

        let lockSwipeToPrev = changes['lockSwipeToPrev'];
        if (lockSwipeToPrev) {
            this.slider.lockSwipeToPrev(lockSwipeToPrev.currentValue);
        }

        let lockSwipes = changes['lockSwipes'];
        if (lockSwipes) {
            this.slider.lockSwipes(lockSwipes.currentValue);
        }
    }

    ngAfterViewInit() {
        let title = this.getTitle();
        this.onTitleChanged.emit(title);
    }

    onSlideChanged() {
        if (this.callbackOnInit) {
            this.callbackOnInit = false;
            return;
        }

        let direction = 0,
            currentViewIndex = this.currentViewIndex;

        this.slider.getActiveIndex().then((currentSlideIndex) => {
            currentSlideIndex = (currentSlideIndex + 2) % 3;
            if (currentSlideIndex - currentViewIndex === 1) {
                direction = 1;
            } else if (currentSlideIndex === 0 && currentViewIndex === 2) {
                direction = 1;
                this.slider.slideTo(1, 0, false);
            } else if (currentViewIndex - currentSlideIndex === 1) {
                direction = -1;
            } else if (currentSlideIndex === 2 && currentViewIndex === 0) {
                direction = -1;
                this.slider.slideTo(3, 0, false);
            }
            this.currentViewIndex = currentSlideIndex;
            this.move(direction);
        });
    }

    move(direction:number) {
        if (direction === 0) return;

        this.direction = direction;
        if (!this.moveOnSelected) {
            let adjacentDate = this.calendarService.getAdjacentCalendarDate(this.mode, direction);
            this.calendarService.setCurrentDate(adjacentDate);
        }

        if (this.maxSlides) {
            const today = moment().startOf('month').add(this.maxSlides, 'M');
            const currentDate = moment(this.calendarService.currentDate).startOf('month');

            const diferencia = moment(today).diff(moment(currentDate), 'months', true);
            if(diferencia === 1){
                this.slider.lockSwipeToNext(true);
            }else{
                this.slider.lockSwipeToNext(false);
            }

            if(diferencia === this.maxSlides){
                this.slider.lockSwipeToPrev(true);
            }else{
                this.slider.lockSwipeToPrev(false);
            }
        }

        this.refreshView();
        this.direction = 0;
        this.moveOnSelected = false;
    }

    createDateObject(date:Date):IMonthViewRow {
        var disabled = false;
        if (this.markDisabled) {
            disabled = this.markDisabled(date);
        }

        return {
            date: date,
            events: [],
            label: this.formatDayLabel(date),
            secondary: false,
            disabled: disabled
        };
    }

    static getDates(startDate:Date, n:number):Date[] {
        let dates = new Array(n),
            current = new Date(startDate.getTime()),
            i = 0;
        current.setHours(12); // Prevent repeated dates because of timezone bug
        while (i < n) {
            dates[i++] = new Date(current.getTime());
            current.setDate(current.getDate() + 1);
        }
        return dates;
    }

    getViewData(startTime:Date):IMonthView {
        let startDate = startTime,
            date = startDate.getDate(),
            month = (startDate.getMonth() + (date !== 1 ? 1 : 0)) % 12;

        let dates = MonthViewComponent.getDates(startDate, 42);
        let days:IMonthViewRow[] = [];
        for (let i = 0; i < 42; i++) {
            let dateObject = this.createDateObject(dates[i]);
            dateObject.secondary = dates[i].getMonth() !== month;
            days[i] = dateObject;
        }

        let dayHeaders:string[] = [];
        for (let i = 0; i < 7; i++) {
            dayHeaders.push(this.formatDayHeaderLabel(days[i].date));
        }
        return {
            dates: days,
            dayHeaders: dayHeaders
        };
    }

    getBackGroundColor(date:IMonthViewRow){
        if (date.events.length && date.events[0]['backgroundColor'] && !date.secondary) {
            return date.events[0]['backgroundColor'];
        }

        return '#fff';
    }

    getTextColor(date:IMonthViewRow){
        if (date.events.length && date.events[0]['textColor'] && !date.secondary) {
            return date.events[0]['textColor'];
        }

        if (date.secondary) {
            return '#999';
        }

        return '#000';
    }

    getHighlightClass(date:IMonthViewRow):string {
        let className = '';

        if (date.hasEvent) {
            if (date.secondary) {
                className = 'monthview-secondary-with-event';
            } else {
                className = 'monthview-primary-with-event';
            }
        }

        if (date.selected) {
            if (className) {
                className += ' ';
            }
            className += 'monthview-selected';
        }

        if (date.current) {
            if (className) {
                className += ' ';
            }
            if (date.hasEvent) {
                className += 'monthview-current-with-event';
            } else {
                className += 'monthview-current';
            }
        }

        if (date.secondary) {
            if (className) {
                className += ' ';
            }
            className += 'text-muted';
        }

        if (date.disabled) {
            if (className) {
                className += ' ';
            }
            className += 'monthview-disabled';
        }

        return className;
    }

    getRange(currentDate:Date):IRange {
        let year = currentDate.getFullYear(),
            month = currentDate.getMonth(),
            firstDayOfMonth = new Date(year, month, 1),
            difference = this.startingDayMonth - firstDayOfMonth.getDay(),
            numDisplayedFromPreviousMonth = (difference > 0) ? 7 - difference : -difference,
            startDate = new Date(firstDayOfMonth.getTime());

        if (numDisplayedFromPreviousMonth > 0) {
            startDate.setDate(-numDisplayedFromPreviousMonth + 1);
        }

        let endDate = new Date(startDate.getTime());
        endDate.setDate(endDate.getDate() + 42);

        return {
            startTime: startDate,
            endTime: endDate
        };
    }

    onDataLoaded() {
        let range = this.range,
            eventSource = this.eventSource,
            len = eventSource ? eventSource.length : 0,
            startTime = range.startTime,
            endTime = range.endTime,
            utcStartTime = new Date(Date.UTC(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())),
            utcEndTime = new Date(Date.UTC(endTime.getFullYear(), endTime.getMonth(), endTime.getDate())),
            currentViewIndex = this.currentViewIndex,
            dates = this.views[currentViewIndex].dates,
            oneDay = 86400000,
            eps = 0.0006;
        for (let r = 0; r < 42; r += 1) {
            if (dates[r].hasEvent) {
                dates[r].hasEvent = false;
                dates[r].events = [];
            }
        }

        for (let i = 0; i < len; i += 1) {
            let event = eventSource[i],
                eventStartTime = new Date(event.startTime.getTime()),
                eventEndTime = new Date(event.endTime.getTime()),
                st:Date,
                et:Date;

            if (event.allDay) {
                if (eventEndTime <= utcStartTime || eventStartTime >= utcEndTime) {
                    continue;
                } else {
                    st = utcStartTime;
                    et = utcEndTime;
                }
            } else {
                if (eventEndTime <= startTime || eventStartTime >= endTime) {
                    continue;
                } else {
                    st = startTime;
                    et = endTime;
                }
            }

            let timeDiff:number;
            let timeDifferenceStart:number;
            if (eventStartTime <= st) {
                timeDifferenceStart = 0;
            } else {
                timeDiff = eventStartTime.getTime() - st.getTime();
                if (!event.allDay) {
                    timeDiff = timeDiff - (eventStartTime.getTimezoneOffset() - st.getTimezoneOffset()) * 60000;
                }
                timeDifferenceStart = timeDiff / oneDay;
            }

            let timeDifferenceEnd:number;
            if (eventEndTime >= et) {
                timeDiff = et.getTime() - st.getTime();
                if (!event.allDay) {
                    timeDiff = timeDiff - (et.getTimezoneOffset() - st.getTimezoneOffset()) * 60000;
                }
                timeDifferenceEnd = timeDiff / oneDay;
            } else {
                timeDiff = eventEndTime.getTime() - st.getTime();
                if (!event.allDay) {
                    timeDiff = timeDiff - (eventEndTime.getTimezoneOffset() - st.getTimezoneOffset()) * 60000;
                }
                timeDifferenceEnd = timeDiff / oneDay;
            }

            let index = Math.floor(timeDifferenceStart);
            while (index < timeDifferenceEnd - eps) {
                dates[index].hasEvent = true;
                let eventSet = dates[index].events;
                if (eventSet) {
                    eventSet.push(event);
                } else {
                    eventSet = [];
                    eventSet.push(event);
                    dates[index].events = eventSet;
                }
                index += 1;
            }
        }

        for (let r = 0; r < 42; r += 1) {
            if (dates[r].hasEvent) {
                dates[r].events.sort(this.compareEvent);
            }
        }

        if (this.autoSelect) {
            let findSelected = false;
            for (let r = 0; r < 42; r += 1) {
                if (dates[r].selected) {
                    this.selectedDate = dates[r];
                    findSelected = true;
                    break;
                }
            }

            if (findSelected) {
                this.onTimeSelected.emit({
                    selectedTime: this.selectedDate.date,
                    events: this.selectedDate.events,
                    disabled: this.selectedDate.disabled
                });
            }
        }
    }

    refreshView() {
        this.range = this.getRange(this.calendarService.currentDate);

        if (this.inited) {
            let title = this.getTitle();
            this.onTitleChanged.emit(title);
        }
        this.calendarService.populateAdjacentViews(this);
        this.updateCurrentView(this.range.startTime, this.views[this.currentViewIndex]);
        this.calendarService.rangeChanged(this);
    }

    getTitle():string {
        let currentViewStartDate = this.range.startTime,
        date = currentViewStartDate.getDate(),
        month = (currentViewStartDate.getMonth() + (date !== 1 ? 1 : 0)) % 12,
        year = currentViewStartDate.getFullYear() + (date !== 1 && month === 0 ? 1 : 0),
        headerDate = new Date(year, month, 1, 12, 0, 0, 0);

        const fecha = new DatePipe(this.locale).transform(headerDate, 'LLLL yyyy');

        return fecha.charAt(0).toUpperCase() + fecha.slice(1);
    }

    private compareEvent(event1:IEvent, event2:IEvent):number {
        if (event1.allDay) {
            return 1;
        } else if (event2.allDay) {
            return -1;
        } else {
            return (event1.startTime.getTime() - event2.startTime.getTime());
        }
    }

    select(viewDate:IMonthViewRow) {

        if (viewDate.secondary) return;

        if (!this.views) return;

        let selectedDate = viewDate.date,
            events = viewDate.events;

        if (!viewDate.disabled) {
            let dates = this.views[this.currentViewIndex].dates,
                currentCalendarDate = this.calendarService.currentDate,
                currentMonth = currentCalendarDate.getMonth(),
                currentYear = currentCalendarDate.getFullYear(),
                selectedMonth = selectedDate.getMonth(),
                selectedYear = selectedDate.getFullYear(),
                direction = 0;

            if (currentYear === selectedYear) {
                if (currentMonth !== selectedMonth) {
                    direction = currentMonth < selectedMonth ? 1 : -1;
                }
            } else {
                direction = currentYear < selectedYear ? 1 : -1;
            }

            this.calendarService.setCurrentDate(selectedDate);
            if (direction === 0) {
                let currentViewStartDate = this.range.startTime,
                    oneDay = 86400000,
                    selectedDayDifference = Math.floor((selectedDate.getTime() - currentViewStartDate.getTime() - (selectedDate.getTimezoneOffset() - currentViewStartDate.getTimezoneOffset()) * 60000) / oneDay);

                for (let r = 0; r < 42; r += 1) {
                    dates[r].selected = false;
                }

                if (selectedDayDifference >= 0 && selectedDayDifference < 42) {
                    dates[selectedDayDifference].selected = true;
                    this.selectedDate = dates[selectedDayDifference];
                }
            } else {
                this.moveOnSelected = true;
                this.slideView(direction);
            }
        }

        this.onTimeSelected.emit({selectedTime: selectedDate, events: events, disabled: viewDate.disabled});
    }

    slideView(direction:number) {
        if (direction === 1) {
            this.slider.slideNext();
        } else if (direction === -1) {
            this.slider.slidePrev();
        }
    }

    updateCurrentView(currentViewStartDate:Date, view:IMonthView) {
        let currentCalendarDate = this.calendarService.currentDate,
            today = new Date(),
            oneDay = 86400000,
            selectedDayDifference = Math.floor((currentCalendarDate.getTime() - currentViewStartDate.getTime() - (currentCalendarDate.getTimezoneOffset() - currentViewStartDate.getTimezoneOffset()) * 60000) / oneDay),
            currentDayDifference = Math.floor((today.getTime() - currentViewStartDate.getTime() - (today.getTimezoneOffset() - currentViewStartDate.getTimezoneOffset()) * 60000) / oneDay);

        for (let r = 0; r < 42; r += 1) {
            view.dates[r].selected = false;
        }

        if (selectedDayDifference >= 0 && selectedDayDifference < 42 && !view.dates[selectedDayDifference].disabled && (this.autoSelect || this.moveOnSelected)) {
            view.dates[selectedDayDifference].selected = true;
            this.selectedDate = view.dates[selectedDayDifference];
        } else {
            this.selectedDate = {
                date: null,
                events: [],
                label: null,
                secondary: null,
                disabled: false
            };
        }

        if (currentDayDifference >= 0 && currentDayDifference < 42) {
            view.dates[currentDayDifference].current = true;
        }
    }

    eventSelected(event:IEvent) {
        this.onEventSelected.emit(event);
    }
}
