import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherchargesreportPageRoutingModule } from './otherchargesreport-routing.module';

import { OtherchargesreportPage } from './otherchargesreport.page';
import {NotificationModule} from '../component/notification/notification.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherchargesreportPageRoutingModule,
    NotificationModule
  ],
  declarations: [OtherchargesreportPage]
})
export class OtherchargesreportPageModule {}
