import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import {DatastoreService} from '../../datastore.service';
import { AllbookingPage } from '../allbooking.page';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-searchmodal',
  templateUrl: './searchmodal.page.html',
  styleUrls: ['./searchmodal.page.scss'],
})
export class SearchmodalPage implements OnInit {
  selected_project = [];
  selected_wing = [];
  selected_floor = [];
  selected_unit = [];
  selected_broker = [];

  project_master = [];

  wings_api_data = []
  floors_api_data = []
  units_api_data = []

  all_bookings= []
  filter_all_booking = []

  filterdattaloadstatus = false
  constructor(public modalCtrl: ModalController, public http:HttpClient, public datastoreservice: DatastoreService,
              public alert: AlertController) { }

  ngOnInit() {
    this.getAllApi()
    this.filterdattaloadstatus = false
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }
  getAllApi(){
    let data = {"_w":{ status: 1}}
    let all_booking_params = {project_id: this.selected_project, wingName: this.selected_wing,
      floor: this.selected_floor, unit_type: this.selected_unit, broker_id: this.selected_broker}

    let project_data = this.http.post('https://software.poonamdevelopers.in/Apis/read/project_master', data);
    forkJoin([project_data]).subscribe(results => {
      this.project_master = results[0]["data"]
      console.log(this.project_master, "THIS IS PROJECT MASTER")
    });
  }
  fetchallbookings(){
    var pid = this.selected_project
    var wing = this.selected_wing
    var floor= this.selected_floor
    var unit_type= this.selected_unit
    var broker_id= this.selected_broker

    let all_booking_params = {project_id: pid, wingName: wing,
      floor: floor, unit_type: unit_type, broker_id: broker_id}

    this.http.post("https://software.poonamdevelopers.in/Apis/getAllBookings", all_booking_params)
    .subscribe((response:any)=>{

    this.all_bookings = response.data
    this.filter_all_booking = response.data

    this.send_all_bookings_data_to_bookingpage(this.all_bookings)
    console.log(this.all_bookings, "ALL BOOKING DATA")
    }, (errors) => {
    console.log("Server Issue", errors.message)
    })

    // var data = this.datastoreservice.setbookingsdata(pid, wing, floor, unit_type, broker_id)
    // console.log(data, "DAAAAATAAA")
    // console.log("**************************************************")
    // let myCompOneObj = new AllbookingPage(this.http,this.alert, this.datastoreservice, this.modalCtrl);
    // this.filterdattaloadstatus = true
    // myCompOneObj.ngOnInit(this.all_bookings)

    this.dismiss()
  }

  send_all_bookings_data_to_bookingpage(bookings_data){
    console.log("**************************************************")
    let myCompOneObj = new AllbookingPage(this.http,this.alert, this.datastoreservice, this.modalCtrl);
    myCompOneObj.fetchallbookings(bookings_data)

  }


  get_wing_floor_unit(id){

    let wings_params = {_s: "wingName", _w: {status: 1}, _g: "wingName", _wi: [{name: "project_id", values: [id]}]}
    let floors_params = {_s: "floor", _w: {status: 1}, _g: "floor", _wi: [{name: "project_id", values: [id]}]}
    let units_params = {_s: "unit_type", _w: {status: 1}, _g: "unit_type", _wi: [{name: "project_id", values: ["1"]}]}

    let wings_data = this.http.post('https://software.poonamdevelopers.in/Apis/read/apartments', wings_params);
    let floors_data = this.http.post('https://software.poonamdevelopers.in/Apis/read/apartments', floors_params);
    let units_payment_data = this.http.post('https://software.poonamdevelopers.in/Apis/read/apartments', units_params);

    forkJoin([wings_data, floors_data, units_payment_data]).subscribe(results => {

      this.wings_api_data = results[0]["data"]
      this.floors_api_data = results[1]["data"]
      this.units_api_data = results[2]["data"]

      console.log(this.wings_api_data, "THIS IS  WING DATA")
      console.log(this.floors_api_data, "THIS IS FLOOR DATA")
      console.log(this.units_api_data, "THIS UNIT DATA")
    });
  }

}
