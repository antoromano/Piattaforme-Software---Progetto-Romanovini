import { Prodotto } from "./prodotto";

export class Categoria{
    id!: number;
    nome?:String;
    descrizione?:String;
    urlImmagine?:String;
    prodotti?:Prodotto[]
}