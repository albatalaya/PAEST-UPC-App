import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news/news.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.page.html',
  styleUrls: ['./news-list.page.scss'],
})
export class NewsListPage implements OnInit {

  news = null;
  errorNews;
  urlNextNews = null;
  language;
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private store: Store<AppState>,
    public translate: TranslateService,
    private utilsService: UtilsService,
    private zone: NgZone,
    private storage: Storage
    ) { }

  async ngOnInit() {
    this.language = await this.storage.get('lang');
    this.newsService.getNews().subscribe( news => {
      this.news = news ? news['data'] : undefined;
      this.urlNextNews = news ? news['batching']['next'] : undefined;
    })
  }
  async loadMoreNews(event) {
    this.newsService.getNewsByUrl().subscribe( async moreNews => {
      this.urlNextNews = moreNews['batching']['next'];
      await this.news.push(...moreNews['data']);
      event.target.complete();
    })
    
  }

}
