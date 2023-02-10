"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBodyParserOptions = void 0;
const rawBodyParser = (req, _res, buffer) => {
    if (Buffer.isBuffer(buffer)) {
        req.rawBody = buffer;
    }
    return true;
};
function getBodyParserOptions(rawBody, options) {
    let parserOptions = options !== null && options !== void 0 ? options : {};
    if (rawBody === true) {
        parserOptions = Object.assign(Object.assign({}, parserOptions), { verify: rawBodyParser });
    }
    return parserOptions;
}
exports.getBodyParserOptions = getBodyParserOptions;
