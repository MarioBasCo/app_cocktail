import { LocalstorageService } from './../../../servicios/localstorage.service';
import { SitiosUserService } from './../../../servicios/sitios-user.service';
import { Sitio } from './../../../interfaces/interfaces';
import { NuevoSitioPage } from './../nuevo-sitio/nuevo-sitio.page';
import { Component, OnInit } from '@angular/core';
import { ModalController, MenuController } from '@ionic/angular';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  objNew: Sitio;
  segment: string = 'user';
  sitios:Sitio[]=[];
  url:string;

  constructor(
    private modalCtrl:ModalController,
    private menuCtrl:MenuController,
    private lu:LocalstorageService,
    private serSU:SitiosUserService
  ) { 
    this.url = serSU.urlPath;
  }

  ngOnInit() {
    this.cargarSitios();
  }

  cargarSitios(){
    console.log(this.lu.get("datos"));
    
    let id = this.lu.get("datos").id_user;
    console.log(id);
    this.serSU.getMisSitios(id).subscribe(data=>{
      console.log(data);
      this.sitios = data;
    });
  }

  ionViewWillEnter(){
    this.menuCtrl.swipeGesture(false, 'principal');
  }

  async agregarSitio(){
    const modal = await this.modalCtrl.create({
      component: NuevoSitioPage,
      componentProps: {
        
      }
    });

    await modal.present();
    //const data = await modal.onDidDismiss();
  }

  doRefresh(event) {  
    console.log('Pull Event Triggered!');  
    setTimeout(() => {
      this.cargarSitios();
      event.target.complete();
    }, 1500); 
  }  

}
