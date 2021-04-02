import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllbookingPage } from './allbooking.page';

const routes: Routes = [
  {
    path: '',
    component: AllbookingPage
  },
  {
    path: 'detailbooking',
    loadChildren: () => import('./detailbooking/detailbooking.module').then( m => m.DetailbookingPageModule)
  },
  {
    path: 'searchmodal',
    loadChildren: () => import('./searchmodal/searchmodal.module').then( m => m.SearchmodalPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllbookingPageRoutingModule {}
