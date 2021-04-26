import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvailabilityreportPage } from './availabilityreport.page';

const routes: Routes = [
  {
    path: '',
    component: AvailabilityreportPage
  },
  {
    path: 'filteravailabilityreport',
    loadChildren: () => import('./filteravailabilityreport/filteravailabilityreport.module').then( m => m.FilteravailabilityreportPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailabilityreportPageRoutingModule {}
