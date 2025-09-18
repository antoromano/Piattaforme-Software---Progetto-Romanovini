import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { Prodotto } from '../model/prodotto';
import { ProdottoCarrello } from '../model/prodottoCarrello';
import { Ordine } from '../model/ordine';

@Injectable({
  providedIn: 'root'
})
export class OrdineService {

  httpOptions= { headers: new HttpHeaders({'Content-Type':'application/json', 'AUTH_TOKEN': this.oauthService.getAccessToken()})};

  constructor(private http:HttpClient, private oauthService:OAuthService) { }

  aggiungiOrdine(ordine:Ordine){
    console.log(this.httpOptions)
    return this.http.post('http://localhost:8080/ordini/creazione', ordine, this.httpOptions);
  }

  getOrdini(){
    return this.http.post('http://localhost:8080/ordini', this.httpOptions);
  }
}