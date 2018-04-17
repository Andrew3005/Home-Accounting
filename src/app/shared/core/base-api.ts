import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";

@Injectable()
export class BaseApi {
    constructor(public http: HttpClient) { }

    baseUrl = 'http://localhost:3000/';

    private getUrl(url: string): string {
        return this.baseUrl + url;
    }

    public get(url: string): Observable<any> {
        return this.http.get(this.getUrl(url))
    }

    public post(url: string = '', data: any = {}): Observable<any> {
        return this.http.post(this.getUrl(url), data);
    }

    public put(url: string = '', data: any = {}): Observable<any> {
        return this.http.put(this.getUrl(url), data);
    }
}