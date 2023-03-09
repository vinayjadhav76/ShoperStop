import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { cart, prod } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {
  productData: undefined | prod | any;
  productQuantity: number = 1;
  removeCart = false;
  cartData: prod | undefined;
  constructor(private activeRoute: ActivatedRoute, private prodservice: ProductService) { }

  ngOnInit() {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    // console.warn(productId);
    productId && this.prodservice.getProduct(productId).subscribe((result) => {
      // console.warn(result);
      this.productData = result;
      let cartData = localStorage.getItem('localCart')
      if (productId && cartData) {
        let items = JSON.parse(cartData)
        items = items.filter((item: prod) => productId == item.id.toString())
        // console.warn("items", items);

        if (items.length) {
          this.removeCart = true;
        } else {
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.prodservice.getCartList(userId);
        this.prodservice.cartData.subscribe((result) => {
          let item = result.filter((item: prod) => productId?.toString() === item.productId?.toString())
          if (item.length) {
            this.cartData = item[0];
            this.removeCart = true;
          }
        })
      }

    })

  }

  handleQuantity(val: string) {
    if (this.productQuantity < 20 && val === "plus") {
      this.productQuantity += 1;
    } else if (this.productQuantity > 1 && val === "min") {
      this.productQuantity -= 1
    }
  }

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        // console.warn(this.productData);
        this.prodservice.localAddToCart(this.productData);
        this.removeCart = true
      } else {
        // console.warn("user is logged in");
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        // console.warn("userID",userId);
        let cartData: cart = {
          ...this.productData,
          userId,
          productId: this.productData.id
        }
        delete cartData.id;
        // console.warn(cartData);
        this.prodservice.addToCart(cartData).subscribe((result) => {
          if (result) {
            // alert("Product added in Cart")
            this.prodservice.getCartList(userId);
            this.removeCart = true;
          }
        })

      }
    }
  }

  removeToCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.prodservice.removeItemFromCart(productId);
      
    } else {
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      console.warn(this.cartData);
      this.cartData && this.prodservice.removeToCart(this.cartData.id)
        .subscribe((result) => {
          if (result) {
            this.prodservice.getCartList(userId);
          }
        })
        this.removeCart = false;
    }

  }
}