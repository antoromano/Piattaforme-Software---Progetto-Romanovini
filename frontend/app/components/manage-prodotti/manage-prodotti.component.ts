import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {AfterViewInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Prodotto } from 'src/app/model/prodotto';
import { ProdottoService } from 'src/app/services/prodotto.service';
import { AggiungiProdottoComponent } from '../aggiungi-prodotto/aggiungi-prodotto.component';

@Component({
  selector: 'app-manage-prodotti',
  templateUrl: './manage-prodotti.component.html',
  styleUrls: ['./manage-prodotti.component.css']
})
export class ManageProdottiComponent  implements OnInit{
  displayColoumns: string[] = ['id','codice', 'nome',  'prezzo',  'quantita', 'descrizione'];
  dataSource!: MatTableDataSource<Prodotto>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  Prodotti: Prodotto[]=[];
  Prodotto: Prodotto=new Prodotto();
  input: any;

  constructor(private prodottoService:ProdottoService,
    private dialog:MatDialog,
    private router:Router
   ) { }

  ngOnInit(): void {
    this.prodottoService.getProdotti().subscribe(
      (result:any) =>{
        console.log(result);
        this.Prodotti=result;
        console.log(this.Prodotti);
        this.dataSource=new MatTableDataSource(this.Prodotti);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
    const dialogRef=this.dialog.open(AggiungiProdottoComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data=>{
      if(data){
        this.Prodotto=data;
        console.log(this.Prodotto);
        this.prodottoService.add(this.Prodotto).subscribe((result:any)=>{
          if(result){
            alert("Prodotto Aggiunto");
          }
          else{
            alert("Prodotto non aggiunto");
          }
        });
        this.prodottoService.getProdotti().subscribe(
          (result:any) =>{
            console.log(result);
            this.Prodotti=result;
            console.log(this.Prodotti);
          }
        );

      }
    })
}
  

}