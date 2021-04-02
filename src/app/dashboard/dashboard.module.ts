import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import {ChartModule} from 'angular-highcharts';
import {NotificationModule} from '../component/notification/notification.module';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    ChartModule,
    NotificationModule,
    MatExpansionModule,
    MatStepperModule,
    MatButtonModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
