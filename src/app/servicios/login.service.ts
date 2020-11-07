import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login, Usuario } from '../interfaces/interfaces';
import { webservice } from './../global-variable';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
/*   path_base = "http://104.214.50.71/bielapp";
  url = "http://104.214.50.71/bielapp/login.php";
  urlReg = "http://104.214.50.71/bielapp/app.php"; */

  path_base = webservice;
  url = this.path_base+"/login.php";
  urlReg = this.path_base+"/app.php";

  lg: boolean = false;

  constructor(private http:HttpClient) { }

  login(user:Login){
    return this.http.post(this.url, user);
  }

  regitrarUser(user:Usuario){
    return this.http.post(this.urlReg, user)
  }
  
}
