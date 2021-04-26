import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { AlertController } from '@ionic/angular';

import { Observable, forkJoin } from 'rxjs';
import {Globals} from './globals'
import { DatastoreService } from '../datastore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bookingform',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {

  applicantSalutation:string = ""
  dob;
  codob;
  age;
  coage;
  coapplicantSalutation:string = ""
  permanentAddressLine1:string = ""
  permanentCity: string = ""
  permanentState:string = ""
  permanentZipcode: number = null;
  correspondenceAddressLine1:string = ""
  correspondenceCity: string = ""
  correspondenceState:string = ""
  correspondenceZipcode: number = null;
  contactNumber:string = "";
  residential_status:string = "";
  type:string = "";
  properties = [];
  selected_property = null;
  paymentMode:string = "";
  payment_schedule:string = "";
  payment_terms:string = "";
  demand_on:string = "";
  demandOn:string = "";
  terms:string = "";
  terms_arr= [];
  percentage:string = "";
  termsstatus = false;
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
  additionalDescription:string = ""
  approxLoanAmount:string = ""
  paymentTermsType:string = ""
  paymentTermsList: string = ""

  deal_name;
  sampledata = ""

  co_applicants = []
  coApplicantsDetails = {};
  applicantsDetails = {}
  paymentDetails = {}
  brokerDetails = {}
  user_master_api: []
  additionalProperty = [
    {
      "additional_property_id": "1",
      "amount": null,
      "available_count": "",
      "is_extra_chargable": "1",
      "project_id": "1",
      "property_name": "Departmental Store",
      "sale_count": "0",
      "status": "1",
      "total_count": ""
    }
  ]

  selected_additionalproperty = []
  additionalPropertyFreeCount:string = ""
  additionalPropertyPaidCount:string = ""
  additionalPropertyAmount:string = ""
  additionalPropertyRate:string = ""
  additionalPropertyData = []
  payment_detail_master = []
  totalAmount:string = "0"


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



  constructor(public http: HttpClient, public alertController: AlertController, 
              public datastoreservice: DatastoreService, public router:Router) { }

  async contactExsitAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Contact Exsit',
      message: "Contact Already Present",
      buttons: ['OK']
    });

    await alert.present();
  }

  async successmsgAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async ErrormsgAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
  ngOnInit() {
    this.getApartments()
    this.sampledata = "API IS CALLED FROM NgInit() Method"
    this.getBrokers()
    this.getUsers()

  }
  // Below Method is Call onSubmit of Entire Step-By-Step Wizard Form
  bookingdetails(data){
    console.log(data)
  }

  // Below Method is Call When User Click Same and Permanant Address CheckBox
  same_as_permnent(){
    this.correspondenceAddressLine1 = this.permanentAddressLine1
    this.correspondenceCity = this.permanentCity
    this.correspondenceState = this.permanentState
    this.correspondenceZipcode = this.permanentZipcode

    console.log(this.permanentAddressLine1, this.permanentCity)
  }

  // Below Methods are Used For Customised Terms Addition
  addterms(){
    this.terms_arr.push({t:this.terms, p:this.percentage})
    console.log(this.terms_arr)
    this.totalpercentage =String(Number(this.totalpercentage) + Number(this.percentage))
  }
  addpercentage(){
    this.totalpercentage = this.totalpercentage + this.percentage
  }
  submitTerms(){
    if(Number(this.totalpercentage) == 100){
      this.successmsgAlert("Terms Added")
      this.termsstatus = true
    }else{
      this.ErrormsgAlert("Total Percentage should be 100")
      this.termsstatus = false
    }
  }
  clearTerms(){
    this.totalpercentage = "0"
    this.terms_arr = []
  }

 
  // Below Methods is Used to Prepare 4 Array to Submit this Form DATA TO DATABASE
  addcoapplicant(data){
    console.log(typeof(data.value))
    console.log(data.value)

    // this.coApplicantsDetails = data.value

    this.coApplicantsDetails = data.value

    this.co_applicants.push(this.coApplicantsDetails)

    var coApplicantData = data.value
    this.coApplicantsDetails = {
      coapplicantSalutation: coApplicantData.coapplicantSalutation,
      firstName: coApplicantData.firstName,
      middleName: coApplicantData.middleName,
      lastName: coApplicantData.lastName,
      email: coApplicantData.email,
      contactNumber: coApplicantData.contactNumber,
      whatsappNumber: coApplicantData.whatsappNumber,
      pancard: coApplicantData.pancard,
      aadharCard: coApplicantData.aadharCard,
      dob: coApplicantData.codob,
      profession: coApplicantData.profession,
      age: coApplicantData.coage,
      permanentAddressLine1: coApplicantData.permanentAddressLine1,
      permanentAddressLine2: coApplicantData.permanentAddressLine2,
      permanentCity: coApplicantData.permanentCity,
      permanentState: coApplicantData.permanentState,
      permanentZipcode: coApplicantData.permanentZipcode,
      correspondenceAddressLine1: coApplicantData.correspondenceAddressLine1,
      correspondenceAddressLine2: coApplicantData.correspondenceAddressLine2,
      correspondenceCity: coApplicantData.correspondenceCity,
      correspondenceState: coApplicantData.correspondenceState,
      correspondenceZipcode: coApplicantData.correspondenceZipcode,
      loaded: true,
      allList: this.co_applicants,
      residential_status: coApplicantData.residential_status
    }

    console.log("CO APPLICANT Data from Array ", this.coApplicantsDetails)
    
    data.resetForm()
  }
  sendapplicantsDetails(data){
    console.log(typeof(data.value))
    console.log(data.value)
    // this.applicantsDetails.push(data.value)

    this.applicantsDetails = data.value

    console.log("APPLICANT Details from Array ", this.applicantsDetails)

    data.resetForm()
  }
  sendpaymentDetails(data){
    var demandon_val = data.value.demand_on
    this.paymentDetails = 
      {
        additionalDescription: this.additionalDescription,
        additionalProperty: this.additionalProperty,
        additionalPropertyAmount: this.additionalPropertyAmount,
        additionalPropertyData: this.additionalPropertyData,
        additionalPropertyFreeCount: this.additionalPropertyFreeCount,
        additionalPropertyPaidCount : this.additionalPropertyPaidCount,
        additionalPropertyRate: this.additionalPropertyRate,
        additionalPropertySelect: this.selected_additionalproperty,
        apartment_id: this.selected_property.apartment_id,
        apartments: this.properties,
        approxLoanAmount: this.approxLoanAmount,
        AreaSqft: this.selected_property.saleableArea,
        arrays: this.package_deal_api,
        customerAgreementValue: 0,
        customisePaymentTerms: this.terms_arr,
        customisePercentage: this.percentage,
        definedGst: 1,
        definedRegistration: "1",
        definedStampduty: "6",
        demandOn: {
          "name": demandon_val.name,
          "value": demandon_val.office
        },
        flat: this.selected_property.flatNo,
        floor: this.selected_property.floor,
        gstNumber: data.value.gstNumber,
        loaded: false,
        paymentMode: this.paymentMode,
        paymentTermsDetailList: this.payment_detail_master,
        paymentTermsList: this.payment_terms_api,
        paymentTermsOption: this.paymentTermsList,
        paymentTermsType: this.paymentTermsType,
        ratePersqft: this.AreaSqft,
        reraArea: this.selected_property.reraCarpet,
        reraPerSqft: this.reraArea,

        type: this.type,
        unit_type: this.selected_property.unit_type,
        wing: this.selected_property.wingName
      }
    console.log(data.value, "PAYMENT DETAILS DATA")

    console.log(this.paymentDetails, "THIS DATA WILL SEND")
  }
  sendbrokerDetails(data){
    console.log(data.value)
    console.log(data.value.selected_broker, "VALLl")

    if(data.value.selected_broker === undefined){
      this.brokerDetails = 
      {
        bookingBy: "",
        bookingDate: "",
        broker: {
          "broker_id": "",
          "brokerName": ""
        },
        brokerageArea: null,
        brokerageList: "",
        brokerageOn: "",
        brokeragePercentage: "",
        brokerageReraArea: null,
        brokerageSaleableArea: "",
        brokerageSqft: null,
        brokerageType: "",
        brokerageValue: "",
        brokerList: "",
        brokerName: null,
        brokerNumber: null,
        brokerReraNumber: null,
        brokerShow: true,
        createBoker: false,
        // Doubt on below
        usersList: ""
      }

      console.log(this.brokerDetails, "BROKER DETAILS")

      if(this.totalpercentage === "100"){

        this.submiBooking()
        // this.successmsgAlert("Total Percentage is  100")
      }else{
          this.ErrormsgAlert("Customised Terms Total Percentage Should Be 100 Go Back To Payment Tarms Add Terms")
          this.termsstatus = false
      }
    }else{

      this.brokerDetails = 
      {
        bookingBy: this.booking_by,
        bookingDate: data.value.booking_date,
        broker: {
          "broker_id": this.selected_broker.broker_id,
          "brokerName": this.selected_broker.brokerName
        },
        brokerageArea: null,
        brokerageList: this.brokerage_sqft_per_arr,
        brokerageOn: this.brokerage_on,
        brokeragePercentage: this.brokerage_percentage,
        brokerageReraArea: null,
        brokerageSaleableArea: this.selected_property.saleableArea,
        brokerageSqft: null,
        brokerageType: this.broker_type,
        brokerageValue: this.brokerage_value,
        brokerList: this.brokers,
        brokerName: null,
        brokerNumber: null,
        brokerReraNumber: null,
        brokerShow: true,
        createBoker: false,
        // Doubt on below
        usersList: this.user_master_api
      }

      console.log(this.brokerDetails, "BROKER DETAILS")


      if(this.totalpercentage === "100"){

        this.submiBooking()
        // this.successmsgAlert("Total Percentage is  100")
      }else{
          this.ErrormsgAlert("Customised Terms Total Percentage Should Be 100 Go Back To Payment Tarms Add Terms")
          this.termsstatus = false
      }

    }
    
    

      
  }
  submiBooking(){
    
    var customisedTermsVue: {
      customisedDemand: "",
      defaultDate: "",
      defaultPercentage: "",
      defaultTerms: "",
      demandOn: "",
      terms: []
    }
    var applicantsDetails = this.applicantsDetails
    var coApplicantsDetails = this.coApplicantsDetails
    var paymentDetails = this.paymentDetails
    var brokerDetails = this.brokerDetails
    this.http.post("https://software.poonamdevelopers.in/Apis/createBooking", 
    {applicantsDetails, brokerDetails, coApplicantsDetails, customisedTermsVue, paymentDetails  })
    .subscribe((response:any)=>{
      console.log(response.data, "RESPONSE OF SUBMIT DATA")

      this.brokers = response.data
    }, (errors) => {
      this.broker_errors = errors.message
      console.log("ERROR ON SUBMIT DATA", errors.message)
    })

    this.router.navigateByUrl("/allbooking")
  }


  // Below Methods is Used for Additional Property
  addadditionalproperty(){
    var obj = {
      additionalPropertySelect: this.selected_additionalproperty,
      additionalPropertyFreeCount: this.additionalPropertyFreeCount,
      additionalPropertyPaidCount: this.additionalPropertyFreeCount,
      additionalPropertyAmount: this.additionalPropertyAmount,
      additionalPropertyRate: this.additionalPropertyRate,
    }
    this.totalAmount = String(Number(this.totalAmount) + Number(this.additionalPropertyAmount))
    this.additionalPropertyData.push(obj)
    this.customerCalculate()
  }
  removeAdditionalProperty(index){
    this.additionalPropertyData.splice(index, 1);
  }
  caladditionalrate(){
    this.additionalPropertyRate = String(Number(this.additionalPropertyAmount) * 20) 
  }
  calAge(dob){
    console.log(dob, "DOB")
    var nndob = new Date(dob)
    var ndob = new Date(dob).getTime()

    // var now = new Date()
    // // this.age = now.getFullYear() - dob.getFullYear()

    // console.log(nndob, "MYFULL DATE")
    // console.log(ndob, "MYAGE")

    var diff_ms = Date.now() - ndob;
    var age_dt = new Date(diff_ms); 
  
    this.age = Math.abs(age_dt.getUTCFullYear() - 1970);
    console.log(this.age)
    
  }
  cocalAge(codob){
    console.log(codob, "DOB")
    var nndob = new Date(codob)
    var ndob = new Date(codob).getTime()

    var diff_ms = Date.now() - ndob;
    var age_dt = new Date(diff_ms); 
  
    this.coage = Math.abs(age_dt.getUTCFullYear() - 1970);
    console.log(this.coage)
    
  }

  // Below Method Is Used to ADD or DELETE method for CO-APPLICANT
  delete_co_applicant(id){
    console.log(id)
    this.co_applicants.splice(id, 1);
  }
  edit_co_applicant(id, formData){
    console.log(id)
    console.log(this.coApplicantsDetails[id])
    let obj = this.coApplicantsDetails[id]
    console.log(obj.cfname)
    console.log(formData)
    formData.setValue(
      {
      caadhar: obj.caadhar,
      correspondenceAddressLine1:  obj.correspondenceAddressLine1,
      correspondenceCity:  obj.correspondenceCity,
      cdob:  obj.cdob,
      cemail:  obj.cemail,
      cfname:  obj.cfname,
      clname:  obj.clname,
      cmname:  obj.cmname,
      cmobile_no:  obj.cmobile_no,
      cpan:  obj.cpan,
      cresidential_status:  obj.cresidential_status,
      correspondenceState:  obj.correspondenceState,
      cwhatsapp_no:  obj.cwhatsapp_no,
      correspondenceZipcode:  obj.correspondenceZipcode
    })
    this.co_applicants.splice(id, 1);
  }

  getApartments(){
    let data = {
      "_w":{
            status: 1
      }
    }
    this.http.post("https://software.poonamdevelopers.in/Apis/read/apartments", data)
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

      // this.brokers = response.data
      this.datastoreservice.brokers = response.data
      console.log(this.datastoreservice.brokers, "BROKER ADDED *************")
    }, (errors) => {
      this.broker_errors = errors.message
      console.log("Server Issue", errors.message)
    })
  }
  getUsers(){
    let data = {"_w":{"status":1},"_s":"user_id,name"}

    this.http.post("https://software.poonamdevelopers.in/Apis/read/users", data)
    .subscribe((response:any)=>{
      // console.log(response.data)

      this.user_master_api = response.data
      console.log(this.user_master_api, "USERS API DATA")
    }, (errors) => {
      console.log("Server Issue", errors.message)
    })
  }
  checkContact(){
    // console.log(event)
    if(this.contactNumber.length == 10){
      console.log("Count is ", this.contactNumber.length)
      let data = {
        "_w":{
              contact_number: this.contactNumber,
              status: 1
            },
        "_l": 1,
        "_s": "id",
        }
      this.http.post("https://software.poonamdevelopers.in/Apis/read/bookings_applicants/0", data)
      .subscribe((response:any)=>{
        console.log(response)
        // console.log(response.errCode)
        if(response.errCode == -1){
          console.log("****************************************************")
          this.contactExsitAlert()
        }
      }, (errors) => {
        console.log("Server Issue", errors)
      })
    }
  }
  getAllApi(){
    if(this.paymentTermsType == "regular"){
      this.termsstatus = true
    }
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

      // // When API GOT CHANGE TO TEST 
      // this.service_charge = 0

      // console.log(this.gst)
      // console.log(this.sd)

    });
  }
  getpaymentdetailterms(id){
    let data = {"_w":{"payment_id":id,"status":1}}

    this.http.post("https://software.poonamdevelopers.in/Apis/read/project_payment_detail_master", data)
    .subscribe((response:any)=>{
      // console.log(response.data)

      this.payment_detail_master = response.data
      console.log(this.payment_detail_master, "PAYMENT DETAIL MASTER")
    }, (errors) => {
      console.log("Server Issue", errors.message)
    })
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
    if(this.type == "manual"){
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
                                        Number(this.other_charges) + Number(this.round_off) + Number(this.basicFlatCost) 
                                        + Number(this.totalAmount)
      console.log(this.customerTotalConsideration, "This is Customer Agreement Value")


      // Basic Flat COst
      const flatCostIndes = this.package_deal_api.map(e => e.name).indexOf("Basic Flat Cost");
      this.package_deal_api[flatCostIndes]["office"] = String(Number(this.basicFlatCost) + Number(this.service_charge) + Number(this.round_off)) || 0;
      this.package_deal_api[flatCostIndes]["customer"] = String(Number(this.basicFlatCost) + Number(this.service_charge + Number(this.round_off))) || 0;
      
      //GST
      const gstIndex = this.package_deal_api.map(e => e.name).indexOf("GST");
      this.package_deal_api[gstIndex]["office"] = this.gst || 0;
      this.package_deal_api[gstIndex]["customer"] = this.gst || 0;
      // stampd
      const stampDuty = this.package_deal_api.map(e => e.name).indexOf("Stamp Duty");
      this.package_deal_api[stampDuty]["office"] = this.sd || 0;
      this.package_deal_api[stampDuty]["customer"] = this.sd || 0;
      // reg
      const registration = this.package_deal_api.map(e => e.name).indexOf("Registration");
      this.package_deal_api[registration]["office"] = this.reg || 0;
      this.package_deal_api[registration]["customer"] = this.reg || 0;
      // total charges
      const total_chargesIndex = this.package_deal_api.map(e => e.name).indexOf("Other Charges");
      this.package_deal_api[total_chargesIndex]["office"] = this.other_charges || 0;
      this.package_deal_api[total_chargesIndex]["customer"] = this.other_charges || 0;
      //Service Charges
      // const service_chargesIndex = this.package_deal_api.map(e => e.name).indexOf("Service Charges");
      // this.package_deal_api[service_chargesIndex]["office"] = this.service_charge || 0;
      // total consideration
      const totalConsiderPrint = this.package_deal_api.map(e => e.name).indexOf("Total Consideration");
      this.package_deal_api[totalConsiderPrint]["office"] = this.customerTotalConsideration || 0;
      this.package_deal_api[totalConsiderPrint]["customer"] = this.customerTotalConsideration || 0;

      this.package_deal_api[agreementValue]["customer"] = this.customerAgreementValue || 0;
      this.package_deal_api[agreementValue]["office"] = this.customerAgreementValue || 0;

      console.log(this.package_deal_api, "After Calculation")
    }
    // this.calculate();









    if(this.type == "package"){
      this.customerTotalConsideration = 0
      // this.gst = 0
      // this.sd = 0
      // this.reg = 0
      // this.service_charge = 6500


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

      this.customerTotalConsideration =Number(this.customerAgreementValue) + Number(this.service_charge) + 
                                      Number(this.other_charges) + Number(this.round_off) + Number(this.totalAmount)
    


      // Basic Flat COst
      const flatCostIndes = this.package_deal_api.map(e => e.name).indexOf("Basic Flat Cost");
      this.package_deal_api[flatCostIndes]["office"] = String((Number(this.sd) + Number(this.gst) + Number(this.reg)) - Number(this.service_charge) - Number(this.round_off)) || 0;
      this.package_deal_api[flatCostIndes]["customer"] = String((Number(this.sd) + Number(this.gst) + Number(this.reg)) - Number(this.service_charge) - Number(this.round_off)) || 0;
      //GST
      const gstIndex = this.package_deal_api.map(e => e.name).indexOf("GST");
      this.package_deal_api[gstIndex]["office"] = this.gst || 0;
      this.package_deal_api[gstIndex]["customer"] = this.gst || 0;
      // stampd
      const stampDuty = this.package_deal_api.map(e => e.name).indexOf("Stamp Duty");
      this.package_deal_api[stampDuty]["office"] = this.sd || 0;
      this.package_deal_api[stampDuty]["customer"] = this.sd || 0;
      // reg
      const registration = this.package_deal_api.map(e => e.name).indexOf("Registration");
      this.package_deal_api[registration]["office"] = this.reg || 0;
      // total charges
      const total_chargesIndex = this.package_deal_api.map(e => e.name).indexOf("Other Charges");
      this.package_deal_api[total_chargesIndex]["office"] = this.other_charges || 0;
      this.package_deal_api[total_chargesIndex]["customer"] = this.other_charges || 0;

      const roundoffIndex = this.package_deal_api.map(e => e.name).indexOf("RoundOff");
      this.package_deal_api[roundoffIndex]["office"] = this.round_off || 0;
      this.package_deal_api[roundoffIndex]["customer"] = this.round_off || 0;
      //Service Charges
      // const service_chargesIndex = this.package_deal_api.map(e => e.name).indexOf("Service Charges");
      // this.package_deal_api[service_chargesIndex]["office"] = this.service_charge || 0;
      // total consideration
      const totalConsiderPrint = this.package_deal_api.map(e => e.name).indexOf("Total Consideration");
      this.package_deal_api[totalConsiderPrint]["office"] = String(Number(this.customerTotalConsideration) + Number(this.totalAmount)) || 0;
      this.package_deal_api[totalConsiderPrint]["customer"] = String(Number(this.customerTotalConsideration) + Number(this.totalAmount))  || 0;

      this.package_deal_api[agreementValue]["customer"] = this.customerAgreementValue || 0;
      this.package_deal_api[agreementValue]["office"] = this.customerAgreementValue || 0;

      console.log(this.package_deal_api, "After Calculation")
    }











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
      console.log(this.selected_property.reraCarpet, "RERA CARPET********************")
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

      this.brokerage_value = Number(this.package_deal_api[brokerage_onIndex]["office"] * this.brokerage_percentage) / 100
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

  addbroker(){
    let data = {brokerName: this.broker_name, brokerNumber: this.bmob, brokerReraNumber: this.broker_rera_no, status: 1}

    this.http.post("https://software.poonamdevelopers.in/Apis/create/broker_master", data)
    .subscribe((response:any)=>{
      console.log(response, "BROKER ADDED")

      // this.brokers = response.data
    }, (errors) => {
      this.broker_errors = errors.message
      console.log("Server Issue", errors.message)
    })

    this.getBrokers()
    this.successmsgAlert("Broker Added")

  }
  addbrokervalue(){
    console.log(this.total_brokerage_value)
    console.log(this.brokerage_value)
    this.total_brokerage_value = this.total_brokerage_value +  this.brokerage_value
  }
  add_percentage_broker_list(){
    
    if(this.broker_type == "percentage"){
      let obj = {
        "broker_id": this.selected_broker.broker_id,
        "brokername": this.selected_broker.brokerName,
        "broker_type": this.broker_type,
        "brokerage_value": this.brokerage_value,
        "brokeragePercentage": this.brokerage_percentage,
        "brokerageOn": this.brokerage_on,
        "brokerageSqft": null,
        "brokerageArea": null
      }

      this.brokerage_sqft_per_arr.push(obj)

      console.log(this.brokerage_sqft_per_arr)

    }
    if(this.broker_type == "sqft"){
  

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
