import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sitio } from '../interfaces/interfaces';
import { webservice } from './../global-variable';

@Injectable({
  providedIn: 'root'
})
export class SitiosService {
  //url = "http://104.214.50.71/bielapp";
  url = webservice;

  constructor(private http:HttpClient) { }

  getSitios(){
    let newUrl = this.url+'/sitios.php'
    return this.http.get<[Sitio]>(newUrl);
  }

  postSitio(sitio){
    let newUrl = this.url+'/sitios.php'
    return this.http.post(newUrl, sitio);
  }
}
