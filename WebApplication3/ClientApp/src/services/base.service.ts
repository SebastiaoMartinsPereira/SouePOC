import { HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError } from "rxjs";
import { environment } from '../environments/environment';
import { LocalStorageUtils } from "../app/utils/localstorage";


export abstract class BaseService {

  protected urlService = environment.apiUrl;
  public LocalStorage = new LocalStorageUtils();

  protected obterHeaderJson() {
    return {
      headers: new HttpHeaders(
        { 'Content-Type': "application/json" })
    };
  }

  protected extractData(response: any) {
    return response.data || {};
  }

  protected serviceError(response: Response | any) {
     
    if (response instanceof HttpErrorResponse) {

      if (response.statusText === "Unknown Error") {
        const customError: string[] = [];
        customError.push("Ocorreu um erro disconhecido!");
      
        response.error.erros.push(customError);
      }

    }
    console.error(response);
    return throwError(response);
  }


}
