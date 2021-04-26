import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { Router } from '@angular/router';
import{SessionStorageService} from 'ngx-webstorage';
import { forkJoin } from 'rxjs';

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
      cssClass: 'my-custom-class',
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  ngOnInit() {
    // this.getWeather()
    let sessionData = this.sessionST.retrieve("logged-in");
    console.log(sessionData)
    if(sessionData){
      this.router.navigateByUrl('/dashboard')
    }
  }


  login(data){
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
        this.router.navigateByUrl('/dashboard')
      }else{
        this.ErrormsgAlert("User Not Present")
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
