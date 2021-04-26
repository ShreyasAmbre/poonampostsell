import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FilteroutstandingreportPageRoutingModule } from './filteroutstandingreport-routing.module';

import { FilteroutstandingreportPage } from './filteroutstandingreport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilteroutstandingreportPageRoutingModule
  ],
  declarations: [FilteroutstandingreportPage]
})
export class FilteroutstandingreportPageModule {}
