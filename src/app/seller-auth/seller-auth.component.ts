import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { login, signUp } from '../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {
  toggleLogin = false;

  constructor(private sellerAuth: SellerService, private router: Router) { }

  ngOnInit(): void {
    this.sellerAuth.reloadSeller()
  }

  signUp(data: signUp) {
    // console.warn(data);
    this.sellerAuth.userSignUp(data)
  }

  login(data: login) {
    // console.warn(data);
   this.sellerAuth.userLogin(data)
  
  }

  showLogin() {
    this.toggleLogin = !this.toggleLogin
  }

}
