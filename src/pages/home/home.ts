import { Component } from '@angular/core';
import { NavController,AlertController ,ToastController} from 'ionic-angular';
import * as firebase from 'Firebase';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  saldos = firebase.database().ref("Saldos/");
  gastos = firebase.database().ref('Gastos/');
  categorias = firebase.database().ref('Categorias/');
  personas = firebase.database().ref('Personas/');

  infoForm: FormGroup;
  Categorias : any;
  Personas : any;
  Gastos : any;
  Saldo : any;
  key : any;
  GastoTotal = 'Aun no cargan datos';

  constructor(
    public navCtrl: NavController,
    private formBuilder: FormBuilder,
    public toastCtrl : ToastController,
    public alertController: AlertController) {

      this.infoForm = this.formBuilder.group({
        'Nombre' : [null, Validators.required],
        'Categoria' : [null, Validators.required],
        'Fecha' : [null, Validators.required],
        'Persona' : [null, Validators.required],
        'Monto' : [null, Validators.required],
      });
    this.gastos.on('value', resp => {
      this.Gastos = [];
      let gasto = snapshotToArray(resp);
      this.Gastos = gasto;
      this.GastoTotal = 0;
      for (let i in this.Gastos) {
         this.GastoTotal = Number(this.GastoTotal) + Number(this.Gastos[i].Monto);
      }
      console.log(this.GastoTotal);
    });
    this.categorias.on('value', resp => {
      this.Categorias = [];
      this.Categorias = snapshotToArray(resp);
    });
    this.personas.on('value', resp => {
      this.Personas = [];
      this.Personas = snapshotToArray(resp);
    });
    this.saldos.on('value', resp => {
      let Saldos = snapshotToArray(resp);
      console.log(Saldos)
      this.Saldo = Saldos[0].Cantidad;
      this.key = Saldos[0].key;
    });

  }

  async delete(key) {
    const alert = await this.alertController.create({
      title: 'Estas segur@?!',
      message: 'Quieres borrar esta comunicacion?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('cancel');
          }
        }, {
          text: 'Okey',
          handler: () => {
            firebase.database().ref('infos/'+key).remove();
          }
        }
      ]
    });
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Gasto añadido correctamente!',
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }
  addGasto() {
    let newInfo = firebase.database().ref('Gastos/').push();
    newInfo.set(this.infoForm.value);
    this.presentToast();
    //this.router.navigate(['/home/']);
  }
  updateSaldo(key){
    let alert = this.alertController.create({
      title: 'Actualizar el saldo',
      inputs: [
        {
          name: 'Cantidad',
          placeholder: 'Saldo disponible actualmente'
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
          text: 'Actualizar',
          handler: data => {

              let cantidad = { Cantidad : data.Cantidad};
              let newInfo = firebase.database().ref('Saldo/'+key).update(cantidad);

          }
        }
      ]
    });
    alert.present();


  }
  addCategoria(){
    let alert = this.alertController.create({
      title: 'Añadir una categoria',
      inputs: [
        {
          name: 'Nombre',
          placeholder: 'Nombre de la categoria'
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
              let Ctgoria = { Nombre : data.Nombre};
              let newInfo = firebase.database().ref('Categorias/').push();
              newInfo.set(Ctgoria);//valores );
          }
        }
      ]
    });
    alert.present();


  }
  addPersona(){
    let alert = this.alertController.create({
      title: 'Añadir una Persona',
      inputs: [
        {
          name: 'Nombre',
          placeholder: 'Nombre de la Persona'
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
              let Ctgoria = { Nombre : data.Nombre};
              let newInfo = firebase.database().ref('Personas/').push();
              newInfo.set(Ctgoria);//valores );
          }
        }
      ]
    });
    alert.present();


  }
  sugerencias(){
    this.navCtrl.push('SugerenciasPage');
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
