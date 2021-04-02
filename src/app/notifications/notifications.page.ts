import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../services/notification.service'

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  noti_data = []

  constructor(private noti: NotificationService) { }

  ngOnInit() {
    this.getAllNotifications()
  }

  getAllNotifications(){
    this.noti_data = this.noti.getNotification()
  }
}
