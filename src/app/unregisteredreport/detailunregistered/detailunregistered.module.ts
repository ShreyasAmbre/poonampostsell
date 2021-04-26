import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailunregisteredPageRoutingModule } from './detailunregistered-routing.module';

import { DetailunregisteredPage } from './detailunregistered.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailunregisteredPageRoutingModule
  ],
  declarations: [DetailunregisteredPage]
})
export class DetailunregisteredPageModule {}
