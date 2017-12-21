import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApiconnectProvider} from "../../providers/apiconnect/apiconnect";
import {isEmpty} from "../../components/util/util";
import {HomePage} from "../home/home";

/**
 * Generated class for the AutenticationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-autentication',
    templateUrl: 'autentication.html',
})
export class AutenticationPage {

    user: any = {
        email: '',
        passwd: ''
    }

    error: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiconnectProvider, private alert: AlertController) {

    }

    login() {
        this.api.api_request_login(this.user).subscribe(data => {
            if (data.success) {
                if(!isEmpty(data.token)){
                    let tokenInsert = this.api.api_local_setSessionToken(data.token)
                    console.log("token", tokenInsert);
                    if(tokenInsert){
                        this.navCtrl.setRoot(HomePage);
                    }
                }
                return;
            }

            let alert =  this.alert.create({
                message: data.msg,
                title: "Verifique as credenciais."
            })

            alert.present();

        }, error => {
            this.error = error
            console.log(error)
        })
    }

}
