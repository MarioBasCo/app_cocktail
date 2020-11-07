import { MenuController } from '@ionic/angular';
import { SitiosService } from './../servicios/sitios.service';
import { Component } from '@angular/core';
import { Geolocation } from '@capacitor/core';
import { Sitio } from '../interfaces/interfaces';
declare var Microsoft:any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  latitud:number=0;
  longitud:number=0;
  lista:Sitio[]=[]
  constructor(private serSitio:SitiosService, private menuCtrl:MenuController) { }

  ngOnInit() {
    this.serSitio.getSitios().subscribe(data =>{
      this.lista = data;
      console.log(this.lista);
    });
  }
  
  ionViewDidEnter(){
    this.cargarMapa();
  }

  ionViewWillEnter(){
    this.menuCtrl.swipeGesture(false, 'principal');
  }

  async cargarMapa(){
    const position = await Geolocation.getCurrentPosition();
    this.latitud = position.coords.latitude;
    this.longitud = position.coords.longitude;
    var map = new Microsoft.Maps.Map(
      document.getElementById('myMap'),
      {
        center: new Microsoft.Maps.Location(this.latitud, this.longitud),
        zoom: 12
      }
    );
    this.dibujarMarker(map);
    this.lista.forEach(el =>{
      this.mostrarSitios(map, el.latitud, el.longitud, el.nombre_sitio);
    });
  }

  dibujarMarker(map){
    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(),  {color: 'blue', title: 'Mi Ubicacion'});
    map.entities.push(pushpin);
  }

  mostrarSitios(map, latitud, longitud, nombre){
    var pushpin = new Microsoft.Maps.Pushpin(
      new Microsoft.Maps.Location(latitud, longitud),
      { color: 'red', title: nombre }
    );
    map.entities.push(pushpin);
  }
  

}
