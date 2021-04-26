import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterunregisteredreportPage } from './filterunregisteredreport.page';

const routes: Routes = [
  {
    path: '',
    component: FilterunregisteredreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterunregisteredreportPageRoutingModule {}
