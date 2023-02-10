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
exports.AddCommand = void 0;
const remaining_flags_1 = require("../lib/utils/remaining-flags");
const abstract_command_1 = require("./abstract.command");
class AddCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        program
            .command('add <library>')
            .allowUnknownOption()
            .description('Adds support for an external library to your project.')
            .option('-d, --dry-run', 'Report actions that would be performed without writing out results.')
            .option('-s, --skip-install', 'Skip package installation.', false)
            .option('-p, --project [project]', 'Project in which to generate files.')
            .usage('<library> [options] [library-specific-options]')
            .action((library, command) => __awaiter(this, void 0, void 0, function* () {
            const options = [];
            options.push({ name: 'dry-run', value: !!command.dryRun });
            options.push({ name: 'skip-install', value: command.skipInstall });
            options.push({
                name: 'project',
                value: command.project,
            });
            const inputs = [];
            inputs.push({ name: 'library', value: library });
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
exports.AddCommand = AddCommand;
