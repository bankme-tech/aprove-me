"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesMapper = void 0;
const constants_1 = require("@nestjs/common/constants");
const shared_utils_1 = require("@nestjs/common/utils/shared.utils");
const metadata_scanner_1 = require("../metadata-scanner");
const paths_explorer_1 = require("../router/paths-explorer");
const router_module_1 = require("../router/router-module");
class RoutesMapper {
    constructor(container) {
        this.container = container;
        this.pathsExplorer = new paths_explorer_1.PathsExplorer(new metadata_scanner_1.MetadataScanner());
    }
    mapRouteToRouteInfo(route) {
        if ((0, shared_utils_1.isString)(route)) {
            return this.getRouteInfoFromPath(route);
        }
        const routePathOrPaths = this.getRoutePath(route);
        if (this.isRouteInfo(routePathOrPaths, route)) {
            return this.getRouteInfoFromObject(route);
        }
        return this.getRouteInfoFromController(route, routePathOrPaths);
    }
    getRouteInfoFromPath(routePath) {
        const defaultRequestMethod = -1;
        return [
            {
                path: (0, shared_utils_1.addLeadingSlash)(routePath),
                method: defaultRequestMethod,
            },
        ];
    }
    getRouteInfoFromObject(routeInfoObject) {
        const routeInfo = {
            path: (0, shared_utils_1.addLeadingSlash)(routeInfoObject.path),
            method: routeInfoObject.method,
        };
        if (routeInfoObject.version) {
            routeInfo.version = routeInfoObject.version;
        }
        return [routeInfo];
    }
    getRouteInfoFromController(controller, routePath) {
        const controllerPaths = this.pathsExplorer.scanForPaths(Object.create(controller), controller.prototype);
        const moduleRef = this.getHostModuleOfController(controller);
        const modulePath = this.getModulePath(moduleRef === null || moduleRef === void 0 ? void 0 : moduleRef.metatype);
        const concatPaths = (acc, currentValue) => acc.concat(currentValue);
        return []
            .concat(routePath)
            .map(routePath => controllerPaths
            .map(item => {
            var _a;
            return (_a = item.path) === null || _a === void 0 ? void 0 : _a.map(p => {
                let path = modulePath !== null && modulePath !== void 0 ? modulePath : '';
                path += this.normalizeGlobalPath(routePath) + (0, shared_utils_1.addLeadingSlash)(p);
                const routeInfo = {
                    path,
                    method: item.requestMethod,
                };
                if (item.version) {
                    routeInfo.version = item.version;
                }
                return routeInfo;
            });
        })
            .reduce(concatPaths, []))
            .reduce(concatPaths, []);
    }
    isRouteInfo(path, objectOrClass) {
        return (0, shared_utils_1.isUndefined)(path);
    }
    normalizeGlobalPath(path) {
        const prefix = (0, shared_utils_1.addLeadingSlash)(path);
        return prefix === '/' ? '' : prefix;
    }
    getRoutePath(route) {
        return Reflect.getMetadata(constants_1.PATH_METADATA, route);
    }
    getHostModuleOfController(metatype) {
        if (!metatype) {
            return;
        }
        const modulesContainer = this.container.getModules();
        const moduleRefsSet = router_module_1.targetModulesByContainer.get(modulesContainer);
        if (!moduleRefsSet) {
            return;
        }
        const modules = Array.from(modulesContainer.values()).filter(moduleRef => moduleRefsSet.has(moduleRef));
        return modules.find(({ routes }) => routes.has(metatype));
    }
    getModulePath(metatype) {
        if (!metatype) {
            return;
        }
        const modulesContainer = this.container.getModules();
        const modulePath = Reflect.getMetadata(constants_1.MODULE_PATH + modulesContainer.applicationId, metatype);
        return modulePath !== null && modulePath !== void 0 ? modulePath : Reflect.getMetadata(constants_1.MODULE_PATH, metatype);
    }
}
exports.RoutesMapper = RoutesMapper;
