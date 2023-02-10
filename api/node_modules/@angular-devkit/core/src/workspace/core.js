"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeWorkspace = exports.readWorkspace = exports._test_removeWorkspaceFile = exports._test_addWorkspaceFile = exports.WorkspaceFormat = void 0;
const virtual_fs_1 = require("../virtual-fs");
const reader_1 = require("./json/reader");
const writer_1 = require("./json/writer");
const formatLookup = new WeakMap();
/**
 * Supported workspace formats
 */
var WorkspaceFormat;
(function (WorkspaceFormat) {
    WorkspaceFormat[WorkspaceFormat["JSON"] = 0] = "JSON";
})(WorkspaceFormat = exports.WorkspaceFormat || (exports.WorkspaceFormat = {}));
/**
 * @private
 */
function _test_addWorkspaceFile(name, format) {
    workspaceFiles[name] = format;
}
exports._test_addWorkspaceFile = _test_addWorkspaceFile;
/**
 * @private
 */
function _test_removeWorkspaceFile(name) {
    delete workspaceFiles[name];
}
exports._test_removeWorkspaceFile = _test_removeWorkspaceFile;
// NOTE: future additions could also perform content analysis to determine format/version
const workspaceFiles = {
    'angular.json': WorkspaceFormat.JSON,
    '.angular.json': WorkspaceFormat.JSON,
};
/**
 * Reads and constructs a `WorkspaceDefinition`.  If the function is provided with a path to a
 * directory instead of a file, a search of the directory's files will commence to attempt to
 * locate a known workspace file.  Currently the following are considered known workspace files:
 * - `angular.json`
 * - `.angular.json`
 *
 * @param path The path to either a workspace file or a directory containing a workspace file.
 * @param host The `WorkspaceHost` to use to access the file and directory data.
 * @param format An optional `WorkspaceFormat` value. Used if the path specifies a non-standard
 * file name that would prevent automatically discovering the format.
 *
 *
 * @return An `Promise` of the read result object with the `WorkspaceDefinition` contained within
 * the `workspace` property.
 */
async function readWorkspace(path, host, format) {
    if (await host.isDirectory(path)) {
        // TODO: Warn if multiple found (requires diagnostics support)
        const directory = (0, virtual_fs_1.normalize)(path);
        let found = false;
        for (const [name, nameFormat] of Object.entries(workspaceFiles)) {
            if (format !== undefined && format !== nameFormat) {
                continue;
            }
            const potential = (0, virtual_fs_1.getSystemPath)((0, virtual_fs_1.join)(directory, name));
            if (await host.isFile(potential)) {
                path = potential;
                format = nameFormat;
                found = true;
                break;
            }
        }
        if (!found) {
            throw new Error('Unable to locate a workspace file for workspace path. Are you missing an `angular.json`' +
                ' or `.angular.json` file?');
        }
    }
    else if (format === undefined) {
        const filename = (0, virtual_fs_1.basename)((0, virtual_fs_1.normalize)(path));
        if (filename in workspaceFiles) {
            format = workspaceFiles[filename];
        }
    }
    if (format === undefined) {
        throw new Error('Unable to determine format for workspace path.');
    }
    let workspace;
    switch (format) {
        case WorkspaceFormat.JSON:
            workspace = await (0, reader_1.readJsonWorkspace)(path, host);
            break;
        default:
            throw new Error('Unsupported workspace format.');
    }
    formatLookup.set(workspace, WorkspaceFormat.JSON);
    return { workspace };
}
exports.readWorkspace = readWorkspace;
/**
 * Writes a `WorkspaceDefinition` to the underlying storage via the provided `WorkspaceHost`.
 * If the `WorkspaceDefinition` was created via the `readWorkspace` function, metadata will be
 * used to determine the path and format of the Workspace.  In all other cases, the `path` and
 * `format` options must be specified as they would be otherwise unknown.
 *
 * @param workspace The `WorkspaceDefinition` that will be written.
 * @param host The `WorkspaceHost` to use to access/write the file and directory data.
 * @param path The path to a file location for the output. Required if `readWorkspace` was not
 * used to create the `WorkspaceDefinition`.  Optional otherwise; will override the
 * `WorkspaceDefinition` metadata if provided.
 * @param format The `WorkspaceFormat` to use for output. Required if `readWorkspace` was not
 * used to create the `WorkspaceDefinition`.  Optional otherwise; will override the
 * `WorkspaceDefinition` metadata if provided.
 *
 *
 * @return An `Promise` of type `void`.
 */
