import { Component } from '@angular/core';
import { IonicPage,NavController, NavParams ,AlertController} from 'ionic-angular';
import * as firebase from 'Firebase';

/**
 * Generated class for the SugerenciasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sugerencias',
  templateUrl: 'sugerencias.html',
})
export class SugerenciasPage {
  Sugerencias : any;
  sugerencias = firebase.database().ref('Sugerencias/');
  constructor(public navCtrl: NavController, public navParams: NavParams,
  public alertController: AlertController) {
    this.sugerencias.on('value', resp => {
      this.Sugerencias = [];
      this.Sugerencias = snapshotToArray(resp);
    });
  }

  updateSugerencia(key){
    console.log("Se ha actualizado "+key);
  }
  addSugerencia(){
    let alert = this.alertController.create({
      title: 'Añadir una Sugerencia',
      inputs: [
        {
          name: 'Titulo',
          placeholder: 'Titulo de la sugerencia'
        },
        {
          name: 'Contenido',
          placeholder: 'Explicacion mas en detalle'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Añadir',
          handler: data => {
              let Ctgoria = { Titulo : data.Titulo, Contenido : data.Contenido};
              let newInfo = firebase.database().ref('Sugerencias/').push();
              newInfo.set(Ctgoria);//valores );
          }
        }
      ]
    });
    alert.present();
  }
  abrirSugerencia(contenido){

    let alert = this.alertController.create({
      title: 'Sugerencia',
      subTitle: contenido,
      buttons: ['Dismiss']
    });
    alert.present();
    }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });


  return returnArr;
}
