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

    request:any = {
        'token':localStorage.getItem('token')
    }

    cadastro_ok:Boolean = false;

    constructor(public navCtrl: NavController, private navParams: NavParams, private api:ApiconnectProvider) {
        if(!isEmpty(navParams.get("user"))){
            this.user = navParams.get("user");

            console.log("user", this.user)

            if(!isEmpty(this.user.user_id)){
                this.cadastro_ok = true;
            }
        }else{
            this.api.api_check_session().subscribe(data=>{
                console.log(data)

                if(data.vinculo){
                    this.cadastro_ok = true;
                }
            })
        }

    }

    vincular(){
        this.api.api_request_vincular_organizacao(this.request).subscribe(data=>{
            if(data.success){
                this.cadastro_ok = true;
            }
        })

    }



    sair() {
        localStorage.removeItem('token');
        this.navCtrl.setRoot(AutenticationPage);
    }
}
