import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
  service_booking_id:string = ""
  all_bookings = []
  filter_all_booking = []
  outstandingbooking_apidata = []
  filter_outstandingbooking_apidata = []
  othercharges_apidata = []
  filter_othercharges_apidata = []

  availability_apiData = []
  availability_floorData = {}
  availability_dataStatus = false

  brokers = []


  // Filter Variables
  filter_selected_project = [];
  filter_selected_wing = [];
  filter_selected_floor = [];
  filter_selected_unit = [];
  filter_selected_broker = [];


  totalDue = ""
  dueReceived = ""
  totalBalance = ""
  balanceDue = ""
  gstBalance = ""
  otherchargesBalance = ""
  gstBalanceDetailBooking = ""
  balanceDueDetailBooking = ""
  rate = ""

  constructor(public http:HttpClient) { }

  set_booking_id(id){
    this.service_booking_id = id
  }

  sort_data(){
    this.all_bookings.sort(function(a,   b){return b-a});
    this.filter_all_booking.sort(function(a,   b){return b-a});
  }

  get_booking_id(){
    return this.service_booking_id
  }

  setbookingsdata(pid, wing, floor, unit_type, broker_id){
    let all_booking_params = {project_id: pid, wingName: wing,
      floor: floor, unit_type: unit_type, broker_id: broker_id}

    this.http.post("https://software.poonamdevelopers.in/Apis/getAllBookings", all_booking_params)
    .subscribe((response:any)=>{

    this.all_bookings = response.data
    this.filter_all_booking = response.data
    console.log(this.all_bookings, "ALL BOOKING DATA")
    }, (errors) => {
    console.log("Server Issue", errors.message)
    })
    console.log(this.all_bookings, "OUTSIDE FROM API CODE")
    return this.all_bookings

  }

  getall_bookings(){
    console.log(this.all_bookings, "ALL BOOKING FROM GET")
    return this.all_bookings
  }



  // For OutStanding Report
  add(a, b){
    this.totalDue = String(Number(a) + Number(b))
    return this.totalDue
  }
// For OutStanding Report
  sub(a){
    this.dueReceived = String(Number(this.totalDue) - Number(a))
    return this.dueReceived
  }
  // For OutStanding Report
  calbalanceDue(totalAmount){
    if(totalAmount != undefined){
      totalAmount = totalAmount.replace(/,/g, "")
      this.balanceDue = String(Number(this.totalDue) - Number(totalAmount))
      return this.balanceDue.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
    }


  }
  // For Outstanding Report
  calgstBalance(agreementValue, totalAmount){
    if(agreementValue != undefined && totalAmount != undefined){
      agreementValue = agreementValue.replace(/,/g, "")
      totalAmount = totalAmount.replace(/,/g, "")
      var onepercentAgreementValue = Number(agreementValue) * (1 / 100)
      this.gstBalance = String(Number(onepercentAgreementValue) - Number(totalAmount))
      return this.gstBalance.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
    }

  }


  // For Unregistered Report
  checkRegisterStatus(status){
    if(status === "1"){
      return "Unregistered"
    }else{
      return "Registered"
    }
  }
  calFromDays(bookinDate){
    var today= new Date()
    var now  =today.getFullYear()  +'/'+ (today.getMonth()+1) +'/'+ today.getDate();
    var date1 = new Date(now);
    var date2 = new Date(bookinDate);

    //calculate time difference
    var time_difference = date1.getTime() - date2.getTime();

    //calculate days difference by dividing total milliseconds in a day
    var days_difference = Math.round( time_difference / (1000 * 60 * 60 * 24));

    return days_difference
  }

  // For Other Charges Report
  calotherchargesbalance(totalReceived, basicFlatCost){
    if(totalReceived != undefined && basicFlatCost != undefined){
      totalReceived = totalReceived.replace(/,/g, "")
      basicFlatCost = basicFlatCost.replace(/,/g, "")
      this.otherchargesBalance = String(Number(basicFlatCost) - Number(totalReceived))
      return this.otherchargesBalance.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
    }
  }
  calRate(basicFlatCost, saleableArea){
    this.rate = String( Number(basicFlatCost) / Number(saleableArea))
    return  this.rate.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
  }

  // For Detail Booking Payment SUmmary
  calgstBalanceDetailBooking(gstValue, gstAmount){
    if(gstValue != undefined ){
      gstValue = gstValue.replace(/,/g, "")
      this.gstBalanceDetailBooking = String(Number(gstValue) - Number(gstAmount))
      // console.log(this.gstBalanceDetailBooking, "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
      return this.gstBalanceDetailBooking.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
    }
  }

  // For Detail Booking Payment SUmmary
  calTotalBalance(a, b){
    if(a != undefined && b != undefined){
      a = a.replace(/,/g, "")
      b = b.replace(/,/g, "")
      this.totalBalance = String(Number(a) - Number(b))
      return this.totalBalance.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
    }
  }

  // For Detail Booking Payment SUmmary
  calBalanceDue(totalDues){
    if(totalDues != undefined){
      totalDues = totalDues.replace(/,/g, "")
      this.balanceDueDetailBooking = String( Number(this.totalBalance) - Number(totalDues))
      return this.balanceDueDetailBooking.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
    }
  }


  // Return 0.00 if value is null
  showZeroForDate(val){
    if(val == null){
      return "-"
    }else{
      var formatedDate =  moment(val).format('DD-MM-YYYY')
      return formatedDate
    }
  }

  showZeroForReg(val){
    if(val == null){
      return "0.00"
    }else{
      return val
    }
  }

  showNan(val){
    if(val == null){
      return "N/A"
    }else{
      return val
    }
  }

  commaSeprate(val){
    return val.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',');
  }




}