async function writeWorkspace(workspace, host, path, format) {
    if (format === undefined) {
        format = formatLookup.get(workspace);
        if (format === undefined) {
            throw new Error('A format is required for custom workspace objects.');
        }
    }
    switch (format) {
        case WorkspaceFormat.JSON:
            return (0, writer_1.writeJsonWorkspace)(workspace, host, path);
        default:
            throw new Error('Unsupported workspace format.');
    }
}
exports.writeWorkspace = writeWorkspace;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2NvcmUvc3JjL3dvcmtzcGFjZS9jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7OztBQUVILDhDQUF5RTtBQUd6RSwwQ0FBa0Q7QUFDbEQsMENBQW1EO0FBRW5ELE1BQU0sWUFBWSxHQUFHLElBQUksT0FBTyxFQUF3QyxDQUFDO0FBRXpFOztHQUVHO0FBQ0gsSUFBWSxlQUVYO0FBRkQsV0FBWSxlQUFlO0lBQ3pCLHFEQUFJLENBQUE7QUFDTixDQUFDLEVBRlcsZUFBZSxHQUFmLHVCQUFlLEtBQWYsdUJBQWUsUUFFMUI7QUFFRDs7R0FFRztBQUNILFNBQWdCLHNCQUFzQixDQUFDLElBQVksRUFBRSxNQUF1QjtJQUMxRSxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ2hDLENBQUM7QUFGRCx3REFFQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IseUJBQXlCLENBQUMsSUFBWTtJQUNwRCxPQUFPLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM5QixDQUFDO0FBRkQsOERBRUM7QUFFRCx5RkFBeUY7QUFDekYsTUFBTSxjQUFjLEdBQW9DO0lBQ3RELGNBQWMsRUFBRSxlQUFlLENBQUMsSUFBSTtJQUNwQyxlQUFlLEVBQUUsZUFBZSxDQUFDLElBQUk7Q0FDdEMsQ0FBQztBQUVGOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNJLEtBQUssVUFBVSxhQUFhLENBQ2pDLElBQVksRUFDWixJQUFtQixFQUNuQixNQUF3QjtJQUd4QixJQUFJLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNoQyw4REFBOEQ7UUFDOUQsTUFBTSxTQUFTLEdBQUcsSUFBQSxzQkFBUyxFQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNsQixLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUMvRCxJQUFJLE1BQU0sS0FBSyxTQUFTLElBQUksTUFBTSxLQUFLLFVBQVUsRUFBRTtnQkFDakQsU0FBUzthQUNWO1lBRUQsTUFBTSxTQUFTLEdBQUcsSUFBQSwwQkFBYSxFQUFDLElBQUEsaUJBQUksRUFBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN2RCxJQUFJLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxHQUFHLFNBQVMsQ0FBQztnQkFDakIsTUFBTSxHQUFHLFVBQVUsQ0FBQztnQkFDcEIsS0FBSyxHQUFHLElBQUksQ0FBQztnQkFDYixNQUFNO2FBQ1A7U0FDRjtRQUNELElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLElBQUksS0FBSyxDQUNiLHlGQUF5RjtnQkFDdkYsMkJBQTJCLENBQzlCLENBQUM7U0FDSDtLQUNGO1NBQU0sSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1FBQy9CLE1BQU0sUUFBUSxHQUFHLElBQUEscUJBQVEsRUFBQyxJQUFBLHNCQUFTLEVBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMzQyxJQUFJLFFBQVEsSUFBSSxjQUFjLEVBQUU7WUFDOUIsTUFBTSxHQUFHLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQztLQUNGO0lBRUQsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1FBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0RBQWdELENBQUMsQ0FBQztLQUNuRTtJQUVELElBQUksU0FBUyxDQUFDO0lBQ2QsUUFBUSxNQUFNLEVBQUU7UUFDZCxLQUFLLGVBQWUsQ0FBQyxJQUFJO1lBQ3ZCLFNBQVMsR0FBRyxNQUFNLElBQUEsMEJBQWlCLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ2hELE1BQU07UUFDUjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztLQUNwRDtJQUVELFlBQVksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVsRCxPQUFPLEVBQUUsU0FBUyxFQUFFLENBQUM7QUFDdkIsQ0FBQztBQXBERCxzQ0FvREM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFDSSxLQUFLLFVBQVUsY0FBYyxDQUNsQyxTQUE4QixFQUM5QixJQUFtQixFQUNuQixJQUFhLEVBQ2IsTUFBd0I7SUFFeEIsSUFBSSxNQUFNLEtBQUssU0FBUyxFQUFFO1FBQ3hCLE1BQU0sR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JDLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUN4QixNQUFNLElBQUksS0FBSyxDQUFDLG9EQUFvRCxDQUFDLENBQUM7U0FDdkU7S0FDRjtJQUVELFFBQVEsTUFBTSxFQUFFO1FBQ2QsS0FBSyxlQUFlLENBQUMsSUFBSTtZQUN2QixPQUFPLElBQUEsMkJBQWtCLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRDtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztLQUNwRDtBQUNILENBQUM7QUFuQkQsd0NBbUJDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IGJhc2VuYW1lLCBnZXRTeXN0ZW1QYXRoLCBqb2luLCBub3JtYWxpemUgfSBmcm9tICcuLi92aXJ0dWFsLWZzJztcbmltcG9ydCB7IFdvcmtzcGFjZURlZmluaXRpb24gfSBmcm9tICcuL2RlZmluaXRpb25zJztcbmltcG9ydCB7IFdvcmtzcGFjZUhvc3QgfSBmcm9tICcuL2hvc3QnO1xuaW1wb3J0IHsgcmVhZEpzb25Xb3Jrc3BhY2UgfSBmcm9tICcuL2pzb24vcmVhZGVyJztcbmltcG9ydCB7IHdyaXRlSnNvbldvcmtzcGFjZSB9IGZyb20gJy4vanNvbi93cml0ZXInO1xuXG5jb25zdCBmb3JtYXRMb29rdXAgPSBuZXcgV2Vha01hcDxXb3Jrc3BhY2VEZWZpbml0aW9uLCBXb3Jrc3BhY2VGb3JtYXQ+KCk7XG5cbi8qKlxuICogU3VwcG9ydGVkIHdvcmtzcGFjZSBmb3JtYXRzXG4gKi9cbmV4cG9ydCBlbnVtIFdvcmtzcGFjZUZvcm1hdCB7XG4gIEpTT04sXG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIF90ZXN0X2FkZFdvcmtzcGFjZUZpbGUobmFtZTogc3RyaW5nLCBmb3JtYXQ6IFdvcmtzcGFjZUZvcm1hdCk6IHZvaWQge1xuICB3b3Jrc3BhY2VGaWxlc1tuYW1lXSA9IGZvcm1hdDtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gX3Rlc3RfcmVtb3ZlV29ya3NwYWNlRmlsZShuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgZGVsZXRlIHdvcmtzcGFjZUZpbGVzW25hbWVdO1xufVxuXG4vLyBOT1RFOiBmdXR1cmUgYWRkaXRpb25zIGNvdWxkIGFsc28gcGVyZm9ybSBjb250ZW50IGFuYWx5c2lzIHRvIGRldGVybWluZSBmb3JtYXQvdmVyc2lvblxuY29uc3Qgd29ya3NwYWNlRmlsZXM6IFJlY29yZDxzdHJpbmcsIFdvcmtzcGFjZUZvcm1hdD4gPSB7XG4gICdhbmd1bGFyLmpzb24nOiBXb3Jrc3BhY2VGb3JtYXQuSlNPTixcbiAgJy5hbmd1bGFyLmpzb24nOiBXb3Jrc3BhY2VGb3JtYXQuSlNPTixcbn07XG5cbi8qKlxuICogUmVhZHMgYW5kIGNvbnN0cnVjdHMgYSBgV29ya3NwYWNlRGVmaW5pdGlvbmAuICBJZiB0aGUgZnVuY3Rpb24gaXMgcHJvdmlkZWQgd2l0aCBhIHBhdGggdG8gYVxuICogZGlyZWN0b3J5IGluc3RlYWQgb2YgYSBmaWxlLCBhIHNlYXJjaCBvZiB0aGUgZGlyZWN0b3J5J3MgZmlsZXMgd2lsbCBjb21tZW5jZSB0byBhdHRlbXB0IHRvXG4gKiBsb2NhdGUgYSBrbm93biB3b3Jrc3BhY2UgZmlsZS4gIEN1cnJlbnRseSB0aGUgZm9sbG93aW5nIGFyZSBjb25zaWRlcmVkIGtub3duIHdvcmtzcGFjZSBmaWxlczpcbiAqIC0gYGFuZ3VsYXIuanNvbmBcbiAqIC0gYC5hbmd1bGFyLmpzb25gXG4gKlxuICogQHBhcmFtIHBhdGggVGhlIHBhdGggdG8gZWl0aGVyIGEgd29ya3NwYWNlIGZpbGUgb3IgYSBkaXJlY3RvcnkgY29udGFpbmluZyBhIHdvcmtzcGFjZSBmaWxlLlxuICogQHBhcmFtIGhvc3QgVGhlIGBXb3Jrc3BhY2VIb3N0YCB0byB1c2UgdG8gYWNjZXNzIHRoZSBmaWxlIGFuZCBkaXJlY3RvcnkgZGF0YS5cbiAqIEBwYXJhbSBmb3JtYXQgQW4gb3B0aW9uYWwgYFdvcmtzcGFjZUZvcm1hdGAgdmFsdWUuIFVzZWQgaWYgdGhlIHBhdGggc3BlY2lmaWVzIGEgbm9uLXN0YW5kYXJkXG4gKiBmaWxlIG5hbWUgdGhhdCB3b3VsZCBwcmV2ZW50IGF1dG9tYXRpY2FsbHkgZGlzY292ZXJpbmcgdGhlIGZvcm1hdC5cbiAqXG4gKlxuICogQHJldHVybiBBbiBgUHJvbWlzZWAgb2YgdGhlIHJlYWQgcmVzdWx0IG9iamVjdCB3aXRoIHRoZSBgV29ya3NwYWNlRGVmaW5pdGlvbmAgY29udGFpbmVkIHdpdGhpblxuICogdGhlIGB3b3Jrc3BhY2VgIHByb3BlcnR5LlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVhZFdvcmtzcGFjZShcbiAgcGF0aDogc3RyaW5nLFxuICBob3N0OiBXb3Jrc3BhY2VIb3N0LFxuICBmb3JtYXQ/OiBXb3Jrc3BhY2VGb3JtYXQsXG4gIC8vIHJldHVybiB0eXBlIHdpbGwgZXZlbnR1YWxseSBoYXZlIGEgYGRpYWdub3N0aWNzYCBwcm9wZXJ0eSBhcyB3ZWxsXG4pOiBQcm9taXNlPHsgd29ya3NwYWNlOiBXb3Jrc3BhY2VEZWZpbml0aW9uIH0+IHtcbiAgaWYgKGF3YWl0IGhvc3QuaXNEaXJlY3RvcnkocGF0aCkpIHtcbiAgICAvLyBUT0RPOiBXYXJuIGlmIG11bHRpcGxlIGZvdW5kIChyZXF1aXJlcyBkaWFnbm9zdGljcyBzdXBwb3J0KVxuICAgIGNvbnN0IGRpcmVjdG9yeSA9IG5vcm1hbGl6ZShwYXRoKTtcbiAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICBmb3IgKGNvbnN0IFtuYW1lLCBuYW1lRm9ybWF0XSBvZiBPYmplY3QuZW50cmllcyh3b3Jrc3BhY2VGaWxlcykpIHtcbiAgICAgIGlmIChmb3JtYXQgIT09IHVuZGVmaW5lZCAmJiBmb3JtYXQgIT09IG5hbWVGb3JtYXQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBvdGVudGlhbCA9IGdldFN5c3RlbVBhdGgoam9pbihkaXJlY3RvcnksIG5hbWUpKTtcbiAgICAgIGlmIChhd2FpdCBob3N0LmlzRmlsZShwb3RlbnRpYWwpKSB7XG4gICAgICAgIHBhdGggPSBwb3RlbnRpYWw7XG4gICAgICAgIGZvcm1hdCA9IG5hbWVGb3JtYXQ7XG4gICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICghZm91bmQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1VuYWJsZSB0byBsb2NhdGUgYSB3b3Jrc3BhY2UgZmlsZSBmb3Igd29ya3NwYWNlIHBhdGguIEFyZSB5b3UgbWlzc2luZyBhbiBgYW5ndWxhci5qc29uYCcgK1xuICAgICAgICAgICcgb3IgYC5hbmd1bGFyLmpzb25gIGZpbGU/JyxcbiAgICAgICk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY29uc3QgZmlsZW5hbWUgPSBiYXNlbmFtZShub3JtYWxpemUocGF0aCkpO1xuICAgIGlmIChmaWxlbmFtZSBpbiB3b3Jrc3BhY2VGaWxlcykge1xuICAgICAgZm9ybWF0ID0gd29ya3NwYWNlRmlsZXNbZmlsZW5hbWVdO1xuICAgIH1cbiAgfVxuXG4gIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGRldGVybWluZSBmb3JtYXQgZm9yIHdvcmtzcGFjZSBwYXRoLicpO1xuICB9XG5cbiAgbGV0IHdvcmtzcGFjZTtcbiAgc3dpdGNoIChmb3JtYXQpIHtcbiAgICBjYXNlIFdvcmtzcGFjZUZvcm1hdC5KU09OOlxuICAgICAgd29ya3NwYWNlID0gYXdhaXQgcmVhZEpzb25Xb3Jrc3BhY2UocGF0aCwgaG9zdCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCB3b3Jrc3BhY2UgZm9ybWF0LicpO1xuICB9XG5cbiAgZm9ybWF0TG9va3VwLnNldCh3b3Jrc3BhY2UsIFdvcmtzcGFjZUZvcm1hdC5KU09OKTtcblxuICByZXR1cm4geyB3b3Jrc3BhY2UgfTtcbn1cblxuLyoqXG4gKiBXcml0ZXMgYSBgV29ya3NwYWNlRGVmaW5pdGlvbmAgdG8gdGhlIHVuZGVybHlpbmcgc3RvcmFnZSB2aWEgdGhlIHByb3ZpZGVkIGBXb3Jrc3BhY2VIb3N0YC5cbiAqIElmIHRoZSBgV29ya3NwYWNlRGVmaW5pdGlvbmAgd2FzIGNyZWF0ZWQgdmlhIHRoZSBgcmVhZFdvcmtzcGFjZWAgZnVuY3Rpb24sIG1ldGFkYXRhIHdpbGwgYmVcbiAqIHVzZWQgdG8gZGV0ZXJtaW5lIHRoZSBwYXRoIGFuZCBmb3JtYXQgb2YgdGhlIFdvcmtzcGFjZS4gIEluIGFsbCBvdGhlciBjYXNlcywgdGhlIGBwYXRoYCBhbmRcbiAqIGBmb3JtYXRgIG9wdGlvbnMgbXVzdCBiZSBzcGVjaWZpZWQgYXMgdGhleSB3b3VsZCBiZSBvdGhlcndpc2UgdW5rbm93bi5cbiAqXG4gKiBAcGFyYW0gd29ya3NwYWNlIFRoZSBgV29ya3NwYWNlRGVmaW5pdGlvbmAgdGhhdCB3aWxsIGJlIHdyaXR0ZW4uXG4gKiBAcGFyYW0gaG9zdCBUaGUgYFdvcmtzcGFjZUhvc3RgIHRvIHVzZSB0byBhY2Nlc3Mvd3JpdGUgdGhlIGZpbGUgYW5kIGRpcmVjdG9yeSBkYXRhLlxuICogQHBhcmFtIHBhdGggVGhlIHBhdGggdG8gYSBmaWxlIGxvY2F0aW9uIGZvciB0aGUgb3V0cHV0LiBSZXF1aXJlZCBpZiBgcmVhZFdvcmtzcGFjZWAgd2FzIG5vdFxuICogdXNlZCB0byBjcmVhdGUgdGhlIGBXb3Jrc3BhY2VEZWZpbml0aW9uYC4gIE9wdGlvbmFsIG90aGVyd2lzZTsgd2lsbCBvdmVycmlkZSB0aGVcbiAqIGBXb3Jrc3BhY2VEZWZpbml0aW9uYCBtZXRhZGF0YSBpZiBwcm92aWRlZC5cbiAqIEBwYXJhbSBmb3JtYXQgVGhlIGBXb3Jrc3BhY2VGb3JtYXRgIHRvIHVzZSBmb3Igb3V0cHV0LiBSZXF1aXJlZCBpZiBgcmVhZFdvcmtzcGFjZWAgd2FzIG5vdFxuICogdXNlZCB0byBjcmVhdGUgdGhlIGBXb3Jrc3BhY2VEZWZpbml0aW9uYC4gIE9wdGlvbmFsIG90aGVyd2lzZTsgd2lsbCBvdmVycmlkZSB0aGVcbiAqIGBXb3Jrc3BhY2VEZWZpbml0aW9uYCBtZXRhZGF0YSBpZiBwcm92aWRlZC5cbiAqXG4gKlxuICogQHJldHVybiBBbiBgUHJvbWlzZWAgb2YgdHlwZSBgdm9pZGAuXG4gKi9cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3cml0ZVdvcmtzcGFjZShcbiAgd29ya3NwYWNlOiBXb3Jrc3BhY2VEZWZpbml0aW9uLFxuICBob3N0OiBXb3Jrc3BhY2VIb3N0LFxuICBwYXRoPzogc3RyaW5nLFxuICBmb3JtYXQ/OiBXb3Jrc3BhY2VGb3JtYXQsXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZm9ybWF0ID0gZm9ybWF0TG9va3VwLmdldCh3b3Jrc3BhY2UpO1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBIGZvcm1hdCBpcyByZXF1aXJlZCBmb3IgY3VzdG9tIHdvcmtzcGFjZSBvYmplY3RzLicpO1xuICAgIH1cbiAgfVxuXG4gIHN3aXRjaCAoZm9ybWF0KSB7XG4gICAgY2FzZSBXb3Jrc3BhY2VGb3JtYXQuSlNPTjpcbiAgICAgIHJldHVybiB3cml0ZUpzb25Xb3Jrc3BhY2Uod29ya3NwYWNlLCBob3N0LCBwYXRoKTtcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCB3b3Jrc3BhY2UgZm9ybWF0LicpO1xuICB9XG59XG4iXX0=