import { Component } from '@angular/core';
import { prod } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent {

constructor( private prodservice : ProductService ){}
addProductMessage:string|undefined;

  newProd(data: prod) {
    // console.warn(data);
    this.prodservice.addProduct(data).subscribe((res)=>{
      console.warn(res);  
      if(res){
        this.addProductMessage="Product Added Successfully"
      }
    });

    setTimeout(() => {
      this.addProductMessage=undefined
    }, 3000);
  }

  
  
}
