import { ModalErrorComponent } from './modal-error/modal-error.component';
import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, ActivatedRouteSnapshot } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarComponent } from './calendar/calendar.component';
import { MenuSidebarComponent } from './menu-sidebar/menu-sidebar.component';
import { CardNewsComponent } from './card-news/card-news.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';

import { registerLocaleData } from '@angular/common';
import localeCa from '@angular/common/locales/ca';
import localeEs from '@angular/common/locales/es';
import localeEn from '@angular/common/locales/en';

import { ListEventsComponent } from './list-events/list-events.component';
import { CardScholarshipComponent} from './card-scholarship/card-scholarship.component';
import { ExpandableComponent } from './expandable/expandable.component';
import { NgCalendarModule } from './calendar-custom';
import { HomeCarruselComponentComponent } from './home-carrusel-component/home-carrusel-component.component';
import { ErrorsComponent } from './errors/errors.component';
import { ToastNotificationComponent } from './toast-notification/toast-notification.component';
import { IonicStorageModule } from '@ionic/storage';
import { NgCalendarHorarisModule } from './calendar-gestio-horaris';
import { GradeDetailListComponent } from './grade-detail-list/grade-detail-list.component';
import { DirectoriSubjectsListComponent } from './directori-subjects-list/directori-subjects-list.component';
import { SubjectsListComponent } from './subjects-list/subjects-list.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { ExpandableMenuComponent } from './expandable-menu/expandable-menu.component';

registerLocaleData(localeCa);
registerLocaleData(localeEs);
registerLocaleData(localeEn);

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule,
    TranslateModule,
    NgCalendarModule,
    NgCalendarHorarisModule,
    IonicStorageModule.forRoot(),
  ],
  declarations: [
    CalendarComponent,
    MenuSidebarComponent,
    CardNewsComponent,
    ListEventsComponent,
    ProgressBarComponent,
    CardScholarshipComponent,
    ExpandableComponent,
    ExpandableMenuComponent,
    HomeCarruselComponentComponent,
    ErrorsComponent,
    ToastNotificationComponent,
    DirectoriSubjectsListComponent,
    GradeDetailListComponent,
    SubjectsListComponent,
    ModalErrorComponent,
    AnnouncementComponent
  ],
  exports: [
    CalendarComponent,
    MenuSidebarComponent,
    NgCalendarModule,
    NgCalendarHorarisModule,
    CardNewsComponent,
    ListEventsComponent,
    ProgressBarComponent,
    CardScholarshipComponent,
    ExpandableComponent,
    ExpandableMenuComponent,
    HomeCarruselComponentComponent,
    ErrorsComponent,
    ToastNotificationComponent,
    DirectoriSubjectsListComponent,
    GradeDetailListComponent,
    SubjectsListComponent,
    ModalErrorComponent,
    AnnouncementComponent
  ],
  entryComponents: [ModalErrorComponent],
  schemas: [],
})
export class ComponentsModule {
  constructor() {

  }
}
