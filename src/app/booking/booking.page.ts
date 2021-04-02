import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AlertController } from '@ionic/angular';

import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-bookingform',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  mobile_no:string = "";
  residential_status:string = "";
  package_type:string = "";
  properties = [];
  selected_property = null;
  paymentmode:string = "";
  payment_schedule:string = "";
  payment_terms:string = "";
  demand_on:string = "";
  cdemand_on:string = "";
  terms:string = "";
  terms_arr= [];
  percentage:string = "";
  totalpercentage:string = "";
  select_broker:string = "";
  broker_type:string = "";
  brokerage_on:string = "";
  brokerage_value:number = null;
  total_brokerage_value:number = null;
  brokerage_percentage:string = "";
  broker_flag:boolean = false;
  brokers = [];
  broker_errors;
  // brokersapi = [];
  selected_broker = null;
  booking_by:string="";
  broker_name:string = "";
  bmob: string = "";
  broker_rera_no: string = "";
  payment_terms_api = [];
  package_deal_api = [];
  deal_name;
  sampledata = ""

  co_applicants = [];

  sampletext:string ="0";


  // Package Headers
  PackageDeal:string = "0"
  BasicFlatCost:string = "0"
  Gst:string = "0"
  Stampduty:string = "0"
  Registration:string = "0"
  RoundOff:string = "0"
  ServiceCharges:string = "0"
  Other_charges:string = "0"
  p_deal = []
  totalConsideration:string = "0"


  constructor(public http: HttpClient, public alertController: AlertController,) { }

  async contactExsitAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Contact Exsit',
      message: "Contact Already Present",
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    this.getApartments()
    this.sampledata = "API IS CALLED FROM NgInit() Method"
    this.getBrokers()
  }
  bookingdetails(data){
    console.log(data)
  }
  addterms(){
    this.terms_arr.push({t:this.terms, p:this.percentage})
    console.log(this.terms_arr)
    this.totalpercentage = this.totalpercentage + this.percentage
    console.log("adsgclashdaupsd")
  }
  addpercentage(){
    this.totalpercentage = this.totalpercentage + this.percentage
  }
  addbrokervalue(){
    console.log(this.total_brokerage_value)
    console.log(this.brokerage_value)
    this.total_brokerage_value = this.total_brokerage_value +  this.brokerage_value
  }
  addbroker(){
    // this.brokers.push({  broker_name: this.broker_name, broker_mob:this.bmob, broker_rera:this.broker_rera_no})
    console.log('This add broker need to code here API will come')
  }
  addcoapplicant(data){
    console.log(typeof(data.value))
    console.log(data.value)
    this.co_applicants.push(data.value)

    console.log("Data from Array ", this.co_applicants)

    data.resetForm()
  }
  delete_co_applicant(id){
    console.log(id)
    this.co_applicants.splice(id, 1);
  }
  edit_co_applicant(id, formData){
    console.log(id)
    console.log(this.co_applicants[id])
    let obj = this.co_applicants[id]
    console.log(obj.cfname)
    console.log(formData)
    formData.setValue(
      {
      caadhar: obj.caadhar,
      caddress:  obj.caddress,
      ccity:  obj.ccity,
      cdob:  obj.cdob,
      cemail:  obj.cemail,
      cfname:  obj.cfname,
      clname:  obj.clname,
      cmname:  obj.cmname,
      cmobile_no:  obj.cmobile_no,
      cpan:  obj.cpan,
      cresidential_status:  obj.cresidential_status,
      cstate:  obj.cstate,
      cwhatsapp_no:  obj.cwhatsapp_no,
      czipcode:  obj.czipcode
    })
    this.co_applicants.splice(id, 1);
  }

  getApartments(){
    let data = {
      "_w":{
            status: 1
      }
    }
    this.http.post("https://software.poonamdevelopers.in/Apis/read/apartments/", data)
    .subscribe((response:any)=>{
      // console.log(response.data)
      this.properties = response.data
      // console.log(this.properties)
    }, (errors) => {
      console.log("Server Issue", errors)
    })
  }
  getBrokers(){
    let data = {
      "_w":{
            status: 1
      }
    }
    this.http.post("https://software.poonamdevelopers.in/Apis/read/broker_master", data)
    .subscribe((response:any)=>{
      console.log(response.data)

      this.brokers = response.data
    }, (errors) => {
      this.broker_errors = errors.message
      console.log("Server Issue", errors.message)
    })
  }

  checkContact(){
    // console.log(event)
    if(this.mobile_no.length == 10){
      console.log("Count is ", this.mobile_no.length)
      this.http.post("https://software.poonamdevelopers.in/Apis/read/bookings_applicants/0", {contact_number:this.mobile_no})
      .subscribe((response:any)=>{
        console.log(response.data)
        // this.properties = response.data
        // console.log(this.properties)
        this.contactExsitAlert()
      }, (errors) => {
        console.log("Server Issue", errors)
      })
    }
  }
  getAllApi(){
    console.log(this.selected_property.project_id)
    let id = this.selected_property.project_id
    let data = {
      "_w":{
            project_id: id,
            status: 1
      }
    }

    let project_deal_api = this.http.post('https://software.poonamdevelopers.in/Apis/read/project_deal_master', data);
    let project_master_api = this.http.post('https://software.poonamdevelopers.in/Apis/read/project_payment_master', data);

    forkJoin([project_deal_api, project_master_api]).subscribe(results => {

      console.log(results[0]["data"][0]["project_id"]);
      // console.log(results[1]["data"]);
      this.package_deal_api = results[0]["data"]
      this.payment_terms_api = results[1]["data"]

    });
  }
  calculate(deal_obj){
    // console.log("Calulate Formula", deal_obj.deal_id)
    let id = deal_obj.deal_id
    if(id === "2"){
      console.log("Print Agreement Value Same As Basic Flat Cost")
      // this.AgreementValue = "3500000"
      this.p_deal[9] = "350000"
      console.log(this.p_deal)
    }else if(id === "8" || id === "9"){
      console.log("Calculate Service Charges & Other Charges")
    }else if(id == "11"){
      console.log("Calculate Total Consideration")
    }
  }
}
