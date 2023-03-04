import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Data, Router } from '@angular/router';
import { prod } from 'src/app/data-type';
import { ProductService } from 'src/app/services/product.service';
// import { resourceLimits } from 'worker_threads';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: string = "default";
  sellerName: string = '';
  searchResult: undefined | prod[];
  userName: string = '';
  cartItems = 0;
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
        }
        else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name
          this.menuType = 'user'
        }
        else {
          // console.warn("outside seller area");
          this.menuType = 'default'
        }
      }
    });
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length
    }
    this.prodservice.cartData.subscribe((items) => {
      this.cartItems = items.length
    })
  }

  logOut() {
    localStorage.removeItem('seller');
    this.route.navigate(['']);
  }
  userLogout() {
    localStorage.removeItem('user')
    this.route.navigate(['/user-auth'])
  }

  searchProduct(data: KeyboardEvent) {
    if (data) {
      const element = data.target as HTMLInputElement;
      // console.warn(element.value);
      this.prodservice.searchProduct(element.value).subscribe((data) => {
        // console.warn(data);
        if (data.length > 5) {
          data.length = 5
        }
        this.searchResult = data;
      })
    }
  }
  redirectToDetails(id: number) {
    this.route.navigate(['/details/' + id])
  }

  hideSearch() {
    this.searchResult = undefined
  }
  submitSearch(val: string) {
    // console.warn(val);
    this.route.navigate([`search/${val}`])

  }


}
