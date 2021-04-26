import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailstatusPage } from './detailstatus.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: DetailstatusPage
  // },

  {
    path: 'detailstatus',
    component: DetailstatusPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule)
      },

    ]
  },
  {
    path: '',
    redirectTo: 'detailstatus/tab1',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailstatusPageRoutingModule {}