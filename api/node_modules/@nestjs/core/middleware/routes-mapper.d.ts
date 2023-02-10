import { RouteInfo, Type } from '@nestjs/common/interfaces';
import { NestContainer } from '../injector/container';
export declare class RoutesMapper {
    private readonly container;
    private readonly pathsExplorer;
    constructor(container: NestContainer);
    mapRouteToRouteInfo(route: Type<any> | RouteInfo | string): RouteInfo[];
    private getRouteInfoFromPath;
    private getRouteInfoFromObject;
    private getRouteInfoFromController;
    private isRouteInfo;
    private normalizeGlobalPath;
    private getRoutePath;
    private getHostModuleOfController;
    private getModulePath;
}
