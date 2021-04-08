import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {NavmenuRoutingModule} from './navmenu-routing.module';

import {NavmenuComponent} from './navmenu.component'



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NavmenuRoutingModule

  ],
  declarations: [NavmenuComponent],
  exports: [NavmenuComponent]
})
export class NavmenuModule {}
