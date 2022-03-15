import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LibraryDetailPage } from './library-detail.page';
import { LibraryDetailResolver } from './library-detail.resolver';
import { LibrariesService } from 'src/app/services/libraries/libraries.service';
import { ComponentsModule } from 'src/app/components/components.module';
import { TranslateModule } from '@ngx-translate/core';


const routes: Routes = [
  {
    path: '',
    component: LibraryDetailPage,
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
    ComponentsModule,
    TranslateModule
  ],
  declarations: [LibraryDetailPage],
  providers: [
    LibraryDetailResolver,
    LibrariesService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LibraryDetailPageModule {
  constructor() {

  }
}
