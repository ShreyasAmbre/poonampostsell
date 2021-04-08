import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailbooking',
  templateUrl: './detailbooking.page.html',
  styleUrls: ['./detailbooking.page.scss'],
})
export class DetailbookingPage implements OnInit {
  booking_id: string = ""
  constructor() { }

  ngOnInit() {
  }

}
