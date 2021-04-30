import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {DatastoreService} from '../datastore.service';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {FiltermodalPage} from '../component/filtermodal/filtermodal.page'

@Component({
  selector: 'app-otherchargesreport',
  templateUrl: './otherchargesreport.page.html',
  styleUrls: ['./otherchargesreport.page.scss'],
})
export class OtherchargesreportPage implements OnInit {
  searchTerm:string = ""


  constructor(private http:HttpClient, public modalCtrl: ModalController, public datastoreservice:DatastoreService) { }

  async showFilterOthercharges() {

    const modal = await this.modalCtrl.create({
      component: FiltermodalPage,
      cssClass: 'my-customfilter-modal',
      componentProps: {'filterName': 'Other Charges Filter'}
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
