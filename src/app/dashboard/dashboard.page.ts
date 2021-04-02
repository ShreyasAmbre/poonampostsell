import { Component, OnInit } from '@angular/core';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
} from '@capacitor/core';
import {HttpClient} from '@angular/common/http';

import { Chart } from 'angular-highcharts';
import {donutChartOptions, donutChartOptions2, donutChartOptions3, donutChartOptions4} from '../helper/donutChartOptions';
import {NotificationService} from '../services/notification.service';
import { Observable, forkJoin } from 'rxjs';

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

  constructor(private noti:NotificationService, private http:HttpClient) { }

  ngOnInit() {
    // this.getProjectMaster()
    console.log('Initializing HomePage');
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
    this.http.post("https://software.poonamdevelopers.in/Apis/read/project_master", data)
    .subscribe((response:any)=>{
      console.log(response.data)

      this.project_master = response.data
    }, (errors) => {
      console.log("Server Issue", errors.message)
    })
  }

  getSummary(){
    var id = this.selected_project
    console.log(id, "ID OF SELECTED PROJECT")
    let FullDate = new Date()

    let date = new Date().getDate()
    let month = new Date().getMonth() + 1
    let year = new Date().getFullYear()
    this.today = String(year + "-" + month + "-" + date)
    console.log(this.today, "TODAY OG")


    // Get End Date Of Current Month
    let monthEndDate = new Date(FullDate.getFullYear(), FullDate.getMonth() + 1, 0).getDate()
    let monthEndMonth = new Date(FullDate.getFullYear(), FullDate.getMonth() + 1, 0).getMonth() + 1
    let monthEndYear = new Date(FullDate.getFullYear(), FullDate.getMonth() + 1, 0).getFullYear()
    // console.log(monthEndDate, monthEndMonth, monthEndYear, "END MONTH DATE")
    this.month_end = String(monthEndYear + "-" + monthEndMonth + "-" + monthEndDate)
    console.log(this.month_end, "MONTH END OG")

    // Get START DATE OF Current MONTH
    let monthStartDate = new Date(FullDate.getFullYear(), FullDate.getMonth(), 1).getDate()
    let monthStartMonth = new Date(FullDate.getFullYear(), FullDate.getMonth(), 1).getMonth() + 1
    let monthStartYear = new Date(FullDate.getFullYear(), FullDate.getMonth(), 1).getFullYear()
    // console.log(monthStartDate, monthStartMonth, monthStartYear, "START MONTH DATE")
    this.month_start = String(monthStartYear + "-" + monthStartMonth + "-" + monthStartDate)
    console.log(this.month_start, "MONTH START OG")

    // Get END DATE OF LAST MONTH
    let lastMonthEndDate = new Date(FullDate.getFullYear(), FullDate.getMonth(), 0).getDate()
    let lastMonthEndMonth = new Date(FullDate.getFullYear(), FullDate.getMonth(), 0).getMonth() + 1
    let lastMonthEndYear = new Date(FullDate.getFullYear(), FullDate.getMonth(), 0).getFullYear()
    // console.log(lastMonthEndDate, lastMonthEndMonth, lastMonthEndYear, "END Of LAST MONTH DATE")
    this.last_month_end = String(lastMonthEndYear + "-" + lastMonthEndMonth + "-" + lastMonthEndDate)
    console.log(this.last_month_end, "END Of LAST MONTH DATE OG")


    // Get START DATE OF LAST MONTH
    let lastMonthStartDate = new Date(FullDate.getFullYear(), FullDate.getMonth(), 1).getDate()
    let lastMonthStartMonth = new Date(FullDate.getFullYear(), FullDate.getMonth(), 1).getMonth()
    let lastMonthStartYear = new Date(FullDate.getFullYear(), FullDate.getMonth(), 1).getFullYear()
    // console.log(lastMonthStartDate, lastMonthStartMonth, lastMonthStartYear, "START Of LAST MONTH DATE")
    this.last_month_start = String(lastMonthStartYear + "-" + lastMonthStartMonth + "-" + lastMonthStartDate)
    console.log(this.last_month_start, "LAST MONTH START OG");


    // GET END WEEK DATE
    var lastday = FullDate.getDate() - (FullDate.getDay() - 1) + 6;
    let weekEndDate = new Date(FullDate.setDate(lastday)).getDate() - 1;
    let weekEndMonth = new Date(FullDate.setDate(lastday)).getMonth() + 1;
    let weekEndYear = new Date(FullDate.setDate(lastday)).getFullYear();
    // console.log(weekEndDate, weekEndMonth, weekEndYear, "WEEK END DATE");
    this.week_end = String(weekEndYear + "-" + weekEndMonth + "-" + weekEndDate)
    console.log(this.week_end, "WEEK END OG");

    // START WEEK DATE
    var diff = FullDate.getDate() - FullDate.getDay() + (FullDate.getDay() === 0 ? -6 : 1);
    let weekStartDate = new Date(FullDate.setDate(diff)).getDate() - 1;
    let weekStartMonth = new Date(FullDate.setDate(diff)).getMonth();
    let weekStartYear = new Date(FullDate.setDate(diff)).getFullYear();
    this.week_start = String(weekStartYear + "-" + weekStartMonth + "-" + weekStartDate)
    console.log(this.week_start, "WEEK START OG");

    // START DATE OF YEAR
    let startDateYear = new Date(FullDate.getFullYear(), 0).getDate()
    let startMonthYear = new Date(FullDate.getFullYear(), 0).getMonth() + 1
    let startYearYear = new Date(FullDate.getFullYear(), 0).getFullYear()
    // console.log(startDateYear, startMonthYear, startYearYear, "START DATE OF YEAR")
    this.year_start = String(startYearYear + "-" + startMonthYear + "-" + startDateYear)
    console.log(this.year_start, "YEAR START OG");

    // LAST DATE OF YEAR
    let lastDateYear = new Date(new Date().getFullYear(), 11, 31).getDate()
    let lastMonthYear = new Date(new Date().getFullYear(), 11, 31).getMonth() + 1
    let lastYear = new Date(new Date().getFullYear(), 11, 31).getFullYear()
    // console.log(lastDateYear, lastMonthYear, lastYear)
    this.year_end = String(lastYear + "-" + lastMonthYear + "-" + lastDateYear)
    console.log(this.year_end, "YEAR END OG");



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

    var ProjectDashBoardData = this.http.post('https://software.poonamdevelopers.in/DashboardApi/projectDashboard', {dates, filters});
    var projectSummaryData = this.http.post('https://software.poonamdevelopers.in/ReportsApi/summary', summary_params);

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

}
