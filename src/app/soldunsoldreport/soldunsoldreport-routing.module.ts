import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoldunsoldreportPage } from './soldunsoldreport.page';

const routes: Routes = [
  {
    path: '',
    component: SoldunsoldreportPage
  },

  {
    path: 'detailbooking',
    loadChildren: () => import('../allbooking/detailbooking//detailbooking.module').then( m => m.DetailbookingPageModule)
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
export class SoldunsoldreportPageRoutingModule {}
