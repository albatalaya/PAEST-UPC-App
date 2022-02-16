import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ScholarshipsListPage } from './scholarships-list.page';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from '../../../components/components.module';
import { ScholarshipsService } from '../../../services/scholarships/scholarships.service';

const routes: Routes = [
  {
    path: '',
    component: ScholarshipsListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComponentsModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    ScholarshipsService
  ],
  declarations: [ScholarshipsListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ScholarshipsListPageModule {}
