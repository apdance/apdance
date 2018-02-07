import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AutenticationPage} from "../autentication/autentication";
import {ApiconnectProvider} from "../../providers/apiconnect/apiconnect";
import {HttpErrorResponse} from "@angular/common/http";

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

    request:any = {
        'user_name':'',
        'user_email':'',
        'user_login':'',
        'user_passwd':'',
        'user_phone_number':'',
        'user_date_birth':'',
        'user_access_type':''
    }

    AuthPage: any = AutenticationPage;

    constructor(public navCtrl: NavController, public navParams: NavParams, private api: ApiconnectProvider, private alert: AlertController) {
        this.api.api_request_access_type().subscribe(d=>{
            this.access_type = d.data;
        }, e=>{

        })
    }

    cadastro(){
        let alert = this.alert.create({title:"Cadastro"})
        this.api.api_request_cadastro(this.request).subscribe(data=>{

            alert.setMessage(data.msg)
            alert.present()

            alert.onDidDismiss(d=>{
                this.request = {}
            })

        }, error=>{
            console.log(error)
        })
    }



}
