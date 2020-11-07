import { LocalstorageService } from './../../../servicios/localstorage.service';
import { SitiosService } from './../../../servicios/sitios.service';
import { SubirImagenService } from './../../../servicios/subir-imagen.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { Geolocation } from '@capacitor/core';

@Component({
  selector: 'app-nuevo-sitio',
  templateUrl: './nuevo-sitio.page.html',
  styleUrls: ['./nuevo-sitio.page.scss'],
})
export class NuevoSitioPage implements OnInit {
  form: FormGroup;
  uploadResponse;
  img:string;
  nombre:string;
  telefono:string;
  direccion:string;
  longitud: number;
  latitud: number;
  apertura: string;
  cierre: string;

  constructor(
    private formBuilder: FormBuilder, 
    private uploadService: SubirImagenService,
    private modalCtrl: ModalController,
    private sitio:SitiosService,
    private alertCtrl:AlertController,
    private toastCtrl: ToastController,
    private ls:LocalstorageService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.latitud = position.coords.latitude;
    this.longitud = position.coords.longitude;
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('avatar', this.form.get('avatar').value);

    this.uploadService.uploadImg(formData).subscribe(
      (res) => {
        this.uploadResponse = res;
        console.log(res);
      },
      (err) => {  
        console.log(err);
      }
    );
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  sub_formulario(){
    if(this.uploadResponse == null){
      this.alertas("Error", "Suba una imagen");
    } else if (this.uploadResponse.status == "success"){
      console.log(this.uploadResponse.directory);
      this.img = this.uploadResponse.directory; 
      let obj = {
        id_user : this.ls.get("datos").id_user,
        id_sitio: null,
        nombre_sitio: this.nombre,
        telefeno: this.telefono,
        ubicacion: this.direccion,
        latitud: this.latitud,
        longitud: this.longitud,
        sitio_img: this.img
      }
      console.log(obj); 
      this.sitio.postSitio(obj).subscribe(data =>{
        console.log(data);
        this.presentToast("Se Agrego tu Sitio");
        this.dismiss();
      });
    }else{
      this.alertas("Error", "Vuelva a subir una imagen valida");
    }
  }

  async presentToast(message:string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  alertas(header:string, message:string){
    this.alertCtrl.create({ 
      header,
      message,
      buttons:[
        {
          text:"OK",
          handler:()=>{
          }
        }
      ]
    }).then(alertEl=>alertEl.present());
  }
}
