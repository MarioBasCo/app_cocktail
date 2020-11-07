import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LoginService } from './../../servicios/login.service';
import { LocalstorageService } from './../../servicios/localstorage.service';
import { Usuario } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'infouser',
  templateUrl: './infouser.component.html',
  styleUrls: ['./infouser.component.scss'],
})
export class InfouserComponent implements OnInit {
  datosUsuario:Usuario;
  rol:string;
  edad: string;
  url:string;
  listaRol=[
    {id:1, nombre:"Ninguno"},
    {id:2, nombre:"Camarero"},
    {id:3, nombre:"Barman"},
    {id:4, nombre:"Bartender"},
    {id:5, nombre:"Mixólogo"}
  ];
  constructor(
    private storage:LocalstorageService, 
    private lg:LoginService,
    private menuCtrl:MenuController,
    private router:Router
  ) { 
    this.url = this.lg.path_base;
  }

  ngOnInit() {
    this.cargarInformacion();
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(true);
  }

  ionViewDidLeave(){
    this.menuCtrl.enable(false);
  }

  cargarInformacion(){
    this.datosUsuario = this.storage.get("datos");
    if(this.datosUsuario.fecha_naci == '0000-00-00'){
      this.edad = '--';
    }else{
      let hoy = new Date()
      let fechaNacimiento = new Date(this.datosUsuario.fecha_naci)
      let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
      let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
      if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--
      }
      this.edad = edad.toString();
    }
    if(this.datosUsuario.direccion == null || this.datosUsuario.direccion==""){
      this.datosUsuario.direccion = "No ha agregado dirección";
    }
    if(this.datosUsuario.img_user == null || this.datosUsuario.img_user ==""){
      this.datosUsuario.img_user = "/upload/user/default.png";
    }
    for (let i=0; i<this.listaRol.length; i++){
      if(this.listaRol[i].id == this.datosUsuario.id_rol){
        this.rol = this.listaRol[i].nombre;   
      }
    } 
  }

  crearCoctel(){
    this.router.navigate(['/coctel']);
  }
}
