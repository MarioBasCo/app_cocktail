import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, MenuController, ModalController } from '@ionic/angular';
import { Cocteles } from '../interfaces/interfaces';
import { ComentariosPage } from '../paginas/comentarios/comentarios.page';
import { CoctelesService } from '../servicios/cocteles.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  subscribe:any;
  type: string;
  textoBuscar:string='';
  listaPubli:Cocteles[]=[];
  url:string;
  @ViewChild(IonInfiniteScroll) infitniteScroll: IonInfiniteScroll;
  
  constructor(
    private menuCtrl: MenuController,
    private serCocteles: CoctelesService,
    private modalCtrl: ModalController
  ) { 
  }

  ngOnInit() {
    this.url = this.serCocteles.path;
    this.type = 'coctel';
    this.cargarCocteles();
  }

  cargarCocteles(){
    this.serCocteles.getCocteles().subscribe( data=>{
      console.log(data);
      this.listaPubli = data;
    });
  }
  
  ionViewWillEnter(){
    this.menuCtrl.swipeGesture(false, 'principal');
  }
  

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  async abrirComentarios(item){
    const modal = await this.modalCtrl.create({
      component: ComentariosPage,
      componentProps: {
        obj:item
      }
    });

    await modal.present();
    
    const data = await modal.onDidDismiss();
    console.log(data);
    if(data.data['dismissed']==true){
      console.log("todo bien");
      this.cargarCocteles();
    }
  }

  doRefresh(event) {  
    console.log('Pull Event Triggered!');  
    setTimeout(() => {
      this.cargarCocteles();
      event.target.complete();
    }, 1500); 
  }

}