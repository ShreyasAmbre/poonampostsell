import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltersoldunsoldPage } from './filtersoldunsold.page';

const routes: Routes = [
  {
    path: '',
    component: FiltersoldunsoldPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltersoldunsoldPageRoutingModule {}
