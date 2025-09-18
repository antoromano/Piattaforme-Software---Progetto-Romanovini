import { Prodotto } from "./prodotto";
import { ProdottoOrdinato } from "./prodottoOrdinato"
import { Utente } from "./utente";

export class Ordine{
    id!: number;
    data?:Date;
    prodottiOrdinati?:ProdottoOrdinato[];
    utente?:Utente;


    public setProdottiOrdinati(prodottiOrdinati: ProdottoOrdinato[]){
        this.prodottiOrdinati=prodottiOrdinati;
    }
}