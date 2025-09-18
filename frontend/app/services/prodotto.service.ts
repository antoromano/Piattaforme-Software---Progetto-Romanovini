import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Prodotto } from '../model/prodotto';
import { OAuthService } from 'angular-oauth2-oidc';
import { ProdottoCarrello } from '../model/prodottoCarrello';

@Injectable({
  providedIn: 'root'
})
export class ProdottoService {
  [x: string]: any;

  public cartAddedSubject= new Subject<boolean>();

  httpOptions= { headers: new HttpHeaders({'Content-Type':'application/json', 'AUTH_TOKEN': this.oauthService.getAccessToken()})};

  constructor(private http:HttpClient, private oauthService:OAuthService) { }

  getProdotti(){
    console.log(this.http.get<Prodotto[]>('http://localhost:8080/prodotti').subscribe(),this.httpOptions);
    return this.http.get('http://localhost:8080/prodotti');
  }

  aggiungiAlCarrello(prodotto:Prodotto, token:any){
    console.log(this.httpOptions)
    return this.http.post('http://localhost:8080/prodotti/aggiungiAlCarrello', prodotto, this.httpOptions);
  }

  prodottiCarrello(): Observable<ProdottoCarrello[]>{
    console.log(this.oauthService.getIdentityClaims)
    return this.http.get<ProdottoCarrello[]>('http://localhost:8080/prodotti/prodottiCarrello', this.httpOptions);
  }

  rimuoviProdottoCarrello(id:number){
    return this.http.post('http://localhost:8080/prodotti/rimuoviProdottoCarrello', id,this.httpOptions);
  }

  add(prodotto:Prodotto){
    console.log(this.oauthService.getAccessToken())
    return this.http.post('http://localhost:8080/prodotti/aggiungi', prodotto, this.httpOptions);
  }

  rimuoviProdottiCarrello(){
    console.log("ciao");
    console.log(this.http.get('http://localhost:8080/prodotti/rimuoviProdottiCarrello', this.httpOptions))
    this.http.get('http://localhost:8080/prodotti/rimuoviProdottiCarrello', this.httpOptions).subscribe();
  }

}