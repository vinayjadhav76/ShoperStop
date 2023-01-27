import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
prodList:any=[];
  constructor( private prodservice:ProductService ) { }

  ngOnInit(): void {
    this.prodservice.listProduct().subscribe((res)=>{
      // console.warn(res);      
      this.prodList = res;
    })
  }
  deleteProd(id:number){
// console.warn(id);
this.prodservice.deleteProduct(id).subscribe((res)=>{
  
})

  }
}
