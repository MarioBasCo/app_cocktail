import { MenuController } from '@ionic/angular';
import { BeerService } from './../../../servicios/beer.service';
import { Cerveza } from './../../../interfaces/interfaces';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-alcohol',
  templateUrl: './alcohol.page.html',
  styleUrls: ['./alcohol.page.scss'],
})
export class AlcoholPage implements OnInit {
  lista:Cerveza[]=[];
  url:string;

  constructor(private serBeer:BeerService, private menuCtrl:MenuController) { 
    this.url = serBeer.url;
  }

  ngOnInit() {
    this.serBeer.getTodos().subscribe( data =>{
      this.lista = data;
    });
  }

  ionViewWillEnter(){
    this.menuCtrl.swipeGesture(false, 'principal');
  }

}
