import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { windowTime } from 'rxjs';
import { Utente } from 'src/app/model/utente';
import { UtenteService } from 'src/app/services/utente.service';
@Component({
  selector: 'app-registrazione',
  templateUrl: './registrazione.component.html',
  styleUrls: ['./registrazione.component.css']
})
export class RegistrazioneComponent implements OnInit{

  registrato: boolean = false;
  form:any=FormGroup;
  responseMessage: any;
  utente: Utente= new Utente();
  nome: string = "";
  cognome: string = "";

  constructor(private utenteService:UtenteService, private router:Router, private formBuilder:FormBuilder, private oauthService:OAuthService, private spinner:NgxSpinnerService){  
  }

  ngOnInit():void {
    this.spinner.show();
    if(this.oauthService.hasValidAccessToken()){
      this.spinner.hide();
      this.utenteRegistrato();
      console.log(this.registrato);
      this.nome=this.oauthService.getIdentityClaims()['nome'];
      console.log(this.nome);
      this.amministratore();
      this.form= this.formBuilder.group({
       nome:["", Validators.required],
       cognome:["",[Validators.required]],
       numeroTelefono: ["", [Validators.required]],
       indirizzo: ["", [Validators.required]]
      })
    }else{
      window.setTimeout("window.location.reload()",1000);
    }
  }

  utenteRegistrato(){
    this.utenteService.getUtente().subscribe((result:any)=>{
      this.registrato=result;
      console.log("ciao"+this.registrato)
      if(this.registrato){
        this.router.navigateByUrl("prodotti");
      }
    })
  }

  registraUtente(){
    console.log(this.utente)
    this.utenteService.registrazione(this.utente).subscribe(response=>{
      console.log(response);
      this.responseMessage = response;
      console.log(this.responseMessage);
      this.router.navigateByUrl('home')
    }, (error:any)=>{
      if(error.error?.message){
        this.responseMessage= error.error?.messag;
      }
    })
  }
  amministratore(){
    let claims=this.oauthService.getIdentityClaims();
    this.nome= claims['preferred_username']
    if(this.nome=="admin"){
      this.router.navigateByUrl("dashboard");
    }
  }

}