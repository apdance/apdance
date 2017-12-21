import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {HttpClient, HttpParams} from "@angular/common/http";
import {isEmpty} from "../../components/util/util";

export const apiUrl: string = 'http://67.205.134.191';
export const versao: string = '1.0.1';

/*
  Generated class for the ApiconnectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiconnectProvider {

    constructor(public http: HttpClient) {

    }

    api_check_session(): Observable<any> {
        return this.http.get(`${apiUrl}/AuthServices/checkSession`)
    }

    api_request_access_type(): Observable<any> {
        return this.http.get(`${apiUrl}/ConfigServices/app_config_cadastro`)
    }

    api_request_login(user: any): Observable<any> {


        return this.http.post(`${apiUrl}/AuthServices/Login`, user)
    }

    //local config
    api_local_getSessionToken(){
        return !isEmpty(localStorage.getItem('token')) ? localStorage.getItem('token') : false;
    }

    api_local_setSessionToken(token){
        localStorage.setItem('token', token);
        return !isEmpty(this.api_local_getSessionToken());
    }

}
