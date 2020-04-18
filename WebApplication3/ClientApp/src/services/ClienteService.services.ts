import { Injectable } from "@angular/core";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Cliente } from "../app/models/Cliente";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseService } from "./base.service";


@Injectable({
  providedIn: 'root'
})
export class ClienteService extends BaseService {
  constructor(private http: HttpClient) { super(); }

  acessar(cpf: string)  : Observable<string>{
    let response = this.http
      .get(this.urlService + `Clientes/cpf/${cpf}`)
      .pipe(
        map(this.extractData),
        catchError(this.serviceError));

    return response;
  }

  cadastrarCliente(cliente: Cliente): Observable<Cliente> {

    let response = this.http
      .post(this.urlService + 'Clientes', cliente, this.obterHeaderJson())
      .pipe(
        map(this.extractData),
        catchError(this.serviceError));

    return response;
  }

}
