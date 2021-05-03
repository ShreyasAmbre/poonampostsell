import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {HttpClient} from "@angular/common/http"
import { Router } from '@angular/router';
import{SessionStorageService} from 'ngx-webstorage';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userData={}
  role="admin";

  constructor(private http:HttpClient, public alertController: AlertController,
              private router: Router, private sessionST:SessionStorageService,
              public loadingController: LoadingController) { }

  async successmsgAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async ErrormsgAlert(msg) {
    const alert = await this.alertController.create({
      cssClass: 'errorAlert',
      header: 'Error',
      message: `<b>${msg}</b>`,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

  ngOnInit() {
    let sessionData = this.sessionST.retrieve("logged-in");
    console.log(sessionData)
    if(sessionData){
      this.router.navigateByUrl('/dashboard')
    }
  }


  login(data){
    this.presentLoading()
    console.log(data.username)
    console.log(data.password)
    let postdata = {
      "username": data.username,
      "password": data.password,
    }

    this.http.post("https://software.poonamdevelopers.in/Authentication/auth", {"username":data.username,"password":data.password})
    .subscribe((response:any)=>{
      console.log(response)

      this.userData = response

      if(response.errCode === -1){
        this.sessionST.store("Logged-in", this.userData);
        // this.dataservice.setData(this.userData)
        this.loadingController.dismiss()
        this.router.navigateByUrl('/dashboard')
      }else{
        this.ErrormsgAlert("Invalid User Credential")
      }
      }, (errors) => {
      this.ErrormsgAlert("Server Issue Or Invalid Credentials")
    })
  }




  // getWeather(){
  //   this.http.get("http://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=8f47e19e1c3289162cf56a9a7e8d2e77")
  //   .subscribe((response:any)=>{
  //     console.log(response, "WEATHER DATA")
  //   })
  // }



}
