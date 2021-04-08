import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../../services/notification.service'

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  noti_count = 0;
  constructor(private noti:NotificationService) { }

  ngOnInit() {
    this.noti_count = this.noti.getNotificatinoCount()
    console.log("Notification Value From Component",this.noti_count)
  }
}
