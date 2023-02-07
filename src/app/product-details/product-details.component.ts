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
  constructor(private activeRoute: ActivatedRoute, private prodservice: ProductService) { }

  ngOnInit() {
    let productId = this.activeRoute.snapshot.paramMap.get('productId');
    console.warn(productId);

    productId && this.prodservice.getProduct(productId).subscribe((result)=>{
      console.warn(result);
      this.productData=result
    })
    
  }
}
