import * as ts from 'typescript';
import { Configuration } from '../configuration';
import { TsConfigProvider } from './helpers/tsconfig-provider';
import { PluginsLoader } from './plugins-loader';
import { TypeScriptBinaryLoader } from './typescript-loader';
export declare class WatchCompiler {
    private readonly pluginsLoader;
    private readonly tsConfigProvider;
    private readonly typescriptLoader;
    constructor(pluginsLoader: PluginsLoader, tsConfigProvider: TsConfigProvider, typescriptLoader: TypeScriptBinaryLoader);
    run(configuration: Required<Configuration>, configFilename: string, appName: string, tsCompilerOptions: ts.CompilerOptions, onSuccess?: () => void): void;
    private createDiagnosticReporter;
    private createWatchStatusChanged;
}
