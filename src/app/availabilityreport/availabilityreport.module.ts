import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvailabilityreportPageRoutingModule } from './availabilityreport-routing.module';

import { AvailabilityreportPage } from './availabilityreport.page';
import {NotificationModule} from '../component/notification/notification.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvailabilityreportPageRoutingModule,
    NotificationModule
  ],
  declarations: [AvailabilityreportPage]
})
export class AvailabilityreportPageModule {}
