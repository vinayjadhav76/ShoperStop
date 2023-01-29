import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { prod } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent {
  productData: undefined | prod
  constructor(private activerouter: ActivatedRoute, private productservice: ProductService) { }

  ngOnInit() {
    let productId = this.activerouter.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.productservice.getProduct(productId).subscribe((data:any) => {
      console.warn(data)
      this.productData = data;
    })
  }
  UpdateProd(data: any) {

  }
}
