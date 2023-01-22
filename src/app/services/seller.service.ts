import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SellerService {
seller_url="http://localhost:3000/seller"
  constructor( private _http:HttpClient ) { }

  userSignUp(data:any){
      return this._http.post(this.seller_url,data)
  }
}
