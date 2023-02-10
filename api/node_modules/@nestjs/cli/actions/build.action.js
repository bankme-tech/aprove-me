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
exports.BuildAction = void 0;
const chalk = require("chalk");
const path_1 = require("path");
const assets_manager_1 = require("../lib/compiler/assets-manager");
const compiler_1 = require("../lib/compiler/compiler");
const get_value_or_default_1 = require("../lib/compiler/helpers/get-value-or-default");
const tsconfig_provider_1 = require("../lib/compiler/helpers/tsconfig-provider");
const plugins_loader_1 = require("../lib/compiler/plugins-loader");
const typescript_loader_1 = require("../lib/compiler/typescript-loader");
const watch_compiler_1 = require("../lib/compiler/watch-compiler");
const webpack_compiler_1 = require("../lib/compiler/webpack-compiler");
const workspace_utils_1 = require("../lib/compiler/workspace-utils");
const configuration_1 = require("../lib/configuration");
const defaults_1 = require("../lib/configuration/defaults");
const readers_1 = require("../lib/readers");
const ui_1 = require("../lib/ui");
const abstract_action_1 = require("./abstract.action");
class BuildAction extends abstract_action_1.AbstractAction {
    constructor() {
        super(...arguments);
        this.pluginsLoader = new plugins_loader_1.PluginsLoader();
        this.tsLoader = new typescript_loader_1.TypeScriptBinaryLoader();
        this.tsConfigProvider = new tsconfig_provider_1.TsConfigProvider(this.tsLoader);
        this.compiler = new compiler_1.Compiler(this.pluginsLoader, this.tsConfigProvider, this.tsLoader);
        this.webpackCompiler = new webpack_compiler_1.WebpackCompiler(this.pluginsLoader);
        this.watchCompiler = new watch_compiler_1.WatchCompiler(this.pluginsLoader, this.tsConfigProvider, this.tsLoader);
        this.fileSystemReader = new readers_1.FileSystemReader(process.cwd());
        this.loader = new configuration_1.NestConfigurationLoader(this.fileSystemReader);
        this.assetsManager = new assets_manager_1.AssetsManager();
        this.workspaceUtils = new workspace_utils_1.WorkspaceUtils();
    }
    handle(inputs, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const watchModeOption = options.find((option) => option.name === 'watch');
                const watchMode = !!(watchModeOption && watchModeOption.value);
                const watchAssetsModeOption = options.find((option) => option.name === 'watchAssets');
                const watchAssetsMode = !!(watchAssetsModeOption && watchAssetsModeOption.value);
                yield this.runBuild(inputs, options, watchMode, watchAssetsMode);
            }
            catch (err) {
                if (err instanceof Error) {
                    console.log(`\n${ui_1.ERROR_PREFIX} ${err.message}\n`);
                }
                else {
                    console.error(`\n${chalk.red(err)}\n`);
                }
                process.exit(1);
            }
        });
    }
    runBuild(inputs, options, watchMode, watchAssetsMode, isDebugEnabled = false, onSuccess) {
        return __awaiter(this, void 0, void 0, function* () {
            const configFileName = options.find((option) => option.name === 'config')
                .value;
            const configuration = yield this.loader.load(configFileName);
            const appName = inputs.find((input) => input.name === 'app')
                .value;
            const pathToTsconfig = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.tsConfigPath', appName, 'path', options);
            const { options: tsOptions } = this.tsConfigProvider.getByConfigFilename(pathToTsconfig);
            const outDir = tsOptions.outDir || defaults_1.defaultOutDir;
            const isWebpackEnabled = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.webpack', appName, 'webpack', options);
            yield this.workspaceUtils.deleteOutDirIfEnabled(configuration, appName, outDir);
            this.assetsManager.copyAssets(configuration, appName, outDir, watchAssetsMode);
            if (isWebpackEnabled) {
                const webpackPath = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.webpackConfigPath', appName, 'webpackPath', options);
                const webpackConfigFactoryOrConfig = this.getWebpackConfigFactoryByPath(webpackPath, configuration.compilerOptions.webpackConfigPath);
                return this.webpackCompiler.run(configuration, webpackConfigFactoryOrConfig, pathToTsconfig, appName, isDebugEnabled, watchMode, this.assetsManager, onSuccess);
            }
            if (watchMode) {
                const tsCompilerOptions = {};
                const isPreserveWatchOutputEnabled = options.find((option) => option.name === 'preserveWatchOutput' && option.value === true);
                if (isPreserveWatchOutputEnabled) {
                    tsCompilerOptions.preserveWatchOutput = true;
                }
                this.watchCompiler.run(configuration, pathToTsconfig, appName, tsCompilerOptions, onSuccess);
            }
            else {
                this.compiler.run(configuration, pathToTsconfig, appName, onSuccess);
                this.assetsManager.closeWatchers();
            }
        });
    }
    getWebpackConfigFactoryByPath(webpackPath, defaultPath) {
        const pathToWebpackFile = (0, path_1.join)(process.cwd(), webpackPath);
        try {
            return require(pathToWebpackFile);
        }
        catch (err) {
            if (webpackPath !== defaultPath) {
                throw err;
            }
            return ({}) => ({});
        }
    }
}
exports.BuildAction = BuildAction;
