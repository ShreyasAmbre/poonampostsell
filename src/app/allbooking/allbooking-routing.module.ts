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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllbookingPageRoutingModule {}
