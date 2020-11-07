import { ApicoctelService } from './../../servicios/apicoctel.service';
import { Cocktail } from './../../interfaces/cocktaildb';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-cocteles',
  templateUrl: './cocteles.component.html',
  styleUrls: ['./cocteles.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class CoctelesComponent implements OnInit {
  listaCocteles:Cocktail[] = [];
  textoBuscar:string='';
  @ViewChild(IonInfiniteScroll) infitniteScroll: IonInfiniteScroll;
  
  constructor(private serCoctel:ApicoctelService) { }

  ngOnInit() {
    this.cargarDatos();
    console.log(this.listaCocteles);
  }

  cargarDatos(){
    for(let i=0; i<5; i++){
      this.serCoctel.getRandom().subscribe(d =>{
        this.listaCocteles.push(d["drinks"][0]);
      });
    }
  }

  doRefresh(event){
    console.log(event);
    setTimeout(() => {
      this.listaCocteles = [];
      this.cargarDatos();
      event.target.complete();
    }, 2000);
  }

  buscarCoctel(event){
    this.infitniteScroll.disabled = true;
    this.textoBuscar = event.detail.value;
    console.log(this.textoBuscar);
    this.serCoctel.search(this.textoBuscar).subscribe(
      data => {
        this.listaCocteles = data['drinks'];
        console.log(data);
      }
    );
  }

  loadData(event){
    console.log("Cargando siguientes...");

    setTimeout(() => {
      if (this.listaCocteles.length > 15){
        event.target.complete();
        this.infitniteScroll.disabled = true;
        return;
      }

      this.cargarDatos();
      console.log(this.listaCocteles);

      event.target.complete();
    }, 1000);
  }

}
