import { ValoracionService } from './../../../servicios/valoracion.service';
import { LocalstorageService } from './../../../servicios/localstorage.service';
import { SitiosService } from './../../../servicios/sitios.service';
import { Sitio, Valoracion, Usuario } from './../../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-cercadeti',
  templateUrl: './cercadeti.page.html',
  styleUrls: ['./cercadeti.page.scss'],
})
export class CercadetiPage implements OnInit {
  list:Sitio[]=[];
  url:string;
  login:boolean;
  colorDef = 'light';
  colorSel = 'warning';
  listVal:Valoracion[]=[];
  user:Usuario;
  
  constructor(
    private serSitio:SitiosService,
    private serValoracion:ValoracionService,
    private storage:LocalstorageService,
    private alertCtrl:AlertController,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController
  ) { 
    this.url = serSitio.url;
  }

  ngOnInit() {
    this.cargarSitios();
    this.login = JSON.parse(this.storage.get("loginIn"));
    this.user = this.storage.get("datos");
    this.cargarValoraciones();
  }

  ionViewWillEnter(){
    this.menuCtrl.swipeGesture(false, 'principal');
  }
    
  cargarSitios(){
    this.serSitio.getSitios().subscribe( data =>{
      this.list.push(...data);
      console.log(this.list);
    });
  }

  cargarValoraciones(){
    this.listVal = [];
    this.serValoracion.getValoraciones().subscribe(data=>{
      this.listVal = data;
    });
  }

  comprobarValidacionUser( idSitio:number ){
    let id = this.user.id_user;
    let ok : boolean = false;
    this.listVal.forEach(elem => {
      if(elem.id_user == id && elem.id_sitio == idSitio){
        ok = true;
      }
    });
    return ok;
  }

  valorarSitio(calificacion:number, item){
    console.log("Puntos: " + calificacion + " Sitio: "+ item.id_sitio);
    this.colorDef = 'warning';
    this.colorSel = 'light'; 
    if(this.login){
      if(this.comprobarValidacionUser(item.id_sitio)){
        this.presentAlert(item.id_sitio, calificacion);
      }else{
        this.nuevaValoracion(item.id_sitio, calificacion);
      }
    }else{
      this.presentToast("Inicia Sesión para valorar este Sitio");
    }
    this.cargarValoraciones();
  }

  async presentToast(message:string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }


  presentAlert(id_sitio, calificacion){
    this.alertCtrl.create({ 
      header:"Notificación",
      message:"Desea cambiar la calificación del este sitio?",
      buttons:[
        {
          text:"Sí 😎",
          handler:()=>{
            let datos = {
              id_sitio: id_sitio,
              id_user: this.user.id_user,
              puntos: calificacion,
              estado: 'A'
            }
            this.serValoracion.putValorar(datos).subscribe( data => {
              console.log("Respuesta: " + JSON.stringify(data));
              this.presentToast("Se guardo la Calificación");
            });  
          }
        },
          {text:"No 😣"}
      ]
    }).then(alertEl=>alertEl.present());
  }


  nuevaValoracion(id_sitio, calificacion){
    let datos = {
      id_sitio: id_sitio,
      id_user: this.user.id_user,
      puntos: calificacion,
      estado: 'A'
    }
    this.serValoracion.postValorar(datos).subscribe(
      data=>{
        console.log(data);
        this.presentToast("Se guardo la Calificación");
      }
    );
  }
}
