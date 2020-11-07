import { SitiosRecomendados } from './../../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
declare var Microsoft:any;

@Component({
  selector: 'app-sitios-modal',
  templateUrl: './sitios-modal.page.html',
  styleUrls: ['./sitios-modal.page.scss'],
})
export class SitiosModalPage implements OnInit {
  obj:SitiosRecomendados;

  constructor(
    private params:NavParams,
    private modalCtrl:ModalController
  ) { 
    this.obj = this.params.get('obj');
  }

  ngOnInit() {
    this.cargarMapa();
  }

  ionViewDidEnter(){
    
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  cargarMapa(){
    var map = new Microsoft.Maps.Map(
      document.getElementById('idMap'),
      {
        center: new Microsoft.Maps.Location(this.obj.latitud, this.obj.longitud),
        zoom: 12
      }
    );
    this.dibujarMarker(map);
  }

  dibujarMarker(map){
    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), { title: this.obj.nombre_sitio});
    map.entities.push(pushpin);
  }

}
