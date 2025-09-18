import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Ordine } from 'src/app/model/ordine';
import { OrdineService } from 'src/app/services/ordine.service';
import { AggiungiCategoriaComponent } from '../aggiungi-categoria/aggiungi-categoria.component';

@Component({
  selector: 'app-manage-ordine',
  templateUrl: './manage-ordine.component.html',
  styleUrls: ['./manage-ordine.component.css']
})
export class ManageOrdineComponent implements OnInit{
  
  ordini: Ordine[]=[];
  ordine: Ordine= new Ordine();
  input: any;

  constructor(private ordineService:OrdineService,
    private dialog:MatDialog,
    private router:Router
   ) { }

  ngOnInit(): void {
    this.ordineService.getOrdini().subscribe(
      (result:any) =>{
        console.log(result);
        this.ordini=result;
        console.log(this.ordini);
      }
    );    
  }
}
