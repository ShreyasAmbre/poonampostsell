import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilterotherchargesPageRoutingModule } from './filterothercharges-routing.module';

import { FilterotherchargesPage } from './filterothercharges.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterotherchargesPageRoutingModule
  ],
  declarations: [FilterotherchargesPage]
})
export class FilterotherchargesPageModule {}
