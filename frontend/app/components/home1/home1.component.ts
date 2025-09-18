/*import { Component, OnInit } from '@angular/core';
import { JwksValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { authCodeFlowConfig } from 'src/app/config';
import { ApiService } from 'src/app/services/api.service';
import { ProductService } from 'src/app/services/prodotto.service';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css']
})
export class Home1Component implements OnInit {

  name: string="";
  productList: any [] = [];
  

  constructor(
    private oauthService: OAuthService,
    private productService: ProductService,
    private apiService: ApiService
    ) { }

  ngOnInit(): void {
    this.caricaProdotti();
    this.configureSingleSignOn();
    const userClaims: any = this.oauthService.getIdentityClaims();
    this.name = userClaims.name ? userClaims.name: "";
    this.loadAllProducts();

  }

  configureSingleSignOn() {
    this.oauthService.configure(authCodeFlowConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  loadAllProducts() {
    this.productService.getAllProducts().subscribe((result: any)=>{
      this.productList = result.data;
    })
  }

}
*/