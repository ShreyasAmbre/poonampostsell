import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingPageRoutingModule } from './booking-routing.module';
import {NotificationModule} from '../component/notification/notification.module';


import { BookingPage } from './booking.page';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDividerModule} from '@angular/material/divider';
import {IonicSelectableModule} from 'ionic-selectable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingPageRoutingModule,
    MatStepperModule,
    MatDividerModule,
    IonicSelectableModule,
    NotificationModule
  ],
  declarations: [BookingPage]
})
export class BookingPageModule {}
