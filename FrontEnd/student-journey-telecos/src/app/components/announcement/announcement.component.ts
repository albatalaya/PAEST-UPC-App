import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {

  @Input() announcement;
  @Input() home = false;
  @Input() menu;
  @Output() announcementDeleted = new EventEmitter<string>();
  horsDiff = 0;
  daysDiff = 0;

  constructor(
    public translate: TranslateService,
    private router: Router,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.horsDiff = moment().diff(moment(new Date(this.announcement.createdAt)), 'hours');
    this.daysDiff = moment().diff(moment(new Date(this.announcement.createdAt)), 'days');

    if (this.announcement.type === 'schedule_date') {
      const oldDate = new Date(this.announcement.old_date);
      const newDate = new Date(this.announcement.new_date)
      this.announcement.old_date = oldDate.getDate() + '/' + oldDate.getMonth() + ' - ' + oldDate.getHours() + ':' + oldDate.getMinutes();
      this.announcement.new_date = newDate.getDate() + '/' + newDate.getMonth() + ' - ' + newDate.getHours() + ':' + newDate.getMinutes();
    } else if (this.announcement.type === 'schedule_cancellation') {
      const startDate = new Date(this.announcement.start_date);
      const endDate = new Date(this.announcement.end_date);

      this.announcement.start_date = startDate.getDate() + '/' + startDate.getMonth();
      this.announcement['from'] = startDate.getHours() + ':' + startDate.getMinutes();
      this.announcement['to'] = endDate.getHours() + ':' + endDate.getMinutes();
    } else if (this.announcement.type === 'schedule_room') {
      const oldDate = new Date(this.announcement.start_date);

      this.announcement.start_date = oldDate.getDate() + '/' + oldDate.getMonth() + ' - ' + oldDate.getHours() + ':' + oldDate.getMinutes();
    }
  }

  announcementDetail() {
    if (this.announcement.type === 'generic' || this.announcement.type === 'filtered') {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          special: this.announcement._id
        }
      };
      this.router.navigate(['/pages/announcement-detail/' + (this.home ? 'home/false' : ('all-announcements/' + this.menu))], navigationExtras);
    }
  }

  async eliminarAnnouncement() {
    let announcements = await this.storage.get('announcements');

    if (announcements === null) {
      announcements = [];
    }

    announcements.push(this.announcement.id);

    this.storage.set('announcements', announcements);

    this.announcementDeleted.emit(this.announcement.id);
  }

}
