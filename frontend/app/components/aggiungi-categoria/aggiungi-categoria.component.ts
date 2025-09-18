import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-aggiungi-categoria',
  templateUrl: './aggiungi-categoria.component.html',
  styleUrls: ['./aggiungi-categoria.component.css']
})
export class AggiungiCategoriaComponent {
  
  categoria: Categoria = new Categoria();

  constructor(private dialogRef: MatDialogRef<AggiungiCategoriaComponent>,
    private categoriaService:CategoriaService,
    private formBuilder:FormBuilder){
    }


  ngOnInit(): void {
    
  }
  
  cancella(){
    this.dialogRef.close();
  }

  
  aggiungiProdotto(){
    this.dialogRef.close(this.categoria);
  }
}