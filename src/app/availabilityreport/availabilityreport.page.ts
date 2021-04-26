import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatastoreService } from '../datastore.service';
import {FilteravailabilityreportPage} from './filteravailabilityreport/filteravailabilityreport.page'

@Component({
  selector: 'app-availabilityreport',
  templateUrl: './availabilityreport.page.html',
  styleUrls: ['./availabilityreport.page.scss'],
})
export class AvailabilityreportPage implements OnInit {
  availabilityData_status = false


  constructor(public modalCtrl: ModalController, public datastoreservice:DatastoreService) { }

  async showFilterAvailability() {
    const modal = await this.modalCtrl.create({
      component: FilteravailabilityreportPage,
      cssClass: 'my-customfilter-modal'
    });
    return await modal.present();
  }

  ngOnInit() {
    
  }

}
