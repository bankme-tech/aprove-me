"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Compiler = void 0;
const ts = require("typescript");
const get_value_or_default_1 = require("./helpers/get-value-or-default");
const tsconfig_paths_hook_1 = require("./hooks/tsconfig-paths.hook");
class Compiler {
    constructor(pluginsLoader, tsConfigProvider, typescriptLoader) {
        this.pluginsLoader = pluginsLoader;
        this.tsConfigProvider = tsConfigProvider;
        this.typescriptLoader = typescriptLoader;
    }
    run(configuration, configFilename, appName, onSuccess) {
        const tsBinary = this.typescriptLoader.load();
        const formatHost = {
            getCanonicalFileName: (path) => path,
            getCurrentDirectory: tsBinary.sys.getCurrentDirectory,
            getNewLine: () => tsBinary.sys.newLine,
        };
        const { options, fileNames, projectReferences } = this.tsConfigProvider.getByConfigFilename(configFilename);
        const createProgram = tsBinary.createIncrementalProgram || tsBinary.createProgram;
        const program = createProgram.call(ts, {
            rootNames: fileNames,
            projectReferences,
            options,
        });
        const pluginsConfig = (0, get_value_or_default_1.getValueOrDefault)(configuration, 'compilerOptions.plugins', appName);
        const plugins = this.pluginsLoader.load(pluginsConfig);
        const tsconfigPathsPlugin = (0, tsconfig_paths_hook_1.tsconfigPathsBeforeHookFactory)(options);
        const programRef = program.getProgram
            ? program.getProgram()
            : program;
        const before = plugins.beforeHooks.map((hook) => hook(programRef));
        const after = plugins.afterHooks.map((hook) => hook(programRef));
        const afterDeclarations = plugins.afterDeclarationsHooks.map((hook) => hook(programRef));
        const emitResult = program.emit(undefined, undefined, undefined, undefined, {
            before: tsconfigPathsPlugin
                ? before.concat(tsconfigPathsPlugin)
                : before,
            after,
            afterDeclarations,
        });
        const errorsCount = this.reportAfterCompilationDiagnostic(program, emitResult, tsBinary, formatHost);
        if (errorsCount) {
            process.exit(1);
        }
        else if (!errorsCount && onSuccess) {
            onSuccess();
        }
    }
    reportAfterCompilationDiagnostic(program, emitResult, tsBinary, formatHost) {
        const diagnostics = tsBinary
            .getPreEmitDiagnostics(program)
            .concat(emitResult.diagnostics);
        if (diagnostics.length > 0) {
            console.error(tsBinary.formatDiagnosticsWithColorAndContext(diagnostics, formatHost));
            console.info(`Found ${diagnostics.length} error(s).` + tsBinary.sys.newLine);
        }
        return diagnostics.length;
    }
}
exports.Compiler = Compiler;
