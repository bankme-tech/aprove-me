import { Input } from '../commands';
import { AssetsManager } from '../lib/compiler/assets-manager';
import { Compiler } from '../lib/compiler/compiler';
import { TsConfigProvider } from '../lib/compiler/helpers/tsconfig-provider';
import { PluginsLoader } from '../lib/compiler/plugins-loader';
import { TypeScriptBinaryLoader } from '../lib/compiler/typescript-loader';
import { WatchCompiler } from '../lib/compiler/watch-compiler';
import { WebpackCompiler } from '../lib/compiler/webpack-compiler';
import { WorkspaceUtils } from '../lib/compiler/workspace-utils';
import { ConfigurationLoader } from '../lib/configuration';
import { FileSystemReader } from '../lib/readers';
import { AbstractAction } from './abstract.action';
export declare class BuildAction extends AbstractAction {
    protected readonly pluginsLoader: PluginsLoader;
    protected readonly tsLoader: TypeScriptBinaryLoader;
    protected readonly tsConfigProvider: TsConfigProvider;
    protected readonly compiler: Compiler;
    protected readonly webpackCompiler: WebpackCompiler;
    protected readonly watchCompiler: WatchCompiler;
    protected readonly fileSystemReader: FileSystemReader;
    protected readonly loader: ConfigurationLoader;
    protected readonly assetsManager: AssetsManager;
    protected readonly workspaceUtils: WorkspaceUtils;
    handle(inputs: Input[], options: Input[]): Promise<void>;
    runBuild(inputs: Input[], options: Input[], watchMode: boolean, watchAssetsMode: boolean, isDebugEnabled?: boolean, onSuccess?: () => void): Promise<void>;
    private getWebpackConfigFactoryByPath;
}
