import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { webservice } from './../global-variable';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  base = webservice;

  constructor(private http:HttpClient) { }

  getComentarios(id){
    let newUrl=this.base+"/comentarios.php?id="+id;
    return this.http.get(newUrl);
  }

  addComentario(data){
    let newUrl = this.base+"/comentarios.php";
    return this.http.post(newUrl, data);
  }
}
