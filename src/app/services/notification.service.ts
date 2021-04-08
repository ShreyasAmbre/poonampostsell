import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification = []
  constructor() { }

  setNotification(data){
    this.notification.push(data)
    console.log(this.notification, "from notification services after Set Value")
  }

  getNotification(){
    return this.notification
  }

  getNotificatinoCount(){
    return this.notification.length
  }
}
