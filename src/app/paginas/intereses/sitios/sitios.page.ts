import { SitiosRecomendados } from './../../../interfaces/interfaces';
import { SitiosRecomendadosService } from './../../../servicios/sitios-recomendados.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { SitiosModalPage } from '../sitios-modal/sitios-modal.page';

@Component({
  selector: 'app-sitios',
  templateUrl: './sitios.page.html',
  styleUrls: ['./sitios.page.scss'],
})
export class SitiosPage implements OnInit {
  lista:SitiosRecomendados[]=[];

  constructor(
    private sr:SitiosRecomendadosService,
    private modalCtrl:ModalController
  ) { }

  ngOnInit() {
    this.sr.getSitiosRecomendados().subscribe(
      data =>{
        console.log(data);
        this.lista = data;
      }
    );
  }

  async abrirModalMap(item){
    const modal = await this.modalCtrl.create({
      component: SitiosModalPage,
      componentProps: {
        obj: item
      }
    });

    await modal.present();
    //const data = await modal.onDidDismiss();
  }

}
