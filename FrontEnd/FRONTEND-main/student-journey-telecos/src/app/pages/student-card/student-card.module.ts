import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

import { StudentCardPage } from './student-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: StudentCardPage
      }
    ]),
    ComponentsModule,
    TranslateModule,
  ],
  providers: [
    
  ],
  declarations: [StudentCardPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StudentCardPageModule {}
