import { Configuration } from '../configuration';
import { TsConfigProvider } from './helpers/tsconfig-provider';
import { PluginsLoader } from './plugins-loader';
import { TypeScriptBinaryLoader } from './typescript-loader';
export declare class Compiler {
    private readonly pluginsLoader;
    private readonly tsConfigProvider;
    private readonly typescriptLoader;
    constructor(pluginsLoader: PluginsLoader, tsConfigProvider: TsConfigProvider, typescriptLoader: TypeScriptBinaryLoader);
    run(configuration: Required<Configuration>, configFilename: string, appName: string, onSuccess?: () => void): void;
    private reportAfterCompilationDiagnostic;
}
