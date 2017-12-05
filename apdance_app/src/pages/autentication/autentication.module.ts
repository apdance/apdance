import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AutenticationPage } from './autentication';

@NgModule({
  declarations: [
    AutenticationPage,
  ],
  imports: [
    IonicPageModule.forChild(AutenticationPage),
  ],
})
export class AutenticationPageModule {}
