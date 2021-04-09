import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatastoreService } from 'src/app/datastore.service';
import { Observable, forkJoin } from 'rxjs';


@Component({
  selector: 'app-filtermodal',
  templateUrl: './filtermodal.page.html',
  styleUrls: ['./filtermodal.page.scss'],
})
export class FiltermodalPage implements OnInit {
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

  constructor(public modalCtrl: ModalController, public http:HttpClient, public datastoreservice: DatastoreService,) { }

  ngOnInit() {
    this.getProjectMaster()
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  getProjectMaster(){
    let data = {
      "_w":{
            status: 1
      }
    }
    this.http.post("https://software.poonamdevelopers.in/Apis/read/project_master", data)
    .subscribe((response:any)=>{

      this.project_master = response.data
      console.log(this.project_master)

    }, (errors) => {
      console.log("Server Issue", errors.message)
    })
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

    var ProjectDashBoardData = this.http.post('https://software.poonamdevelopers.in/DashboardApi/projectDashboard', {dates: dates, filters: filters});
    var projectSummaryData = this.http.post('https://software.poonamdevelopers.in/ReportsApi/summary', summary_params);

    forkJoin([ProjectDashBoardData, projectSummaryData]).subscribe(results => {

      console.log( results[0]["data"], "ProjectDashBoardData")
      console.log( results[1]["data"], "projectSummaryData")

    });
  }

  

}
