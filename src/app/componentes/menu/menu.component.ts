import { LocalstorageService } from './../../servicios/localstorage.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ComponenteMenu } from 'src/app/interfaces/interfaces';
import { MenuService } from 'src/app/servicios/menu.service';
import { AlertController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  componentesMenu: Observable<ComponenteMenu[]>
  darkMode: boolean = true;
  login: boolean = true;
  colorSelect = 'warning';
  colorDefault = 'light';

  constructor(
    private menuService: MenuService,
    private router:Router,
    private alertCtrl: AlertController,
    private storage:LocalstorageService,
    private menuCtrl:MenuController
  ) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
    this.login = JSON.parse(this.storage.get("loginIn"));
  }

  ngOnInit() {
    this.recuperar();
    this.storage.set("dark", this.darkMode);
    this.darkMode = this.storage.get("dark");
  }

  recuperar(){
    this.componentesMenu=this.menuService.getMenu();
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(true, 'principal');
    this.menuCtrl.swipeGesture(false, 'principal');
  }

  ionViewDidLoad(){
   this.menuCtrl.enable(false, 'principal');
  }

  ionViewDidEnter(){
    this.login = JSON.parse(this.storage.get("loginIn"));
    console.log(this.login);
  }

  cambio() {
    this.darkMode = !this.darkMode;
    this.storage.set("dark", this.darkMode);
    document.body.classList.toggle( 'dark' );
  }

  irAInformacion(){
    this.router.navigate(['/acercade']);
  }

  irALogin(){
    if(JSON.parse(this.storage.get("loginIn")) === true){
      this.alertCtrl.create({ 
        header:"Sesión Activa",
        message:"Sí desea iniciar sesión con otra cuenta cierre la sesión actual",
        buttons:[
          {
            text:"OK 👍",
            handler:()=>{
            }
          }
        ]
      }).then(alertEl=>alertEl.present());
    }else{
      this.router.navigate(['/login']);
    }
    
  }

  irAPerfil(){
    if(JSON.parse(this.storage.get("loginIn")) === true){
      this.router.navigate(['/profile']);
    }else{
      this.alertCtrl.create({ 
        header:"Inicia Sesión",
        message:"Puedes iniciar sesión para que puedas añadir cocteles, sitios, calificar y comentar",
        buttons:[
          {
            text:"OK 👍",
            handler:()=>{
            }
          }
        ]
      }).then(alertEl=>alertEl.present());
    }
  }

  cerrarSesion(){
    if(JSON.parse(this.storage.get("loginIn")) === true){
      this.alertCtrl.create({ 
        header:"Cerrar Sesión",
        message:"¿Esta Seguro de Cerrar Sesión?",
        buttons:[
          {
            text:"Sí",
            handler:()=>{
              this.storage.set("loginIn", false);
              this.storage.remove("datos");
              //this.storage.clear();
              this.login = JSON.parse(this.storage.get("loginIn"));
            }
          },
          {text:"No"}
        ]
      }).then(alertEl=>alertEl.present());
    }else{
      this.alertCtrl.create({ 
        header:"Inicia Sesión",
        message:"No puedes cerrar cuando no hay sesión iniciada",
        buttons:[
          {
            text:"OK 👍",
            handler:()=>{
            }
          }
        ]
      }).then(alertEl=>alertEl.present());
    }
  }

}
