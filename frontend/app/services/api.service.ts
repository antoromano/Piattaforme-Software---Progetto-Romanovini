import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  makeRequest(type:string, url:string, body?:any, params?:any): Observable<any> {
    let baseUrl=API.baseUrl
    url=baseUrl+url

    let options={}

    if(params) {
      let httpParams=new HttpParams()
      Object.keys(params).forEach((key)=>{
        httpParams=httpParams.append(key,params[key])
      })
      options={params:httpParams}
    }

    if(body) {
      options={...options,body}

      if(type.toLocaleLowerCase()=='put') {
        return this.http.put(url,body,options);
      }
      else if(type.toLocaleLowerCase()=='post') {
        return this.http.post(url,body,options);
      }
    }


    if(type.toLocaleLowerCase()=='delete') {
      return this.http.delete(url,options);
    }
    return this.http.get(url,options);
  }
}
