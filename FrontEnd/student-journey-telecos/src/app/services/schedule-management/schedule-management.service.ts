import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../../../environments/environment';
import * as moment from 'moment';
import { Cacheable } from 'ngx-cacheable';


@Injectable({
providedIn: 'root'
})
export class ScheduleManagementService implements OnInit {
    constructor(
      private httpClient: HttpClient,
      public translate: TranslateService
    ) { }

    async ngOnInit() {
    }


    // JSON
    getSchedule() {
        return this.httpClient.get<any[]>('../../../assets/data/schedule/get-schedule.json')
    }
}