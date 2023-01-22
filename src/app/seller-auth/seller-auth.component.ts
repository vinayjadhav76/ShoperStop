import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {

  constructor(private sellerAuth: SellerService , private router:Router) { }

  ngOnInit(): void {}

  signUp(data: object) 
  {
    // console.warn(data);
    this.sellerAuth.userSignUp(data).subscribe((res)=>{
      // console.warn(res);
      
          this.router.navigate(['seller-home'])
      
    });
  }

}
