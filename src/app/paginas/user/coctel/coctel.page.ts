import { Router } from '@angular/router';
import { LocalstorageService } from './../../../servicios/localstorage.service';
import { CoctelesService } from './../../../servicios/cocteles.service';
import { ToastController } from '@ionic/angular';
import { ImgcoctelService } from './../../../servicios/imgcoctel.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-coctel',
  templateUrl: './coctel.page.html',
  styleUrls: ['./coctel.page.scss'],
})
export class CoctelPage implements OnInit {
  form: FormGroup;
  uploadResponse;
  id_usuario: number;
  img:string;
  titulo:string;
  ingredientes:string;
  preparacion:string;

  
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private local:LocalstorageService,
    private serImg: ImgcoctelService,
    private toastCtrl:ToastController,
    private serCoctel:CoctelesService
  ) { }

  ngOnInit() {
    this.id_usuario = this.local.get("datos").id_user;
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.form.get('avatar').value);

    this.serImg.uploadImg(formData).subscribe(
      (res) => {
        this.uploadResponse = res;
        console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }

  sub_formulario(){
    if(this.uploadResponse == null){
      this.presentToast("Se requiere de una imagen");
    }else if (this.uploadResponse.status == "success"){
      this.grabar();
    }else{
      this.presentToast("Se requiere de una imagen");
    }
  }

  grabar(){
    this.img = this.uploadResponse.directory;
    //console.log(this.titulo+" "+this.ingredientes+" "+this.preparacion+" "+this.img);
    let data={
      id_user:      this.id_usuario,
      nombre:       this.titulo,
      imagen:       this.img,
      ingredientes: this.ingredientes,
      preparacion:  this.preparacion
    }

    this.serCoctel.nuevoCoctel(data).subscribe(resp =>{
      if(resp['status'] == 'success'){
        console.log(resp);
        this.router.navigate(['/profile']);
        this.presentToast("Se Añadió tu cóctel");
      }else{
        this.presentToast("Error al subir el cóctel");
      }
    });
  }

  async presentToast(message:string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

}
