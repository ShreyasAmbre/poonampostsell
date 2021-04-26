import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DatastoreService } from 'src/app/datastore.service';

@Component({
  selector: 'app-filtersummary',
  templateUrl: './filtersummary.page.html',
  styleUrls: ['./filtersummary.page.scss'],
})
export class FiltersummaryPage implements OnInit {
  project_master = []
  selected_project: string = ""



  constructor(public modalCtrl: ModalController, public http:HttpClient, public datastoreservice: DatastoreService,) { }

  ngOnInit() {
    this.getProjectMaster()

  }

  dismiss() {
    this.modalCtrl.dismiss();
  }


  getProjectMaster(){
    let data = {
      "_w":{
            status: 1
      }
    }
    this.http.post("https://software.poonamdevelopers.in/Apis/read/project_master", data)
    .subscribe((response:any)=>{

      this.project_master = response.data
      console.log(this.project_master)

    }, (errors) => {
      console.log("Server Issue", errors.message)
    })
  }


}
