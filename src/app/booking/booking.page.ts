import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AlertController } from '@ionic/angular';

import { Observable, forkJoin } from 'rxjs';
import {Globals} from './globals'

@Component({
  selector: 'app-bookingform',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  address:string = ""
  city: string = ""
  state:string = ""
  zipcode: number = null;
  caddress:string = ""
  ccity: string = ""
  cstate:string = ""
  czipcode: number = null;
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
  total_brokerage_value:number = null;
  broker_flag:boolean = false;
  brokers = [];
  broker_errors;
  // brokersapi = [];
  selected_broker = null;
  booking_by:string="";
  broker_name:string = "";
  bmob: string = "";
  broker_rera_no: string = "";

  deal_name;
  sampledata = ""

  co_applicants = [];

  sampletext:string ="0";


  // Package Headers
  p_deal = []
  // totalConsideration:string = "0"
  payment_terms_api = [];
  package_deal_api = [];
  project_master_api = [];
  gst;
  sd;
  reg;

  ratePersqft;
  reraPerSqft
  AreaSqft;
  reraArea;
  service_charge: number =null;
  round_off: number =0;
  other_charges: number =0;
  generator_charges: number =0;
  customerTotalConsideration: number =0

  // customerTotalConsideration: number = null;


  // Global Varibales
  // customerTotalConsideration = Globals.global_customerTotalConsideration
  customerAgreementValue = Globals.global_customerAgreementValue
  basicFlatCost = Globals.global_basicFlatCost
  totalConsideration = Globals.global_totalConsideration;
  definedGst = Globals.global_dgst;
  definedStampduty= Globals.global_dsd;
  definedRegistration= Globals.global_dreg;




  brokerage_on_arr = []
  brokerage_percentage: number = 0
  brokerage_value:number = 0;
  brokerage_on:string = "";
  sqft_brokerage_on_arr = []
  sqft_rera_and_saleable_sqft;
  sqft_brokerage_value;
  sqft_amount;
  brokerage_sqft_per_arr = []



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
  same_as_permnent(){
    console.log("1234567890-=")
    console.log(this.address)
    this.caddress = this.address
    this.ccity = this.city
    this.cstate = this.state
    this.czipcode = this.zipcode


    console.log(this.address, this.city)
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
      console.log(this.properties)
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
      // console.log(response.data)

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
      let data = {
        "_w":{
              contact_number: this.mobile_no,
              status: 1
            },
        "_l": 1,
        "_s": "id",
        }
      this.http.post("https://software.poonamdevelopers.in/Apis/read/bookings_applicants/0", data)
      .subscribe((response:any)=>{
        console.log(response.data)
        // console.log(response.errCode)
        if(response.errCode == -1){
          this.contactExsitAlert()
        }
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
    let project_payment_master_api = this.http.post('https://software.poonamdevelopers.in/Apis/read/project_payment_master', data);
    let project_master = this.http.post('https://software.poonamdevelopers.in/Apis/read/project_master/0', data);
    forkJoin([project_deal_api, project_payment_master_api, project_master]).subscribe(results => {

      console.log(results[0]["data"][0]["project_id"]);
      // console.log(results[1]["data"]);
      this.package_deal_api = results[0]["data"]
      this.payment_terms_api = results[1]["data"]
      this.project_master_api = results[2]["data"]

      console.log(this.project_master_api, "PROJECT MASTER API")
      console.log(this.package_deal_api, "PACKAGE DEAL API")
      this.definedGst = this.project_master_api["gst"]
      this.definedStampduty = this.project_master_api['stampduty']
      this.definedRegistration = this.project_master_api['registration']

      const serviceValue = this.package_deal_api.map(e => e.name).indexOf("Service Charges");
      this.service_charge = this.package_deal_api[serviceValue]["office"]

      // console.log(this.gst)
      // console.log(this.sd)

    });
  }
  // Payment Table Calculation
  customerCalculate(){


  // if(this.package_type == "package"){
  //     this.customerTotalConsideration = 0
  //     this.package_deal_api.forEach((value, index, array) => {
  //       // console.log(value)
  //       if(value['customerTotalConsideration'] == "add")
  //       {
  //         this.customerTotalConsideration = this.customerTotalConsideration + parseFloat(value['office'])
  //         // console.log("Customer Total COnsideration From IF Condition ", customerTotalConsideration)
  //       }else if(value['customerTotalConsideration'] == "sub")
  //       {
  //         this.customerTotalConsideration -= parseFloat(value['office'])
  //       }
  //     });
  //     // this.package_deal_api.forEach(myFunction);

  //     // function myFunction(item, index) {
  //     //   // console.log(item, index, "This is res")
  //     //   console.log(item)
  //     //   if(item['customerTotalConsideration'] == "add")
  //     //   {
  //     //     this.customerTotalConsideration = this.customerTotalConsideration + parseFloat(item['office'])
  //     //     // console.log("Customer Total COnsideration From IF Condition ", customerTotalConsideration)
  //     //   }else if(item['customerTotalConsideration'] == "sub")
  //     //   {
  //     //     this.customerTotalConsideration -= parseFloat(item['office'])
  //     //   }
  //     // }

  //     const agreementValue = this.package_deal_api.map(e => e.name).indexOf("Agreement Value");
  //     // console.log(agreementValue, "This is agreement value in package select ")
  //     if(this.package_deal_api[agreementValue]["customer"] > 4500000)
  //     {
  //       this.definedGst = 5;
  //     }else{
  //       this.definedGst = 1;
  //     }
  //     // this.calculate();
  //   }
    if(this.package_type == "manual"){
      this.customerTotalConsideration = 0

      const packageDeal = this.package_deal_api.map(e => e.name).indexOf("Package Deal");
      this.package_deal_api[packageDeal]["customerTotalConsideration"] = 'nothing';
      const basicFlatCost = this.package_deal_api.map(e => e.name).indexOf("Basic Flat Cost");
      this.package_deal_api[basicFlatCost]["customerTotalConsideration"] = 'add';

      this.package_deal_api.forEach((value, index, array) => {
        // console.log(value)
        if(value.customerTotalConsideration == "add")
          {
              this.customerTotalConsideration += parseFloat(value.office)

          }else if(value.customerTotalConsideration == "sub")
          {
              this.customerTotalConsideration -= parseFloat(value.office)

          }
      });

      // this.gst = (this.customerAgreementValue * this.gst) / 100
      // this.sd = ((this.customerAgreementValue * this.sd) / 100) + 300
      // this.reg = (this.customerAgreementValue * this.reg) / 100
      // console.log(this.gst, "GST")
      // console.log(this.sd, "SD")
      // console.log(this.reg, "REG")

      // if(this.package_deal_api[agreementValue]["customer"] > 3000000)
      // {
      //   this.reg = 30000;
      // }
      // console.log(this.package_deal_api)
      // this.totalConsideration = (Number(this.basicFlatCost) + Number(this.gst) + Number(this.sd) +
      //                             Number(this.reg) + Number(this.service_charge) + Number(this.round_off)+
      //                             Number(this.other_charges) + Number(this.generator_charges))

      // this.totalConsideration = this.package_deal_api[basicFlatCost][]

      console.log(this.package_deal_api)
      const agreementValue = this.package_deal_api.map(e => e.name).indexOf("Agreement Value");
      this.gst = this.customerAgreementValue * this.definedGst / 100
      this.sd =  this.customerAgreementValue * this.definedStampduty / 100 + 300
      this.reg = this.customerAgreementValue * this.definedRegistration / 100
      if(this.package_deal_api[agreementValue]["customer"] > 3000000)
      {
        this.reg = 30000;
      }
      console.log(this.gst, "GST")
      console.log(this.sd, "SD")
      console.log(this.reg, "REG")
      console.log(this.other_charges, "OTHER CHARGES")
      console.log(this.service_charge, "SERVICE CHARGES")

      console.log(this.gst + this.reg + this.sd, "This is caluclation of GST and REG")

      this.customerTotalConsideration = this.gst + this.reg + this.sd + Number(this.service_charge) + Number(this.generator_charges) +
                                        Number(this.other_charges) + Number(this.basicFlatCost)
      console.log(this.customerTotalConsideration, "This is Customer Agreement Value")


      // Basic Flat COst
      const flatCostIndes = this.package_deal_api.map(e => e.name).indexOf("Basic Flat Cost");
      this.package_deal_api[flatCostIndes]["office"] = this.basicFlatCost || 0;
      //GST
      const gstIndex = this.package_deal_api.map(e => e.name).indexOf("GST");
      this.package_deal_api[gstIndex]["office"] = this.gst || 0;
      // stampd
      const stampDuty = this.package_deal_api.map(e => e.name).indexOf("Stamp Duty");
      this.package_deal_api[stampDuty]["office"] = this.sd || 0;
      // reg
      const registration = this.package_deal_api.map(e => e.name).indexOf("Registration");
      this.package_deal_api[registration]["office"] = this.reg || 0;
      // total charges
      const total_chargesIndex = this.package_deal_api.map(e => e.name).indexOf("Other Charges");
      this.package_deal_api[total_chargesIndex]["office"] = this.other_charges || 0;
      //Service Charges
      const service_chargesIndex = this.package_deal_api.map(e => e.name).indexOf("Service Charges");
      this.package_deal_api[service_chargesIndex]["office"] = this.service_charge || 0;
      // total consideration
      const totalConsiderPrint = this.package_deal_api.map(e => e.name).indexOf("Total Consideration");
      this.package_deal_api[totalConsiderPrint]["office"] = this.customerTotalConsideration || 0;

      this.package_deal_api[totalConsiderPrint]["customer"] = this.customerTotalConsideration || 0;
      this.package_deal_api[agreementValue]["customer"] = this.customerAgreementValue || 0;
      this.package_deal_api[agreementValue]["office"] = this.customerAgreementValue || 0;

      console.log(this.package_deal_api, "After Calculation")
    }
    // this.calculate();
  }
  calculate(){

    this.customerAgreementValue;
    this.basicFlatCost;
    this.totalConsideration;

    this.package_deal_api.forEach((value) => {
      console.log(value)
      if(value.totalConsideration == "add")
      {
        this.totalConsideration += parseFloat(value.customer)
      }else if(value.totalConsideration == "sub")
      {
        this.totalConsideration -= parseFloat(value.customer)
      }
      if(value.basicFlatCost == "add")
      {
        this.basicFlatCost += parseFloat(value.customer)
        //  console.log(this.basicFlatCost, "FROM IF CONDITION")

      }else if(value.basicFlatCost == "sub")
      {
          this.basicFlatCost -= parseFloat(value.customer)
          if(value.status === true)
          {
            this.basicFlatCost += parseFloat(value.customer)
          }
      }
    })

    const agreementValue = this.package_deal_api.map(e => e.name).indexOf("Agreement Value");
    if(this.package_deal_api[agreementValue]["customer"] > 4500000)
    {
      this.definedGst = 5;
    }else{
      this.definedGst = 1;
    }

    this.gst = (parseFloat(this.package_deal_api[agreementValue]["customer"]) * Number(this.definedGst / 100)).toFixed(2)
    this.sd = (parseFloat(this.package_deal_api[agreementValue]["customer"]) * Number(this.definedStampduty / 100) + Number(300)).toFixed(2);
    this.reg = (parseFloat(this.package_deal_api[agreementValue]["customer"]) * Number(this.definedRegistration / 100)).toFixed(2)
    if(this.package_deal_api[agreementValue]["customer"] > 3000000)
    {
      this.reg = 30000;
    }

    if(this.package_deal_api[agreementValue]["customer"] > 3000000)
    {
      this.reg = 30000;
    }
    const gstIndex = this.package_deal_api.map(e => e.name).indexOf("GST");
    this.package_deal_api[gstIndex]["customer"] = this.gst || 0;
    // stampd
    const stampDuty = this.package_deal_api.map(e => e.name).indexOf("Stamp Duty");
    this.package_deal_api[stampDuty]["customer"] = this.sd || 0;
    // reg
    const registration = this.package_deal_api.map(e => e.name).indexOf("Registration");
    this.package_deal_api[registration]["customer"] = this.reg || 0;

    const agValue = this.package_deal_api[agreementValue]["customer"];
    const basicFlatCostValue = this.package_deal_api.map(e => e.name).indexOf("Basic Flat Cost");
    this.package_deal_api[basicFlatCostValue]["customer"] = this.basicFlatCost || 0;
    // flat cost per sqft
    this.ratePersqft = Number(agValue / this.AreaSqft).toFixed(2);
    // rera cost per sqft
    this.reraPerSqft = Number(agValue / this.reraArea).toFixed(2);
  }

// Broker Details Calucation FOR  Percentage and SQFT
  brokerage_arr(data){
    // console.log("Brokerage Type CLicked")
    console.log(data, "Broker TYPE Value")

    this.brokerage_on_arr = []
    if(data == "percentage"){
      this.package_deal_api.forEach((value) => {
        console.log(value)
        if(value.isForDemand == 1){
          this.brokerage_on_arr.push(value)
        }
      });
    }
    if(data == "sqft"){
      // console.log(this.selected_property)
      // console.log(this.selected_property.reraCarpet, "RERA CARPET")
      // console.log(this.selected_property.saleableArea, "SALEABLE AREA")

      let rera_carpet = this.selected_property.reraCarpet
      let saleable_area = this.selected_property.saleableArea

      this.sqft_rera_and_saleable_sqft={
        "Rear Carpet": rera_carpet,
        "Saleable Area": saleable_area
      }

      // this.sqft_brokerage_on_arr.push(sqft_rera_and_saleable_sqft)
      // this.sqft_brokerage_on_arr.push({"Rera Carpet": rera_carpet})
      // this.sqft_brokerage_on_arr.push({"Saleable Area": saleable_area})


      // console.log(this.sqft_brokerage_on_arr, "ARRAY OF SQFT BROKERAGE ON ARRAY ")
    }

  }
  calculate_brokerage(data){
    // console.log(data)
    // console.log(this.brokerage_on, "BROKERAGE ON")
    // console.log(typeof(this.brokerage_on), "BROKERAGE ON TYPE")
      const brokerage_onIndex = this.package_deal_api.map(e => e.name).indexOf(this.brokerage_on);
      // console.log(this.package_deal_api[brokerage_onIndex]["office"])

      this.brokerage_percentage = Number(this.package_deal_api[brokerage_onIndex]["office"] * this.brokerage_value) / 100
      // console.log(this.brokerage_percentage)
    console.log(this.selected_property, "This is Property is selected")
  }
  cal_sqft_brokerage(data){
    // console.log("SQFT BRokerage Value Calculation")
    // console.log(data, "This SQFT Value PERCENTAGE")
    // console.log(this.brokerage_on, "BROKERAGE ON VALUE")
  //   let value = data
    this.sqft_brokerage_value = data * Number(this.brokerage_on)
  }
  addbrokervalue(){
    console.log(this.total_brokerage_value)
    console.log(this.brokerage_value)
    this.total_brokerage_value = this.total_brokerage_value +  this.brokerage_value
  }
  add_percentage_broker_list(){
    // console.log(this.selected_broker.brokerName)
    // console.log(this.broker_type)
    // console.log(this.brokerage_percentage)

    // let obj = {
    //   "brokername": this.selected_broker.brokerName,
    //   "broker_type": this.broker_type,
    //   "brokerage_per": this.brokerage_percentage,
    // }

    // this.brokerage_sqft_per_arr.push(obj)

    // console.log(this.brokerage_sqft_per_arr)
    if(this.broker_type == "percentage"){
      // console.log("PERCENTAGE SELECTED")
      // console.log(this.selected_broker.brokerName)
      // console.log(this.broker_type)
      // console.log(this.brokerage_percentage)

      let obj = {
        "brokername": this.selected_broker.brokerName,
        "broker_type": this.broker_type,
        "brokerage_value": this.brokerage_percentage,
      }

      this.brokerage_sqft_per_arr.push(obj)

      console.log(this.brokerage_sqft_per_arr)

    }
    if(this.broker_type == "sqft"){
      // console.log("SQFT SELECTED")
      // console.log(this.selected_broker.brokerName)
      // console.log(this.broker_type)

      let obj = {
        "brokername": this.selected_broker.brokerName,
        "broker_type": this.broker_type,
        "brokerage_value": this.sqft_brokerage_value,
      }
      this.brokerage_sqft_per_arr.push(obj)
      console.log(this.brokerage_sqft_per_arr)

    }
  }

  delete_brokereage_item(id){
    console.log("DELETE BUTOON CLICKED")
    console.log(id, "DELETE ITEM ID")

    let brokerageIndex = this.brokerage_sqft_per_arr.map(e => e.name).indexOf("value")
    // console.log(brokerageIndex)
    this.brokerage_sqft_per_arr.splice(brokerageIndex, 1);
  }


}
