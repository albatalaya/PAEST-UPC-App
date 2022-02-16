import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { NewsListPage } from './news-list.page';
import { TranslateModule } from '@ngx-translate/core';
import { NewsService } from 'src/app/services/news/news.service';
import { ComponentsModule } from '../../../components/components.module';

const routes: Routes = [
  {
    path: '',
    component: NewsListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    NewsService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [NewsListPage]
})
export class NewsListPageModule {}
