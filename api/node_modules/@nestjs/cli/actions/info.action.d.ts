import { AbstractAction } from './abstract.action';
interface LockfileDependency {
    version: string;
}
interface PackageJsonDependencies {
    [key: string]: LockfileDependency;
}
interface NestDependency {
    name: string;
    value: string;
}
export declare class InfoAction extends AbstractAction {
    private manager;
    handle(): Promise<void>;
    private displayBanner;
    private displaySystemInformation;
    displayPackageManagerVersion(): Promise<void>;
    displayNestInformation(): Promise<void>;
    displayNestInformationFromPackage(): Promise<void>;
    displayCliVersion(): void;
    readProjectPackageDependencies(): PackageJsonDependencies;
    displayNestVersions(dependencies: PackageJsonDependencies): void;
    buildNestVersionsMessage(dependencies: PackageJsonDependencies): NestDependency[];
    collectNestDependencies(dependencies: PackageJsonDependencies): NestDependency[];
    format(dependencies: NestDependency[]): NestDependency[];
    rightPad(name: string, length: number): string;
}
export {};
