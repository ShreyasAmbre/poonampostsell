import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltermodalPage } from './filtermodal.page';

const routes: Routes = [
  {
    path: '',
    component: FiltermodalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltermodalPageRoutingModule {}
