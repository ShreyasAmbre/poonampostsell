import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailbookingPageRoutingModule } from './detailbooking-routing.module';

import { DetailbookingPage } from './detailbooking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailbookingPageRoutingModule
  ],
  declarations: [DetailbookingPage]
})
export class DetailbookingPageModule {}
