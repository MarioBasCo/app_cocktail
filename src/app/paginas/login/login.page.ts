import { LocalstorageService } from './../../servicios/localstorage.service';
import { LoginService } from './../../servicios/login.service';
import { Login, Usuario } from './../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  datosUser:Usuario;
  user:string;
  clave:string;
  showPassword = false;
  passwordToggleIcon = 'eye-off-outline';

  constructor(
    private router:Router, 
    private serLg:LoginService, 
    private toastController: ToastController,
    private storage:LocalstorageService,
    private menuCtrl:MenuController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.menuCtrl.swipeGesture(false, 'principal');
  }

  irRegistro(){
    this.router.navigate(['/signup']);
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
    if(this.passwordToggleIcon == 'eye-off-outline'){
      this.passwordToggleIcon = 'eye-outline';
    }else{
      this.passwordToggleIcon = 'eye-off-outline';
    }
  }

  irApp(){
    let credenciales:Login={nombre:this.user, clave:this.clave}; 
    
    this.serLg.login(credenciales).subscribe( res =>{
      if(res['status'] === "true"){
        const propertyValues = Object.values(res['userdata']);
        let obj = JSON.stringify(propertyValues);
        let obj2 = obj.replace("[","").replace("]","");
        this.datosUser = JSON.parse(obj2);
        this.storage.set("loginIn", true);
        this.storage.set("datos",this.datosUser);
        this.router.navigate(['/tabs']);
      }else{
        this.presentToast(res['message']);
      }
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
