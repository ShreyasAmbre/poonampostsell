import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {FilterotherchargesPage} from './filterothercharges/filterothercharges.page';
import {DatastoreService} from '../datastore.service';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-otherchargesreport',
  templateUrl: './otherchargesreport.page.html',
  styleUrls: ['./otherchargesreport.page.scss'],
})
export class OtherchargesreportPage implements OnInit {

  constructor(private http:HttpClient, public modalCtrl: ModalController, public datastoreservice:DatastoreService) { }

  async showFilterOthercharges() {
    
    const modal = await this.modalCtrl.create({
      component: FilterotherchargesPage,
      cssClass: 'my-customfilter-modal'
    });
    return await modal.present();
  }

  ngOnInit() {
  }

  filterItems(searchTerm) {
    console.log("555555555")
    if(searchTerm == ""){
      this.datastoreservice.othercharges_apidata = this.datastoreservice.filter_othercharges_apidata
    }else{
      this.datastoreservice.othercharges_apidata = this.datastoreservice.othercharges_apidata
      this.datastoreservice.othercharges_apidata = this.datastoreservice.othercharges_apidata.filter(item => {
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
