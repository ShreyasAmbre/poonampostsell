import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatastoreService } from 'src/app/datastore.service';
import { Observable, forkJoin } from 'rxjs';
import * as moment from 'moment';



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
    this.http.post("http://172.105.253.44/test/Apis/read/project_master", data)
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
    // let data = {
    //   dates : dates,
    //   filters: filters
    // }
    var summary_params = {project_id: [id], wingName: [], floor: [], broker_id: [], unit_type: []}

    var ProjectDashBoardData = this.http.post('http://172.105.253.44/test/DashboardApi/projectDashboard', 
    {dates: {
      last_month_end: this.last_month_end,
      last_month_start: this.last_month_start,
      month_end: this.month_end,
      month_start: this.month_start,
      today: this.today,
      week_end: this.week_end,
      week_start: this.week_start,
      year_end: this.year_end,
      year_start: this.year_start,
    }, filters: {project_id: [id], wingName: [], floor: [], broker_id: [], unit_type: []}});


    var projectSummaryData = this.http.post('http://172.105.253.44/test/ReportsApi/summary', summary_params);

    forkJoin([ProjectDashBoardData, projectSummaryData]).subscribe(results => {

      console.log( results[0]["data"], "ProjectDashBoardData")
      console.log( results[1]["data"], "projectSummaryData")

    });
  }

  

}
