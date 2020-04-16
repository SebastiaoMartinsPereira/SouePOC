import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { NgBrazilValidators } from "ng-brazil";
import { utilsBr } from "js-brasil";

import { Cliente } from "../models/Cliente";
import { removeSpaces } from "./home.extencoes";
import { ClienteService } from "../../services/cliente.services";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

  //erros enviados ddo backend
  errors: any[] = [];
  cadastroForm: FormGroup;
  cliente: Cliente;
  MASKS = utilsBr.MASKS;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      "Nome": ["", [Validators.required, Validators.minLength(5), Validators.maxLength(50), removeSpaces]],
      "Email": ["", [Validators.required, Validators.email]],
      "Cpf": ["", [Validators.required, NgBrazilValidators.cpf]],
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
    debugger;
  }


  processarSucesso(response: any) {

    debugger;
    this.cadastroForm.reset();
    this.errors = [];

    this.clienteService.LocalStorage.salvarDadosLocaisCliente(response);

    //let toast = this.toastr.success('Registro realizado com Sucesso!', 'Bem vindo!!!');

    //if (toast) {
    //  toast.onHidden.subscribe(() => {
    //    this.router.navigate(['/home']);
    //  });
    //}
  }

  processarFalha(fail: any) {
    debugger;
    this.errors = fail.error.errors;
    //this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }


}
