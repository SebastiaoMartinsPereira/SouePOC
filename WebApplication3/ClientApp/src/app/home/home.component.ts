import { Component, OnInit } from '@angular/core';

import { LocalStorageUtils } from "../utils/localstorage";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  token = "";
  cliente: any;
  nome = "";
  localStorageUtils = new LocalStorageUtils();

  constructor() { }

  ngOnInit() {
  }


  usuarioLogado(): boolean {
 
    this.token = this.localStorageUtils.obterTokenCliente();
    this.cliente = this.localStorageUtils.obterCliente();

    if (this.cliente) {
      this.nome = this.cliente.nome;
    }
    return this.token !== null;

  }



}
