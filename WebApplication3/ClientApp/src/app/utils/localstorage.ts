export class LocalStorageUtils {

  public obterCliente() {
    if(localStorage.getItem('cadastro.cliente') === "undefined") return null;
    return JSON.parse(localStorage.getItem('cadastro.cliente'));
  }

  public salvarDadosLocaisCliente(response: any) {
    this.salvarTokenCliente(response.accessToken);
    this.salvarCliente(response.cliente);
  }

  public limparDadosLocaisCliente() {
    localStorage.removeItem('cadastro.token');
    localStorage.removeItem('cadastro.cliente');
  }

  public obterTokenCliente(): string {
    if (localStorage.getItem('cadastro.token') === "undefined") return null;
    return localStorage.getItem('cadastro.token');
  }

  public salvarTokenCliente(token: string) {
    localStorage.setItem('cadastro.token', token);
  }

  public salvarCliente(cliente: string) {
    localStorage.setItem('cadastro.cliente', JSON.stringify(cliente));
  }

}
