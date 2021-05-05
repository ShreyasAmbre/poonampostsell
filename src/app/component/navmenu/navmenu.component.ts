import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.scss'],
})
export class NavmenuComponent implements OnInit {
  navigate: any;

  constructor( public storage: Storage, public router:Router) { }

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
          {
            title: "Customers",
            child : [
              {
                title : "OutStanding Report",
                url   : "/outstandingreport",
                icon  : "file-tray-stacked-outline"
              },
              {
                title : "Other Charges Report",
                url   : "/otherchargesreport",
                icon  : "wallet-outline"
              },
              {
                title : "UnRegistered Report",
                url   : "/unregisteredreport",
                icon  : "person-remove-outline"
              },
            ]
          },
        ]
      },
      {
        title : "Logout",
        url   : "/",
        icon  : "log-out-outline"
      },
    ]
  }

  async logout(){
    this.storage.create();
    await this.storage.remove("username");
    this.router.navigateByUrl("/")
  }
}
