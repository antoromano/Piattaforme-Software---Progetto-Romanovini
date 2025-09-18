import { Component, OnInit } from '@angular/core';
import { Ordine } from 'src/app/model/ordine';
import { ProdottoCarrello } from 'src/app/model/prodottoCarrello';
import { ProdottoOrdinato } from 'src/app/model/prodottoOrdinato';
import { OrdineService } from 'src/app/services/ordine.service';
import { ProdottoService } from 'src/app/services/prodotto.service';

@Component({
  selector: 'app-vendita',
  templateUrl: './vendita.component.html',
  styleUrls: ['./vendita.component.css']
})
export class VenditaComponent implements OnInit {

  prodottiCarrello: ProdottoCarrello[] = [];
  subTotal:number=0;
  prodottiOrdinati!: ProdottoOrdinato[];
  ordine: Ordine = new Ordine();
  prodottoOrdinato!: ProdottoOrdinato;

  constructor(private prodottoService:ProdottoService, private ordineService:OrdineService){

  }
  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(){
    this.prodottoService.prodottiCarrello().subscribe((res:any)=>{
      this.subTotal=0;
      this.prodottiCarrello=res;
      this.prodottiCarrello.forEach(element => {
        this.subTotal=this.subTotal+element.prezzo!;
      });
      console.log(this.prodottiCarrello)
    });
  }

  makeSale(prodottiCarrello: ProdottoCarrello[]){
    this.prodottiOrdinati= [];
    prodottiCarrello.forEach(element => {
      this.prodottoOrdinato= new ProdottoOrdinato();
      this.prodottoOrdinato.prezzo=element.prezzo;
      this.prodottoOrdinato.quantita=element.quantita;
      this.prodottoOrdinato.prodotto=element.prodottoId;
      this.prodottiOrdinati.push(this.prodottoOrdinato);
    });
    this.ordine.setProdottiOrdinati(this.prodottiOrdinati);
    console.log(this.ordine);
    this.ordineService.aggiungiOrdine(this.ordine).subscribe((result:any)=>{
      if(result){
        this.loadCart();
        this.prodottoService.cartAddedSubject.next(true);
        alert("Ordine effettuato");
      }
      else{
        alert('Ordine non effettuato, quantità non disponibile')
      }
    });
  }

  RemoveItem(id: number){
    this.prodottoService.rimuoviProdottoCarrello(id).subscribe((res:any)=>{
      this.loadCart();
      this.prodottoService.cartAddedSubject.next(true);
    })
    this.ordine.prodottiOrdinati=this.prodottiOrdinati;

  }

}