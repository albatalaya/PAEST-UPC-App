import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Cacheable } from 'ngx-cacheable';
import { Store } from '@ngrx/store';
import { AppState } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  language = 'ca';
  constructor(
    private httpClient: HttpClient,
    ) { }


  // JSON
  getNews() {
    return this.httpClient.get<any[]>('../../../assets/data/news/news-ca.json')
  }


  // JSON
  getNewsByUrl() {
    return this.httpClient.get<any[]>('../../../assets/data/news/news-byUrl.json')
  }

  // JSON
  getNewsById() {
    return this.httpClient.get<any[]>('../../../assets/data/news/news-id.json')
  }

}
