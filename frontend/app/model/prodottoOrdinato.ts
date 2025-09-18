import { Prodotto } from "./prodotto";

export class ProdottoOrdinato{
    id!: number;
    quantita?:number;
    prezzo?:number;
    data?:Date;
    ordine?:Object;
    prodotto?:Prodotto;
    username?:string;
}