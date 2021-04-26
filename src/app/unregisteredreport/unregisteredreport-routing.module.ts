import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnregisteredreportPage } from './unregisteredreport.page';

const routes: Routes = [
  {
    path: '',
    component: UnregisteredreportPage
  },
  {
    path: 'filterunregisteredreport',
    loadChildren: () => import('./filterunregisteredreport/filterunregisteredreport.module').then( m => m.FilterunregisteredreportPageModule)
  },
  {
    path: 'detailunregistered',
    loadChildren: () => import('./detailunregistered/detailunregistered.module').then( m => m.DetailunregisteredPageModule)
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
export class UnregisteredreportPageRoutingModule {}
