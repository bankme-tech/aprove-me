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
exports.BuildCommand = void 0;
const abstract_command_1 = require("./abstract.command");
class BuildCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command('build [app]')
            .option('-c, --config [path]', 'Path to nest-cli configuration file.')
            .option('-p, --path [path]', 'Path to tsconfig file.')
            .option('-w, --watch', 'Run in watch mode (live-reload).')
            .option('--watchAssets', 'Watch non-ts (e.g., .graphql) files mode.')
            .option('--webpack', 'Use webpack for compilation.')
            .option('--webpackPath [path]', 'Path to webpack configuration.')
            .option('--tsc', 'Use tsc for compilation.')
            .description('Build Nest application.')
            .action((app, command) => __awaiter(this, void 0, void 0, function* () {
            const options = [];
            options.push({
                name: 'config',
                value: command.config,
            });
            const isWebpackEnabled = command.tsc ? false : command.webpack;
            options.push({ name: 'webpack', value: isWebpackEnabled });
            options.push({ name: 'watch', value: !!command.watch });
            options.push({ name: 'watchAssets', value: !!command.watchAssets });
            options.push({
                name: 'path',
                value: command.path,
            });
            options.push({
                name: 'webpackPath',
                value: command.webpackPath,
            });
            const inputs = [];
            inputs.push({ name: 'app', value: app });
            yield this.action.handle(inputs, options);
        }));
    }
}
exports.BuildCommand = BuildCommand;
