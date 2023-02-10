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
exports.StartCommand = void 0;
const remaining_flags_1 = require("../lib/utils/remaining-flags");
const abstract_command_1 = require("./abstract.command");
class StartCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command('start [app]')
            .option('-c, --config [path]', 'Path to nest-cli configuration file.')
            .option('-p, --path [path]', 'Path to tsconfig file.')
            .option('-w, --watch', 'Run in watch mode (live-reload).')
            .option('--watchAssets', 'Watch non-ts (e.g., .graphql) files mode.')
            .option('-d, --debug [hostport] ', 'Run in debug mode (with --inspect flag).')
            .option('--webpack', 'Use webpack for compilation.')
            .option('--webpackPath [path]', 'Path to webpack configuration.')
            .option('--tsc', 'Use tsc for compilation.')
            .option('--sourceRoot [sourceRoot]', 'Points at the root of the source code for the single project in standard mode structures, or the default project in monorepo mode structures.')
            .option('--entryFile [entryFile]', "Path to the entry file where this command will work with. Defaults to the one defined at your Nest's CLI config file.")
            .option('-e, --exec [binary]', 'Binary to run (default: "node").')
            .option('--preserveWatchOutput', 'Use "preserveWatchOutput" option when tsc watch mode.')
            .description('Run Nest application.')
            .action((app, command) => __awaiter(this, void 0, void 0, function* () {
            const options = [];
            options.push({
                name: 'config',
                value: command.config,
            });
            const isWebpackEnabled = command.tsc ? false : command.webpack;
            options.push({ name: 'webpack', value: isWebpackEnabled });
            options.push({ name: 'debug', value: command.debug });
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
            options.push({
                name: 'exec',
                value: command.exec,
            });
            options.push({
                name: 'sourceRoot',
                value: command.sourceRoot,
            });
            options.push({
                name: 'entryFile',
                value: command.entryFile,
            });
            options.push({
                name: 'preserveWatchOutput',
                value: !!command.preserveWatchOutput &&
                    !!command.watch &&
                    !isWebpackEnabled,
            });
            const inputs = [];
            inputs.push({ name: 'app', value: app });
            const flags = (0, remaining_flags_1.getRemainingFlags)(program);
            try {
                yield this.action.handle(inputs, options, flags);
            }
            catch (err) {
                process.exit(1);
            }
        }));
    }
}
exports.StartCommand = StartCommand;
