import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { webservice } from './../global-variable';

@Injectable({
  providedIn: 'root'
})
export class ImgcoctelService {

  url_servidor = webservice + "/subircoctel.php";

  constructor(private http: HttpClient) { }

  uploadImg(data) {
    //let uploadURL = `${this.SERVER_URL}/upload.php`;
    return this.http.post<any>(this.url_servidor, data);
  }
}
