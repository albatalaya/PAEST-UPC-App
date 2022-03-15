import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/services/news/news.service';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from 'src/app/shared/utils/utils.service';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.page.html',
  styleUrls: ['./news-detail.page.scss'],
})
export class NewsDetailPage implements OnInit {
  backPage;
  newsObject;
  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private storage: Storage,
    private utilsService: UtilsService,
    public translateService: TranslateService,
    private zone: NgZone,
    ) { }

 async ngOnInit() {
    if (this.route && this.route.data) {
      const language = await this.storage.get('lang');
      this.newsService.getNewsById().subscribe(
        resp => {
          this.zone.run(() => {
            this.newsObject = resp;
            this.backPage = this.route.snapshot.queryParams.backPage;
          });
        }
      );
    } else {
      console.warn('No data coming from Route Resolver');
    }
  }

  goToExternalLink() {
    this.utilsService.openBrowserInApp(`${this.newsObject.remoteUrl}`);
  }
}
