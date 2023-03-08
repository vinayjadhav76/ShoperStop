import { Component } from '@angular/core';
import { cart, prod, signUp } from '../data-type';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {
  showLogin: boolean = true;
  authErr: string = '';

  constructor(private userService: UserService, private prodservice: ProductService) { }
  ngOnInit() {
    this.userService.userAuthReload();
  }
  signUp(data: signUp) {
    // console.warn(data);
    this.userService.user_Signup(data)
  }

  login(data: any) {
    // console.warn(data);
    this.userService.userLogin(data);
    this.userService.invalidUserAuth.subscribe((result) => {
      // console.warn("apple", result);
      if (result) {
        this.authErr = "Please enter valid data";
      } else {
        this.localcartToRemoveCart()
      }
    })
  }
  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }

  localcartToRemoveCart() {
    let data = localStorage.getItem('localCart')
    if (data) {
      let cartDataList: prod[] = JSON.parse(data);
      let user = localStorage.getItem('user');
      let userId = user && JSON.parse(user).id;
      cartDataList.forEach((product: prod,index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        };

        delete cartData.id;
        setTimeout(() => {
          this.prodservice.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.warn("item stored in DB");
            }
          })
          if(cartDataList.length===index+1){
            localStorage.removeItem('localCart')
          }
        }, 500);
      });
    }
  }
}
