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
exports.InfoAction = void 0;
const chalk = require("chalk");
const fs_1 = require("fs");
const os_1 = require("os");
const osName = require("os-name");
const path_1 = require("path");
const package_managers_1 = require("../lib/package-managers");
const ui_1 = require("../lib/ui");
const abstract_action_1 = require("./abstract.action");
class InfoAction extends abstract_action_1.AbstractAction {
    handle() {
        return __awaiter(this, void 0, void 0, function* () {
            this.manager = yield package_managers_1.PackageManagerFactory.find();
            this.displayBanner();
            yield this.displaySystemInformation();
            yield this.displayNestInformation();
        });
    }
    displayBanner() {
        console.info(chalk.red(ui_1.BANNER));
    }
    displaySystemInformation() {
        return __awaiter(this, void 0, void 0, function* () {
            console.info(chalk.green('[System Information]'));
            console.info('OS Version     :', chalk.blue(osName((0, os_1.platform)(), (0, os_1.release)())));
            console.info('NodeJS Version :', chalk.blue(process.version));
            yield this.displayPackageManagerVersion();
        });
    }
    displayPackageManagerVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const version = yield this.manager.version();
                console.info(`${this.manager.name} Version    :`, chalk.blue(version), '\n');
            }
            catch (_a) {
                console.error(`${this.manager.name} Version    :`, chalk.red('Unknown'), '\n');
            }
        });
    }
    displayNestInformation() {
        return __awaiter(this, void 0, void 0, function* () {
            this.displayCliVersion();
            console.info(chalk.green('[Nest Platform Information]'));
            yield this.displayNestInformationFromPackage();
        });
    }
    displayNestInformationFromPackage() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dependencies = this.readProjectPackageDependencies();
                this.displayNestVersions(dependencies);
            }
            catch (err) {
                console.error(chalk.red(ui_1.MESSAGES.NEST_INFORMATION_PACKAGE_MANAGER_FAILED));
            }
        });
    }
    displayCliVersion() {
        console.info(chalk.green('[Nest CLI]'));
        console.info('Nest CLI Version :', chalk.blue(JSON.parse((0, fs_1.readFileSync)((0, path_1.join)(__dirname, '../package.json')).toString())
            .version), '\n');
    }
    readProjectPackageDependencies() {
        const buffer = (0, fs_1.readFileSync)((0, path_1.join)(process.cwd(), 'package.json'));
        const pack = JSON.parse(buffer.toString());
        const dependencies = Object.assign(Object.assign({}, pack.dependencies), pack.devDependencies);
        Object.keys(dependencies).forEach((key) => {
            dependencies[key] = {
                version: dependencies[key],
            };
        });
        return dependencies;
    }
    displayNestVersions(dependencies) {
        this.buildNestVersionsMessage(dependencies).forEach((dependency) => console.info(dependency.name, chalk.blue(dependency.value)));
    }
    buildNestVersionsMessage(dependencies) {
        const nestDependencies = this.collectNestDependencies(dependencies);
        return this.format(nestDependencies);
    }
    collectNestDependencies(dependencies) {
        const nestDependencies = [];
        Object.keys(dependencies).forEach((key) => {
            if (key.indexOf('@nestjs') > -1) {
                const depPackagePath = require.resolve(key + '/package.json', {
                    paths: [process.cwd()],
                });
                const depPackage = (0, fs_1.readFileSync)(depPackagePath).toString();
                const value = JSON.parse(depPackage).version;
                nestDependencies.push({
                    name: `${key.replace(/@nestjs\//, '').replace(/@.*/, '')} version`,
                    value: value || dependencies[key].version,
                });
            }
        });
        return nestDependencies;
    }
    format(dependencies) {
        const sorted = dependencies.sort((dependencyA, dependencyB) => dependencyB.name.length - dependencyA.name.length);
        const length = sorted[0].name.length;
        sorted.forEach((dependency) => {
            if (dependency.name.length < length) {
                dependency.name = this.rightPad(dependency.name, length);
            }
            dependency.name = dependency.name.concat(' :');
            dependency.value = dependency.value.replace(/(\^|\~)/, '');
        });
        return sorted;
    }
    rightPad(name, length) {
        while (name.length < length) {
            name = name.concat(' ');
        }
        return name;
    }
}
exports.InfoAction = InfoAction;
