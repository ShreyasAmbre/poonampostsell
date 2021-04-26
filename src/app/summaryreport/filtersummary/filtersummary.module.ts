import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltersummaryPageRoutingModule } from './filtersummary-routing.module';

import { FiltersummaryPage } from './filtersummary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltersummaryPageRoutingModule
  ],
  declarations: [FiltersummaryPage]
})
export class FiltersummaryPageModule {}
