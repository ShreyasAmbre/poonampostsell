import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatastoreService } from 'src/app/datastore.service';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-filteravailabilityreport',
  templateUrl: './filteravailabilityreport.page.html',
  styleUrls: ['./filteravailabilityreport.page.scss'],
})
export class FilteravailabilityreportPage implements OnInit {

  project_master = []
  wing_apidata = []
  floor_apidata = []
  unit_apidata = []

  selected_project = []
  selected_wing = []
  selected_floor = []
  selected_unit = []
  selected_broker = []

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

      this.floor_apidata.sort((a, b) => {
        return a.floor - b.floor;
      });
    });
  }

  getData(){
    var id = this.selected_project

    let availablityParams = {project_id: [id], wingName: this.selected_wing, floor: this.selected_floor,
        unit_type: this.selected_unit}


    var availabilityData = this.http.post('https://software.poonamdevelopers.in/ReportsApi/availability', availablityParams);

    var floors_data = {
      "1": [], "2": [], "3": [], "4":[], "5":[],  "6": [], "7": [], "8": [], "9":[], "10":[], "11": [], "12": [], "13": [], "14":[], "15":[],
      "16": [], "17": [], "18": [], "19":[], "20":[],  "21": [], "22": [], "null": [],
    }

    forkJoin([availabilityData]).subscribe(results => {
      var apiData = results[0]["data"]
      // console.log(apiData)



      // var val = "1"
      // if(val in floors_data){
      //   console.log("present")
      // }

      apiData.forEach(myFunction);

      function myFunction(item, index) {
        var index_place = item.floor
        // console.log(index_place)

        if(index_place in floors_data){
          floors_data[index_place].push(item);
        }
      }

    });

    this.datastoreservice.availability_floorData = floors_data
    console.log(this.datastoreservice.availability_floorData)

    this.datastoreservice.availability_dataStatus = true

    this.dismiss()
  }

}
