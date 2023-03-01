import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, observable } from 'rxjs';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';
import { EventEmitter } from '@angular/core';

type NewType = boolean;

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggingError = new EventEmitter<boolean>(false);
  isSignInError = new EventEmitter<boolean>(false);
  seller_url = "http://localhost:3000/seller";

  constructor(private _http: HttpClient, private router: Router) { }

  userSignUp(data: signUp) {
    this._http.post(this.seller_url, data, { observe: 'response' }).subscribe((result) => {
      this.isSellerLoggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(result.body));
      this.router.navigate(['seller-home']);
      console.warn("result", result);
    })
    return false;
  }


  reloadSeller() {
    if (localStorage.getItem('seller')) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home'])
    }
  }

  userLogin(data: login) {
    console.warn(data);
    this._http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result: any) => {
      console.warn(result);
      if (result && result.body && result.body.length) {
        alert("Login Successful");
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);
        setTimeout(() => {
          localStorage.removeItem('seller')
          console.warn("seller removed");
          this.router.navigate([''])
        }, 300000);
      } else {
        alert("Login failed");
        this.isLoggingError.emit(true);
      }
    })
  }
}
