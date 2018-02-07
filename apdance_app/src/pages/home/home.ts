import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
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

    constructor(public navCtrl: NavController, private navParams: NavParams, private api:ApiconnectProvider) {
        if(!isEmpty(navParams.get("user"))){
            this.user = navParams.get("user");
        }
    }

    teste(){
        this.api.api_check_session().subscribe(d=>{
            this.test = d;
            console.log("d",d)
        }, error=>{
            this.test = error
        })
    }



    sair() {
        localStorage.removeItem('token');
        this.navCtrl.setRoot(AutenticationPage);
    }
}
