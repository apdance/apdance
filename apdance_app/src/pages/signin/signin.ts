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
        this.api.api_check_session().subscribe(session => {
            if(session.success === true){
                this.initForSessionIsActive()
            }else{
                this.initForSessionIsInactive()
            }

        }, error=>{
            this.initForSessionIsInactive()
        })
    }

    initForSessionIsActive() {
        this.navCtrl.push(AutenticationPage)
    }

    initForSessionIsInactive() {


        //Configurar a tela de cadastro
        this.api.api_request_access_type().subscribe(data => {
            console.log("data.data", data.data);
            this.access_type = data.data;
        }, error => {
            console.log("Error", error)
        })
    }


}
