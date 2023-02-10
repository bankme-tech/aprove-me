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
exports.GenerateCommand = void 0;
const chalk = require("chalk");
const Table = require("cli-table3");
const schematics_1 = require("../lib/schematics");
const load_configuration_1 = require("../lib/utils/load-configuration");
const abstract_command_1 = require("./abstract.command");
class GenerateCommand extends abstract_command_1.AbstractCommand {
    load(program) {
        return __awaiter(this, void 0, void 0, function* () {
            program
                .command('generate <schematic> [name] [path]')
                .alias('g')
                .description(yield this.buildDescription())
                .option('-d, --dry-run', 'Report actions that would be taken without writing out results.')
                .option('-p, --project [project]', 'Project in which to generate files.')
                .option('--flat', 'Enforce flat structure of generated element.', () => true)
                .option('--no-flat', 'Enforce that directories are generated.', () => false)
                .option('--spec', 'Enforce spec files generation.', () => {
                return { value: true, passedAsInput: true };
            }, true)
                .option('--skip-import', 'Skip importing', () => true, false)
                .option('--no-spec', 'Disable spec files generation.', () => {
                return { value: false, passedAsInput: true };
            })
                .option('-c, --collection [collectionName]', 'Schematics collection to use.')
                .action((schematic, name, path, command) => __awaiter(this, void 0, void 0, function* () {
                const options = [];
                options.push({ name: 'dry-run', value: !!command.dryRun });
                if (command.flat !== undefined) {
                    options.push({ name: 'flat', value: command.flat });
                }
                options.push({
                    name: 'spec',
                    value: typeof command.spec === 'boolean'
                        ? command.spec
                        : command.spec.value,
                    options: {
                        passedAsInput: typeof command.spec === 'boolean'
                            ? false
                            : command.spec.passedAsInput,
                    },
                });
                options.push({
                    name: 'collection',
                    value: command.collection,
                });
                options.push({
                    name: 'project',
                    value: command.project,
                });
                options.push({
                    name: 'skipImport',
                    value: command.skipImport,
                });
                const inputs = [];
                inputs.push({ name: 'schematic', value: schematic });
                inputs.push({ name: 'name', value: name });
                inputs.push({ name: 'path', value: path });
                yield this.action.handle(inputs, options);
            }));
        });
    }
    buildDescription() {
        return __awaiter(this, void 0, void 0, function* () {
            const collection = yield this.getCollection();
            return ('Generate a Nest element.\n' +
                `  Schematics available on ${chalk.bold(collection)} collection:\n` +
                this.buildSchematicsListAsTable(yield this.getSchematics(collection)));
        });
    }
    buildSchematicsListAsTable(schematics) {
        const leftMargin = '    ';
        const tableConfig = {
            head: ['name', 'alias', 'description'],
            chars: {
                'left': leftMargin.concat('│'),
                'top-left': leftMargin.concat('┌'),
                'bottom-left': leftMargin.concat('└'),
                'mid': '',
                'left-mid': '',
                'mid-mid': '',
                'right-mid': '',
            },
        };
        const table = new Table(tableConfig);
        for (const schematic of schematics) {
            table.push([
                chalk.green(schematic.name),
                chalk.cyan(schematic.alias),
                schematic.description,
            ]);
        }
        return table.toString();
    }
    getCollection() {
        return __awaiter(this, void 0, void 0, function* () {
            const configuration = yield (0, load_configuration_1.loadConfiguration)();
            return configuration.collection;
        });
    }
    getSchematics(collection) {
        return __awaiter(this, void 0, void 0, function* () {
            const abstractCollection = schematics_1.CollectionFactory.create(collection);
            return abstractCollection.getSchematics();
        });
    }
}
exports.GenerateCommand = GenerateCommand;
