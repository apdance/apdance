import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SigninPage } from './signin';
import {FooterBarComponent} from "../../components/footer-bar/footer-bar";

@NgModule({
  declarations: [
    SigninPage,
  ],
  imports: [
    IonicPageModule.forChild(SigninPage),
      FooterBarComponent
  ],
})
export class SigninPageModule {}
