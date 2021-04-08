import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavmenuComponent } from './navmenu.component';

const routes: Routes = [
  {
    path: '',
    component: NavmenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NavmenuRoutingModule {}
