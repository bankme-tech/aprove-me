"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WatchCompiler = void 0;
const errors_1 = require("../ui/errors");
const get_value_or_default_1 = require("./helpers/get-value-or-default");
const tsconfig_paths_hook_1 = require("./hooks/tsconfig-paths.hook");
class WatchCompiler {
    constructor(pluginsLoader, tsConfigProvider, typescriptLoader) {
        this.pluginsLoader = pluginsLoader;
        this.tsConfigProvider = tsConfigProvider;
        this.typescriptLoader = typescriptLoader;
    }
    run(configuration, configFilename, appName, tsCompilerOptions, onSuccess) {
        const tsBin = this.typescriptLoader.load();
        const configPath = tsBin.findConfigFile(process.cwd(), tsBin.sys.fileExists, configFilename);
        if (!configPath) {
            throw new Error(errors_1.CLI_ERRORS.MISSING_TYPESCRIPT(configFilename));
        }
        const { options, projectReferences } = this.tsConfigProvider.getByConfigFilename(configFilename);
        const createProgram = tsBin.createEmitAndSemanticDiagnosticsBuilderProgram;
        const origDiagnosticReporter = tsBin.createDiagnosticReporter(tsBin.sys, true);
        const origWatchStatusReporter = tsBin.createWatchStatusReporter(tsBin.sys, true);
        const host = tsBin.createWatchCompilerHost(configPath, Object.assign(Object.assign({}, options), tsCompilerOptions), tsBin.sys, createProgram, this.createDiagnosticReporter(origDiagnosticReporter), this.createWatchStatusChanged(origWatchStatusReporter, onSuccess));
        const pluginsConfig = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.plugins', appName);
        const plugins = this.pluginsLoader.load(pluginsConfig);
        const origCreateProgram = host.createProgram;
        host.createProgram = (rootNames, options, 
        // tslint:disable-next-line:no-shadowed-variable
        host, oldProgram) => {
            const tsconfigPathsPlugin = options ? (0, tsconfig_paths_hook_1.tsconfigPathsBeforeHookFactory)(options) : null;
            const program = origCreateProgram(rootNames, options, host, oldProgram, undefined, projectReferences);
            const origProgramEmit = program.emit;
            program.emit = (targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers) => {
                let transforms = customTransformers;
                transforms = typeof transforms !== 'object' ? {} : transforms;
                const before = plugins.beforeHooks.map((hook) => hook(program.getProgram()));
                const after = plugins.afterHooks.map((hook) => hook(program.getProgram()));
                const afterDeclarations = plugins.afterDeclarationsHooks.map((hook) => hook(program.getProgram()));
                if (tsconfigPathsPlugin) {
                    before.unshift(tsconfigPathsPlugin);
                }
                transforms.before = before.concat(transforms.before || []);
                transforms.after = after.concat(transforms.after || []);
                transforms.afterDeclarations = afterDeclarations.concat(transforms.afterDeclarations || []);
                return origProgramEmit(targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, transforms);
            };
            return program;
        };
        tsBin.createWatchProgram(host);
    }
    createDiagnosticReporter(diagnosticReporter) {
        return function (diagnostic, ...args) {
            return diagnosticReporter.call(this, diagnostic, ...args);
        };
    }
    createWatchStatusChanged(watchStatusReporter, onSuccess) {
        return function (diagnostic, ...args) {
            const messageText = diagnostic && diagnostic.messageText;
            const noErrorsMessage = '0 errors';
            if (messageText &&
                messageText.includes &&
                messageText.includes(noErrorsMessage) &&
                onSuccess) {
                onSuccess();
            }
            return watchStatusReporter.call(this, diagnostic, ...args);
        };
    }
}
exports.WatchCompiler = WatchCompiler;
