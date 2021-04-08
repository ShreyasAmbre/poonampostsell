import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

import { Chart } from 'angular-highcharts';
import {barChartOptions} from '../helper/barChartOpotions';


@Component({
  selector: 'app-summaryreport',
  templateUrl: './summaryreport.page.html',
  styleUrls: ['./summaryreport.page.scss'],
})
export class SummaryreportPage implements OnInit {
  barChart = new Chart(barChartOptions);

  project_master = []
  selected_project = []

  wing_api_data = []
  unit_api_data = []
  stage_master_api_data = []

  constructor(public http:HttpClient) { }

  ngOnInit() {
    this.getAllApi()
  }


  getAllApi(){
    let data = {"_w":{ status: 1}}

    let project_data = this.http.post('https://software.poonamdevelopers.in/Apis/read/project_master', data);

    forkJoin([project_data]).subscribe(results => {
      this.project_master = results[0]["data"]
      console.log(this.project_master, "THIS IS PROJECT MASTER")
    });
  }

  getSummary(){
    let data = {"project_id":{"name":this.selected_project["project_name"],"id":this.selected_project["project_id"]},"wingName":[],"floor":[],"broker_id":[],"unit_type":[]}

    let wing_data = this.http.post('https://software.poonamdevelopers.in/ReportsApi/summary/wing', data);
    let unit_data = this.http.post('https://software.poonamdevelopers.in/ReportsApi/summary/unit', data);
    // let stage_data = this.http.post('https://software.poonamdevelopers.in/ReportsApi/summary/stage_master', data);

    forkJoin([wing_data, unit_data]).subscribe(results => {
      this.wing_api_data = results[0]["data"]
      this.unit_api_data = results[1]["data"]
      // this.stage_master_api_data = results[2]["data"]

      console.log(this.wing_api_data, "THIS IS WING DATA ")
      console.log(this.unit_api_data, "THIS IS UNiT DATA")
      // console.log(this.stage_master_api_data, "THIS IS STAGE MASTER DATA ")
    });

    console.log(this.selected_project)
  }
}
