import { TabsPage } from './tabs.page';
import { HomePage } from 'src/app/pages/home/home.page';
import { CampusMapPage } from 'src/app/pages/campus-map/campus-map.page';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'pages',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'home/news/:id',
        loadChildren: () => import('../pages/news/news-detail/news-detail.module').then(m => m.NewsDetailPageModule)
      },
      {
        path: 'home/events/:id',
        loadChildren: () => import('../pages/events/event-detail/event-detail.module').then(m => m.EventDetailPageModule)
      },
      {
        path: 'library',
      loadChildren: () => import('../pages/libraries/library-list/library-list.module').then(m => m.LibraryListPageModule)
      },
      {
        path: 'library/:id',
        loadChildren: () => import('../pages/libraries/library-detail/library-detail.module').then(m => m.LibraryDetailPageModule)
      },
      {
        path: 'library/:id/contact',
        loadChildren: () => import('../pages/libraries/library-contact/library-contact.module').then(m => m.LibraryContactPageModule)
      },
      {
        path: 'home/events',
        loadChildren: () => import('../pages/events/events-calendar/events-calendar.module').then(m => m.EventsCalendarPageModule)
      },
      {
        path: 'home/news',
        loadChildren: () => import('../pages/news/news-list/news-list.module').then(m => m.NewsListPageModule)
      },
      {
        path: 'schools',
        loadChildren: () => import('../pages/schools/schools.module').then(m => m.SchoolsPageModule)
      },
      {
        path: 'wip',
        loadChildren: () => import('../pages/wip/wip.module').then(m => m.WipPageModule)
      },
      {
        path: 'configuration',
        loadChildren: () => import('../pages/configuration/configuration.module').then(m => m.ConfigurationPageModule)
      },
      {
        path: 'scholarships',
        loadChildren: () => import('../pages/scholarships/scholarships-list/scholarships-list.module').then(m => m.ScholarshipsListPageModule)
      },
      {
        path: 'scholarships/:id/:scholarPath',
        loadChildren: () => import('../pages/scholarships/scholarships-detail/scholarships-detail.module').then(m => m.ScholarshipsDetailPageModule)
      },
      {
        path: 'error',
        loadChildren: () => import('../pages/error/error.module').then(m => m.ErrorPageModule)
      },
      {
        path: 'splash-screen',
        loadChildren: () => import('../pages/splash-screen/splash-screen.module').then(m => m.SplashScreenPageModule)
      },
      {
        path: 'schedule-management',
        loadChildren: () => import('../pages/schedule-management/schedule-management.module').then(m => m.ScheduleManagementPageModule)
      },
      {
        path: 'schedule-management/schedule-detail',
        loadChildren: () => import('../pages/schedule-management/schedule-detail/schedule-detail.module').then(m => m.ScheduleDetailPageModule)
      },
      {
        path: 'grades',
        loadChildren: () => import('../pages/notes/note-consultation/note-consultation.module').then(m => m.NoteConsultationPageModule)
      },
      {
        path: 'grades/all-notes/:idGrade',
        loadChildren: () => import('../pages/notes/note-consultation/all-notes/all-notes.module').then(m => m.AllNotesPageModule)
      },
      {
        path: 'grades/detail-grade',
        loadChildren: () => import('../pages/notes/note-consultation/detail-grade/detail-grade.module').then(m => m.DetailGradePageModule)
      },
      {
        path: 'all-announcements/:menu',
        loadChildren: () => import('../pages/all-announcements/all-announcements.module').then(m => m.AllAnnouncementsPageModule)
      },
      {
        path: 'announcement-detail/:backRoute/:menu',
        loadChildren: () => import('../pages/announcement-detail/announcement-detail.module').then(m => m.AnnouncementDetailPageModule)
      },
      {
        path: 'log-in',
        loadChildren: () => import('../pages/log-in/log-in.module').then(m => m.LogInPageModule)
      },
      {
        path: 'student-card',
        loadChildren: () => import('../pages/student-card/student-card.module').then(m => m.StudentCardPageModule)
      },
      {
        path: '',
        redirectTo: '/pages/home',
        pathMatch: 'full'
      },
      {
        path: 'assignatures',
        loadChildren: () => import('../pages/directori/assignatures/assignatures.module').then( m => m.AssignaturesPageModule)
      },
      {
        path: 'professorat/:id_class/:id_prof', //per a que mostri cada professorat segons el seu id
        loadChildren: () => import('../pages/directori/professorat/professorat.module').then( m => m.ProfessoratPageModule)
      },
      {
        path: 'consulta/:id_class/:id_prof',
        loadChildren: () => import('../pages/directori/consulta/consulta.module').then( m => m.ConsultaPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: '/pages/home',
    pathMatch: 'full'
  }
];




@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
