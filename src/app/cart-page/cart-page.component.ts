import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, pricesummery } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent implements OnInit {
  cartData: cart[] | undefined;
  priceSummery: pricesummery = {
    price: 0,
    discount: 0,
    tax: 0,
    delivery: 0,
    total: 0
  }

  constructor(private prodservice: ProductService , private router:Router) { }

  ngOnInit() {
    this.prodservice.currentCart().subscribe((result) => {
      // console.warn(result);
      this.cartData = result
      let price = 0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * + item.quantity)
        }
      })
      this.priceSummery.price = price;
      this.priceSummery.discount = price / 10;
      this.priceSummery.tax = price / 10;
      this.priceSummery.delivery = 100;
      this.priceSummery.total = price + (price / 10) + 100 - (price / 10)
      console.warn(this.priceSummery);
    })
  }

  checkOut(){
    this.router.navigate(['/checkout'])
  }
}
