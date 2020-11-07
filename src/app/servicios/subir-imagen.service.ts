import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { webservice } from './../global-variable';

@Injectable({
  providedIn: 'root'
})
export class SubirImagenService {
  //url_servidor = "http://104.214.50.71/bielapp/imagenes.php";

  url_servidor = webservice+"/imagenes.php";

  constructor(private http: HttpClient) { }

  uploadImg(data) {
    //let uploadURL = `${this.SERVER_URL}/upload.php`;
    return this.http.post<any>(this.url_servidor, data);
  }
}
