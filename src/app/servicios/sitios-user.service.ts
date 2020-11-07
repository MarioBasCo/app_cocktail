import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sitio } from '../interfaces/interfaces';
import { webservice } from './../global-variable';

@Injectable({
  providedIn: 'root'
})
export class SitiosUserService {
  urlPath = webservice;
  url = this.urlPath+"/usuarios/misitio.php";
  
  constructor(private http:HttpClient) { }

  getMisSitios(id){
    let newUrl = this.url+"?id="+id;
    return this.http.get<[Sitio]>(newUrl);
  }
}
