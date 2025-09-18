import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/model/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';
import { AggiungiProdottoComponent } from '../aggiungi-prodotto/aggiungi-prodotto.component';
import { AggiungiCategoriaComponent } from '../aggiungi-categoria/aggiungi-categoria.component';

@Component({
  selector: 'app-manag-ecategoria',
  templateUrl: './manage-categoria.component.html',
  styleUrls: ['./manage-categoria.component.css']
})
export class ManagecategoriaComponent  implements OnInit{

  categorie: Categoria[]=[];
  categoria: Categoria= new Categoria();
  input: any;

  constructor(private categoriaService:CategoriaService,
    private dialog:MatDialog,
    private router:Router
   ) { }

  ngOnInit(): void {
    this.categoriaService.getCategorie().subscribe(
      (result:any) =>{
        console.log(result);
        this.categorie=result;
        console.log(this.categorie);
      }
    );    
  }

  handleAddAction(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.ariaLabel='1000px';
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.data={
      title:'Registrazione Prodotto'
    }
    const dialogRef=this.dialog.open(AggiungiCategoriaComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data=>{
      if(data){
        this.categoria=data;
        console.log(this.categoria);
        this.categoriaService.add(this.categoria).subscribe((result:any)=>{
          if(result){
            alert("Categoria Aggiunto");
          }
          else{
            alert("Categoria non aggiunto");
          }
        });
        this.categoriaService.getCategorie().subscribe(
          (result:any) =>{
            console.log(result);
            this.categorie=result;
            console.log(this.categorie);
          }
        );

      }
    })
}
  

}