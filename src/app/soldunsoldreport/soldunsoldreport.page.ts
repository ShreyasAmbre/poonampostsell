import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {FiltersoldunsoldPage} from './filtersoldunsold/filtersoldunsold.page';
import {DatastoreService} from '../datastore.service';
import { Observable, forkJoin } from 'rxjs';


@Component({
  selector: 'app-soldunsoldreport',
  templateUrl: './soldunsoldreport.page.html',
  styleUrls: ['./soldunsoldreport.page.scss'],
})
export class SoldunsoldreportPage implements OnInit{

  data_status = false

  constructor(private http:HttpClient, public modalCtrl: ModalController, public datastoreservice:DatastoreService) { }

  async showFilterSoldUnsold() {
    
    const modal = await this.modalCtrl.create({
      component: FiltersoldunsoldPage,
      cssClass: 'my-customfilter-modal'
    });
    return await modal.present();
  }

  ngOnInit() {
  }

  filterItems(searchTerm) {
    console.log("555555555")
    if(searchTerm == ""){
      this.datastoreservice.outstandingbooking_apidata = this.datastoreservice.filter_outstandingbooking_apidata
    }else{
      this.datastoreservice.outstandingbooking_apidata = this.datastoreservice.filter_outstandingbooking_apidata
      this.datastoreservice.outstandingbooking_apidata = this.datastoreservice.outstandingbooking_apidata.filter(item => {
        return item.first_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 ||
        item.flatNo.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      });
    }
  }

  sendId(id){
    console.log(id, "BOOKING ID")
    this.datastoreservice.set_booking_id(id)
  }
}
