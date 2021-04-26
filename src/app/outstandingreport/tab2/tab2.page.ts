import { Component, OnInit } from '@angular/core';
import {DatastoreService} from '../../datastore.service';
import {HttpClient} from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  get_all_bookings_api = []
  get_all_payments_api = []
  get_all_vouchers_api = []
  booking_applicant_api = []
  booking_deal_api = []
  booking_payment_detail_master_api = []
  demand_letter_api = []

  constructor(public datastoreservice:DatastoreService, public http:HttpClient) { }

  ngOnInit() {
    var id = Number(this.datastoreservice.get_booking_id())
    console.log(id, "THIS IS BOOKING ID SELECTED")
    this.getAllApi(id)
  }

  getAllApi(id){
    let get_all_bookings = this.http.get('https://software.poonamdevelopers.in/Apis/getAllBookings/' + id);
    let get_all_payments = this.http.get('https://software.poonamdevelopers.in/Apis/getAllPayments/' + id);
    let get_all_vouchers = this.http.get('https://software.poonamdevelopers.in/Apis/getAllVouchers/' + id);


    let booking_applicant_params = {_w: {status: 1, booking_id: id}}
    let booking_deal_params= {_w: {booking_id: id, status: 1}}
    let booking_payment_detail_master_params= {_w: {booking_id: id, status: 1}}
    let demand_letter_params= {_w: {booking_id: id, status: 1}}
    let booking_applicant = this.http.post('https://software.poonamdevelopers.in/Apis/read/bookings_applicants', booking_applicant_params);
    let booking_deal = this.http.post('https://software.poonamdevelopers.in/Apis/read/bookings_deal_master', booking_deal_params);
    let booking_payment_detail_master = this.http.post('https://software.poonamdevelopers.in/Apis/read/bookings_payment_detail_master', booking_payment_detail_master_params);
    let demand_letter = this.http.post('https://software.poonamdevelopers.in/Apis/read/demand_letters', demand_letter_params);

    forkJoin([get_all_bookings, get_all_payments, get_all_vouchers, booking_applicant, booking_deal,
              booking_payment_detail_master, demand_letter]).subscribe(results => {

      this.get_all_bookings_api = results[0]["data"]
      this.get_all_payments_api = results[1]["data"]
      this.get_all_vouchers_api = results[2]["data"]
      this.booking_applicant_api = results[3]["data"]
      this.booking_deal_api = results[4]["data"]
      this.booking_payment_detail_master_api = results[5]["data"]
      console.log(results[6]["data"], "****************************************")

      console.log(this.get_all_bookings_api, "GET ALL BOOKINGS")
      console.log(this.get_all_payments_api, "GET ALL PAYMENTS")
      console.log(this.get_all_vouchers_api, "GET ALL VOUCHERS")
      console.log(this.booking_applicant_api, "BOOKING APPLICANTS")
      console.log(this.booking_deal_api, "BOOKING DEAL MASTER")
      console.log(this.booking_payment_detail_master_api, "BOOKING PAYEMNT DEAL MASTER")
      // console.log(this.demand_letter_api, "DEMAND LETTER")
    });
  }
}
