"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkspaceHost = void 0;
const virtual_fs_1 = require("../virtual-fs");
function createWorkspaceHost(host) {
    const workspaceHost = {
        async readFile(path) {
            const data = await host.read((0, virtual_fs_1.normalize)(path)).toPromise();
            return virtual_fs_1.virtualFs.fileBufferToString(data);
        },
        async writeFile(path, data) {
            return host.write((0, virtual_fs_1.normalize)(path), virtual_fs_1.virtualFs.stringToFileBuffer(data)).toPromise();
        },
        async isDirectory(path) {
            try {
                return await host.isDirectory((0, virtual_fs_1.normalize)(path)).toPromise();
            }
            catch (_a) {
                // some hosts throw if path does not exist
                return false;
            }
        },
        async isFile(path) {
            try {
                return await host.isFile((0, virtual_fs_1.normalize)(path)).toPromise();
            }
            catch (_a) {
                // some hosts throw if path does not exist
                return false;
            }
        },
    };
    return workspaceHost;
}
exports.createWorkspaceHost = createWorkspaceHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9zdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2NvcmUvc3JjL3dvcmtzcGFjZS9ob3N0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7OztBQUVILDhDQUFxRDtBQWFyRCxTQUFnQixtQkFBbUIsQ0FBQyxJQUFvQjtJQUN0RCxNQUFNLGFBQWEsR0FBa0I7UUFDbkMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFZO1lBQ3pCLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFBLHNCQUFTLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUUxRCxPQUFPLHNCQUFTLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUMsQ0FBQztRQUNELEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBWSxFQUFFLElBQVk7WUFDeEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUEsc0JBQVMsRUFBQyxJQUFJLENBQUMsRUFBRSxzQkFBUyxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDckYsQ0FBQztRQUNELEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBWTtZQUM1QixJQUFJO2dCQUNGLE9BQU8sTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUEsc0JBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBRSxDQUFDO2FBQzVEO1lBQUMsV0FBTTtnQkFDTiwwQ0FBMEM7Z0JBQzFDLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7UUFDSCxDQUFDO1FBQ0QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFZO1lBQ3ZCLElBQUk7Z0JBQ0YsT0FBTyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBQSxzQkFBUyxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDdkQ7WUFBQyxXQUFNO2dCQUNOLDBDQUEwQztnQkFDMUMsT0FBTyxLQUFLLENBQUM7YUFDZDtRQUNILENBQUM7S0FDRixDQUFDO0lBRUYsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQztBQTdCRCxrREE2QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgbm9ybWFsaXplLCB2aXJ0dWFsRnMgfSBmcm9tICcuLi92aXJ0dWFsLWZzJztcblxuZXhwb3J0IGludGVyZmFjZSBXb3Jrc3BhY2VIb3N0IHtcbiAgcmVhZEZpbGUocGF0aDogc3RyaW5nKTogUHJvbWlzZTxzdHJpbmc+O1xuICB3cml0ZUZpbGUocGF0aDogc3RyaW5nLCBkYXRhOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+O1xuXG4gIGlzRGlyZWN0b3J5KHBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj47XG4gIGlzRmlsZShwYXRoOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+O1xuXG4gIC8vIFBvdGVudGlhbCBmdXR1cmUgYWRkaXRpb25zXG4gIC8vIHJlYWREaXJlY3Rvcnk/KHBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nW10+O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV29ya3NwYWNlSG9zdChob3N0OiB2aXJ0dWFsRnMuSG9zdCk6IFdvcmtzcGFjZUhvc3Qge1xuICBjb25zdCB3b3Jrc3BhY2VIb3N0OiBXb3Jrc3BhY2VIb3N0ID0ge1xuICAgIGFzeW5jIHJlYWRGaWxlKHBhdGg6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICBjb25zdCBkYXRhID0gYXdhaXQgaG9zdC5yZWFkKG5vcm1hbGl6ZShwYXRoKSkudG9Qcm9taXNlKCk7XG5cbiAgICAgIHJldHVybiB2aXJ0dWFsRnMuZmlsZUJ1ZmZlclRvU3RyaW5nKGRhdGEpO1xuICAgIH0sXG4gICAgYXN5bmMgd3JpdGVGaWxlKHBhdGg6IHN0cmluZywgZGF0YTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICByZXR1cm4gaG9zdC53cml0ZShub3JtYWxpemUocGF0aCksIHZpcnR1YWxGcy5zdHJpbmdUb0ZpbGVCdWZmZXIoZGF0YSkpLnRvUHJvbWlzZSgpO1xuICAgIH0sXG4gICAgYXN5bmMgaXNEaXJlY3RvcnkocGF0aDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgaG9zdC5pc0RpcmVjdG9yeShub3JtYWxpemUocGF0aCkpLnRvUHJvbWlzZSgpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIHNvbWUgaG9zdHMgdGhyb3cgaWYgcGF0aCBkb2VzIG5vdCBleGlzdFxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfSxcbiAgICBhc3luYyBpc0ZpbGUocGF0aDogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgaG9zdC5pc0ZpbGUobm9ybWFsaXplKHBhdGgpKS50b1Byb21pc2UoKTtcbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvLyBzb21lIGhvc3RzIHRocm93IGlmIHBhdGggZG9lcyBub3QgZXhpc3RcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIHdvcmtzcGFjZUhvc3Q7XG59XG4iXX0=