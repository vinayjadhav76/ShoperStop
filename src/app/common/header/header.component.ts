import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
menuType:string="default"
sellerName:string='';
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      // console.warn(val.url);
      if(val.url){
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name
          // console.warn(this.sellerName);
          
          // console.warn("in seller area");
          this.menuType = 'seller'
        } else {
          // console.warn("outside seller area");
          this.menuType='default'
        }
      }
    })   
  }

  logOut(){
      localStorage.removeItem('seller');
      this.route.navigate(['']);
  }
}
