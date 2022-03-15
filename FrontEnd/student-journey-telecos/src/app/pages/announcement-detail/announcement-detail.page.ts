import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { AnnouncementService } from 'src/app/services/announcement/announcement.service';

@Component({
  selector: 'app-announcement-detail',
  templateUrl: './announcement-detail.page.html',
  styleUrls: ['./announcement-detail.page.scss'],
})
export class AnnouncementDetailPage implements OnInit {
  announcementObject;
  backPage;

  constructor(private announcementService: AnnouncementService, private activatedRoute: ActivatedRoute, public translateService: TranslateService, private utilsService: UtilsService) { }

  async ngOnInit() {
    this.backPage = this.activatedRoute.snapshot.params.backRoute + (this.activatedRoute.snapshot.params.backRoute === 'home' ? '' : '/' + this.activatedRoute.snapshot.params.menu);
    
    this.activatedRoute.queryParams.subscribe(async params => {
      if (params && params.special) {
        this.announcementService.getById().subscribe(res => {
          this.announcementObject = res
          this.announcementObject.creation_date = new Date(this.announcementObject.creation_date * 1000);
        })
      }
    });
  }

  goToExternalLink() {
    if (this.announcementObject.content.type === 'external') {
      this.utilsService.openBrowserInApp(`${this.announcementObject.content.link}`);
    }
  }
}
