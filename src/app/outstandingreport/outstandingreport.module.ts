import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OutstandingreportPageRoutingModule } from './outstandingreport-routing.module';

import { OutstandingreportPage } from './outstandingreport.page';
import {NotificationModule} from '../component/notification/notification.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OutstandingreportPageRoutingModule,
    NotificationModule
  ],
  declarations: [OutstandingreportPage]
})
export class OutstandingreportPageModule {}
