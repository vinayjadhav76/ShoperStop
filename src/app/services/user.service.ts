import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { signUp } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user_url = "http://localhost:3000/users";
  constructor(private http: HttpClient, private router: Router) { }

  user_Signup(user: signUp) {
    return this.http.post(this.user_url, user, { observe: 'response' })
      .subscribe((res) => {
        console.warn(res);
        if (res) {
          localStorage.setItem('user', JSON.stringify(res.body))
          this.router.navigate(['/'])
        }
      })
  }

}
