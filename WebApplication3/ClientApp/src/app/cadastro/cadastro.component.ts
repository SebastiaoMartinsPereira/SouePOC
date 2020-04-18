import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { NgBrazilValidators } from "ng-brazil";
import { utilsBr } from "js-brasil";

import { Cliente } from "../models/Cliente";
import { removeSpaces } from "./cadastro.extencoes";
import { ClienteService } from "../../services/ClienteService.services";


@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"]
})
export class CadastroComponent implements OnInit {

  //erros enviados ddo backend
  errors: any[] = [];
  cadastroForm: FormGroup;
  cliente: Cliente = new Cliente();
  MASKS = utilsBr.MASKS;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clienteService: ClienteService) { }

  ngOnInit(): void {

    this.cadastroForm = this.fb.group({
      "Nome": ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50), removeSpaces]],
      "Email": ["", [Validators.required, Validators.email]],
      "Documento": ["", [Validators.required, NgBrazilValidators.cpf]],
      "Telefone": ["", [Validators.required, NgBrazilValidators.telefone, Validators.minLength(10)]],
      "Endereco": ["", Validators.required],
    });
  }

  realizarCadastro() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {

      this.cliente = Object.assign({}, this.cliente, this.cadastroForm.value);
      this.clienteService.cadastrarCliente(this.cliente)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  processarSucesso(response: any) {

    this.cadastroForm.reset();
    this.errors = [];
    this.clienteService.LocalStorage.salvarDadosLocaisCliente(response);
    document.querySelector('#formCadastro').classList.toggle('sumido');
    document.querySelector('#cadastro-success').classList.toggle('sumido');
    this.irHome(true);
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
  }

  irHome(esperar: boolean) {
    if (esperar) {
      setTimeout(() => this.router.navigate(['']), 10000);
      return;
    }
    this.router.navigate(['']);
  }
}
