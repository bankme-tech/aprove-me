"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestingModuleBuilder = void 0;
const common_1 = require("@nestjs/common");
const application_config_1 = require("@nestjs/core/application-config");
const container_1 = require("@nestjs/core/injector/container");
const graph_inspector_1 = require("@nestjs/core/inspector/graph-inspector");
const noop_graph_inspector_1 = require("@nestjs/core/inspector/noop-graph-inspector");
const uuid_factory_1 = require("@nestjs/core/inspector/uuid-factory");
const scanner_1 = require("@nestjs/core/scanner");
const testing_logger_service_1 = require("./services/testing-logger.service");
const testing_injector_1 = require("./testing-injector");
const testing_instance_loader_1 = require("./testing-instance-loader");
const testing_module_1 = require("./testing-module");
/**
 * @publicApi
 */
class TestingModuleBuilder {
    constructor(metadataScanner, metadata) {
        this.metadataScanner = metadataScanner;
        this.applicationConfig = new application_config_1.ApplicationConfig();
        this.container = new container_1.NestContainer(this.applicationConfig);
        this.overloadsMap = new Map();
        this.module = this.createModule(metadata);
    }
    setLogger(testingLogger) {
        this.testingLogger = testingLogger;
        return this;
    }
    overridePipe(typeOrToken) {
        return this.override(typeOrToken, false);
    }
    useMocker(mocker) {
        this.mocker = mocker;
        return this;
    }
    overrideFilter(typeOrToken) {
        return this.override(typeOrToken, false);
    }
    overrideGuard(typeOrToken) {
        return this.override(typeOrToken, false);
    }
    overrideInterceptor(typeOrToken) {
        return this.override(typeOrToken, false);
    }
    overrideProvider(typeOrToken) {
        return this.override(typeOrToken, true);
    }
    async compile(options = {}) {
        this.applyLogger();
        let graphInspector;
        if (options === null || options === void 0 ? void 0 : options.snapshot) {
            graphInspector = new graph_inspector_1.GraphInspector(this.container);
            uuid_factory_1.UuidFactory.mode = uuid_factory_1.UuidFactoryMode.Deterministic;
        }
        else {
            graphInspector = noop_graph_inspector_1.NoopGraphInspector;
            uuid_factory_1.UuidFactory.mode = uuid_factory_1.UuidFactoryMode.Random;
        }
        const scanner = new scanner_1.DependenciesScanner(this.container, this.metadataScanner, graphInspector, this.applicationConfig);
        await scanner.scan(this.module);
        this.applyOverloadsMap();
        await this.createInstancesOfDependencies(graphInspector, options);
        scanner.applyApplicationProviders();
        const root = this.getRootModule();
        return new testing_module_1.TestingModule(this.container, graphInspector, root, this.applicationConfig);
    }
    override(typeOrToken, isProvider) {
        const addOverload = (options) => {
            this.overloadsMap.set(typeOrToken, Object.assign(Object.assign({}, options), { isProvider }));
            return this;
        };
        return this.createOverrideByBuilder(addOverload);
    }
    createOverrideByBuilder(add) {
        return {
            useValue: value => add({ useValue: value }),
            useFactory: (options) => add(Object.assign(Object.assign({}, options), { useFactory: options.factory })),
            useClass: metatype => add({ useClass: metatype }),
        };
    }
    applyOverloadsMap() {
        [...this.overloadsMap.entries()].forEach(([item, options]) => {
            this.container.replace(item, options);
        });
    }
    getRootModule() {
        const modules = this.container.getModules().values();
        return modules.next().value;
    }
    async createInstancesOfDependencies(graphInspector, options) {
        var _a;
        const injector = new testing_injector_1.TestingInjector({
            preview: (_a = options === null || options === void 0 ? void 0 : options.preview) !== null && _a !== void 0 ? _a : false,
        });
        const instanceLoader = new testing_instance_loader_1.TestingInstanceLoader(this.container, injector, graphInspector);
        await instanceLoader.createInstancesOfDependencies(this.container.getModules(), this.mocker);
    }
    createModule(metadata) {
        class RootTestModule {
        }
        (0, common_1.Module)(metadata)(RootTestModule);
        return RootTestModule;
    }
    applyLogger() {
        common_1.Logger.overrideLogger(this.testingLogger || new testing_logger_service_1.TestingLogger());
    }
}
exports.TestingModuleBuilder = TestingModuleBuilder;
