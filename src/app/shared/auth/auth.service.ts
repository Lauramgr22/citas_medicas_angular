import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
// import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';

interface token {
  access_token: string | undefined
  token_type: string
  user: User
}

export interface User {
  id: number
  name: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | undefined;
  token: string | undefined;

  constructor(
    private router: Router,
    public http: HttpClient,
  ) {
    this.getLocalStorage();
  }

  getLocalStorage() {

    const USER = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    if (token && USER) {
      this.user = JSON.parse(USER);
      this.token = token;
    } else {
      this.user = undefined;
      this.token = undefined;

    }
  }

  login(email: string, password: string) {
    //localStorage.setItem('authenticated', 'true');
    //this.router.navigate([routes.adminDashboard]);
    let URL = URL_SERVICIOS + "/auth/login";
    return this.http.post(URL, { email: email, password: password }).pipe(
      map((auth: any) => {
        console.log(auth);
        const result = this.saveLocalStorage(auth);
        return result;
      }),
      catchError((error: any) => {
        console.log(error);
        return of(undefined)
      })
    );
  }

  saveLocalStorage(auth: token) {

    if (auth && auth.access_token) {
      localStorage.setItem("token", auth.access_token);
      localStorage.setItem("user", JSON.stringify(auth.user));
      localStorage.setItem('authenticated', 'true'); //Aqui se realiza la redireccion
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authenticated");
    this.router.navigate([routes.login]);
  }

}

