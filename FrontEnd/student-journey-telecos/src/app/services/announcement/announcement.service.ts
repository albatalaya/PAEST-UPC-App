import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';


@Injectable({
providedIn: 'root'
})
export class AnnouncementService implements OnInit {
    constructor(
      private httpClient: HttpClient,
      public translate: TranslateService
    ) { }

    async ngOnInit() {
    }

    // JSON
    getPaginateByPage() {
        return this.httpClient.get<any[]>('../../../assets/data/announcements/announcements-getPaginate.json')
    }


    // JSON
    getPage() {
        return this.httpClient.get<any[]>('../../../assets/data/announcements/announcements.json')
    }


    // getAll() {
    //     try {
    //         return this.httpClient.get(environment.urlServer + 'announcements/all').toPromise();
    //     } catch (error) {
    //         console.log('Error getSchedule', error);
    //     }
    // }

    // JSON
    getById() {
        return this.httpClient.get<any[]>('../../../assets/data/announcements/announcements-id.json')
    }



}