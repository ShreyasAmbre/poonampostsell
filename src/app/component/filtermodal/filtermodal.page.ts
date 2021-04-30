import { Component, Input, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';
import {HttpClient} from '@angular/common/http';
import { forkJoin } from 'rxjs';
import {DatastoreService} from '../../datastore.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-filtermodal',
  templateUrl: './filtermodal.page.html',
  styleUrls: ['./filtermodal.page.scss'],
})
export class FiltermodalPage implements OnInit {
  @Input() filterName: string;

  selected_project = [];
  selected_wing = [];
  selected_floor = [];
  selected_unit = [];
  selected_broker = [];

  project_master = [];
  broker_apidata = [];

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
      // duration: 4000
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
    let broker_params = {"_w":{"status":1},"_s":"broker_id,brokerName"}

    let project_data = this.http.post('https://software.poonamdevelopers.in/Apis/read/project_master', data);
    var brokerData = this.http.post('https://software.poonamdevelopers.in/Apis/read/broker_master', broker_params);

    forkJoin([project_data, brokerData]).subscribe(results => {
      this.project_master = results[0]["data"]
      this.broker_apidata = results[1]["data"]

      console.log(this.project_master, "THIS IS PROJECT MASTER")
    });
  }

  get_wing_floor_unit(){
    this.datastoreservice.filter_projectname = []
    this.project_master.forEach((value, index, array) => {
      // console.log(value)
      // console.log(value["project_id"])
      // console.log(value["project_name"])

      for(let i of this.datastoreservice.filter_selected_project){
        if(i === value["project_id"]){
          this.datastoreservice.filter_projectname.push(value["project_name"])
        }
      }

    });
    // console.log(this.datastoreservice.filter_projectname)


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

  // Master Method
  getFilterData(){
    let title = this.filterName
    if(title == "All Booking Filter"){
      this.datastoreservice.all_booking_status = false
      this.fetchallbookings()
    }
    if(title == "Other Charges Filter"){
      this.datastoreservice.all_booking_status = false
      this.getOtherChargesData()
    }
    if(title == "Outstanding Report Filter"){
      this.datastoreservice.all_booking_status = false
      this.getOutstandingData()
    }
    if(title == "Sold/Unsold Report Filter"){
      this.datastoreservice.all_booking_status = false
      this.getSoldUnsoldData()
    }
    if(title == "Unregister Report Filter"){
      this.datastoreservice.all_booking_status = false
      this.getSoldUnsoldData()
    }
  }

  // Below Method for All Booking List
  fetchallbookings(){
    // this.presentLoading()

    var pid = this.datastoreservice.filter_selected_project
    var wing = this.datastoreservice.filter_selected_wing
    var floor= this.datastoreservice.filter_selected_floor
    var unit_type= this.datastoreservice.filter_selected_unit
    var broker_id= this.datastoreservice.filter_selected_broker

    let all_booking_params = {project_id: pid, wingName: wing,
      floor: floor, unit_type: unit_type, broker_id: broker_id}


    this.http.post("https://software.poonamdevelopers.in/Apis/getAllBookings", all_booking_params)
    .subscribe((response:any)=>{

    this.datastoreservice.all_bookings = response.data
    this.datastoreservice.filter_all_booking = response.data
    // this.loadingController.dismiss()
    this.datastoreservice.all_booking_status = true


    console.log(this.datastoreservice.all_bookings, "ALL BOOKING DATA")
    }, (errors) => {
    console.log("Server Issue", errors.message)
    })
    this.dismiss()

  }


  // Below Method for Other Charges Report
  getOtherChargesData(){
    // this.presentLoading()

    var pid = this.datastoreservice.filter_selected_project
    var wing = this.datastoreservice.filter_selected_wing
    var floor= this.datastoreservice.filter_selected_floor
    var unit_type= this.datastoreservice.filter_selected_unit
    var broker_id= this.datastoreservice.filter_selected_broker

    let demand_params = {project_id: pid, wingName: wing,
      floor: floor, unit_type: unit_type, broker_id: broker_id}

    var demandData = this.http.post('https://software.poonamdevelopers.in/Apis/getAllDemands', demand_params);

    forkJoin([demandData]).subscribe(results => {
      this.datastoreservice.othercharges_apidata = results[0]["data"]
      this.datastoreservice.filter_othercharges_apidata = results[0]["data"]
      // this.loadingController.dismiss()
      this.datastoreservice.all_booking_status = true

      console.log( this.datastoreservice.othercharges_apidata, "All BOOKING API DATA")
    });
    this.dismiss()
  }


  // Below Method for Outstanding Report
  getOutstandingData(){
    // this.presentLoading()

    var pid = this.datastoreservice.filter_selected_project
    var wing = this.datastoreservice.filter_selected_wing
    var floor= this.datastoreservice.filter_selected_floor
    var unit_type= this.datastoreservice.filter_selected_unit
    var broker_id= this.datastoreservice.filter_selected_broker

    let booking_params = {project_id: pid, wingName: wing,
      floor: floor, unit_type: unit_type, broker_id: broker_id}

    var bookingData = this.http.post('https://software.poonamdevelopers.in/Apis/getAllBookings', booking_params);

    forkJoin([bookingData]).subscribe(results => {
      this.datastoreservice.outstandingbooking_apidata = results[0]["data"]
      this.datastoreservice.filter_outstandingbooking_apidata = results[0]["data"]
      // this.loadingController.dismiss()
      this.datastoreservice.all_booking_status = true

      console.log( this.datastoreservice.outstandingbooking_apidata, "All BOOKING API DATA")
    });
    this.dismiss()
  }


  // Beow Method for Sold UnSold Report
  getSoldUnsoldData(){
    // this.presentLoading()
    var pid = this.datastoreservice.filter_selected_project
    var wing = this.datastoreservice.filter_selected_wing
    var floor= this.datastoreservice.filter_selected_floor
    var unit_type= this.datastoreservice.filter_selected_unit
    var broker_id= this.datastoreservice.filter_selected_broker

    let booking_params = {project_id: pid, wingName: wing,
      floor: floor, unit_type: unit_type, broker_id: broker_id}

    var bookingData = this.http.post('https://software.poonamdevelopers.in/Apis/getAllBookings', booking_params);


    forkJoin([bookingData]).subscribe(results => {

      this.datastoreservice.outstandingbooking_apidata = results[0]["data"]
      this.datastoreservice.filter_outstandingbooking_apidata = results[0]["data"]
      // this.loadingController.dismiss()
      this.datastoreservice.all_booking_status = true

      console.log( this.datastoreservice.outstandingbooking_apidata, "All BOOKING API DATA")
    });

    this.dismiss()
  }


  // Below Method for Unregister Report
  getUnregisteredData(){
    // this.presentLoading()

    var pid = this.datastoreservice.filter_selected_project
    var wing = this.datastoreservice.filter_selected_wing
    var floor= this.datastoreservice.filter_selected_floor
    var unit_type= this.datastoreservice.filter_selected_unit
    var broker_id= this.datastoreservice.filter_selected_broker

    let booking_params = {project_id: pid, wingName: wing,
      floor: floor, unit_type: unit_type, broker_id: broker_id}

    var bookingData = this.http.post('https://software.poonamdevelopers.in/Apis/getAllBookings', booking_params);

    forkJoin([bookingData]).subscribe(results => {
      this.datastoreservice.outstandingbooking_apidata = results[0]["data"]
      this.datastoreservice.filter_outstandingbooking_apidata = results[0]["data"]
      // this.loadingController.dismiss()
      this.datastoreservice.all_booking_status = true

      console.log( this.datastoreservice.outstandingbooking_apidata, "All BOOKING API DATA")
    });
    this.dismiss()
  }



}
