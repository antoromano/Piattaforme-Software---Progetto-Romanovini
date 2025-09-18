import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { OAuthService } from "angular-oauth2-oidc";
import { Categoria } from "src/app/model/categoria";
import { Prodotto } from "src/app/model/prodotto";
import { CategoriaService } from "src/app/services/categoria.service";
import { ProdottoService } from "src/app/services/prodotto.service";
import { UtenteService } from "src/app/services/utente.service";

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit{

  prodotti: Prodotto[] = [];
  prodotto: Prodotto= new Prodotto();
  categoriaId: any= "";
  categoria: Categoria = new Categoria();
  token:string = "";

  constructor(private prodottoService: ProdottoService, private router:Router, private categoriaService: CategoriaService){
  }

  ngOnInit(): void {
    this.caricaCategoria();
    this.caricaProdotti();
  }

  caricaCategoria(){
    this.categoriaId=sessionStorage.getItem('categoria')!;
    this.categoriaService.getCategoria(this.categoriaId).subscribe((result:any)=>{
      this.categoria=result;
    })
    console.log(this.categoria);
  }

  caricaProdotti(){
    this.categoriaId=sessionStorage.getItem('categoria')!;
    this.categoriaService.getProdottiCategoria(this.categoriaId).subscribe((result:any)=>{
      this.prodotti=result;
      console.log(this.prodotti)
    })
  }

  aggiungiAlCarrello(id:number, quantita:number){
    if(quantita <= 0){
      alert("Quantità non disponibile")
    }
    else{
        this.prodotto.id=id;
      if(sessionStorage.getItem("access_token")==null){
        alert('Fai login');
      }
      this.prodottoService.aggiungiAlCarrello(this.prodotto, this.token).subscribe((result:any)=>{
        if(result){
          alert("Prodotto Aggiunto Al Carrello");
          this.prodottoService.cartAddedSubject.next(true);
          window.location.reload;
          this.prodottoService.cartAddedSubject.next(true);
        }else{
          alert("Errore")
        }
      })
    } 
  }
}