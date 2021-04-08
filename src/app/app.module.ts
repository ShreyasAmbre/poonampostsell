import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import {NgxWebstorageModule} from 'ngx-webstorage';
import {NavmenuModule} from './component/navmenu/navmenu.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ChartModule} from 'angular-highcharts';
import { GoogleChartsModule } from 'angular-google-charts';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [GoogleChartsModule, ChartModule, BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule,
            NgxWebstorageModule.forRoot(), NavmenuModule, BrowserAnimationsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
