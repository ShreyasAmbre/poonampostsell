import { Component, OnInit } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import { Chart } from 'angular-highcharts';
import {donutChartOptions, donutChartOptions2, donutChartOptions3, donutChartOptions4} from '../helper/donutChartOptions';

import {NotificationService} from '../services/notification.service';
import { Observable, forkJoin } from 'rxjs';
import { ModalController } from '@ionic/angular';
import {FiltermodalPage} from './filtermodal/filtermodal.page';
import * as moment from 'moment';

const { PushNotifications } = Plugins;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  
  chart = new Chart(donutChartOptions);
  chart2 = new Chart(donutChartOptions2);
  chart3 = new Chart(donutChartOptions3);
  chart4 = new Chart(donutChartOptions4);

  project_master = []
  wing_apidata = []
  floor_apidata = []
  unit_apidata = []

  last_month_end:string = ""
  last_month_start:string = ""
  month_end:string = ""
  month_start:string = ""
  today:string = ""
  week_end:string = ""
  week_start:string = ""
  year_end:string = ""
  year_start:string = ""

  selected_project: string = ""
  selected_wing: string = ""
  selected_floor: string = ""
  selected_unit: string = ""

  sliderConfig = {
    spaceBetween: 1,
    centeredSlides: false,
    slidesPerView: 1.6,
    pager: false
  }

  noti_data;

  constructor(private noti:NotificationService, private http:HttpClient, public modalCtrl: ModalController) { }

  async showFilterModal() {
    const modal = await this.modalCtrl.create({
      component: FiltermodalPage,
      cssClass: 'my-customfilter-modal'
    });
    return await modal.present();
  }

  ngOnInit() {
    donutChartOptions.series[0]["data"][0]["y"] = 4
    donutChartOptions.series[0]["data"][3]["y"] = 1

    // this.showDate()

    console.log(donutChartOptions.series[0]["data"][1]["y"], "DN VALUE Y: IS ")
    console.log(donutChartOptions.series[0]["data"][3]["y"], "DN VALUE Y: IS ")
    // this.getProjectMaster()
    console.log('Initializing HomePage');
    this.getProjectDashboard()
    // // this.setValue()
    // // this.getNotiCount()




    

    // // Request permission to use push notifications
    // // iOS will prompt user and return if they granted permission or not
    // // Android will just grant without prompting
    // PushNotifications.requestPermission().then( result => {
    //   if (result.granted) {
    //     // Register with Apple / Google to receive push via APNS/FCM
    //     PushNotifications.register();
    //   } else {
    //     // Show some error
    //   }
    // });

    // // On success, we should be able to receive notifications
    // PushNotifications.addListener('registration',
    //   (token: PushNotificationToken) => {
    //     alert('Push registration success, token: ' + token.value);
    //   }
    // );

    // // Some issue with our setup and push will not work
    // PushNotifications.addListener('registrationError',
    //   (error: any) => {
    //     alert('Error on registration: ' + JSON.stringify(error));
    //   }
    // );

    // // Show us the notification payload if the app is open on our device
    // PushNotifications.addListener('pushNotificationReceived',
    //   (notification: PushNotification) => {
    //     alert('Push received: ' + JSON.stringify(notification));
    //     this.noti.setNotification(JSON.stringify(notification));
    //   }
    // );

    // // Method called when tapping on a notification
    // PushNotifications.addListener('pushNotificationActionPerformed',
    //   (notification: PushNotificationActionPerformed) => {
    //     alert('Push action performed: ' + JSON.stringify(notification));
    //     // this.noti.setNotification(JSON.stringify(notification));
    //   }
    // );
  }

  // getNoti(){
  //   this.noti_data = this.noti.getNotification()
  // }

  getProjectMaster(){
    let data = {
      "_w":{
            status: 1
      }
    }
    this.http.post("http://172.105.253.44/test/Apis/read/project_master", data)
    
    .subscribe((response:any)=>{
      console.log(response.data)

      this.project_master = response.data
    }, (errors) => {
      console.log("Server Issue", errors.message)
    })
  }

  getProjectDashboard(){
    var id = this.selected_project


    this.today = moment().format('YYYY-MM-DD')
    this.last_month_end = moment(this.today).subtract(1,'months').endOf('month').format('YYYY-MM-DD');
    this.last_month_start = moment(this.today).subtract(1,'months').startOf('month').format('YYYY-MM-DD');
    this.month_end = moment(this.today).endOf('month').format('YYYY-MM-DD');
    this.month_start = moment(this.today).startOf('month').format('YYYY-MM-DD');
    this.week_end = moment(this.today).endOf('week').format('YYYY-MM-DD');

    this.week_start = moment(this.today).startOf('week').format('YYYY-MM-DD');
    
    this.year_end = moment(this.today).endOf('year').format('YYYY-MM-DD');
    this.year_start = moment(this.today).startOf('year').format('YYYY-MM-DD');

    var filter = {project_id: ["1"], wingName: [], floor: [], broker_id: [], unit_type: []}

    console.log(typeof(this.last_month_end), "TYPE OF LAST MONTH")


    var date = {
      last_month_end: this.last_month_end,
      last_month_start: this.last_month_start,
      month_end: this.month_end,
      month_start: this.month_start,
      today: this.today,
      week_end: this.week_end,
      week_start: this.week_start,
      year_end: this.year_end,
      year_start: this.year_start,
    }
    // console.log(this.today, "Cureent Date")
    // console.log(this.last_month_end, "Last Month End")
    // console.log(this.last_month_start, "Last Month Start")
    // console.log(this.month_end, "Month Ent")
    // console.log(this.month_start, "Month Start")
    // console.log(this.week_end, "Week End")
    // console.log(this.week_start, "Week Start")
    // console.log(this.year_end, "Year End")
    // console.log(this.year_start, "Year Start")

    const headers = new HttpHeaders().set('Content-Type', 'application/json')
                                 .set('Accept', 'application/json');

    this.http.post("https://software.poonamdevelopers.in/DashboardApi/projectDashboard", {dates:date, filters:filter}  )
    
    .subscribe((response:any)=>{
      console.log(response.data,"DASHBOARD DATA")

    }, (errors) => {
      console.log("Server Issue", errors.message)
    })
  }

  getSummary(){
    console.log("**********************************************************")
    var id = this.selected_project


    this.today = moment().format('YYYY-MM-DD')
    this.last_month_end = moment(this.today).subtract(1,'months').endOf('month').format('YYYY-MM-DD');
    this.last_month_start = moment(this.today).subtract(1,'months').startOf('month').format('YYYY-MM-DD');
    this.month_end = moment(this.today).endOf('month').format('YYYY-MM-DD');
    this.month_start = moment(this.today).startOf('month').format('YYYY-MM-DD');
    this.week_end = moment(this.today).endOf('week').format('YYYY-MM-DD');

    this.week_start = moment(this.today).startOf('week').format('YYYY-MM-DD');
    
    this.year_end = moment(this.today).endOf('year').format('YYYY-MM-DD');
    this.year_start = moment(this.today).startOf('year').format('YYYY-MM-DD');
    console.log(this.today, "Cureent Date")
    console.log(this.last_month_end, "Last Month End")
    console.log(this.last_month_start, "Last Month Start")
    console.log(this.month_end, "Month Ent")
    console.log(this.month_start, "Month Start")
    console.log(this.week_end, "Week End")
    console.log(this.week_start, "Week Start")
    console.log(this.year_end, "Year End")
    console.log(this.year_start, "Year Start")



    var filters = {project_id: [id], wingName: [], floor: [], broker_id: [], unit_type: []}
    var dates = {
      last_month_end: this.last_month_end,
      last_month_start: this.last_month_start,
      month_end: this.month_end,
      month_start: this.month_start,
      today: this.today,
      week_end: this.week_end,
      week_start: this.week_start,
      year_end: this.year_end,
      year_start: this.year_start,
    }
    let data = {
      dates : dates,
      filters: filters
    }
    var summary_params = {project_id: [id], wingName: [], floor: [], broker_id: [], unit_type: []}

    var ProjectDashBoardData = this.http.post('http://172.105.253.44/test/DashboardApi/projectDashboard', {dates, filters});
    var projectSummaryData = this.http.post('http://172.105.253.44/test/ReportsApi/summary', summary_params);

    forkJoin([ProjectDashBoardData, projectSummaryData]).subscribe(results => {

      console.log( results[0]["data"], "ProjectDashBoardData")
      console.log( results[1]["data"], "projectSummaryData")

    });
  }

  getApartment(id){

    let wing_params = { _s: "wingName", _w: {status: 1}, _g: "wingName", _wi: [{name: "project_id", values: [id]}] }
    let floor_data = {_s: "floor", _w: {status: 1}, _g: "floor", _wi: [{name: "project_id", values: [id]}] }
    let unit_data = {_s: "unit_type", _w: {status: 1}, _g: "unit_type", _wi: [{name: "project_id", values: [id]}]}


    var wingData = this.http.post('https://software.poonamdevelopers.in/Apis/read/apartments', wing_params);
    var floorData = this.http.post('https://software.poonamdevelopers.in/Apis/read/apartments', floor_data);
    var unitData = this.http.post('https://software.poonamdevelopers.in/Apis/read/apartments', unit_data);

    forkJoin([wingData, floorData, unitData]).subscribe(results => {
      this.wing_apidata = results[0]["data"]
      this.floor_apidata = results[1]["data"]
      this.unit_apidata = results[2]["data"]
      console.log( this.wing_apidata, "WING DATA")
      console.log( this.floor_apidata, "FLOOR API DATA")
      console.log( this.unit_apidata, "UNIT API DATA")
    });
  }

  showDate(){
    var today = moment().format('YYYY-MM-DD')
    var last_month_end = moment(today).subtract(1,'months').endOf('month').format('YYYY-MM-DD');
    var last_month_start = moment(today).subtract(1,'months').startOf('month').format('YYYY-MM-DD');
    var month_end = moment(today).endOf('month').format('YYYY-MM-DD');
    var month_start = moment(today).startOf('month').format('YYYY-MM-DD');
    var week_end = moment(today).endOf('week').format('YYYY-MM-DD');
    var week_start = moment(today).startOf('week').format('YYYY-MM-DD');
    var year_end = moment(today).endOf('year').format('YYYY-MM-DD');
    var year_start = moment(today).startOf('year').format('YYYY-MM-DD');
    console.log(today, "Cureent Date")
    console.log(last_month_end, "Last Month End")
    console.log(last_month_start, "Last Month Start")
    console.log(month_end, "Month Ent")
    console.log(month_start, "Month Start")
    console.log(week_end, "Week End")
    console.log(week_start, "Week Start")
    console.log(year_end, "Year End")
    console.log(year_start, "Year Start")
  }

}
