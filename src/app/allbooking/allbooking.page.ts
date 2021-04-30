import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import { forkJoin } from 'rxjs';
import {DatastoreService} from '.././datastore.service';
import { ModalController} from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { FiltermodalPage} from '../component/filtermodal/filtermodal.page'
import { Router } from '@angular/router';



@Component({
  selector: 'app-allbooking',
  templateUrl: './allbooking.page.html',
  styleUrls: ['./allbooking.page.scss'],
})
export class AllbookingPage implements OnInit {

  booking_count=Array(15);

  search_form_status = true
  booking_list_cards = true
  booking_OGList = true
  booking_FList = false

  project_master = []
  broker_master = []
  project_payment_master = []
  stage_master = []

  wings_api_data = []
  floors_api_data = []
  units_api_data = []

  all_bookings = []
  filter_all_booking = []

  selected_project = [];
  selected_wing = [];
  selected_floor = [];
  selected_unit = [];
  selected_broker = [];

  search_items = []
  searchTerm:string = ""

  beforeFilter = true
  afterFilter = false


  name:string = ""

  page = 0
  maximumpage = 3


  constructor(public http:HttpClient, public alertController: AlertController, public datastoreservice: DatastoreService,
    public modalCtrl: ModalController, public loadingController: LoadingController, public router:Router) { }

    async showModal() {
      const modal = await this.modalCtrl.create({
        component: FiltermodalPage,
        cssClass: 'my-custom-modal-css',
        componentProps: {'filterName': 'All Booking Filter'}
      });
      return await modal.present();
    }

    async presentLoading() {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        // duration: 2000
      });
      await loading.present();

      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed!');
    }



  ngOnInit(all_bookings_data?) {
    this.datastoreservice.all_booking_status = false
    this.getAllApi()

  }
  sendId(id){
    console.log(id, "BOOKING ID")
    this.datastoreservice.set_booking_id(id)
    this.datastoreservice.all_booking_status = false

  }
  getAllApi(){

    // let data = {"_w":{ status: 1}}
    let all_booking_params = {project_id: this.selected_project, wingName: this.selected_wing,
        floor: this.selected_floor, unit_type: this.selected_unit, broker_id: this.selected_broker}

    // let project_data = this.http.post('https://software.poonamdevelopers.in/Apis/read/project_master', data);
    // let broker_data = this.http.post('https://software.poonamdevelopers.in/Apis/read/broker_master', data);
    // let project_payment_data = this.http.post('https://software.poonamdevelopers.in/Apis/read/project_payment_master', data);
    let all_booking_initial_load = this.http.post(`https://software.poonamdevelopers.in/Apis/getAllBookings`, all_booking_params)
    // let stage_data_get = this.http.get('https://software.poonamdevelopers.in/Apis/read/stage_master');

    // this.presentLoading()

    forkJoin([all_booking_initial_load]).subscribe(results => {

      // this.project_master = results[0]["data"]
      // this.broker_master = results[1]["data"]
      // this.project_payment_master = results[2]["data"]
      // this.stage_master = results[3]["data"]


      this.datastoreservice.all_bookings = results[0]["data"]
      this.datastoreservice.filter_all_booking = results[0]["data"]

      // this.loadingController.dismiss()

      // console.log(this.project_master, "THIS IS PROJECT MASTER")
      // console.log(this.broker_master, "THIS IS BROKER MASTER")
      // console.log(this.project_payment_master, "THIS PROJECT PAYMENT MASTER")
      // console.log(this.stage_master, "THIS STAGE MASTER")
      // console.log(this.datastoreservice.all_bookings, "THIS ALL BOOKING")

      this.datastoreservice.all_booking_status = true
    });


  }

  filterItems(searchTerm) {
    console.log("555555555")
    this.booking_FList = true
    this.booking_OGList = false
    if(searchTerm == ""){
      this.booking_OGList = true
      this.booking_FList = false
    }else{
      this.datastoreservice.filter_all_booking = this.datastoreservice.all_bookings.filter(item => {
        return item.first_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.flatNo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.floor.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ;
      });
    }
  }
}

