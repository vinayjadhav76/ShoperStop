import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { prod } from '../data-type';
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

  constructor(private activeRoute: ActivatedRoute, private prodservice: ProductService) { }

  ngOnInit() {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);
    productId && this.prodservice.getProduct(productId).subscribe((result) => {
      console.warn(result);
      this.productData = result;
    })
    let cartData = localStorage.getItem('localCart')
    if (productId && cartData) {
      let items = JSON.parse(cartData)
      items = items.filter((item: prod) => productId == item.id.toString())
      if (items.length) {
        this.removeCart = true;
      } else {
        this.removeCart = false;
      }
    }
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
      }
    }
  }

  removeToCart(productId: number) {
    this.prodservice.removeItemFromCart(productId)
    this.removeCart = false
  }
}