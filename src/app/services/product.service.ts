import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { cart, prod } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  prod_url = "http://localhost:3000/products"
  cartData = new EventEmitter<prod[] | []>();

  constructor(private http: HttpClient) { }


  addProduct(data: prod) {
    return this.http.post(this.prod_url, data)
  }

  listProduct() {
    return this.http.get(this.prod_url)
  }

  deleteProduct(id: number) {
    return this.http.delete(this.prod_url + '/' + id)
  }

  getProduct(id: any) {
    return this.http.get(this.prod_url + '/' + id)
  }

  updateProduct(product: prod) {
    return this.http.put(`${this.prod_url}/${product.id}`, product)
  }

  popularProduct() {
    return this.http.get("http://localhost:3000/products?_limit=3")
  }

  trendyPrducts() {
    return this.http.get("http://localhost:3000/products?_limit=8")
  }
  searchProduct(query: any) {
    return this.http.get<prod[]>(`http://localhost:3000/products?q=${query}`)
  }

  localAddToCart(data: prod) {
    let cartData;
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]))
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data)
      localStorage.setItem('localCart', JSON.stringify(cartData))
    }
    this.cartData.emit(cartData)
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      let items: prod[] = JSON.parse(cartData)
      items = items.filter((item: prod) => productId !== item.id)
      // console.warn(items);
      localStorage.setItem('localCart', JSON.stringify(items))
      this.cartData.emit(items)
    }
  }

  addToCart(cartData: cart) {
    return this.http.post("http://localhost:3000/cart", cartData);
  }
}
