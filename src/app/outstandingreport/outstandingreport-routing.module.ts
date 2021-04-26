import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OutstandingreportPage } from './outstandingreport.page';

const routes: Routes = [
  {
    path: '',
    component: OutstandingreportPage
  },
  {
    path: 'filteroutstandingreport',
    loadChildren: () => import('./filteroutstandingreport/filteroutstandingreport.module').then( m => m.FilteroutstandingreportPageModule)
  },
  {
    path: 'detailoutstanding',
    loadChildren: () => import('./detailoutstanding/detailoutstanding.module').then( m => m.DetailoutstandingPageModule)
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
export class OutstandingreportPageRoutingModule {}
