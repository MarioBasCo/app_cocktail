import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cocktail } from '../interfaces/cocktaildb';

@Injectable({
  providedIn: 'root'
})
export class ApicoctelService {
  urlAPI = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
  
  constructor(private http:HttpClient) { }

  getRandom(){
    return this.http.get<[Cocktail]>(this.urlAPI);
  }

  search(value:string){
    let newUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+value;
    return this.http.get<[Cocktail]>(newUrl);
  }

  getCotelApi(){
    fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
  
        // Examine the text in the response
        response.json().then(function(data) {
          console.log(data);
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }
}
