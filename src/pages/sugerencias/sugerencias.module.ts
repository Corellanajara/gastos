import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SugerenciasPage } from './sugerencias';

@NgModule({
  declarations: [
    SugerenciasPage,
  ],
  imports: [
    IonicPageModule.forChild(SugerenciasPage),
  ],
})
export class SugerenciasPageModule {}
