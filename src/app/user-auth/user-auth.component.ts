import { Component } from '@angular/core';
import { signUp } from '../data-type';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent {

constructor( private userService : UserService ){}

  signUp(data: signUp) {
    // console.warn(data);
    this.userService.user_Signup(data)
  }



}
