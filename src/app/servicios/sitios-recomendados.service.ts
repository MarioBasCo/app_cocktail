import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SitiosRecomendados } from '../interfaces/interfaces';
import { webservice } from './../global-variable';

@Injectable({
  providedIn: 'root'
})
export class SitiosRecomendadosService {
  url = webservice+'/sitios/recomendados.php';
  
  constructor(private http:HttpClient) { }

  getSitiosRecomendados(){
    return this.http.get<[SitiosRecomendados]>(this.url);
  }
}
