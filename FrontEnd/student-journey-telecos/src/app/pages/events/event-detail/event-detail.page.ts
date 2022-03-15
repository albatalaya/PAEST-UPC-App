import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventsService } from 'src/app/services/events/events.service';
import * as moment from 'moment';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {

  eventId = null;
  eventObject = null;
  backPage;
  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
    private utilsService: UtilsService,
    public translate: TranslateService
    ) { }

 async ngOnInit() {
    this.eventId = this.activatedRoute.snapshot.paramMap.get('id');
    this.backPage = this.activatedRoute.snapshot.queryParams.backPage ? this.activatedRoute.snapshot.queryParams.backPage : '/pages/home';
    this.eventObject = await this.eventsService.getEventById().toPromise();
  }

  openAddCal() {
    window.open(`https://www.upc.edu/ca/agenda/esdeveniments/${this.eventId}/ics_view`, '_system');
  }

  isEventRange(startDate, endDate) {
    return this.utilsService.formatDate(startDate) !== this.utilsService.formatDate(endDate);
  }

  goToEnlaceExtern() {
    this.utilsService.openBrowserInApp(`${this.eventObject.eventUrl}`);
  }
}
