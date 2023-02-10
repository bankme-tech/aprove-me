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
exports.AbstractRunner = void 0;
const chalk = require("chalk");
const child_process_1 = require("child_process");
const ui_1 = require("../ui");
class AbstractRunner {
    constructor(binary, args = []) {
        this.binary = binary;
        this.args = args;
    }
    run(command, collect = false, cwd = process.cwd()) {
        return __awaiter(this, void 0, void 0, function* () {
            const args = [command];
            const options = {
                cwd,
                stdio: collect ? 'pipe' : 'inherit',
                shell: true,
            };
            return new Promise((resolve, reject) => {
                const child = (0, child_process_1.spawn)(`${this.binary}`, [...this.args, ...args], options);
                if (collect) {
                    child.stdout.on('data', (data) => resolve(data.toString().replace(/\r\n|\n/, '')));
                }
                child.on('close', (code) => {
                    if (code === 0) {
                        resolve(null);
                    }
                    else {
                        console.error(chalk.red(ui_1.MESSAGES.RUNNER_EXECUTION_ERROR(`${this.binary} ${command}`)));
                        reject();
                    }
                });
            });
        });
    }
    /**
     * @param command
     * @returns The entire command that will be ran when calling `run(command)`.
     */
    rawFullCommand(command) {
        const commandArgs = [...this.args, command];
        return `${this.binary} ${commandArgs.join(' ')}`;
    }
}
exports.AbstractRunner = AbstractRunner;
