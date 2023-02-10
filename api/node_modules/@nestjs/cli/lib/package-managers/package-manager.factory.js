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
exports.PackageManagerFactory = void 0;
const fs_1 = require("fs");
const npm_package_manager_1 = require("./npm.package-manager");
const package_manager_1 = require("./package-manager");
const yarn_package_manager_1 = require("./yarn.package-manager");
const pnpm_package_manager_1 = require("./pnpm.package-manager");
class PackageManagerFactory {
    static create(name) {
        switch (name) {
            case package_manager_1.PackageManager.NPM:
                return new npm_package_manager_1.NpmPackageManager();
            case package_manager_1.PackageManager.YARN:
                return new yarn_package_manager_1.YarnPackageManager();
            case package_manager_1.PackageManager.PNPM:
                return new pnpm_package_manager_1.PnpmPackageManager();
            default:
                throw new Error(`Package manager ${name} is not managed.`);
        }
    }
    static find() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                (0, fs_1.readdir)(process.cwd(), (error, files) => {
                    if (error) {
                        resolve(this.create(package_manager_1.PackageManager.NPM));
                    }
                    else {
                        if (files.findIndex((filename) => filename === 'yarn.lock') > -1) {
                            resolve(this.create(package_manager_1.PackageManager.YARN));
                        }
                        else if (files.findIndex((filename) => filename === 'pnpm-lock.yaml') > -1) {
                            resolve(this.create(package_manager_1.PackageManager.PNPM));
                        }
                        else {
                            resolve(this.create(package_manager_1.PackageManager.NPM));
                        }
                    }
                });
            });
        });
    }
}
exports.PackageManagerFactory = PackageManagerFactory;
