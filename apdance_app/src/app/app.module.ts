import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {AutenticationPage} from "../pages/autentication/autentication";
import {SigninPage} from "../pages/signin/signin";
import {ComponentsModule} from "../components/components.module";
import { ApiconnectProvider } from '../providers/apiconnect/apiconnect';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
      AutenticationPage,
      SigninPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
      ComponentsModule,
      HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
      AutenticationPage,
      SigninPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiconnectProvider,
  ]
})
export class AppModule {}
