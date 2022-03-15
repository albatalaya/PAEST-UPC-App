import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LibraryContactPage } from './library-contact.page';

import { TranslateModule } from '@ngx-translate/core';
import { LibraryDetailResolver } from '../library-detail/library-detail.resolver';
const routes: Routes = [
  {
    path: '',
    component: LibraryContactPage,
    resolve: {
      data: LibraryDetailResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [LibraryContactPage],
  providers: [
    LibraryDetailResolver
  ]
})
export class LibraryContactPageModule {}
