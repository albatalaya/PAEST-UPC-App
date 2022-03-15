import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { NewsService } from '../../../services/news/news.service';
import { Storage } from '@ionic/storage';


@Injectable()
export class NewsListResolver implements Resolve<any> {

  constructor(private newsService: NewsService, private storage: Storage) { }

  async resolve() {
    
  }
}
