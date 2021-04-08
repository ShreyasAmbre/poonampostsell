import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss'],
})
export class NavmenuComponent implements OnInit {
  navigate: any;

  constructor() { }

  ngOnInit() {
    this.sideMenu();
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Dashboard",
        children: [
          {
            title : "Projects Dashboard",
            url   : "/dashboard",
            icon  : "bar-chart-outline"
          },
        ]
      },
      {
        title : "Post Sales",
        children: [
          {
            title : "All Booking",
            url   : "/allbooking",
            icon  : "list-outline"
          },
          {
            title : "Create Booking",
            url   : "/booking",
            icon  : "add-circle-outline"
          },
        ]
      },
      {
        title : "Reports",
        children: [
          {
            title : "Summary Report",
            url   : "/summaryreport",
            icon  : "file-tray-full-outline"
          },
          {
            title : "Availability Report",
            url   : "/availabilityreport",
            icon  : "bed-outline"
          },
          {
            title : "Sold/UnSold Report",
            url   : "/soldunsoldreport",
            icon  : "swap-horizontal-outline"
          },
        ]
      },
      {
        title : "Login",
        url   : "/login",
        icon  : "log-in-outline"
      },
      {
        title : "Logout",
        url   : "/home",
        icon  : "log-out-outline"
      },
    ]
  }
}
