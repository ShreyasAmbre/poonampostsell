import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

import { ModalController } from '@ionic/angular';
import {FiltersummaryPage} from './filtersummary/filtersummary.page'


@Component({
  selector: 'app-summaryreport',
  templateUrl: './summaryreport.page.html',
  styleUrls: ['./summaryreport.page.scss'],
})
export class SummaryreportPage implements OnInit {
  // barChart = new Chart(barChartOptions);

   type = 'ColumnChart';

   data = [
    ["Ready", 500, 0, 0, 0],
    ["Pending", 0, 360, 0, 0],
    ["Deployed", 0, 0, 410, 0],
  ];

  columns = ['Status', 'Ready', 'Pending', 'Deployed', 'Other'];

  //  columns = ['count', 'count', {role: 'style', type: 'string'}];
   options = {'bars':   'horizontal',
              'width': 350,
              'height': 400,
              'chartArea': {'width': '75%', 'height': '80%'},
              'legend': {'position': 'bottom' },
              hAxis: {
                title: 'Status'
              },
              vAxis: {
                minValue: 0
              },
              isStacked: true,
              colors: ['#5cb85c', '#f0ad4e', '#d9534f']
            };

  project_master = []
  selected_project = []

  wing_api_data = []
  unit_api_data = []
  stage_master_api_data = []

  constructor(public http:HttpClient, public modalCtrl: ModalController) { }


  async showFilterSummary() {
    const modal = await this.modalCtrl.create({
      component: FiltersummaryPage,
      cssClass: 'my-customfilter-modal'
    });
    return await modal.present();
  }

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
