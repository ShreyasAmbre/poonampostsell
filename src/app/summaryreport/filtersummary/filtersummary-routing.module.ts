import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltersummaryPage } from './filtersummary.page';

const routes: Routes = [
  {
    path: '',
    component: FiltersummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltersummaryPageRoutingModule {}
