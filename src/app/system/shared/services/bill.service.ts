import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from '@angular/common/http'

import { Bill } from "../models/bill.model";
import { BaseApi } from "../../../shared/core/base-api";

@Injectable()
export class BillService extends BaseApi {

    constructor(public http: HttpClient) {
        super(http);
    }

    updateBill(bill:Bill): Observable<Bill>{
        return this.put('bill', bill);
    }

    getBill(): Observable<any> {
        return this.get('bill');
    }

    getCurrency(base: string = 'USD'): Observable<any> {
        return this.http.get(`http://data.fixer.io/api/latest?access_key=4f174e5d088ca2ca250d4729f6e7c3d6&symbols=USD,RUB,EUR`)
    }
}