import { FormsModule } from '@angular/forms';
import { CoctelesComponent } from './cocteles/cocteles.component';
import { InfouserComponent } from './infouser/infouser.component';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [ InfouserComponent, CoctelesComponent ],
    imports: [ IonicModule, CommonModule, FormsModule ],
    exports: [ InfouserComponent, CoctelesComponent ]
})
export class ComponentsModule{}