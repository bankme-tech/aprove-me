"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebpackCompiler = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const ui_1 = require("../ui");
const webpack_defaults_1 = require("./defaults/webpack-defaults");
const get_value_or_default_1 = require("./helpers/get-value-or-default");
const webpack = require("webpack");
class WebpackCompiler {
    constructor(pluginsLoader) {
        this.pluginsLoader = pluginsLoader;
    }
    run(configuration, webpackConfigFactoryOrConfig, tsConfigPath, appName, isDebugEnabled = false, watchMode = false, assetsManager, onSuccess) {
        const cwd = process.cwd();
        const configPath = (0, path_1.join)(cwd, tsConfigPath);
        if (!(0, fs_1.existsSync)(configPath)) {
            throw new Error(`Could not find TypeScript configuration file "${tsConfigPath}".`);
        }
        const pluginsConfig = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.plugins', appName);
        const plugins = this.pluginsLoader.load(pluginsConfig);
        const relativeRootPath = (0, path_1.dirname)((0, path_1.relative)(cwd, configPath));
        const sourceRoot = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'sourceRoot', appName);
        const pathToSource = (0, path_1.normalize)(sourceRoot).indexOf((0, path_1.normalize)(relativeRootPath)) >= 0
            ? (0, path_1.join)(cwd, sourceRoot)
            : (0, path_1.join)(cwd, relativeRootPath, sourceRoot);
        const entryFile = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'entryFile', appName);
        const entryFileRoot = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'root', appName) || '';
        const defaultOptions = (0, webpack_defaults_1.webpackDefaultsFactory)(pathToSource, entryFileRoot, entryFile, isDebugEnabled, tsConfigPath, plugins);
        let compiler;
        let watchOptions;
        let watch;
        if (Array.isArray(webpackConfigFactoryOrConfig)) {
            const webpackConfigurations = webpackConfigFactoryOrConfig.map((configOrFactory) => {
                const unwrappedConfig = typeof configOrFactory !== 'function'
                    ? configOrFactory
                    : configOrFactory(defaultOptions, webpack);
                return Object.assign(Object.assign(Object.assign({}, defaultOptions), { mode: watchMode ? 'development' : defaultOptions.mode }), unwrappedConfig);
            });
            compiler = webpack(webpackConfigurations);
            watchOptions = webpackConfigurations.map((config) => config.watchOptions || {});
            watch = webpackConfigurations.some((config) => config.watch);
        }
        else {
            const projectWebpackOptions = typeof webpackConfigFactoryOrConfig !== 'function'
                ? webpackConfigFactoryOrConfig
                : webpackConfigFactoryOrConfig(defaultOptions, webpack);
            const webpackConfiguration = Object.assign(Object.assign(Object.assign({}, defaultOptions), { mode: watchMode ? 'development' : defaultOptions.mode }), projectWebpackOptions);
            compiler = webpack(webpackConfiguration);
            watchOptions = webpackConfiguration.watchOptions;
            watch = webpackConfiguration.watch;
        }
        const afterCallback = (err, stats) => {
            if (err && stats === undefined) {
                // Could not complete the compilation
                // The error caught is most likely thrown by underlying tasks
                console.log(err);
                return process.exit(1);
            }
            const statsOutput = stats.toString({
                chunks: false,
                colors: true,
                modules: false,
                assets: false,
            });
            if (!err && !stats.hasErrors()) {
                if (!onSuccess) {
                    assetsManager.closeWatchers();
                }
                else {
                    onSuccess();
                }
            }
            else if (!watchMode && !watch) {
                console.log(statsOutput);
                return process.exit(1);
            }
            console.log(statsOutput);
        };
        if (watchMode || watch) {
            compiler.hooks.watchRun.tapAsync('Rebuild info', (params, callback) => {
                console.log(`\n${ui_1.INFO_PREFIX} Webpack is building your sources...\n`);
                callback();
            });
            compiler.watch(watchOptions || {}, afterCallback);
        }
        else {
            compiler.run(afterCallback);
        }
    }
}
exports.WebpackCompiler = WebpackCompiler;
