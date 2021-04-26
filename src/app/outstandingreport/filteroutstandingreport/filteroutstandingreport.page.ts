import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatastoreService } from 'src/app/datastore.service';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-filteroutstandingreport',
  templateUrl: './filteroutstandingreport.page.html',
  styleUrls: ['./filteroutstandingreport.page.scss'],
})
export class FilteroutstandingreportPage implements OnInit {
  project_master = []
  wing_apidata = []
  floor_apidata = []
  unit_apidata = []
  outstandingbooking_apidata = []
  broker_apidata = []

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
    let broker_params = {"_w":{"status":1},"_s":"broker_id,brokerName"}



    var wingData = this.http.post('https://software.poonamdevelopers.in/Apis/read/apartments', wing_params);
    var floorData = this.http.post('https://software.poonamdevelopers.in/Apis/read/apartments', floor_data);
    var unitData = this.http.post('https://software.poonamdevelopers.in/Apis/read/apartments', unit_data);
    var brokerData = this.http.post('https://software.poonamdevelopers.in/Apis/read/broker_master', broker_params);


    forkJoin([wingData, floorData, unitData, brokerData]).subscribe(results => {
      this.wing_apidata = results[0]["data"]
      this.floor_apidata = results[1]["data"]
      this.unit_apidata = results[2]["data"]
      this.broker_apidata = results[2]["data"]
      console.log( this.wing_apidata, "WING DATA")
      console.log( this.floor_apidata, "FLOOR API DATA")
      console.log( this.unit_apidata, "UNIT API DATA")
      console.log( this.broker_apidata, "BROKER API DATA")

      this.floor_apidata.sort((a, b) => {
        return a.floor - b.floor;
      });
    });
  }

  getData(){
    var id = this.selected_project

    let booking_params = {project_id: [id], wingName: this.selected_wing, floor: this.selected_floor,
      broker_id: this.selected_broker, unit_type: this.selected_unit}

    var bookingData = this.http.post('https://software.poonamdevelopers.in/Apis/getAllBookings', booking_params);

    forkJoin([bookingData]).subscribe(results => {
      console.log(results)
      this.datastoreservice.outstandingbooking_apidata = results[0]["data"]
      this.datastoreservice.filter_outstandingbooking_apidata = results[0]["data"]

      console.log( this.datastoreservice.outstandingbooking_apidata, "All BOOKING API DATA")
    });

    this.dismiss()
  }


}
