/**
 * Money Mask
 */
import {Injectable} from '@angular/core';
import {isObject} from "rxjs/util/isObject";
import {variable} from "@angular/compiler/src/output/output_ast";

export function isEmpty(variable:any | null | undefined): Boolean{
    console.log('variable', variable)
    if(isObject(variable)){
        return (Object.keys(variable).length == 0)
    }else if(Array.isArray(variable)){
        return (variable.length == 0)
    }
    return (variable === undefined || variable == null || variable == false || variable == '')
}



@Injectable()
export class UtilComponent {
    constructor(){}
    private n: any;
    private len: any;

    maskMoney(v): string {
        if (v) {
            this.n = v[v.length - 1];
            if (isNaN(this.n)) {
                v = v.substring(0, v.length - 1);
                return v;
            }
            v = this.fixAmount(v);
            return v;
        }
    }

    private fixAmount(a): string {
        let period = a.indexOf(".");
        if (period > -1) {
            a = a.substring(0, period) + a.substring(period + 1);
        }
        this.len = a.length;
        while (this.len < 3) {
            a = "0" + a;
            this.len = a.length;
        }
        a = a.substring(0, this.len - 2) + "." + a.substring(this.len - 2, this.len);
        while (a.length > 4 && (a[0] == '0')) {
            a = a.substring(1)
        }
        if (a[0] == ".") {
            a = "0" + a;
        }
        return (a);
    }

    getHistory(){
        try{
            return JSON.parse(localStorage.get('history_propostas'));
        }catch (e){
            return {};
        }
    }

    setHistory(historyItem:any){
        if(isEmpty(localStorage.get('history_propostas'))){
            localStorage.set('history_propostas', JSON.stringify({historyItem}))
        }



    }

}
