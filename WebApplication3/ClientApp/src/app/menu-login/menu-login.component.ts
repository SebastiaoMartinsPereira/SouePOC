import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { LocalStorageUtils } from "../utils/localstorage";
import { FormGroup, FormBuilder } from "@angular/forms";

import { utilsBr } from "js-brasil";

import { ClienteService } from "../../services/ClienteService.services";

@Component({
  selector: 'app-menu-login',
  templateUrl: './menu-login.component.html',
  styleUrls: ['../nav-menu/nav-menu.component.css']
})
export class MenuLoginComponent implements OnInit {

  token = "";
  cliente: any;
  nome = "";
  localStorageUtils = new LocalStorageUtils();
  MASKS = utilsBr.MASKS;
  loginForm: FormGroup;
  errors: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Cpf: [""]
    });
  }


  usuarioLogado(): boolean {

    this.token = this.localStorageUtils.obterTokenCliente();
    this.cliente = this.localStorageUtils.obterCliente();

    if (this.cliente) {
      this.nome = this.cliente.nome;
    }
    return this.token !== null;

  }

  logout() {
     
    this.localStorageUtils.limparDadosLocaisCliente();
    this.router.navigate(['']);
  }

  public acessar() {
    if (this.loginForm.value !== undefined) {
      if (this.loginForm.value.Cpf !== "") {
        this.clienteService.acessar(this.loginForm.value.Cpf)
          .subscribe(
            sucesso => { this.processarSucesso(sucesso) },
            falha => { this.processarFalha(falha) }
          );
      }
    }
  }

  processarSucesso(response: any) {

    this.loginForm.reset();
    this.errors = [];
    this.clienteService.LocalStorage.salvarDadosLocaisCliente(response);
    this.usuarioLogado();
    this.router.navigate(['']);
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
    this.router.navigate(['/acesso-negado']);
    this.loginForm.reset();
  }


}
