import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {AutenticationPage} from "../autentication/autentication";
import {ApiconnectProvider} from "../../providers/apiconnect/apiconnect";

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html',
})
export class SigninPage {

    sign_stap_1: true;
    sign_stap_2: true;

    access_type: any;

    AuthPage: any = AutenticationPage;

    constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiconnectProvider) {
    }



}
