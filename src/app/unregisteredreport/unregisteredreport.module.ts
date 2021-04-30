import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnregisteredreportPageRoutingModule } from './unregisteredreport-routing.module';

import { UnregisteredreportPage } from './unregisteredreport.page';
import {NotificationModule} from '../component/notification/notification.module';
import {FiltermodalPageModule} from '../component/filtermodal/filtermodal.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnregisteredreportPageRoutingModule,
    NotificationModule,
    FiltermodalPageModule
  ],
  declarations: [UnregisteredreportPage]
})
export class UnregisteredreportPageModule {}
