import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilteravailabilityreportPage } from './filteravailabilityreport.page';

const routes: Routes = [
  {
    path: '',
    component: FilteravailabilityreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilteravailabilityreportPageRoutingModule {}
