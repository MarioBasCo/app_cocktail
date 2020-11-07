import { Router } from '@angular/router';
import { AlertController, ToastController, MenuController, IonSlides } from '@ionic/angular';
import { LoginService } from './../../servicios/login.service';
import { Usuario } from './../../interfaces/interfaces';
import { Component, OnInit, ViewChild } from '@angular/core';
import { webservice } from './../../global-variable';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  clave:string="";
  user:string="";
  confirmar:string="";
  img:string="";
  telefono:string="";
  direccion:string="";
  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';
  fechaActual = new Date();
  customPickerOptions: any;
  url:string;

  listaRol=[
    {id:1, nombre:"Ninguno"},
    {id:2, nombre:"Camarero"},
    {id:3, nombre:"Barman"},
    {id:4, nombre:"Bartender"},
    {id:5, nombre:"Mixólogo"}
  ];
  idRol=1;

  slideOpts = {
    centeredSlides: true,
    slidesPerView: 3
  };

  listAvatar=[
    {id:1, img:"/upload/user/default-chico.png"},
    {id:2, img:"/upload/user/default-chica.png"},
    {id:3, img:"/upload/user/avatar2-user.png"},
    {id:4, img:"/upload/user/user-avatar-woman.png"},
    {id:5, img:"/upload/user/user-avatar.png"},
    {id:6, img:"/upload/user/avatar-chica2.png"}
  ];
  
  @ViewChild('slides', {static: true}) slides: IonSlides;
  
  constructor(
    private toastController: ToastController,
    private registro:LoginService,
    private router:Router,
    private alertCtrl:AlertController,
    private menuCtrl:MenuController
  ) { 
    this.url = webservice;
    this.customPickerOptions = {  
      buttons: [{  
        text: 'CANCELAR',
        role: 'cancel',  
        handler: () => {
          return false;
        }  
      }, {  
        text: 'ACEPTAR',  
        handler: (event) => { 
          this.fechaActual = this.obtenerFecha(event);
          console.log(this.fechaActual);
        }  
      }] 
    }
  }

  ngOnInit() {
    this.slides.isBeginning().then(data=>{
      if(data === true){
        this.img = this.listAvatar[0].img;
        console.log(this.img);
      }
    });
  }

  ionViewWillEnter(){
    this.menuCtrl.swipeGesture(false, 'principal');
  }

  slideChanged(e: any) {
    this.slides.getActiveIndex().then((index: number) => {
      console.log(this.listAvatar[index].img);
      this.img = this.listAvatar[index].img;
    });
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
    if(this.passwordToggleIcon == 'eye-off-outline'){
      this.passwordToggleIcon = 'eye-outline';
    }else{
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }

  obtenerFecha(event){
    let dia = event.day.value;
    let mes = event.month.value;
    let anio = event.year.value;
    let fecha = new Date();
    fecha.setDate(dia);
    fecha.setMonth(mes-1);
    fecha.setFullYear(anio);
    return fecha;
  }

  registrarse(){
    let hoy = new Date().toISOString().slice(0, 10).replace('T', ' ');
    let fechaUI = this.fechaActual.toISOString().slice(0, 10).replace('T', ' ');
    let fechaBD = '0000-00-00';
    
    if(hoy == fechaUI){
      //fechaBD = fechaUI;
      this.presentToast("Debes ingresar tu fecha de nacimiento");
      return;
    }

    const convertAge = new Date(fechaUI);
    const timeDiff = Math.abs(Date.now() - convertAge.getTime());
    let showAge = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    console.log(showAge);

    if(showAge < 18){
      this.presentToast("Debes ser mayor de edad");
      return;
    }else{
      fechaBD = fechaUI;
    }
      
    
    if(this.direccion == ""){
      this.direccion = null;
    }
    if(this.telefono == ""){
      this.telefono = null;
    }

    if(this.validarPassword()){
      let newUser:Usuario={
        id_user:null,
        nombre:this.user,
        clave:this.clave,
        img_user:this.img,
        fecha_naci:fechaBD,
        id_rol:this.idRol,
        direccion:this.direccion,
        telefono:this.telefono
      };
      console.log(newUser);
      //Aqui va la insert en la BD
      this.registro.regitrarUser(newUser).subscribe(
        data => {
          console.log(data);
          this.presentAlert("Bienvenido","Usuario Registrado con exito, ingresa tus credenciales de acceso");
          this.router.navigate(['/login']);
        }
      );
    }else{
      this.presentToast("Verifique la contraseña");
    }
    
  }

  validarPassword(){
    let ok = false;
    if(this.clave === this.confirmar){
      ok = true;
    }
    return ok;
  }

  async presentAlert(header:string, message:string) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header,
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
