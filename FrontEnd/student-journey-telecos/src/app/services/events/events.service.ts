import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cacheable } from 'ngx-cacheable';
import { Store } from '@ngrx/store';
import { AppState } from '@capacitor/core';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService implements OnInit {

  language = 'ca';
  constructor(
    private httpClient: HttpClient,
    public translate: TranslateService
    ) { }

    async ngOnInit() {

    }

    // JSON
    getEventsDate() {
        return this.httpClient.get<any[]>('../../../assets/data/events/events-date.json')
    }

    // JSON
    getEventById() {
        return this.httpClient.get<any[]>('../../../assets/data/events/events-id.json')
    }
}
