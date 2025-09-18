import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { Prodotto } from '../model/prodotto';
import { ProdottoCarrello } from '../model/prodottoCarrello';
import { Utente } from '../model/utente';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  httpOptions= { headers: new HttpHeaders({'Content-Type':'application/json', 'AUTH_TOKEN':sessionStorage.getItem("access_token")!})};

  constructor(private http:HttpClient) { }

  getUtente(){
    console.log(sessionStorage.getItem('access_token')?.toString());
    this.httpOptions.headers.append('AUTH_TOKEN', sessionStorage.getItem("access_token")!.toString());
    console.log(this.httpOptions);
    return this.http.get('http://localhost:8080/utenti/getUtente', this.httpOptions);

  }

  registrazione(utente:Utente){
    this.httpOptions.headers.append('AUTH_TOKEN', sessionStorage.getItem("access_token")!);
    console.log(this.httpOptions);
    return this.http.post('http://localhost:8080/utenti/registrazione', utente, this.httpOptions);
  }

}
