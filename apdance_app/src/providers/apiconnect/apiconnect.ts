import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Observable} from "rxjs/Observable";
import {HttpClient} from "@angular/common/http";

export const apiUrl: string = 'http://67.205.134.191:2222'

/*
  Generated class for the ApiconnectProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiconnectProvider {

  constructor(public http: HttpClient) {

  }

  api_check_session():Observable<any>{
    return this.http.get(`${apiUrl}/AuthServices/checkSession`)
  }

  api_request_access_type(): Observable<any>{
      return this.http.get(`${apiUrl}/ConfigServices/app_access_type`)
  }

}
