import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cerveza } from '../interfaces/interfaces';
import { webservice } from './../global-variable';
@Injectable({
  providedIn: 'root'
})
export class BeerService {
  url = webservice;

  constructor(private http:HttpClient) { }
  

  getTodos(){
    let newUrl = this.url+"/intereses/cervezas.php";
    return this.http.get<[Cerveza]>(newUrl);
  }
}
