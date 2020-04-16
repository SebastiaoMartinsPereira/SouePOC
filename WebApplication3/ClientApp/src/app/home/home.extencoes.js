"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function removeSpaces(control) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
        control.setValue('');
    }
    return null;
}
exports.removeSpaces = removeSpaces;
//# sourceMappingURL=home.extencoes.js.map