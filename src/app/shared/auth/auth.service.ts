import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
// import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private router: Router,
    public http: HttpClient,
    ) {}

  login(email:any, password:any){
    //localStorage.setItem('authenticated', 'true');
    //this.router.navigate([routes.adminDashboard]);
    let URL= URL_SERVICIOS +"/auth/login";
    return this.http.post(URL,{email:email, password:password}).pipe(
      map((auth:any) => {
        console.log(auth);
        const result= this.saveLocalStorage(auth);
        return result;
      }),
      catchError((error:any) =>{
        console.log(error);
        return of(undefined)
      })
    );
  }

  saveLocalStorage(auth:any){
    if(auth && auth.acces_token){
      localStorage.setItem("token", auth.acces_token);
      localStorage.setItem("user", JSON.stringify(auth.user));
      localStorage.setItem('authenticated', 'true'); //Aqui se realiza la redireccion
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authenticated");
    this.router.navigate([routes.login]);
  }

}

