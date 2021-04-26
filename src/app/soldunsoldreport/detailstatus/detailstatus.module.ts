import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailstatusPageRoutingModule } from './detailstatus-routing.module';

import { DetailstatusPage } from './detailstatus.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailstatusPageRoutingModule
  ],
  declarations: [DetailstatusPage]
})
export class DetailstatusPageModule {}
