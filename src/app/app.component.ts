import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'Firebase';
import { HomePage } from '../pages/home/home';

const config = {
  apiKey: "AIzaSyA0-CnAUalMV8-3fI3RKd1ewIQyRYF4HVU",
  authDomain: "gastos-31af7.firebaseapp.com",
  databaseURL: "https://gastos-31af7.firebaseio.com",
  projectId: "gastos-31af7",
  storageBucket: "gastos-31af7.appspot.com",
  messagingSenderId: "755394959442"
};
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

    });
    firebase.initializeApp(config);
  }
}
