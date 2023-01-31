import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { prod } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-selller-update-product',
  templateUrl: './selller-update-product.component.html',
  styleUrls: ['./selller-update-product.component.scss']
})
export class SelllerUpdateProductComponent {
  productData: undefined | prod;
  updateMessage: string = "";
  alert: boolean = false;
  constructor(private prodservice: ProductService, private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    let productId = this.activeRoute.snapshot.paramMap.get('id')
    console.warn(productId);
    this.prodservice.getProduct(productId).subscribe((data: any) => {
      console.warn(data);
      this.productData = data
    })
  }

  updateProd(data: prod) {
    console.warn(data);
    if (this.productData) {
      data.id = this.productData.id
    }
    this.prodservice.updateProduct(data).subscribe((res) => {
      this.alert = true
      // if (res) {
      //   this.updateMessage = "Product Updated Successfully"
      // }
    })
    // setTimeout(() => {
    //   this.updateMessage;
    // }, 3000);
  }

  closeAlert() {
    this.alert = false
  }
}
