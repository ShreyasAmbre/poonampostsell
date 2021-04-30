import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path: 'home',
  //   loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'booking',
    loadChildren: () => import('./booking/booking.module').then( m => m.BookingPageModule)
  },
  {
    path: 'allbooking',
    loadChildren: () => import('./allbooking/allbooking.module').then( m => m.AllbookingPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'summaryreport',
    loadChildren: () => import('./summaryreport/summaryreport.module').then( m => m.SummaryreportPageModule)
  },
  {
    path: 'availabilityreport',
    loadChildren: () => import('./availabilityreport/availabilityreport.module').then( m => m.AvailabilityreportPageModule)
  },
  {
    path: 'soldunsoldreport',
    loadChildren: () => import('./soldunsoldreport/soldunsoldreport.module').then( m => m.SoldunsoldreportPageModule)
  },
  {
    path: 'outstandingreport',
    loadChildren: () => import('./outstandingreport/outstandingreport.module').then( m => m.OutstandingreportPageModule)
  },
  {
    path: 'otherchargesreport',
    loadChildren: () => import('./otherchargesreport/otherchargesreport.module').then( m => m.OtherchargesreportPageModule)
  },
  {
    path: 'unregisteredreport',
    loadChildren: () => import('./unregisteredreport/unregisteredreport.module').then( m => m.UnregisteredreportPageModule)
  },  {
    path: 'filtermodal',
    loadChildren: () => import('./component/filtermodal/filtermodal.module').then( m => m.FiltermodalPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
