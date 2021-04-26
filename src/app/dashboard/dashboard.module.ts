import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import {NotificationModule} from '../component/notification/notification.module';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import { GoogleChartsModule } from 'angular-google-charts';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    NotificationModule,
    MatExpansionModule,
    MatStepperModule,
    MatButtonModule,
    GoogleChartsModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
