import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilteravailabilityreportPageRoutingModule } from './filteravailabilityreport-routing.module';

import { FilteravailabilityreportPage } from './filteravailabilityreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilteravailabilityreportPageRoutingModule
  ],
  declarations: [FilteravailabilityreportPage]
})
export class FilteravailabilityreportPageModule {}
