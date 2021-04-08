import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {HttpClient} from "@angular/common/http"
import { Router } from '@angular/router';
import{SessionStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData={}
  role="admin";

  constructor(private http:HttpClient, public alertController: AlertController,
              private router: Router, private sessionST:SessionStorageService,) { }

  async presentAlert(errors) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: errors,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    let sessionData = this.sessionST.retrieve("logged-in");
    console.log(sessionData)
    if(sessionData){
      this.router.navigateByUrl('/dashboard')
    }
  }


  login(data){
    let postdata = {
      "username": data.username,
      "password": data.password,
    }

    this.http.post("https://software.poonamdevelopers.in/Authentication/auth", postdata)
    .subscribe((response:any)=>{
      this.userData = response
      if(this.userData){
        // console.log(response.data["role"])
        if(response){
          this.sessionST.store("Logged-in", this.userData);
          // this.dataservice.setData(this.userData)
          this.router.navigateByUrl('/dashboard')
        }else{
          this.router.navigateByUrl('/admindashboard')
        }
      }else{
        console.log("User Not Present")
      }
      console.log(response)
      }, (errors) => {
      this.presentAlert("Server Issue Or Invalid Credentials")
    })
  }

}
