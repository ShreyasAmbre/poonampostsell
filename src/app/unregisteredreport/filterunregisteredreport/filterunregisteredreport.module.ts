import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterunregisteredreportPageRoutingModule } from './filterunregisteredreport-routing.module';

import { FilterunregisteredreportPage } from './filterunregisteredreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterunregisteredreportPageRoutingModule
  ],
  declarations: [FilterunregisteredreportPage]
})
export class FilterunregisteredreportPageModule {}
