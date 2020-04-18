"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("@angular/common/http");
var rxjs_1 = require("rxjs");
var environment_1 = require("../environments/environment");
var localstorage_1 = require("../app/utils/localstorage");
var BaseService = /** @class */ (function () {
    function BaseService() {
        this.urlService = environment_1.environment.apiUrl;
        this.LocalStorage = new localstorage_1.LocalStorageUtils();
    }
    BaseService.prototype.obterHeaderJson = function () {
        return {
            headers: new http_1.HttpHeaders({ 'Content-Type': "application/json" })
        };
    };
    BaseService.prototype.extractData = function (response) {
        return response.data || response || {};
    };
    BaseService.prototype.serviceError = function (response) {
        if (response instanceof http_1.HttpErrorResponse) {
            if (response.statusText === "Unknown Error") {
                var customError = [];
                customError.push("Ocorreu um erro disconhecido!");
                response.error.erros.push(customError);
            }
        }
        console.error(response);
        return rxjs_1.throwError(response);
    };
    return BaseService;
}());
exports.BaseService = BaseService;
//# sourceMappingURL=base.service.js.map