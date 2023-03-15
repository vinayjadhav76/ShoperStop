import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  totalPrice: number | undefined;
  cartData: cart[] | undefined;
  constructor(private prodservice: ProductService, private router: Router) { }

  ngOnInit() {
    this.prodservice.currentCart().subscribe((result) => {
      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.totalPrice = price + (price / 10) + 100 - (price / 10);
      console.warn(this.totalPrice);
    })
  }

  orderNow(data: { email: string, address: string, contact: string }) {
    // console.warn(data);
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }
      this.cartData?.forEach((item)=>{ 
        // this.prodservice.deleteCartItems(item.id)
      })
      this.prodservice.orderNow(orderData).subscribe((result) => {
        if (result) {
          alert("Order Placed")
          console.warn(result);
          this.router.navigate(['/my-orders'])
        }
      })
    }
  }

}
