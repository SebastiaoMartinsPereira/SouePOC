"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LocalStorageUtils = /** @class */ (function () {
    function LocalStorageUtils() {
    }
    LocalStorageUtils.prototype.obterCliente = function () {
        if (localStorage.getItem('cadastro.cliente') === "undefined")
            return null;
        return JSON.parse(localStorage.getItem('cadastro.cliente'));
    };
    LocalStorageUtils.prototype.salvarDadosLocaisCliente = function (response) {
        this.salvarTokenCliente(response.accessToken);
        this.salvarCliente(response.cliente);
    };
    LocalStorageUtils.prototype.limparDadosLocaisCliente = function () {
        localStorage.removeItem('cadastro.token');
        localStorage.removeItem('cadastro.cliente');
    };
    LocalStorageUtils.prototype.obterTokenCliente = function () {
        if (localStorage.getItem('cadastro.token') === "undefined")
            return null;
        return localStorage.getItem('cadastro.token');
    };
    LocalStorageUtils.prototype.salvarTokenCliente = function (token) {
        localStorage.setItem('cadastro.token', token);
    };
    LocalStorageUtils.prototype.salvarCliente = function (cliente) {
        localStorage.setItem('cadastro.cliente', JSON.stringify(cliente));
    };
    return LocalStorageUtils;
}());
exports.LocalStorageUtils = LocalStorageUtils;
//# sourceMappingURL=localstorage.js.map