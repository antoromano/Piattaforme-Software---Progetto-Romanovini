/*import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Navbar2Component } from './components/navbar2/navbar2.component';
import { Home1Component } from './components/home1/home1.component';
import { Welcome1Component } from './components/welcome1/welcome1.component'
import { OAuthModule } from 'angular-oauth2-oidc';

@NgModule({
  declarations: [
    AppComponent,
    Navbar2Component,
    Home1Component,
    Welcome1Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    OAuthModule.forRoot(),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }  */

import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { CarrelloComponent } from './components/carrello/carrello.component';
import { VenditaComponent } from './components/vendita/vendita.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { OAuthModule } from 'angular-oauth2-oidc';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import { NgxUiLoaderConfig, NgxUiLoaderModule, POSITION, SPINNER } from 'ngx-ui-loader';
import{ NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CategoriaComponent } from './components/categoria/categoria.component'
import { AuthGuard } from './auth.guard';
import { ProdottoComponent } from './components/prodotto/prodotto.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageProdottiComponent } from './components/manage-prodotti/manage-prodotti.component';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { AggiungiProdottoComponent } from './components/aggiungi-prodotto/aggiungi-prodotto.component';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { ManagecategoriaComponent } from './components/manage-categoria/manage-categoria.component';
import { AggiungiCategoriaComponent } from './components/aggiungi-categoria/aggiungi-categoria.component';
import { ManageOrdineComponent } from './components/manage-ordine/manage-ordine.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CarrelloComponent,
    VenditaComponent,
    RegistrazioneComponent,
    CategoriaComponent,
    ProdottoComponent,
    DashboardComponent,
    ManageProdottiComponent,
    AggiungiProdottoComponent,
    ManagecategoriaComponent,
    AggiungiCategoriaComponent,
    ManageOrdineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls:['http://localhost:8080'],
        sendAccessToken: true
      }
    }),
    FormsModule,
    KeycloakAngularModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatGridListModule,
    MatDividerModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule
  ],
  providers: [
    AuthGuard
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }