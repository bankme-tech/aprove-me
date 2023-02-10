import * as ts from 'typescript';
type Transformer = ts.TransformerFactory<any> | ts.CustomTransformerFactory;
type PluginEntry = string | PluginAndOptions;
interface PluginAndOptions {
    name: 'string';
    options: Record<string, any>;
}
export interface NestCompilerPlugin {
    before?: (options?: Record<string, any>, program?: ts.Program) => Transformer;
    after?: (options?: Record<string, any>, program?: ts.Program) => Transformer;
    afterDeclarations?: (options?: Record<string, any>, program?: ts.Program) => Transformer;
}
export interface MultiNestCompilerPlugins {
    beforeHooks: Array<(program?: ts.Program) => Transformer>;
    afterHooks: Array<(program?: ts.Program) => Transformer>;
    afterDeclarationsHooks: Array<(program?: ts.Program) => Transformer>;
}
export declare class PluginsLoader {
    load(plugins?: PluginEntry[]): MultiNestCompilerPlugins;
}
export {};
