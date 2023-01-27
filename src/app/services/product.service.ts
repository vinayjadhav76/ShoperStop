import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { prod } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  prod_url = "http://localhost:3000/products"
  constructor(private http: HttpClient) { }


  addProduct(data: prod) {
    return this.http.post(this.prod_url, data)
  }

  listProduct(){
    return this.http.get(this.prod_url)
  }

  deleteProduct(id:number){
return this.http.delete('http://localhost:3000/products/${id}')

  }
}