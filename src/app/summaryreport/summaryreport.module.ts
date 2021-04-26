import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SummaryreportPageRoutingModule } from './summaryreport-routing.module';

import { SummaryreportPage } from './summaryreport.page';
import {NotificationModule} from '../component/notification/notification.module';

import {ChartModule} from 'angular-highcharts';
import { GoogleChartsModule } from 'angular-google-charts';

import { MatExpansionModule } from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SummaryreportPageRoutingModule,
    NotificationModule,
    MatExpansionModule,
    MatStepperModule,
    MatButtonModule,
    ChartModule,
    GoogleChartsModule,
  ],
  declarations: [SummaryreportPage]
})
export class SummaryreportPageModule {}
