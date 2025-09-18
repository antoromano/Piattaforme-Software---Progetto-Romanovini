/*import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { Home1Component } from './components/home1/home1.component';
import { Welcome1Component } from './components/welcome1/welcome1.component';
import { CartComponent } from './components/cart/cart.component';
import { SaleComponent } from './components/sale/sale.component';

const routes: Routes = [
  {path: "home", component:Home1Component, canActivate: [AuthGuard] },
  {path: "product", component:Home1Component, canActivate: [AuthGuard] },
  {path: "welcome", component:Welcome1Component},
  {path: "cart", component:CartComponent},
  {path: "sale", component:SaleComponent},
  {path: "", redirectTo: "welcome", pathMatch: "full"},
  {path: "**", redirectTo: "welcome", pathMatch: "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CarrelloComponent } from './components/carrello/carrello.component';
import { VenditaComponent } from './components/vendita/vendita.component';
import { AuthGuard } from './auth.guard';
import { RegistrazioneComponent } from './components/registrazione/registrazione.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { ProdottoComponent} from './components/prodotto/prodotto.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageProdottiComponent } from './components/manage-prodotti/manage-prodotti.component';
import { ManagecategoriaComponent } from './components/manage-categoria/manage-categoria.component';
import { ManageOrdineComponent } from './components/manage-ordine/manage-ordine.component';
import { AdminComponent } from './components/admin/admin/admin.component';

const routes: Routes = [
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'prodottiM',
    component:ManageProdottiComponent,
  },
  {
    path:'admin',
    component:AdminComponent
  },
  {
    path:"vendita", 
    component:VenditaComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"registrazione",
    component:RegistrazioneComponent
  },
  {
    path: 'prodotti',
    component: ProdottoComponent
  },
  {
  path: "categoria",
    component: CategoriaComponent
  },
  {
    path:'carrello',
    component:CarrelloComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categorieM',
    component:ManagecategoriaComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'ordiniM',
    component:ManageOrdineComponent,
    canActivate: [AuthGuard]
  },
  {
    path:"**",
    component:HomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
