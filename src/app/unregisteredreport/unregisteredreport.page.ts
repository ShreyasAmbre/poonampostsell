import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {FilterunregisteredreportPage} from './filterunregisteredreport/filterunregisteredreport.page';
import {DatastoreService} from '../datastore.service';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-unregisteredreport',
  templateUrl: './unregisteredreport.page.html',
  styleUrls: ['./unregisteredreport.page.scss'],
})
export class UnregisteredreportPage implements OnInit {

  constructor(private http:HttpClient, public modalCtrl: ModalController, public datastoreservice:DatastoreService) { }

  async showFilterUnregistered() {
    
    const modal = await this.modalCtrl.create({
      component: FilterunregisteredreportPage,
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
