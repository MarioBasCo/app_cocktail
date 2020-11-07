import { LocalstorageService } from './../../servicios/localstorage.service';
import { Comentarios, Usuario } from './../../interfaces/interfaces';
import { ComentariosService } from './../../servicios/comentarios.service';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  obj;
  url:string;
  user:Usuario;
  listComent:Comentarios[]=[];
  comentario:string;

  constructor(
    private modalCtrl:ModalController,
    private comentarios:ComentariosService,
    private ls:LocalstorageService,
    private toastCtrl:ToastController,
    private params:NavParams
  ) { 
    this.obj = this.params.get("obj");
    this.url = this.comentarios.base;
    console.log(this.obj);
  }

  ngOnInit() {
    this.user = this.ls.get("datos");
    console.log(this.user);
    this.cargarComentarios();
  }

  cargarComentarios(){
    this.comentarios.getComentarios(this.obj.id_coctel).subscribe(
      data=>{
        if(data['status']=="nulo"){
          console.log("sin comentarios")
        }else{
          this.listComent = JSON.parse((JSON.stringify(data))); 
          console.log(this.listComent);
        }
      }
    );
  }

  dismiss(){
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  sub_formulario(){
    if(this.user == null){
      this.presentToast("Inicia sesión para comentar");
    }else{
      this.guadarComentario();
    }
  }

  guadarComentario(){
    let data={
      id_coctel: this.obj.id_coctel,
      id_user:   this.user.id_user,
      detalle:   this.comentario,
      estado:    'A'
    }
    this.comentarios.addComentario(data).subscribe(
      data=>{
        if(data['status'] == "success"){
          this.presentToast("Se publicó tu comentario");
          console.log(data);
          this.comentario = "";
          this.cargarComentarios();
        }else{
          this.presentToast("Error al publicar tu comentario");
        }
      }
    );
  }

  async presentToast(message:string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
