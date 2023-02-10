import { HttpAdapterHost } from '../../helpers/http-adapter-host';
import { GraphInspector } from '../../inspector/graph-inspector';
import { DependenciesScanner } from '../../scanner';
import { ModuleCompiler } from '../compiler';
import { NestContainer } from '../container';
export declare class InternalCoreModuleFactory {
    static create(container: NestContainer, scanner: DependenciesScanner, moduleCompiler: ModuleCompiler, httpAdapterHost: HttpAdapterHost, graphInspector: GraphInspector): import("@nestjs/common").DynamicModule;
}
