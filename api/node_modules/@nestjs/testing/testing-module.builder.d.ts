import { LoggerService, ModuleMetadata } from '@nestjs/common';
import { NestApplicationContextOptions } from '@nestjs/common/interfaces/nest-application-context-options.interface';
import { MetadataScanner } from '@nestjs/core/metadata-scanner';
import { MockFactory, OverrideBy } from './interfaces';
import { TestingModule } from './testing-module';
/**
 * @publicApi
 */
export declare class TestingModuleBuilder {
    private readonly metadataScanner;
    private readonly applicationConfig;
    private readonly container;
    private readonly overloadsMap;
    private readonly module;
    private testingLogger;
    private mocker?;
    constructor(metadataScanner: MetadataScanner, metadata: ModuleMetadata);
    setLogger(testingLogger: LoggerService): this;
    overridePipe<T = any>(typeOrToken: T): OverrideBy;
    useMocker(mocker: MockFactory): TestingModuleBuilder;
    overrideFilter<T = any>(typeOrToken: T): OverrideBy;
    overrideGuard<T = any>(typeOrToken: T): OverrideBy;
    overrideInterceptor<T = any>(typeOrToken: T): OverrideBy;
    overrideProvider<T = any>(typeOrToken: T): OverrideBy;
    compile(options?: Pick<NestApplicationContextOptions, 'snapshot' | 'preview'>): Promise<TestingModule>;
    private override;
    private createOverrideByBuilder;
    private applyOverloadsMap;
    private getRootModule;
    private createInstancesOfDependencies;
    private createModule;
    private applyLogger;
}
