import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/config';
import { authCodeFlowConfig2 } from 'src/app/config2';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProdottoService } from 'src/app/services/prodotto.service';
import { UtenteService } from 'src/app/services/utente.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

  constructor(private oauthService:OAuthService,private utenteService:UtenteService, private prodottoService:ProdottoService, private router:Router, private categoriaService:CategoriaService){
    prodottoService.cartAddedSubject.subscribe(res=>{ res=true
    })
  }


  ngOnInit(): void {
    this.configureSingleSignOn();
  }

  redirectTo(id:any){
    this.router.navigateByUrl('categoria');
    sessionStorage.setItem('categoria', id);
  }


  configureSingleSignOn(){
    this.oauthService.configure(authCodeFlowConfig);
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
}