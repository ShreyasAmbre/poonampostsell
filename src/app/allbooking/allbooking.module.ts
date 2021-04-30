import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllbookingPageRoutingModule } from './allbooking-routing.module';
import {NotificationModule} from '../component/notification/notification.module';

import { AllbookingPage } from './allbooking.page';

import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

import {FiltermodalPageModule} from '../component/filtermodal/filtermodal.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllbookingPageRoutingModule,
    MatBottomSheetModule,
    NotificationModule,
    FiltermodalPageModule
  ],
  declarations: [AllbookingPage]
})
export class AllbookingPageModule {}
