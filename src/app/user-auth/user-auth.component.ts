import { Component } from '@angular/core';
import { BlobOptions } from 'buffer';
import { signUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {
  showLogin: boolean = true;
  constructor(private userService: UserService) { }
  ngOnInit() {
    this.userService.userAuthReload();
  }
  signUp(data: signUp) {
    // console.warn(data);
    this.userService.user_Signup(data)
  }

  login(data: any) {
    // console.warn(data);
this.userService.userLogin(data)
  }
  openSignUp() {
    this.showLogin = false
  }
  openLogin() {
    this.showLogin = true
  }
}
