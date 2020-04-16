export class LocalStorageUtils {

  public obterCliente() {
    return JSON.parse(localStorage.getItem('cadastro'));
  }

  public salvarDadosLocaisCliente(response: any) {
    this.salvarTokenCliente(response.accessToken);
    this.salvarCliente(response.userToken);
  }

  public limparDadosLocaisCliente() {
    localStorage.removeItem('cadastro.token');
    localStorage.removeItem('cadastro.user');
  }

  public obterTokenCliente(): string {
    return localStorage.getItem('cadastro.token');
  }

  public salvarTokenCliente(token: string) {
    localStorage.setItem('cadastro.token', token);
  }

  public salvarCliente(user: string) {
    localStorage.setItem('cadastro.user', JSON.stringify(user));
  }

}
