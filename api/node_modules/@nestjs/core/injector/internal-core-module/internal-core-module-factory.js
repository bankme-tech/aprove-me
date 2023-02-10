"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalCoreModuleFactory = void 0;
const common_1 = require("@nestjs/common");
const external_context_creator_1 = require("../../helpers/external-context-creator");
const http_adapter_host_1 = require("../../helpers/http-adapter-host");
const serialized_graph_1 = require("../../inspector/serialized-graph");
const injector_1 = require("../injector");
const instance_loader_1 = require("../instance-loader");
const lazy_module_loader_1 = require("../lazy-module-loader/lazy-module-loader");
const modules_container_1 = require("../modules-container");
const internal_core_module_1 = require("./internal-core-module");
class InternalCoreModuleFactory {
    static create(container, scanner, moduleCompiler, httpAdapterHost, graphInspector) {
        const lazyModuleLoaderFactory = () => {
            const logger = new common_1.Logger(lazy_module_loader_1.LazyModuleLoader.name, {
                timestamp: false,
            });
            const injector = new injector_1.Injector();
            const instanceLoader = new instance_loader_1.InstanceLoader(container, injector, graphInspector, logger);
            return new lazy_module_loader_1.LazyModuleLoader(scanner, instanceLoader, moduleCompiler, container.getModules());
        };
        return internal_core_module_1.InternalCoreModule.register([
            {
                provide: external_context_creator_1.ExternalContextCreator,
                useValue: external_context_creator_1.ExternalContextCreator.fromContainer(container),
            },
            {
                provide: modules_container_1.ModulesContainer,
                useValue: container.getModules(),
            },
            {
                provide: http_adapter_host_1.HttpAdapterHost,
                useValue: httpAdapterHost,
            },
            {
                provide: http_adapter_host_1.HttpAdapterHost.name,
                useExisting: http_adapter_host_1.HttpAdapterHost,
            },
            {
                provide: lazy_module_loader_1.LazyModuleLoader,
                useFactory: lazyModuleLoaderFactory,
            },
            {
                provide: serialized_graph_1.SerializedGraph,
                useValue: container.serializedGraph,
            },
        ]);
    }
}
exports.InternalCoreModuleFactory = InternalCoreModuleFactory;
