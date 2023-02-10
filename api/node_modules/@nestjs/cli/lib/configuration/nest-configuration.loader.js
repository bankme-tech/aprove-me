"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestConfigurationLoader = void 0;
const defaults_1 = require("./defaults");
class NestConfigurationLoader {
    constructor(reader) {
        this.reader = reader;
    }
    load(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = name
                ? yield this.reader.read(name)
                : yield this.reader.readAnyOf([
                    '.nestcli.json',
                    '.nest-cli.json',
                    'nest-cli.json',
                    'nest.json',
                ]);
            if (!content) {
                return defaults_1.defaultConfiguration;
            }
            const fileConfig = JSON.parse(content);
            if (fileConfig.compilerOptions) {
                return Object.assign(Object.assign(Object.assign({}, defaults_1.defaultConfiguration), fileConfig), { compilerOptions: Object.assign(Object.assign({}, defaults_1.defaultConfiguration.compilerOptions), fileConfig.compilerOptions) });
            }
            return Object.assign(Object.assign({}, defaults_1.defaultConfiguration), fileConfig);
        });
    }
}
exports.NestConfigurationLoader = NestConfigurationLoader;
