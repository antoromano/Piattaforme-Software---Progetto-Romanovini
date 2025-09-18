import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Prodotto } from 'src/app/model/prodotto';
import { ProdottoService } from 'src/app/services/prodotto.service';
import { UtenteService } from 'src/app/services/utente.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  listaProdotti: Prodotto[] = [];
  prodotto: Prodotto= new Prodotto();
  userClaims: any;
  token: any;
  sfondo= "src\app\img\sfondo.jpg"
  nome: string = "";
  


  constructor(private prodottoService: ProdottoService, private utenteService:UtenteService, private oauthService:OAuthService, private router:Router){
  }


  ngOnInit(): void {
    this.caricaProdotti();
    this.userClaims= this.oauthService.getIdentityClaims();
    console.log(this.userClaims);
    this.amministratore();
    this.token=this.oauthService.getAccessToken();
  }


  caricaProdotti(){
    this.prodottoService.getProdotti().subscribe((result:any)=>{
      this.listaProdotti=result;
      console.log(this.listaProdotti)
    })
  }

  aggiungiAlCarrello(id:number, quantita:number){
    if(quantita <= 0){
      alert("Quantità non disponibile")
    }
    else{
        this.prodotto.id=id;
      if(sessionStorage.getItem("access_token")==null){
        alert('Fai login');
      }
      this.prodottoService.aggiungiAlCarrello(this.prodotto, this.token).subscribe((result:any)=>{
        if(result){
          alert("Prodotto Aggiunto Al Carrello");
          this.prodottoService.cartAddedSubject.next(true);
          window.location.reload;
          this.prodottoService.cartAddedSubject.next(true);
        }else{
          alert("Errore")
        }
      })
    }
    
  }

  amministratore(){
    let claims=this.oauthService.getIdentityClaims();
    this.nome= claims['preferred_username']
    if(this.nome=="admin"){
      this.router.navigateByUrl("dashboard");
    }
  }
}