import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AssignaturesPageRoutingModule } from './assignatures-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { AssignaturesPage } from './assignatures.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    AssignaturesPageRoutingModule
  ],
  declarations: [AssignaturesPage]
})
export class AssignaturesPageModule {}
