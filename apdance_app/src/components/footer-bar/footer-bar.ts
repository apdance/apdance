import { Component } from '@angular/core';

/**
 * Generated class for the FooterBarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'footer-bar',
  templateUrl: 'footer-bar.html'
})
export class FooterBarComponent {

  text: string;

  constructor() {
    console.log('Hello FooterBarComponent Component');
    this.text = 'App version 1.0.1 Build 2398.2017';
  }

}
