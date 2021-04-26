import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab2PageRoutingModule } from './tab2-routing.module';


import { Tab2Page } from './tab2.page';
import {NotificationModule} from '../../component/notification/notification.module';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab2PageRoutingModule,
    MatExpansionModule,
    MatStepperModule,
    MatButtonModule,
    NotificationModule
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
