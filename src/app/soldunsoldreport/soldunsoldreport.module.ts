import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoldunsoldreportPageRoutingModule } from './soldunsoldreport-routing.module';

import { SoldunsoldreportPage } from './soldunsoldreport.page';
import {NotificationModule} from '../component/notification/notification.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoldunsoldreportPageRoutingModule,
    NotificationModule
  ],
  declarations: [SoldunsoldreportPage]
})
export class SoldunsoldreportPageModule {}
