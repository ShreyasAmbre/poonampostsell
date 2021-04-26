import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherchargesreportPage } from './otherchargesreport.page';

const routes: Routes = [
  {
    path: '',
    component: OtherchargesreportPage
  },
  {
    path: 'filterothercharges',
    loadChildren: () => import('./filterothercharges/filterothercharges.module').then( m => m.FilterotherchargesPageModule)
  },
  {
    path: 'detailothercharges',
    loadChildren: () => import('./detailothercharges/detailothercharges.module').then( m => m.DetailotherchargesPageModule)
  },
  // {
  //   path: 'tab1',
  //   loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule)
  // },
  // {
  //   path: 'tab2',
  //   loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  // },
  // {
  //   path: 'tab3',
  //   loadChildren: () => import('./tab3/tab3.module').then( m => m.Tab3PageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherchargesreportPageRoutingModule {}
