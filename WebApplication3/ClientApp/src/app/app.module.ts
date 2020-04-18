import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgBrazil } from "ng-brazil";
import { TextMask } from "ng-brazil";
import { CustomFormsModule } from "ng2-validation";
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { PlanosComponent } from './planos/planos.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { MenuLoginComponent } from './menu-login/menu-login.component';
import { AcessoNegadoComponent } from './acesso-negado/acesso-negado.component';
import { EditarClienteComponent } from "./editar-cliente/editar-cliente.component";


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PlanosComponent,
    CadastroComponent,
    MenuLoginComponent,
    AcessoNegadoComponent,
    EditarClienteComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    CommonModule,
    TextMask.TextMaskModule,
    NgBrazil,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'cadastro', component: CadastroComponent },
      { path: 'planos', component: PlanosComponent },
      { path: 'acesso-negado', component: AcessoNegadoComponent },
      { path: 'editar-cliente/:id', component: EditarClienteComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
