"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemEngineHost = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const src_1 = require("../src");
const export_ref_1 = require("./export-ref");
const file_system_engine_host_base_1 = require("./file-system-engine-host-base");
/**
 * A simple EngineHost that uses a root with one directory per collection inside of it. The
 * collection declaration follows the same rules as the regular FileSystemEngineHostBase.
 */
class FileSystemEngineHost extends file_system_engine_host_base_1.FileSystemEngineHostBase {
    constructor(_root) {
        super();
        this._root = _root;
    }
    _resolveCollectionPath(name) {
        try {
            // Allow `${_root}/${name}.json` as a collection.
            const maybePath = require.resolve((0, path_1.join)(this._root, name + '.json'));
            if ((0, fs_1.existsSync)(maybePath)) {
                return maybePath;
            }
        }
        catch (error) { }
        try {
            // Allow `${_root}/${name}/collection.json.
            const maybePath = require.resolve((0, path_1.join)(this._root, name, 'collection.json'));
            if ((0, fs_1.existsSync)(maybePath)) {
                return maybePath;
            }
        }
        catch (error) { }
        throw new file_system_engine_host_base_1.CollectionCannotBeResolvedException(name);
    }
    _resolveReferenceString(refString, parentPath) {
        // Use the same kind of export strings as NodeModule.
        const ref = new export_ref_1.ExportStringRef(refString, parentPath);
        if (!ref.ref) {
            return null;
        }
        return { ref: ref.ref, path: ref.module };
    }
    _transformCollectionDescription(name, desc) {
        if (!desc.schematics || typeof desc.schematics != 'object') {
            throw new file_system_engine_host_base_1.CollectionMissingSchematicsMapException(name);
        }
        return {
            ...desc,
            name,
        };
    }
    _transformSchematicDescription(name, _collection, desc) {
        if (!desc.factoryFn || !desc.path || !desc.description) {
            throw new file_system_engine_host_base_1.SchematicMissingFieldsException(name);
        }
        return desc;
    }
    hasTaskExecutor(name) {
        if (super.hasTaskExecutor(name)) {
            return true;
        }
        try {
            const maybePath = require.resolve((0, path_1.join)(this._root, name));
            if ((0, fs_1.existsSync)(maybePath)) {
                return true;
            }
        }
        catch (_a) { }
        return false;
    }
    createTaskExecutor(name) {
        var _a;
        if (!super.hasTaskExecutor(name)) {
            try {
                const path = require.resolve((0, path_1.join)(this._root, name));
                // Default handling code is for old tasks that incorrectly export `default` with non-ESM module
                return (0, rxjs_1.from)((_a = path, Promise.resolve().then(() => __importStar(require(_a)))).then((mod) => { var _a; return (((_a = mod.default) === null || _a === void 0 ? void 0 : _a.default) || mod.default)(); })).pipe((0, operators_1.catchError)(() => (0, rxjs_1.throwError)(new src_1.UnregisteredTaskException(name))));
            }
            catch (_b) { }
        }
        return super.createTaskExecutor(name);
    }
}
exports.FileSystemEngineHost = FileSystemEngineHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1zeXN0ZW0tZW5naW5lLWhvc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9zY2hlbWF0aWNzL3Rvb2xzL2ZpbGUtc3lzdGVtLWVuZ2luZS1ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUgsMkJBQWdDO0FBQ2hDLCtCQUE0QjtBQUM1QiwrQkFBb0Q7QUFDcEQsOENBQTRDO0FBQzVDLGdDQUE4RTtBQUU5RSw2Q0FBK0M7QUFDL0MsaUZBS3dDO0FBRXhDOzs7R0FHRztBQUNILE1BQWEsb0JBQXFCLFNBQVEsdURBQXdCO0lBQ2hFLFlBQXNCLEtBQWE7UUFDakMsS0FBSyxFQUFFLENBQUM7UUFEWSxVQUFLLEdBQUwsS0FBSyxDQUFRO0lBRW5DLENBQUM7SUFFUyxzQkFBc0IsQ0FBQyxJQUFZO1FBQzNDLElBQUk7WUFDRixpREFBaUQ7WUFDakQsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFBLFdBQUksRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3BFLElBQUksSUFBQSxlQUFVLEVBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3pCLE9BQU8sU0FBUyxDQUFDO2FBQ2xCO1NBQ0Y7UUFBQyxPQUFPLEtBQUssRUFBRSxHQUFFO1FBRWxCLElBQUk7WUFDRiwyQ0FBMkM7WUFDM0MsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFBLFdBQUksRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDN0UsSUFBSSxJQUFBLGVBQVUsRUFBQyxTQUFTLENBQUMsRUFBRTtnQkFDekIsT0FBTyxTQUFTLENBQUM7YUFDbEI7U0FDRjtRQUFDLE9BQU8sS0FBSyxFQUFFLEdBQUU7UUFFbEIsTUFBTSxJQUFJLGtFQUFtQyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFUyx1QkFBdUIsQ0FBQyxTQUFpQixFQUFFLFVBQWtCO1FBQ3JFLHFEQUFxRDtRQUNyRCxNQUFNLEdBQUcsR0FBRyxJQUFJLDRCQUFlLENBQWtCLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN4RSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM1QyxDQUFDO0lBRVMsK0JBQStCLENBQ3ZDLElBQVksRUFDWixJQUF1QztRQUV2QyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLElBQUksQ0FBQyxVQUFVLElBQUksUUFBUSxFQUFFO1lBQzFELE1BQU0sSUFBSSxzRUFBdUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6RDtRQUVELE9BQU87WUFDTCxHQUFHLElBQUk7WUFDUCxJQUFJO1NBQ3VCLENBQUM7SUFDaEMsQ0FBQztJQUVTLDhCQUE4QixDQUN0QyxJQUFZLEVBQ1osV0FBcUMsRUFDckMsSUFBc0M7UUFFdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUN0RCxNQUFNLElBQUksOERBQStCLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPLElBQStCLENBQUM7SUFDekMsQ0FBQztJQUVRLGVBQWUsQ0FBQyxJQUFZO1FBQ25DLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMvQixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBSTtZQUNGLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBQSxXQUFJLEVBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksSUFBQSxlQUFVLEVBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3pCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjtRQUFDLFdBQU0sR0FBRTtRQUVWLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVRLGtCQUFrQixDQUFDLElBQVk7O1FBQ3RDLElBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2hDLElBQUk7Z0JBQ0YsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFBLFdBQUksRUFBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRXJELCtGQUErRjtnQkFDL0YsT0FBTyxJQUFBLFdBQUksRUFBQyxNQUFPLElBQUksMkRBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsV0FBQyxPQUFBLENBQUMsQ0FBQSxNQUFBLEdBQUcsQ0FBQyxPQUFPLDBDQUFFLE9BQU8sS0FBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQSxFQUFBLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDbkYsSUFBQSxzQkFBVSxFQUFDLEdBQUcsRUFBRSxDQUFDLElBQUEsaUJBQVUsRUFBQyxJQUFJLCtCQUF5QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDbEUsQ0FBQzthQUNIO1lBQUMsV0FBTSxHQUFFO1NBQ1g7UUFFRCxPQUFPLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBQ0Y7QUExRkQsb0RBMEZDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IGV4aXN0c1N5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjYXRjaEVycm9yIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgUnVsZUZhY3RvcnksIFRhc2tFeGVjdXRvciwgVW5yZWdpc3RlcmVkVGFza0V4Y2VwdGlvbiB9IGZyb20gJy4uL3NyYyc7XG5pbXBvcnQgeyBGaWxlU3lzdGVtQ29sbGVjdGlvbkRlc2MsIEZpbGVTeXN0ZW1TY2hlbWF0aWNEZXNjIH0gZnJvbSAnLi9kZXNjcmlwdGlvbic7XG5pbXBvcnQgeyBFeHBvcnRTdHJpbmdSZWYgfSBmcm9tICcuL2V4cG9ydC1yZWYnO1xuaW1wb3J0IHtcbiAgQ29sbGVjdGlvbkNhbm5vdEJlUmVzb2x2ZWRFeGNlcHRpb24sXG4gIENvbGxlY3Rpb25NaXNzaW5nU2NoZW1hdGljc01hcEV4Y2VwdGlvbixcbiAgRmlsZVN5c3RlbUVuZ2luZUhvc3RCYXNlLFxuICBTY2hlbWF0aWNNaXNzaW5nRmllbGRzRXhjZXB0aW9uLFxufSBmcm9tICcuL2ZpbGUtc3lzdGVtLWVuZ2luZS1ob3N0LWJhc2UnO1xuXG4vKipcbiAqIEEgc2ltcGxlIEVuZ2luZUhvc3QgdGhhdCB1c2VzIGEgcm9vdCB3aXRoIG9uZSBkaXJlY3RvcnkgcGVyIGNvbGxlY3Rpb24gaW5zaWRlIG9mIGl0LiBUaGVcbiAqIGNvbGxlY3Rpb24gZGVjbGFyYXRpb24gZm9sbG93cyB0aGUgc2FtZSBydWxlcyBhcyB0aGUgcmVndWxhciBGaWxlU3lzdGVtRW5naW5lSG9zdEJhc2UuXG4gKi9cbmV4cG9ydCBjbGFzcyBGaWxlU3lzdGVtRW5naW5lSG9zdCBleHRlbmRzIEZpbGVTeXN0ZW1FbmdpbmVIb3N0QmFzZSB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfcm9vdDogc3RyaW5nKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfcmVzb2x2ZUNvbGxlY3Rpb25QYXRoKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIEFsbG93IGAke19yb290fS8ke25hbWV9Lmpzb25gIGFzIGEgY29sbGVjdGlvbi5cbiAgICAgIGNvbnN0IG1heWJlUGF0aCA9IHJlcXVpcmUucmVzb2x2ZShqb2luKHRoaXMuX3Jvb3QsIG5hbWUgKyAnLmpzb24nKSk7XG4gICAgICBpZiAoZXhpc3RzU3luYyhtYXliZVBhdGgpKSB7XG4gICAgICAgIHJldHVybiBtYXliZVBhdGg7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHt9XG5cbiAgICB0cnkge1xuICAgICAgLy8gQWxsb3cgYCR7X3Jvb3R9LyR7bmFtZX0vY29sbGVjdGlvbi5qc29uLlxuICAgICAgY29uc3QgbWF5YmVQYXRoID0gcmVxdWlyZS5yZXNvbHZlKGpvaW4odGhpcy5fcm9vdCwgbmFtZSwgJ2NvbGxlY3Rpb24uanNvbicpKTtcbiAgICAgIGlmIChleGlzdHNTeW5jKG1heWJlUGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIG1heWJlUGF0aDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge31cblxuICAgIHRocm93IG5ldyBDb2xsZWN0aW9uQ2Fubm90QmVSZXNvbHZlZEV4Y2VwdGlvbihuYW1lKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfcmVzb2x2ZVJlZmVyZW5jZVN0cmluZyhyZWZTdHJpbmc6IHN0cmluZywgcGFyZW50UGF0aDogc3RyaW5nKSB7XG4gICAgLy8gVXNlIHRoZSBzYW1lIGtpbmQgb2YgZXhwb3J0IHN0cmluZ3MgYXMgTm9kZU1vZHVsZS5cbiAgICBjb25zdCByZWYgPSBuZXcgRXhwb3J0U3RyaW5nUmVmPFJ1bGVGYWN0b3J5PHt9Pj4ocmVmU3RyaW5nLCBwYXJlbnRQYXRoKTtcbiAgICBpZiAoIXJlZi5yZWYpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB7IHJlZjogcmVmLnJlZiwgcGF0aDogcmVmLm1vZHVsZSB9O1xuICB9XG5cbiAgcHJvdGVjdGVkIF90cmFuc2Zvcm1Db2xsZWN0aW9uRGVzY3JpcHRpb24oXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGRlc2M6IFBhcnRpYWw8RmlsZVN5c3RlbUNvbGxlY3Rpb25EZXNjPixcbiAgKTogRmlsZVN5c3RlbUNvbGxlY3Rpb25EZXNjIHtcbiAgICBpZiAoIWRlc2Muc2NoZW1hdGljcyB8fCB0eXBlb2YgZGVzYy5zY2hlbWF0aWNzICE9ICdvYmplY3QnKSB7XG4gICAgICB0aHJvdyBuZXcgQ29sbGVjdGlvbk1pc3NpbmdTY2hlbWF0aWNzTWFwRXhjZXB0aW9uKG5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5kZXNjLFxuICAgICAgbmFtZSxcbiAgICB9IGFzIEZpbGVTeXN0ZW1Db2xsZWN0aW9uRGVzYztcbiAgfVxuXG4gIHByb3RlY3RlZCBfdHJhbnNmb3JtU2NoZW1hdGljRGVzY3JpcHRpb24oXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIF9jb2xsZWN0aW9uOiBGaWxlU3lzdGVtQ29sbGVjdGlvbkRlc2MsXG4gICAgZGVzYzogUGFydGlhbDxGaWxlU3lzdGVtU2NoZW1hdGljRGVzYz4sXG4gICk6IEZpbGVTeXN0ZW1TY2hlbWF0aWNEZXNjIHtcbiAgICBpZiAoIWRlc2MuZmFjdG9yeUZuIHx8ICFkZXNjLnBhdGggfHwgIWRlc2MuZGVzY3JpcHRpb24pIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNNaXNzaW5nRmllbGRzRXhjZXB0aW9uKG5hbWUpO1xuICAgIH1cblxuICAgIHJldHVybiBkZXNjIGFzIEZpbGVTeXN0ZW1TY2hlbWF0aWNEZXNjO1xuICB9XG5cbiAgb3ZlcnJpZGUgaGFzVGFza0V4ZWN1dG9yKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmIChzdXBlci5oYXNUYXNrRXhlY3V0b3IobmFtZSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBtYXliZVBhdGggPSByZXF1aXJlLnJlc29sdmUoam9pbih0aGlzLl9yb290LCBuYW1lKSk7XG4gICAgICBpZiAoZXhpc3RzU3luYyhtYXliZVBhdGgpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gY2F0Y2gge31cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIG92ZXJyaWRlIGNyZWF0ZVRhc2tFeGVjdXRvcihuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFRhc2tFeGVjdXRvcj4ge1xuICAgIGlmICghc3VwZXIuaGFzVGFza0V4ZWN1dG9yKG5hbWUpKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXRoID0gcmVxdWlyZS5yZXNvbHZlKGpvaW4odGhpcy5fcm9vdCwgbmFtZSkpO1xuXG4gICAgICAgIC8vIERlZmF1bHQgaGFuZGxpbmcgY29kZSBpcyBmb3Igb2xkIHRhc2tzIHRoYXQgaW5jb3JyZWN0bHkgZXhwb3J0IGBkZWZhdWx0YCB3aXRoIG5vbi1FU00gbW9kdWxlXG4gICAgICAgIHJldHVybiBmcm9tKGltcG9ydChwYXRoKS50aGVuKChtb2QpID0+IChtb2QuZGVmYXVsdD8uZGVmYXVsdCB8fCBtb2QuZGVmYXVsdCkoKSkpLnBpcGUoXG4gICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiB0aHJvd0Vycm9yKG5ldyBVbnJlZ2lzdGVyZWRUYXNrRXhjZXB0aW9uKG5hbWUpKSksXG4gICAgICAgICk7XG4gICAgICB9IGNhdGNoIHt9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLmNyZWF0ZVRhc2tFeGVjdXRvcihuYW1lKTtcbiAgfVxufVxuIl19