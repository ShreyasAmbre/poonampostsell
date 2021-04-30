import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherchargesreportPage } from './otherchargesreport.page';

const routes: Routes = [
  {
    path: '',
    component: OtherchargesreportPage
  },
  {
    path: 'detailbooking',
    loadChildren: () => import('../allbooking/detailbooking//detailbooking.module').then( m => m.DetailbookingPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherchargesreportPageRoutingModule {}
