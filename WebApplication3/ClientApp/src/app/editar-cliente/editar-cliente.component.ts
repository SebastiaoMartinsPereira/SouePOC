import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { NgBrazilValidators } from "ng-brazil";
import { utilsBr } from "js-brasil";

import { Cliente } from "../models/Cliente";
import { removeSpaces } from "../cadastro/cadastro.extencoes";
import { ClienteService } from "../../services/ClienteService.services";

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  //erros enviados ddo backend
  errors: any[] = [];
  edicaoForm: FormGroup;
  cliente: Cliente = new Cliente();
  MASKS = utilsBr.MASKS;
  redTimeOut : any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private clienteService: ClienteService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    


    this.route.params
      .subscribe(params => {

        if (params['id'] !== undefined) this.cliente.Id = params['id'];
        this.getCliente(this.cliente.Id);

      });

    this.edicaoForm = this.fb.group({
      "Nome": [this.cliente.Nome, [Validators.required, Validators.minLength(5), Validators.maxLength(50), removeSpaces]],
      "Email": ["", [Validators.required, Validators.email]],
      "Documento": ["", [Validators.required, NgBrazilValidators.cpf]],
      "Telefone": ["", [Validators.required, NgBrazilValidators.telefone, Validators.minLength(10)]],
      "Endereco": ["", Validators.required],
      "Id": ["", Validators.required]
    });
  }

  public getCliente(id: string) {
    
    if (this.cliente.Id !== undefined) {
      this.clienteService.getCliente(this.cliente.Id)
        .subscribe(
          sucesso => { this.carregarForm(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  carregarForm(response: any) {
    debugger;
    this.edicaoForm.patchValue({
      "Nome": response.nome,
      "Email": response.email, 
      "Documento": response.documento,
      "Telefone": response.telefone,
      "Endereco": response.endereco,
      "Id": response.id,
    });

  }

  editarCadastro() {
    if (this.edicaoForm.dirty && this.edicaoForm.valid) {

      this.cliente = Object.assign({}, this.cliente, this.edicaoForm.value);
      this.clienteService.editarCliente(this.cliente)
        .subscribe(
          sucesso => { this.processarSucesso(sucesso) },
          falha => { this.processarFalha(falha) }
        );
    }
  }

  processarSucesso(response: any) {
    debugger;
    this.edicaoForm.reset();
    this.errors = [];
    this.clienteService.LocalStorage.salvarDadosLocaisCliente(response);
    document.querySelector('#formEditar').classList.toggle('sumido');
    document.querySelector('#editar-success').classList.toggle('sumido');
    this.irHome(true);
  }

  processarFalha(fail: any) {
    this.errors = fail.error.errors;
  }

  irHome(esperar: boolean) {

    if (esperar) {
      this.redTimeOut = setTimeout(() => this.router.navigate(['']), 10000);
      return;
    } else {
      debugger;
      clearTimeout(this.redTimeOut);
    }

    this.router.navigate(['']);
  }
}




