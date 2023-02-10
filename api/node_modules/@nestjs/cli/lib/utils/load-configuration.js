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
exports.loadConfiguration = void 0;
const nest_configuration_loader_1 = require("../configuration/nest-configuration.loader");
const readers_1 = require("../readers");
function loadConfiguration() {
    return __awaiter(this, void 0, void 0, function* () {
        const loader = new nest_configuration_loader_1.NestConfigurationLoader(new readers_1.FileSystemReader(process.cwd()));
        return loader.load();
    });
}
exports.loadConfiguration = loadConfiguration;
