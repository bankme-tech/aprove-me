#!/usr/bin/env node
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
const commander = require("commander");
const commands_1 = require("../commands");
const local_binaries_1 = require("../lib/utils/local-binaries");
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    const program = commander;
    program
        .version(require('../package.json').version, '-v, --version', 'Output the current version.')
        .usage('<command> [options]')
        .helpOption('-h, --help', 'Output usage information.');
    if ((0, local_binaries_1.localBinExists)()) {
        const localCommandLoader = (0, local_binaries_1.loadLocalBinCommandLoader)();
        yield localCommandLoader.load(program);
    }
    else {
        yield commands_1.CommandLoader.load(program);
    }
    commander.parseAsync(process.argv);
    if (!process.argv.slice(2).length) {
        program.outputHelp();
    }
});
bootstrap();
