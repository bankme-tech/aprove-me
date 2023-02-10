"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeWorkflow = void 0;
const core_1 = require("@angular-devkit/core");
const node_1 = require("@angular-devkit/core/node");
const schematics_1 = require("@angular-devkit/schematics");
const node_2 = require("../../tasks/node");
const node_module_engine_host_1 = require("../node-module-engine-host");
const schema_option_transform_1 = require("../schema-option-transform");
/**
 * A workflow specifically for Node tools.
 */
class NodeWorkflow extends schematics_1.workflow.BaseWorkflow {
    constructor(hostOrRoot, options) {
        var _a;
        let host;
        let root;
        if (typeof hostOrRoot === 'string') {
            root = (0, core_1.normalize)(hostOrRoot);
            host = new core_1.virtualFs.ScopedHost(new node_1.NodeJsSyncHost(), root);
        }
        else {
            host = hostOrRoot;
            root = options.root;
        }
        const engineHost = ((_a = options.engineHostCreator) === null || _a === void 0 ? void 0 : _a.call(options, options)) || new node_module_engine_host_1.NodeModulesEngineHost(options.resolvePaths);
        super({
            host,
            engineHost,
            force: options.force,
            dryRun: options.dryRun,
            registry: options.registry,
        });
        engineHost.registerTaskExecutor(node_2.BuiltinTaskExecutor.NodePackage, {
            allowPackageManagerOverride: true,
            packageManager: options.packageManager,
            force: options.packageManagerForce,
            rootDirectory: root && (0, core_1.getSystemPath)(root),
            registry: options.packageRegistry,
        });
        engineHost.registerTaskExecutor(node_2.BuiltinTaskExecutor.RepositoryInitializer, {
            rootDirectory: root && (0, core_1.getSystemPath)(root),
        });
        engineHost.registerTaskExecutor(node_2.BuiltinTaskExecutor.RunSchematic);
        if (options.optionTransforms) {
            for (const transform of options.optionTransforms) {
                engineHost.registerOptionsTransform(transform);
            }
        }
        if (options.schemaValidation) {
            engineHost.registerOptionsTransform((0, schema_option_transform_1.validateOptionsWithSchema)(this.registry));
        }
        this._context = [];
    }
    get engine() {
        return this._engine;
    }
    get engineHost() {
        return this._engineHost;
    }
}
exports.NodeWorkflow = NodeWorkflow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS13b3JrZmxvdy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3MvdG9vbHMvd29ya2Zsb3cvbm9kZS13b3JrZmxvdy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7QUFFSCwrQ0FBeUY7QUFDekYsb0RBQTJEO0FBQzNELDJEQUFzRDtBQUN0RCwyQ0FBdUQ7QUFHdkQsd0VBQW1FO0FBQ25FLHdFQUF1RTtBQWV2RTs7R0FFRztBQUNILE1BQWEsWUFBYSxTQUFRLHFCQUFRLENBQUMsWUFBWTtJQUtyRCxZQUFZLFVBQW1DLEVBQUUsT0FBOEM7O1FBQzdGLElBQUksSUFBSSxDQUFDO1FBQ1QsSUFBSSxJQUFJLENBQUM7UUFDVCxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtZQUNsQyxJQUFJLEdBQUcsSUFBQSxnQkFBUyxFQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQzdCLElBQUksR0FBRyxJQUFJLGdCQUFTLENBQUMsVUFBVSxDQUFDLElBQUkscUJBQWMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzdEO2FBQU07WUFDTCxJQUFJLEdBQUcsVUFBVSxDQUFDO1lBQ2xCLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1NBQ3JCO1FBRUQsTUFBTSxVQUFVLEdBQ2QsQ0FBQSxNQUFBLE9BQU8sQ0FBQyxpQkFBaUIsd0RBQUcsT0FBTyxDQUFDLEtBQUksSUFBSSwrQ0FBcUIsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUYsS0FBSyxDQUFDO1lBQ0osSUFBSTtZQUNKLFVBQVU7WUFFVixLQUFLLEVBQUUsT0FBTyxDQUFDLEtBQUs7WUFDcEIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNO1lBQ3RCLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUTtTQUMzQixDQUFDLENBQUM7UUFFSCxVQUFVLENBQUMsb0JBQW9CLENBQUMsMEJBQW1CLENBQUMsV0FBVyxFQUFFO1lBQy9ELDJCQUEyQixFQUFFLElBQUk7WUFDakMsY0FBYyxFQUFFLE9BQU8sQ0FBQyxjQUFjO1lBQ3RDLEtBQUssRUFBRSxPQUFPLENBQUMsbUJBQW1CO1lBQ2xDLGFBQWEsRUFBRSxJQUFJLElBQUksSUFBQSxvQkFBYSxFQUFDLElBQUksQ0FBQztZQUMxQyxRQUFRLEVBQUUsT0FBTyxDQUFDLGVBQWU7U0FDbEMsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLG9CQUFvQixDQUFDLDBCQUFtQixDQUFDLHFCQUFxQixFQUFFO1lBQ3pFLGFBQWEsRUFBRSxJQUFJLElBQUksSUFBQSxvQkFBYSxFQUFDLElBQUksQ0FBQztTQUMzQyxDQUFDLENBQUM7UUFDSCxVQUFVLENBQUMsb0JBQW9CLENBQUMsMEJBQW1CLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFbEUsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7WUFDNUIsS0FBSyxNQUFNLFNBQVMsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQ2hELFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNoRDtTQUNGO1FBRUQsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7WUFDNUIsVUFBVSxDQUFDLHdCQUF3QixDQUFDLElBQUEsbURBQXlCLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDL0U7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsSUFBYSxNQUFNO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLE9BQTJCLENBQUM7SUFDMUMsQ0FBQztJQUNELElBQWEsVUFBVTtRQUNyQixPQUFPLElBQUksQ0FBQyxXQUFvQyxDQUFDO0lBQ25ELENBQUM7Q0FDRjtBQTFERCxvQ0EwREMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgUGF0aCwgZ2V0U3lzdGVtUGF0aCwgbm9ybWFsaXplLCBzY2hlbWEsIHZpcnR1YWxGcyB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IE5vZGVKc1N5bmNIb3N0IH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUvbm9kZSc7XG5pbXBvcnQgeyB3b3JrZmxvdyB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzJztcbmltcG9ydCB7IEJ1aWx0aW5UYXNrRXhlY3V0b3IgfSBmcm9tICcuLi8uLi90YXNrcy9ub2RlJztcbmltcG9ydCB7IEZpbGVTeXN0ZW1FbmdpbmUgfSBmcm9tICcuLi9kZXNjcmlwdGlvbic7XG5pbXBvcnQgeyBPcHRpb25UcmFuc2Zvcm0gfSBmcm9tICcuLi9maWxlLXN5c3RlbS1lbmdpbmUtaG9zdC1iYXNlJztcbmltcG9ydCB7IE5vZGVNb2R1bGVzRW5naW5lSG9zdCB9IGZyb20gJy4uL25vZGUtbW9kdWxlLWVuZ2luZS1ob3N0JztcbmltcG9ydCB7IHZhbGlkYXRlT3B0aW9uc1dpdGhTY2hlbWEgfSBmcm9tICcuLi9zY2hlbWEtb3B0aW9uLXRyYW5zZm9ybSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTm9kZVdvcmtmbG93T3B0aW9ucyB7XG4gIGZvcmNlPzogYm9vbGVhbjtcbiAgZHJ5UnVuPzogYm9vbGVhbjtcbiAgcGFja2FnZU1hbmFnZXI/OiBzdHJpbmc7XG4gIHBhY2thZ2VNYW5hZ2VyRm9yY2U/OiBib29sZWFuO1xuICBwYWNrYWdlUmVnaXN0cnk/OiBzdHJpbmc7XG4gIHJlZ2lzdHJ5Pzogc2NoZW1hLkNvcmVTY2hlbWFSZWdpc3RyeTtcbiAgcmVzb2x2ZVBhdGhzPzogc3RyaW5nW107XG4gIHNjaGVtYVZhbGlkYXRpb24/OiBib29sZWFuO1xuICBvcHRpb25UcmFuc2Zvcm1zPzogT3B0aW9uVHJhbnNmb3JtPFJlY29yZDxzdHJpbmcsIHVua25vd24+IHwgbnVsbCwgb2JqZWN0PltdO1xuICBlbmdpbmVIb3N0Q3JlYXRvcj86IChvcHRpb25zOiBOb2RlV29ya2Zsb3dPcHRpb25zKSA9PiBOb2RlTW9kdWxlc0VuZ2luZUhvc3Q7XG59XG5cbi8qKlxuICogQSB3b3JrZmxvdyBzcGVjaWZpY2FsbHkgZm9yIE5vZGUgdG9vbHMuXG4gKi9cbmV4cG9ydCBjbGFzcyBOb2RlV29ya2Zsb3cgZXh0ZW5kcyB3b3JrZmxvdy5CYXNlV29ya2Zsb3cge1xuICBjb25zdHJ1Y3Rvcihyb290OiBzdHJpbmcsIG9wdGlvbnM6IE5vZGVXb3JrZmxvd09wdGlvbnMpO1xuXG4gIGNvbnN0cnVjdG9yKGhvc3Q6IHZpcnR1YWxGcy5Ib3N0LCBvcHRpb25zOiBOb2RlV29ya2Zsb3dPcHRpb25zICYgeyByb290PzogUGF0aCB9KTtcblxuICBjb25zdHJ1Y3Rvcihob3N0T3JSb290OiB2aXJ0dWFsRnMuSG9zdCB8IHN0cmluZywgb3B0aW9uczogTm9kZVdvcmtmbG93T3B0aW9ucyAmIHsgcm9vdD86IFBhdGggfSkge1xuICAgIGxldCBob3N0O1xuICAgIGxldCByb290O1xuICAgIGlmICh0eXBlb2YgaG9zdE9yUm9vdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJvb3QgPSBub3JtYWxpemUoaG9zdE9yUm9vdCk7XG4gICAgICBob3N0ID0gbmV3IHZpcnR1YWxGcy5TY29wZWRIb3N0KG5ldyBOb2RlSnNTeW5jSG9zdCgpLCByb290KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaG9zdCA9IGhvc3RPclJvb3Q7XG4gICAgICByb290ID0gb3B0aW9ucy5yb290O1xuICAgIH1cblxuICAgIGNvbnN0IGVuZ2luZUhvc3QgPVxuICAgICAgb3B0aW9ucy5lbmdpbmVIb3N0Q3JlYXRvcj8uKG9wdGlvbnMpIHx8IG5ldyBOb2RlTW9kdWxlc0VuZ2luZUhvc3Qob3B0aW9ucy5yZXNvbHZlUGF0aHMpO1xuICAgIHN1cGVyKHtcbiAgICAgIGhvc3QsXG4gICAgICBlbmdpbmVIb3N0LFxuXG4gICAgICBmb3JjZTogb3B0aW9ucy5mb3JjZSxcbiAgICAgIGRyeVJ1bjogb3B0aW9ucy5kcnlSdW4sXG4gICAgICByZWdpc3RyeTogb3B0aW9ucy5yZWdpc3RyeSxcbiAgICB9KTtcblxuICAgIGVuZ2luZUhvc3QucmVnaXN0ZXJUYXNrRXhlY3V0b3IoQnVpbHRpblRhc2tFeGVjdXRvci5Ob2RlUGFja2FnZSwge1xuICAgICAgYWxsb3dQYWNrYWdlTWFuYWdlck92ZXJyaWRlOiB0cnVlLFxuICAgICAgcGFja2FnZU1hbmFnZXI6IG9wdGlvbnMucGFja2FnZU1hbmFnZXIsXG4gICAgICBmb3JjZTogb3B0aW9ucy5wYWNrYWdlTWFuYWdlckZvcmNlLFxuICAgICAgcm9vdERpcmVjdG9yeTogcm9vdCAmJiBnZXRTeXN0ZW1QYXRoKHJvb3QpLFxuICAgICAgcmVnaXN0cnk6IG9wdGlvbnMucGFja2FnZVJlZ2lzdHJ5LFxuICAgIH0pO1xuICAgIGVuZ2luZUhvc3QucmVnaXN0ZXJUYXNrRXhlY3V0b3IoQnVpbHRpblRhc2tFeGVjdXRvci5SZXBvc2l0b3J5SW5pdGlhbGl6ZXIsIHtcbiAgICAgIHJvb3REaXJlY3Rvcnk6IHJvb3QgJiYgZ2V0U3lzdGVtUGF0aChyb290KSxcbiAgICB9KTtcbiAgICBlbmdpbmVIb3N0LnJlZ2lzdGVyVGFza0V4ZWN1dG9yKEJ1aWx0aW5UYXNrRXhlY3V0b3IuUnVuU2NoZW1hdGljKTtcblxuICAgIGlmIChvcHRpb25zLm9wdGlvblRyYW5zZm9ybXMpIHtcbiAgICAgIGZvciAoY29uc3QgdHJhbnNmb3JtIG9mIG9wdGlvbnMub3B0aW9uVHJhbnNmb3Jtcykge1xuICAgICAgICBlbmdpbmVIb3N0LnJlZ2lzdGVyT3B0aW9uc1RyYW5zZm9ybSh0cmFuc2Zvcm0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnNjaGVtYVZhbGlkYXRpb24pIHtcbiAgICAgIGVuZ2luZUhvc3QucmVnaXN0ZXJPcHRpb25zVHJhbnNmb3JtKHZhbGlkYXRlT3B0aW9uc1dpdGhTY2hlbWEodGhpcy5yZWdpc3RyeSkpO1xuICAgIH1cblxuICAgIHRoaXMuX2NvbnRleHQgPSBbXTtcbiAgfVxuXG4gIG92ZXJyaWRlIGdldCBlbmdpbmUoKTogRmlsZVN5c3RlbUVuZ2luZSB7XG4gICAgcmV0dXJuIHRoaXMuX2VuZ2luZSBhcyBGaWxlU3lzdGVtRW5naW5lO1xuICB9XG4gIG92ZXJyaWRlIGdldCBlbmdpbmVIb3N0KCk6IE5vZGVNb2R1bGVzRW5naW5lSG9zdCB7XG4gICAgcmV0dXJuIHRoaXMuX2VuZ2luZUhvc3QgYXMgTm9kZU1vZHVsZXNFbmdpbmVIb3N0O1xuICB9XG59XG4iXX0=