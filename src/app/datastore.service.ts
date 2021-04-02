import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatastoreService {
  service_booking_id:string = ""
  all_bookings = []
  filter_all_booking = []

  constructor(public http:HttpClient) { }

  set_booking_id(id){
    this.service_booking_id = id
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
}
