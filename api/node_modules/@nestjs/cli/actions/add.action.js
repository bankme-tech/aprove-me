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
exports.AddAction = void 0;
const chalk = require("chalk");
const get_value_or_default_1 = require("../lib/compiler/helpers/get-value-or-default");
const package_managers_1 = require("../lib/package-managers");
const schematics_1 = require("../lib/schematics");
const ui_1 = require("../lib/ui");
const load_configuration_1 = require("../lib/utils/load-configuration");
const project_utils_1 = require("../lib/utils/project-utils");
const abstract_action_1 = require("./abstract.action");
const schematicName = 'nest-add';
class AddAction extends abstract_action_1.AbstractAction {
    handle(inputs, options, extraFlags) {
        return __awaiter(this, void 0, void 0, function* () {
            const libraryName = this.getLibraryName(inputs);
            const packageName = this.getPackageName(libraryName);
            const collectionName = this.getCollectionName(libraryName, packageName);
            const tagName = this.getTagName(packageName);
            const skipInstall = (0, project_utils_1.hasValidOptionFlag)('skip-install', options);
            const packageInstallSuccess = skipInstall || (yield this.installPackage(collectionName, tagName));
            if (packageInstallSuccess) {
                const sourceRootOption = yield this.getSourceRoot(inputs.concat(options));
                options.push(sourceRootOption);
                yield this.addLibrary(collectionName, options, extraFlags);
            }
            else {
                console.error(chalk.red(ui_1.MESSAGES.LIBRARY_INSTALLATION_FAILED_BAD_PACKAGE(libraryName)));
                throw new Error(ui_1.MESSAGES.LIBRARY_INSTALLATION_FAILED_BAD_PACKAGE(libraryName));
            }
        });
    }
    getSourceRoot(inputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const configuration = yield (0, load_configuration_1.loadConfiguration)();
            const configurationProjects = configuration.projects;
            const appName = inputs.find((option) => option.name === 'project')
                .value;
            let sourceRoot = appName
                ? (0, get_value_or_default_1.getValueOrDefault)(configuration, 'sourceRoot', appName)
                : configuration.sourceRoot;
            const shouldAsk = (0, project_utils_1.shouldAskForProject)(schematicName, configurationProjects, appName);
            if (shouldAsk) {
                const defaultLabel = ' [ Default ]';
                let defaultProjectName = configuration.sourceRoot + defaultLabel;
                for (const property in configurationProjects) {
                    if (configurationProjects[property].sourceRoot ===
                        configuration.sourceRoot) {
                        defaultProjectName = property + defaultLabel;
                        break;
                    }
                }
                const projects = (0, project_utils_1.moveDefaultProjectToStart)(configuration, defaultProjectName, defaultLabel);
                const answers = yield (0, project_utils_1.askForProjectName)(ui_1.MESSAGES.LIBRARY_PROJECT_SELECTION_QUESTION, projects);
                const project = answers.appName.replace(defaultLabel, '');
                if (project !== configuration.sourceRoot) {
                    sourceRoot = configurationProjects[project].sourceRoot;
                }
            }
            return { name: 'sourceRoot', value: sourceRoot };
        });
    }
    installPackage(collectionName, tagName) {
        return __awaiter(this, void 0, void 0, function* () {
            const manager = yield package_managers_1.PackageManagerFactory.find();
            tagName = tagName || 'latest';
            let installResult = false;
            try {
                installResult = yield manager.addProduction([collectionName], tagName);
            }
            catch (error) {
                if (error && error.message) {
                    console.error(chalk.red(error.message));
                }
            }
            return installResult;
        });
    }
    addLibrary(collectionName, options, extraFlags) {
        return __awaiter(this, void 0, void 0, function* () {
            console.info(ui_1.MESSAGES.LIBRARY_INSTALLATION_STARTS);
            const schematicOptions = [];
            schematicOptions.push(new schematics_1.SchematicOption('sourceRoot', options.find((option) => option.name === 'sourceRoot').value));
            const extraFlagsString = extraFlags ? extraFlags.join(' ') : undefined;
            try {
                const collection = schematics_1.CollectionFactory.create(collectionName);
                yield collection.execute(schematicName, schematicOptions, extraFlagsString);
            }
            catch (error) {
                if (error && error.message) {
                    console.error(chalk.red(error.message));
                    return Promise.reject();
                }
            }
        });
    }
    getLibraryName(inputs) {
        const libraryInput = inputs.find((input) => input.name === 'library');
        if (!libraryInput) {
            throw new Error('No library found in command input');
        }
        return libraryInput.value;
    }
    getPackageName(library) {
        return library.startsWith('@')
            ? library.split('/', 2).join('/')
            : library.split('/', 1)[0];
    }
    getCollectionName(library, packageName) {
        return ((packageName.startsWith('@')
            ? packageName.split('@', 2).join('@')
            : packageName.split('@', 1).join('@')) +
            library.slice(packageName.length));
    }
    getTagName(packageName) {
        return packageName.startsWith('@')
            ? packageName.split('@', 3)[2]
            : packageName.split('@', 2)[1];
    }
}
exports.AddAction = AddAction;
