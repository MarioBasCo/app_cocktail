import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cocteles } from '../interfaces/interfaces';
import { webservice } from './../global-variable';

@Injectable({
  providedIn: 'root'
})
export class CoctelesService {
  
  path = webservice;
  
  constructor(private http:HttpClient) { }

  nuevoCoctel(data){
    let newUrl=this.path+"/usuarios/newcoctel.php";
    return this.http.post(newUrl, data);
  }

  getCocteles(){
    let newUrl=this.path+"/usuarios/newcoctel.php";
    return this.http.get<[Cocteles]>(newUrl);
  }
}
