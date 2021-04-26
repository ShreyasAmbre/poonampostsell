import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import {DatastoreService} from '../../datastore.service';
import { AllbookingPage } from '../allbooking.page';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

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
              public alert: AlertController, public loadingController: LoadingController) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-loadingcustom-class',
      message: 'Please wait...',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


  ngOnInit() {
    this.getAllApi()
    this.filterdattaloadstatus = false
  }
  dismiss() {
    this.modalCtrl.dismiss();
  }

  loadingDismiss(){
    this.loadingController.dismiss()
  }

  getAllApi(){
    let data = {"_w":{ status: 1}}

    let project_data = this.http.post('https://software.poonamdevelopers.in/Apis/read/project_master', data);
    forkJoin([project_data]).subscribe(results => {
      this.project_master = results[0]["data"]
      console.log(this.project_master, "THIS IS PROJECT MASTER")
    });
  }

  fetchallbookings(){
    this.presentLoading()

    var pid = this.datastoreservice.filter_selected_project
    var wing = this.selected_wing
    var floor= this.selected_floor
    var unit_type= this.selected_unit
    var broker_id= this.selected_broker

    let all_booking_params = {project_id: pid, wingName: wing,
      floor: floor, unit_type: unit_type, broker_id: broker_id}

    this.http.post("https://software.poonamdevelopers.in/Apis/getAllBookings", all_booking_params)
    .subscribe((response:any)=>{

    this.datastoreservice.all_bookings = response.data
    this.datastoreservice.filter_all_booking = response.data

    console.log(this.datastoreservice.all_bookings, "ALL BOOKING DATA")
    }, (errors) => {
    console.log("Server Issue", errors.message)
    })

    this.dismiss()
  }


  get_wing_floor_unit(){
    let wings_params = {_s: "wingName", _w: {status: 1}, _g: "wingName", _wi: [{name: "project_id", values: this.datastoreservice.filter_selected_project}]}
    let floors_params = {_s: "floor", _w: {status: 1}, _g: "floor", _wi: [{name: "project_id", values: this.datastoreservice.filter_selected_project}]}
    let units_params = {_s: "unit_type", _w: {status: 1}, _g: "unit_type", _wi: [{name: "project_id", values: this.datastoreservice.filter_selected_project}]}

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

      this.floors_api_data.sort((a, b) => {
        return a.floor - b.floor;
      });

    });
  }




}
