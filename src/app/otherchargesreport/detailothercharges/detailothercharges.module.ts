import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailotherchargesPageRoutingModule } from './detailothercharges-routing.module';

import { DetailotherchargesPage } from './detailothercharges.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailotherchargesPageRoutingModule
  ],
  declarations: [DetailotherchargesPage]
})
export class DetailotherchargesPageModule {}
