import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllbookingPageRoutingModule } from './allbooking-routing.module';

import { AllbookingPage } from './allbooking.page';

import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {SearchmodalPageModule} from './searchmodal/searchmodal.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllbookingPageRoutingModule,
    MatBottomSheetModule,
    SearchmodalPageModule
  ],
  declarations: [AllbookingPage]
})
export class AllbookingPageModule {}
