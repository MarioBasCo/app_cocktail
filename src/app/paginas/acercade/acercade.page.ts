import { MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acercade',
  templateUrl: './acercade.page.html',
  styleUrls: ['./acercade.page.scss'],
})
export class AcercadePage implements OnInit {

  constructor(private menuCtrl:MenuController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.menuCtrl.swipeGesture(false, 'principal');
  }
}
