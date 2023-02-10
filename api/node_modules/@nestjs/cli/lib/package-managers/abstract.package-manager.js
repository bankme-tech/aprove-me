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
exports.AbstractPackageManager = void 0;
const chalk = require("chalk");
const fs_1 = require("fs");
const ora = require("ora");
const path_1 = require("path");
const ui_1 = require("../ui");
const formatting_1 = require("../utils/formatting");
class AbstractPackageManager {
    constructor(runner) {
        this.runner = runner;
    }
    install(directory, packageManager) {
        return __awaiter(this, void 0, void 0, function* () {
            const spinner = ora({
                spinner: {
                    interval: 120,
                    frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
                },
                text: ui_1.MESSAGES.PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS,
            });
            spinner.start();
            try {
                const commandArgs = `${this.cli.install} ${this.cli.silentFlag}`;
                const collect = true;
                const normalizedDirectory = (0, formatting_1.normalizeToKebabOrSnakeCase)(directory);
                yield this.runner.run(commandArgs, collect, (0, path_1.join)(process.cwd(), normalizedDirectory));
                spinner.succeed();
                console.info();
                console.info(ui_1.MESSAGES.PACKAGE_MANAGER_INSTALLATION_SUCCEED(directory));
                console.info(ui_1.MESSAGES.GET_STARTED_INFORMATION);
                console.info();
                console.info(chalk.gray(ui_1.MESSAGES.CHANGE_DIR_COMMAND(directory)));
                console.info(chalk.gray(ui_1.MESSAGES.START_COMMAND(packageManager)));
                console.info();
            }
            catch (_a) {
                spinner.fail();
                const commandArgs = this.cli.install;
                const commandToRun = this.runner.rawFullCommand(commandArgs);
                console.error(chalk.red(ui_1.MESSAGES.PACKAGE_MANAGER_INSTALLATION_FAILED(chalk.bold(commandToRun))));
            }
        });
    }
    version() {
        return __awaiter(this, void 0, void 0, function* () {
            const commandArguments = '--version';
            const collect = true;
            return this.runner.run(commandArguments, collect);
        });
    }
    addProduction(dependencies, tag) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = [this.cli.add, this.cli.saveFlag]
                .filter((i) => i)
                .join(' ');
            const args = dependencies
                .map((dependency) => `${dependency}@${tag}`)
                .join(' ');
            const spinner = ora({
                spinner: {
                    interval: 120,
                    frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
                },
                text: ui_1.MESSAGES.PACKAGE_MANAGER_PRODUCTION_INSTALLATION_IN_PROGRESS,
            });
            spinner.start();
            try {
                yield this.add(`${command} ${args}`);
                spinner.succeed();
                return true;
            }
            catch (_a) {
                spinner.fail();
                return false;
            }
        });
    }
    addDevelopment(dependencies, tag) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = `${this.cli.add} ${this.cli.saveDevFlag}`;
            const args = dependencies
                .map((dependency) => `${dependency}@${tag}`)
                .join(' ');
            yield this.add(`${command} ${args}`);
        });
    }
    add(commandArguments) {
        return __awaiter(this, void 0, void 0, function* () {
            const collect = true;
            yield this.runner.run(commandArguments, collect);
        });
    }
    getProduction() {
        return __awaiter(this, void 0, void 0, function* () {
            const packageJsonContent = yield this.readPackageJson();
            const packageJsonDependencies = packageJsonContent.dependencies;
            const dependencies = [];
            for (const [name, version] of Object.entries(packageJsonDependencies)) {
                dependencies.push({ name, version });
            }
            return dependencies;
        });
    }
    getDevelopment() {
        return __awaiter(this, void 0, void 0, function* () {
            const packageJsonContent = yield this.readPackageJson();
            const packageJsonDevDependencies = packageJsonContent.devDependencies;
            const dependencies = [];
            for (const [name, version] of Object.entries(packageJsonDevDependencies)) {
                dependencies.push({ name, version });
            }
            return dependencies;
        });
    }
    readPackageJson() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                (0, fs_1.readFile)((0, path_1.join)(process.cwd(), 'package.json'), (error, buffer) => {
                    if (error !== undefined && error !== null) {
                        reject(error);
                    }
                    else {
                        resolve(JSON.parse(buffer.toString()));
                    }
                });
            });
        });
    }
    updateProduction(dependencies) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandArguments = `${this.cli.update} ${dependencies.join(' ')}`;
            yield this.update(commandArguments);
        });
    }
    updateDevelopment(dependencies) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandArguments = `${this.cli.update} ${dependencies.join(' ')}`;
            yield this.update(commandArguments);
        });
    }
    update(commandArguments) {
        return __awaiter(this, void 0, void 0, function* () {
            const collect = true;
            yield this.runner.run(commandArguments, collect);
        });
    }
    upgradeProduction(dependencies, tag) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteProduction(dependencies);
            yield this.addProduction(dependencies, tag);
        });
    }
    upgradeDevelopment(dependencies, tag) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.deleteDevelopment(dependencies);
            yield this.addDevelopment(dependencies, tag);
        });
    }
    deleteProduction(dependencies) {
        return __awaiter(this, void 0, void 0, function* () {
            const command = [this.cli.remove, this.cli.saveFlag]
                .filter((i) => i)
                .join(' ');
            const args = dependencies.join(' ');
            yield this.delete(`${command} ${args}`);
        });
    }
    deleteDevelopment(dependencies) {
        return __awaiter(this, void 0, void 0, function* () {
            const commandArguments = `${this.cli.remove} ${this.cli.saveDevFlag} ${dependencies.join(' ')}`;
            yield this.delete(commandArguments);
        });
    }
    delete(commandArguments) {
        return __awaiter(this, void 0, void 0, function* () {
            const collect = true;
            yield this.runner.run(commandArguments, collect);
        });
    }
}
exports.AbstractPackageManager = AbstractPackageManager;
