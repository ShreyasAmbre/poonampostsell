import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilteroutstandingreportPage } from './filteroutstandingreport.page';

const routes: Routes = [
  {
    path: '',
    component: FilteroutstandingreportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilteroutstandingreportPageRoutingModule {}
