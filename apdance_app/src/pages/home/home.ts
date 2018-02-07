import {Component} from '@angular/core';
import {Config, NavController, NavParams} from 'ionic-angular';
import {AutenticationPage} from "../autentication/autentication";
import {isEmpty} from "../../components/util/util";
import {ApiconnectProvider} from "../../providers/apiconnect/apiconnect";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    user:any;
    test:any;

    request:any = {}

    constructor(public navCtrl: NavController, private navParams: NavParams, private api:ApiconnectProvider) {
        if(!isEmpty(navParams.get("user"))){
            this.user = navParams.get("user");
        }

        if(isEmpty(this.user)){
            this.user = JSON.parse(localStorage.getItem("config"));
        }
    }

    vincular(){

    }



    sair() {
        localStorage.removeItem('token');
        this.navCtrl.setRoot(AutenticationPage);
    }
}
