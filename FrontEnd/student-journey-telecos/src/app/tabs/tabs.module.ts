import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { TabsPageRoutingModule } from './tabs.routing.module';

import { ComponentsModule } from '../components/components.module';

import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    IonicStorageModule.forRoot(),

  ],
  declarations: [TabsPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TabsPageModule {
  constructor() {
   
  }
}
