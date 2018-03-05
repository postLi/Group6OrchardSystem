// import {Http, RequestOptions, RequestMethod} from '@angular/http'
// import {Injectable} from '@angular/core';

// @Injectable()
// export class HttpService{
//     constructor(private http: Http){}

//     private baseUrl:string = 'http://localhost:8080/';
//     private getUrl(_url){
//         if(_url.startsWith('http')){
//             return _url;
//         }
//         return this.baseUrl + _url;
//     }

//     get(api, params = {}){
//         return new Promise((resolve, reject) => {
//             params['_'] = Math.random();
//             this.http.get(this.getUrl(api), new RequestOptions({
//                 method: RequestMethod.Get,
//                 search: params
//             })).toPromise().then((res) => {
//                 resolve(res.json());
//             })
//         })
//     }
// }
import { Http, RequestOptions, RequestMethod, Headers } from '@angular/http'
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService{
    constructor( private http: Http ) { }
    private baseUrl: string = 'http://localhost:8080/';
    private getUrl(_url){
        console.log(_url)
        if ( _url.startsWith('http')){
            return _url;
        }
        return this.baseUrl + _url;
    }
    get(api,params={}){
        return new Promise((resolve,reject)=>{
            params['_'] = Math.random().toString().slice(2);
            this.http.get( this.getUrl( api ), new RequestOptions({
                method: RequestMethod.Get,
                search: params
            })).toPromise().then((res)=>{
                resolve(res.json())
            })
        })
    }
    
    post(api,params={}){
        return new Promise((resolve,reject)=>{
            function str( data )
            {
                let ret = ''
                for ( let it in data ) {
                    ret += encodeURIComponent( it ) + '=' + encodeURIComponent( data[it] ) + '&'
                }
                return ret;
            }            
            this.http.post( this.getUrl( api ), new RequestOptions( {
                method: RequestMethod.Post,
                body: str(params),
                headers: new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                })
            } ) ).toPromise().then( ( res ) =>
            {
                resolve( res.json() )
            } )
        })
    }

}
