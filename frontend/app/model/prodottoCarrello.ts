import { Prodotto } from "./prodotto";

export class ProdottoCarrello{
    id!: number;
    prodottoId?:Prodotto;
    ordine?:Object;
    nomeProdotto?:string;
    data?:Date;
    username?:string;
    quantita?:number;
    prezzo?:number;
}