import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltersoldunsoldPageRoutingModule } from './filtersoldunsold-routing.module';

import { FiltersoldunsoldPage } from './filtersoldunsold.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltersoldunsoldPageRoutingModule
  ],
  declarations: [FiltersoldunsoldPage]
})
export class FiltersoldunsoldPageModule {}
