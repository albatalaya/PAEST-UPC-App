import { ModalErrorComponent } from './../../../components/modal-error/modal-error.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { ComponentsModule } from '../../../components/components.module';

import { LibraryListPage } from './library-list.page';
import { LibrariesResolver } from './library-list.resolver';
import { LibrariesService } from 'src/app/services/libraries/libraries.service';


const routes: Routes = [
  {
    path: '',
    component: LibraryListPage,
    resolve: {
      data: LibrariesResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule,
    ComponentsModule,
  ],
  providers: [
    LibrariesResolver,
    LibrariesService,
  ],
  declarations: [LibraryListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ModalErrorComponent]
})
export class LibraryListPageModule { 
  constructor() {

  }
}
