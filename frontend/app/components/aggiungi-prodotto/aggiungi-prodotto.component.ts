import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Categoria } from 'src/app/model/categoria';
import { Prodotto } from 'src/app/model/prodotto';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-aggiungi-prodotto',
  templateUrl: './aggiungi-prodotto.component.html',
  styleUrls: ['./aggiungi-prodotto.component.css']
})
export class AggiungiProdottoComponent implements OnInit{

  prodotto: Prodotto = new Prodotto();
  categorie: Categoria[] = []
  cat: Categoria = new Categoria();
  categoria= new FormControl('');

  constructor(private dialogRef: MatDialogRef<AggiungiProdottoComponent>,
    private categoriaService:CategoriaService,
    private formBuilder:FormBuilder){
    }


  ngOnInit(): void {
    this.caricaCategorie()
  }
  
  cancella(){
    this.dialogRef.close();
  }

  caricaCategorie(){
    this.categoriaService.getCategorie().subscribe((result:any)=>{
      this.categorie=result;
      console.log(this.categorie)
    })
  }
  
  aggiungiProdotto(){
    console.log(this.categoria.value);
    this.prodotto.idC=this.categoria.value!;
    this.dialogRef.close(this.prodotto);
  }

}