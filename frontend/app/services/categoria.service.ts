import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Ordine } from '../model/ordine';
import { Categoria } from '../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  httpOptions= { headers: new HttpHeaders({'Content-Type':'application/json'})};

  constructor(private http:HttpClient) { }

  getCategorie(){
    console.log(this.http.get('http://localhost:8080/categorie', this.httpOptions));
    return this.http.get('http://localhost:8080/categorie', this.httpOptions);
  }

  getCategoria(id:string){
    return this.http.get('http://localhost:8080/categorie/getCategoria/'+id,this.httpOptions);
  }

  getProdottiCategoria(id:string){
    return this.http.get(' http://localhost:8080/prodotti/getProdottiCategoria/'+id, this.httpOptions);
  }

  add(categoria: Categoria){
    return this.http.post('http://localhost:8080/categorie/aggiungi', categoria, this.httpOptions)
  }
}