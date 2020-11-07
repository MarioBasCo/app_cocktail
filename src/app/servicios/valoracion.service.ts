import { Valoracion } from './../interfaces/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { webservice } from './../global-variable';

@Injectable({
  providedIn: 'root'
})
export class ValoracionService {
  //url= 'http://104.214.50.71/bielapp/usuarios/valorarsitios.php';
  url = webservice + "/usuarios/valorarsitios.php";

  constructor(private http:HttpClient) { }

  getValoraciones(){
    return this.http.get<[Valoracion]>(this.url);
  }

  postValorar(data){
    return this.http.post(this.url, data);
  }

  putValorar(data){
    return this.http.put(this.url, data);
  }

}
