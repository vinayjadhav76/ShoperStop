import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { prod } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
import { resourceLimits } from 'worker_threads';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: string = "default"
  sellerName: string = '';
  searchResult: undefined | prod[]

  constructor(private route: Router, private prodservice: ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      // console.warn(val.url);
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name
          // console.warn(this.sellerName);

          // console.warn("in seller area");
          this.menuType = 'seller'
        } else {
          // console.warn("outside seller area");
          this.menuType = 'default'
        }
      }
    })
  }

  logOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['']);
  }

  searchProduct(data: KeyboardEvent) {
    if (data) {
      const element = data.target as HTMLInputElement;
      // console.warn(element.value);
      this.prodservice.searchProduct(element.value).subscribe((data) => {
        // console.warn(data);
        if(data.length > 5){
          data.length = 5
        }
        this.searchResult = data;
      })
    }
  }
  hideSearch() {
    this.searchResult = undefined
  }
  submitSearch(val:string){
    // console.warn(val);
    this.route.navigate([`search/${val}`])
  }
}
