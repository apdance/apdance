import {Observable} from "rxjs/Observable";
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/do';

import {
    HttpHandler, HttpInterceptor, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent
} from "@angular/common/http";
import {HttpRequest} from "@angular/common/http";
import {AlertController} from "ionic-angular";
import {isEmpty} from "../../components/util/util";
import {versao} from "./apiconnect";

export var authorizedUser:Boolean = false;


@Injectable()
export class DoHttpInterceptor implements HttpInterceptor{

    constructor(private alert: AlertController){
        authorizedUser = !isEmpty(this.getTokenAuth());
    }


    //baseUrl:string = "https://api.maxxcard.com.br";



    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

        console.log("req.headers.get", req.headers)
        let headers:any = {
            'X-API-KEY': '40b7466e8d493d9d563aab8bf4f0ff163632ae5d',
            'X-APP-VER':versao,
            'Content-Type': 'application/json'
        };

        /*if(!isEmpty(this.getTokenAuth())){
            //vem do localStorage
            headers.Authorization = this.getTokenAuth();
        }else if(!isEmpty(req.headers.get("Authorization"))){
            //vem de uma requisição
            headers.Authorization = req.headers.get("Authorization")
        }*/



        let CustomRequest = req.clone({
            setHeaders: headers
        });

        console.log('processrequest', CustomRequest);
        return next.handle(CustomRequest)
            .do(
                success=>{},
                error=>{
                    switch(error.status){
                        case 401:
                            if(confirm("É necessário fazer login para ter acesso às informações do sistema.")){
                                this.clearSession()
                            }

                            break;
                        case 403:
                            this.clearSession();
                            console.log("403", error)
                            let alert = this.alert.create({title: "Erro de autenticação", message: !isEmpty(error.error.msg) ? error.error.msg : 'Desculpe, você não tem permissão para acessar esta página. Faça login e tente novamente.'})
                            //alert.setBackButtonText("Fazer Login")
                            //alert.present()
                            break;
                        default:
                            //alert('Um erro interno impediu o funcionamento correto do sistema.');

                    }
                }
            )
    }

    private clearSession(){
        try{
            localStorage.removeItem('auth')
            localStorage.removeItem('user')
            return true
        }catch(e){
            return false
        }
    }

    private getTokenAuth(){
        try{
            let token = localStorage.getItem('auth')
            return isEmpty(token) ? '': token;
        }catch(e){
            return '';
        }
    }

}