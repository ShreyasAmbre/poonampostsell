import { Component, OnInit } from '@angular/core';
import {DatastoreService} from '../../datastore.service';
import {HttpClient} from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  booking_deal_api= []

  constructor(public datastoreservice:DatastoreService, public http:HttpClient) { }

  ngOnInit() {
    var id = Number(this.datastoreservice.get_booking_id())
    console.log(id, "THIS IS BOOKING ID SELECTED")
    this.getAllApi(id)
  }


  getAllApi(id){
    let booking_deal_params= {_w: {booking_id: id, status: 1}}
    let booking_deal = this.http.post('https://software.poonamdevelopers.in/Apis/read/bookings_deal_master', booking_deal_params);

    forkJoin([ booking_deal]).subscribe(results => {

      this.booking_deal_api = results[0]["data"]
      console.log(this.booking_deal_api, "BOOKING DEAL MASTER")


      this.booking_deal_api.forEach((value, index, array) => {
        value.customer = value.customer.replace(/\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g, ',')
      });
    });
  }
}
