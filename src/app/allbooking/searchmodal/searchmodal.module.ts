import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchmodalPageRoutingModule } from './searchmodal-routing.module';

import { SearchmodalPage } from './searchmodal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchmodalPageRoutingModule
  ],
  declarations: [SearchmodalPage]
})
export class SearchmodalPageModule {}
