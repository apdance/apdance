import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import {AutenticationPage} from "../pages/autentication/autentication";
import {SigninPage} from "../pages/signin/signin";
import {ApiconnectProvider} from "../providers/apiconnect/apiconnect";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private api:ApiconnectProvider) {
    //verificar sessao local
    let token: Boolean | string = false;

    if(token = api.api_local_getSessionToken()){
       //ir para a tela inicial
        this.rootPage = HomePage;
    }else{
        //registrar-se ou logar
        this.rootPage = SigninPage;
    }



    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

