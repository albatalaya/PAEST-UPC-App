import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AnnouncementService } from 'src/app/services/announcement/announcement.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-announcements',
  templateUrl: './all-announcements.page.html',
  styleUrls: ['./all-announcements.page.scss'],
})
export class AllAnnouncementsPage implements OnInit {
  announcements;

  announcementsList;
  announcementServiceInfo;
  menu;

  constructor(private activatedRoute: ActivatedRoute, public translate: TranslateService, private announcementService: AnnouncementService) { }

  async ngOnInit() {
    this.menu = this.activatedRoute.snapshot.params.menu;

    const res = await this.announcementService.getPaginateByPage();
    this.announcements = res['docs'];
    this.announcementServiceInfo = {hasNextPage: res['hasNextPage'], nextPage: res['nextPage']};

    this.announcementsList = [];

    if (this.announcements !== undefined) {
      this.announcements.forEach( announcement => {
          const date = new Date(announcement.createdAt);

          const announcementsListFiltered = this.announcementsList.findIndex(a => a.date.getDate() === date.getDate() && a.date.getMonth() === date.getMonth() && a.date.getFullYear() === date.getFullYear());

          if (announcementsListFiltered !== -1) {
            this.announcementsList[announcementsListFiltered].announcements.push(announcement);
          } else {
            this.announcementsList.push({date, announcements: [announcement]});
          }
        });
    }
  }

  isCurrentDay(date) {
    return date.getDate() === new Date().getDate() && date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear();
  }

  loadMoreAnnouncements(event) {
    if (this.announcementServiceInfo.hasNextPage) {
      const res = this.announcementService.getPaginateByPage();
      this.announcements = res['docs'];
      this.announcementServiceInfo = {hasNextPage: res['hasNextPage'], nextPage: res['nextPage']};

      if (this.announcements !== undefined) {
        this.announcements.forEach( announcement => {
          const date = new Date(announcement.createdAt);

          const announcementsListFiltered = this.announcementsList.findIndex(a => a.date.getDate() === date.getDate() && a.date.getMonth() === date.getMonth() && a.date.getFullYear() === date.getFullYear());

          if (announcementsListFiltered !== -1) {
            this.announcementsList[announcementsListFiltered].announcements.push(announcement);
          } else {
            this.announcementsList.push({date, announcements: [announcement]});
          }
        });
    }

      event.target.complete();
    } else {
      event.target.complete();
    }
  }

  
}
