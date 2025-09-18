/*import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app1';
} */

import { Component, OnInit } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from './config';
import { ProdottoService } from './services/prodotto.service';
import { ProdottoCarrello } from './model/prodottoCarrello';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UtenteService } from './services/utente.service';
import { CategoriaService } from './services/categoria.service';
import { Categoria } from './model/categoria';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ecommerce';
  nome:string="";
  prodottiCarrello: ProdottoCarrello[] =[];
  subTotal: number = 0;
  categorie: Categoria[] = [];
  flag: Boolean=true;
  

  constructor(private oauthService:OAuthService,private utenteService:UtenteService, private prodottoService:ProdottoService, private router:Router, private categoriaService:CategoriaService){
    prodottoService.cartAddedSubject.subscribe(res=>{
      window.location.reload(),
      res=true
    })
    this.flag=true;
  }


  ngOnInit(): void {
    this.configureSingleSignOn();
    this.loadCart();
    this.loadCategorie();
    this.amministratore();
    console.log(this.categorie);
    sessionStorage.setItem('flag','true');
  }

  redirectTo(id:any){
    console.log(this.flag)
    if(this.flag==true){
      this.router.navigate(['categoria']);
    sessionStorage.setItem('categoria', id);
    this.flag=false;
    }else{
      this.router.navigate(['categoria']);
    sessionStorage.setItem('categoria', id);
    window.location.reload();
    }
    
  }

  configureSingleSignOn(){
    this.oauthService.configure(authCodeFlowConfig)
    this.oauthService.tokenValidationHandler=new JwksValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(){
    this.oauthService.initCodeFlow();
  }

  logout(){
    this.oauthService.logOut();
    this.router.navigateByUrl('**');
  }

  get token(){
    let claims: any= this.oauthService.getIdentityClaims();
    return claims ? claims:null;
  }

  loadCart(){
    this.prodottoService.prodottiCarrello().subscribe((res:any)=>{
      this.subTotal=0;
      this.prodottiCarrello=res;
      this.prodottiCarrello.forEach(element => {
        this.subTotal=this.subTotal+element.prezzo!;
      });
      console.log(this.prodottiCarrello)
    });
  }
  amministratore(){
    let claims=this.oauthService.getIdentityClaims();
    this.nome= claims['preferred_username']
    console.log(this.nome)
  }

  loadCategorie(){
    this.categoriaService.getCategorie().subscribe((res:any)=>{
      this.categorie=res;
      console.log(res);
    });
  }

  rimuoviTutto(){
    this.prodottoService.rimuoviProdottiCarrello();
    this.prodottoService.cartAddedSubject.next(true);
  }

  redirectToSale(){
    this.router.navigateByUrl("vendita");
  }
}
