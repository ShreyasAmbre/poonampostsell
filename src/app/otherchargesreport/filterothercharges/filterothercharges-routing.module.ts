import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterotherchargesPage } from './filterothercharges.page';

const routes: Routes = [
  {
    path: '',
    component: FilterotherchargesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterotherchargesPageRoutingModule {}
