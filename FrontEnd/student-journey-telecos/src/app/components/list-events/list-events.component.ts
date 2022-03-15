import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EventsService } from 'src/app/services/events/events.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { extendMoment } from 'moment-range';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { ApiErrors } from 'src/app/shared/api-errors.enum';
const extMoment = extendMoment(moment);

@Component({
  selector: 'app-list-events',
  templateUrl: './list-events.component.html',
  styleUrls: ['./list-events.component.scss'],
})
export class ListEventsComponent implements OnInit, OnChanges {
  eventsToday = [];
  eventsInRange = [];
  urlNextEvents;
  todayDate;
  eventsForDay = [];
  @Input() public apiEvents: any;
  @Input() public viewAll: boolean;
  @Input() public errorEvents;
  @Input() public backPage: string;
  constructor(
    private eventsService: EventsService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private storage: Storage,
    public translate: TranslateService
  ) { }

  async ngOnInit() {
    this.todayDate = this.utilsService.getTodayDate();
    if (this.errorEvents === undefined) {
      this.getAllEvents();
    }

    const language = await this.storage.get('lang');
    if ( language !== 'ca') {
      this.utilsService.showOnceToast('<ion-icon name="warning" mode="ios"></ion-icon> ' + this.translate.instant('EVENTS.LANGUAGE_ALERT'));
    }
  }

  ngOnChanges() {
    this.eventsForDay = this.apiEvents;
  }

  async getAllEvents() {
    this.eventsForDay = [];
    if (this.viewAll) {
      // events-calendar
      this.eventsForDay = this.apiEvents;
    } else {
      // home
      for (const event of this.apiEvents.data) {
        if (this.utilsService.formatDate(event.startDate) === this.utilsService.getTodayDate()
        && this.utilsService.formatDate(event.endDate) === this.utilsService.getTodayDate()) {
          this.eventsToday.push(event);

        } else if (this.utilsService.formatDate(event.startDate) !== this.utilsService.formatDate(event.endDate)) {
          const range = extMoment.range(moment(event.startDate, 'YYYY-MM-DD'), moment(event.endDate, 'YYYY-MM-DD'));
          if (range.contains(moment(this.todayDate))) {
            this.eventsInRange.push(event);
          }
        }
      }

      if (!this.eventsInRange.length && !this.eventsToday.length) {
        this.errorEvents = ApiErrors.NO_EVENTS;
      }
    }

  }

  truncate(text, numLength) {
    return this.utilsService.truncate(text, numLength);
  }
}
