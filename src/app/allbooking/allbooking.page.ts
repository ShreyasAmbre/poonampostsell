import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { IonInfiniteScroll } from '@ionic/angular';
import { ViewChild } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import {DatastoreService} from '.././datastore.service';
import { ModalController} from '@ionic/angular';
import { SearchmodalPage } from './searchmodal/searchmodal.page';


@Component({
  selector: 'app-allbooking',
  templateUrl: './allbooking.page.html',
  styleUrls: ['./allbooking.page.scss'],
})
export class AllbookingPage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
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


  constructor(public http:HttpClient, public alertController: AlertController, public datastoreservice: DatastoreService,
    public modalCtrl: ModalController) { }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Delete Booking!',
      message: 'Are You Sure ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  async notesAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Last Follow',
      subHeader: 'Note',
      message: 'This is an Notes Of Last Follow',
      buttons: ['OK']
    });

    await alert.present();
  }

  async quickEditAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Quick Edit',
      inputs: [
        {
          name: 'Customer Name',
          type: 'text',
          placeholder: 'Edit Customer Name'
        },
        {
          name: 'Customer Number',
          type: 'text',
          placeholder: 'Edit Customer Number'
        },
        {
          name: 'Broker Name',
          type: 'text',
          placeholder: 'Edit Broker Name'
        },

        // input date with min & max
        {
          name: 'Next FollowUp',
          type: 'date',
          min: '2017-03-01',
          max: '2018-01-12'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel', );
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            console.log('Confirm Ok', JSON.stringify(data));
          }
        }
      ]
    });

    await alert.present();
  }

  async showModal() {
    const modal = await this.modalCtrl.create({
      component: SearchmodalPage,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }

  ngOnInit(all_bookings_data?) {
      this.getAllApi()
  }
  sendId(id){
    console.log(id, "BOOKING ID")
    this.datastoreservice.set_booking_id(id)
  }
  getAllApi(){

    let data = {"_w":{ status: 1}}
    let all_booking_params = {project_id: this.selected_project, wingName: this.selected_wing,
      floor: this.selected_floor, unit_type: this.selected_unit, broker_id: this.selected_broker}

    let project_data = this.http.post('https://software.poonamdevelopers.in/Apis/read/project_master', data);
    let broker_data = this.http.post('https://software.poonamdevelopers.in/Apis/read/broker_master', data);
    let project_payment_data = this.http.post('https://software.poonamdevelopers.in/Apis/read/project_payment_master', data);

    let stage_data_get = this.http.get('https://software.poonamdevelopers.in/Apis/read/stage_master');

    let all_booking_initial_load = this.http.post("https://software.poonamdevelopers.in/Apis/getAllBookings", all_booking_params)



    forkJoin([project_data, broker_data, project_payment_data, stage_data_get, all_booking_initial_load]).subscribe(results => {

      this.project_master = results[0]["data"]
      this.broker_master = results[1]["data"]
      this.project_payment_master = results[2]["data"]
      this.stage_master = results[3]["data"]
      this.all_bookings = results[4]["data"]
      this.filter_all_booking = results[4]["data"]

      console.log(this.project_master, "THIS IS PROJECT MASTER")
      console.log(this.broker_master, "THIS IS BROKER MASTER")
      console.log(this.project_payment_master, "THIS PROJECT PAYMENT MASTER")
      console.log(this.stage_master, "THIS STAGE MASTER")
      console.log(this.all_bookings, "THIS ALL BOOKING")
    });
  }

  fetchallbookings(data){
    this.beforeFilter = false
    this.afterFilter = true
    this.all_bookings = data
    console.log(this.all_bookings,"***************")

    // this.all_bookings = this.datastoreservice.getall_bookings()
    // this.filter_all_booking = this.all_bookings
    // console.log(this.all_bookings, "FROM ALL BOOKING FETCH METHOD")

  }

  filterItems(searchTerm) {
    console.log("555555555")
    this.booking_FList = true
    this.booking_OGList = false
    if(searchTerm == ""){
      this.booking_OGList = true
      this.booking_FList = false
    }else{
      this.filter_all_booking = this.all_bookings.filter(item => {
        return item.first_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.flatNo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
    }
  }

  showName(){
    console.log(this.name)
  }
}

