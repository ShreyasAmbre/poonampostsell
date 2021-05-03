import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltermodalPageRoutingModule } from './filtermodal-routing.module';

import { FiltermodalPage } from './filtermodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltermodalPageRoutingModule
  ],
  declarations: [FiltermodalPage]
})
export class FiltermodalPageModule {}
