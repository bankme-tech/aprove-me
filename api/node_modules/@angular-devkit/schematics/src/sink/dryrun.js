"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DryRunSink = void 0;
const core_1 = require("@angular-devkit/core");
const node_1 = require("@angular-devkit/core/node");
const rxjs_1 = require("rxjs");
const host_1 = require("./host");
class DryRunSink extends host_1.HostSink {
    constructor(host, force = false) {
        super(typeof host == 'string'
            ? new core_1.virtualFs.ScopedHost(new node_1.NodeJsSyncHost(), (0, core_1.normalize)(host))
            : host, force);
        this._subject = new rxjs_1.Subject();
        this._fileDoesNotExistExceptionSet = new Set();
        this._fileAlreadyExistExceptionSet = new Set();
        this.reporter = this._subject.asObservable();
    }
    _fileAlreadyExistException(path) {
        this._fileAlreadyExistExceptionSet.add(path);
    }
    _fileDoesNotExistException(path) {
        this._fileDoesNotExistExceptionSet.add(path);
    }
    _done() {
        this._fileAlreadyExistExceptionSet.forEach((path) => {
            this._subject.next({
                kind: 'error',
                description: 'alreadyExist',
                path,
            });
        });
        this._fileDoesNotExistExceptionSet.forEach((path) => {
            this._subject.next({
                kind: 'error',
                description: 'doesNotExist',
                path,
            });
        });
        this._filesToDelete.forEach((path) => {
            // Check if this is a renaming.
            for (const [from] of this._filesToRename) {
                if (from == path) {
                    // The event is sent later on.
                    return;
                }
            }
            this._subject.next({ kind: 'delete', path });
        });
        this._filesToRename.forEach(([path, to]) => {
            this._subject.next({ kind: 'rename', path, to });
        });
        this._filesToCreate.forEach((content, path) => {
            // Check if this is a renaming.
            for (const [, to] of this._filesToRename) {
                if (to == path) {
                    // The event is sent later on.
                    return;
                }
            }
            if (this._fileAlreadyExistExceptionSet.has(path) ||
                this._fileDoesNotExistExceptionSet.has(path)) {
                return;
            }
            this._subject.next({ kind: 'create', path, content: content.generate() });
        });
        this._filesToUpdate.forEach((content, path) => {
            this._subject.next({ kind: 'update', path, content: content.generate() });
        });
        this._subject.complete();
        return (0, rxjs_1.of)(undefined);
    }
}
exports.DryRunSink = DryRunSink;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJ5cnVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5ndWxhcl9kZXZraXQvc2NoZW1hdGljcy9zcmMvc2luay9kcnlydW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7O0FBRUgsK0NBQTREO0FBQzVELG9EQUEyRDtBQUMzRCwrQkFBK0M7QUFDL0MsaUNBQWtDO0FBa0NsQyxNQUFhLFVBQVcsU0FBUSxlQUFRO0lBYXRDLFlBQVksSUFBNkIsRUFBRSxLQUFLLEdBQUcsS0FBSztRQUN0RCxLQUFLLENBQ0gsT0FBTyxJQUFJLElBQUksUUFBUTtZQUNyQixDQUFDLENBQUMsSUFBSSxnQkFBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLHFCQUFjLEVBQUUsRUFBRSxJQUFBLGdCQUFTLEVBQUMsSUFBSSxDQUFDLENBQUM7WUFDakUsQ0FBQyxDQUFDLElBQUksRUFDUixLQUFLLENBQ04sQ0FBQztRQWxCTSxhQUFRLEdBQUcsSUFBSSxjQUFPLEVBQWUsQ0FBQztRQUN0QyxrQ0FBNkIsR0FBRyxJQUFJLEdBQUcsRUFBVSxDQUFDO1FBQ2xELGtDQUE2QixHQUFHLElBQUksR0FBRyxFQUFVLENBQUM7UUFFbkQsYUFBUSxHQUE0QixJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBZTFFLENBQUM7SUFFa0IsMEJBQTBCLENBQUMsSUFBWTtRQUN4RCxJQUFJLENBQUMsNkJBQTZCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFDa0IsMEJBQTBCLENBQUMsSUFBWTtRQUN4RCxJQUFJLENBQUMsNkJBQTZCLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFUSxLQUFLO1FBQ1osSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNqQixJQUFJLEVBQUUsT0FBTztnQkFDYixXQUFXLEVBQUUsY0FBYztnQkFDM0IsSUFBSTthQUNMLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO2dCQUNqQixJQUFJLEVBQUUsT0FBTztnQkFDYixXQUFXLEVBQUUsY0FBYztnQkFDM0IsSUFBSTthQUNMLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNuQywrQkFBK0I7WUFDL0IsS0FBSyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDeEMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO29CQUNoQiw4QkFBOEI7b0JBQzlCLE9BQU87aUJBQ1I7YUFDRjtZQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuRCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxFQUFFO1lBQzVDLCtCQUErQjtZQUMvQixLQUFLLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3hDLElBQUksRUFBRSxJQUFJLElBQUksRUFBRTtvQkFDZCw4QkFBOEI7b0JBQzlCLE9BQU87aUJBQ1I7YUFDRjtZQUNELElBQ0UsSUFBSSxDQUFDLDZCQUE2QixDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQzVDLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQzVDO2dCQUNBLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUUsQ0FBQyxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQzVFLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUV6QixPQUFPLElBQUEsU0FBRSxFQUFPLFNBQVMsQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FDRjtBQXBGRCxnQ0FvRkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgbm9ybWFsaXplLCB2aXJ0dWFsRnMgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBOb2RlSnNTeW5jSG9zdCB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlL25vZGUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCwgb2YgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEhvc3RTaW5rIH0gZnJvbSAnLi9ob3N0JztcblxuZXhwb3J0IGludGVyZmFjZSBEcnlSdW5FcnJvckV2ZW50IHtcbiAga2luZDogJ2Vycm9yJztcbiAgZGVzY3JpcHRpb246ICdhbHJlYWR5RXhpc3QnIHwgJ2RvZXNOb3RFeGlzdCc7XG4gIHBhdGg6IHN0cmluZztcbn1cbmV4cG9ydCBpbnRlcmZhY2UgRHJ5UnVuRGVsZXRlRXZlbnQge1xuICBraW5kOiAnZGVsZXRlJztcbiAgcGF0aDogc3RyaW5nO1xufVxuZXhwb3J0IGludGVyZmFjZSBEcnlSdW5DcmVhdGVFdmVudCB7XG4gIGtpbmQ6ICdjcmVhdGUnO1xuICBwYXRoOiBzdHJpbmc7XG4gIGNvbnRlbnQ6IEJ1ZmZlcjtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgRHJ5UnVuVXBkYXRlRXZlbnQge1xuICBraW5kOiAndXBkYXRlJztcbiAgcGF0aDogc3RyaW5nO1xuICBjb250ZW50OiBCdWZmZXI7XG59XG5leHBvcnQgaW50ZXJmYWNlIERyeVJ1blJlbmFtZUV2ZW50IHtcbiAga2luZDogJ3JlbmFtZSc7XG4gIHBhdGg6IHN0cmluZztcbiAgdG86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRHJ5UnVuRXZlbnQgPVxuICB8IERyeVJ1bkVycm9yRXZlbnRcbiAgfCBEcnlSdW5EZWxldGVFdmVudFxuICB8IERyeVJ1bkNyZWF0ZUV2ZW50XG4gIHwgRHJ5UnVuVXBkYXRlRXZlbnRcbiAgfCBEcnlSdW5SZW5hbWVFdmVudDtcblxuZXhwb3J0IGNsYXNzIERyeVJ1blNpbmsgZXh0ZW5kcyBIb3N0U2luayB7XG4gIHByb3RlY3RlZCBfc3ViamVjdCA9IG5ldyBTdWJqZWN0PERyeVJ1bkV2ZW50PigpO1xuICBwcm90ZWN0ZWQgX2ZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb25TZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgcHJvdGVjdGVkIF9maWxlQWxyZWFkeUV4aXN0RXhjZXB0aW9uU2V0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgcmVhZG9ubHkgcmVwb3J0ZXI6IE9ic2VydmFibGU8RHJ5UnVuRXZlbnQ+ID0gdGhpcy5fc3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuICAvKipcbiAgICogQHBhcmFtIHtob3N0fSBkaXIgVGhlIGhvc3QgdG8gdXNlIHRvIG91dHB1dC4gVGhpcyBzaG91bGQgYmUgc2NvcGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcmNlIFdoZXRoZXIgdG8gZm9yY2Ugb3ZlcndyaXRpbmcgZmlsZXMgdGhhdCBhbHJlYWR5IGV4aXN0LlxuICAgKi9cbiAgY29uc3RydWN0b3IoaG9zdDogdmlydHVhbEZzLkhvc3QsIGZvcmNlPzogYm9vbGVhbik7XG5cbiAgY29uc3RydWN0b3IoaG9zdDogdmlydHVhbEZzLkhvc3QgfCBzdHJpbmcsIGZvcmNlID0gZmFsc2UpIHtcbiAgICBzdXBlcihcbiAgICAgIHR5cGVvZiBob3N0ID09ICdzdHJpbmcnXG4gICAgICAgID8gbmV3IHZpcnR1YWxGcy5TY29wZWRIb3N0KG5ldyBOb2RlSnNTeW5jSG9zdCgpLCBub3JtYWxpemUoaG9zdCkpXG4gICAgICAgIDogaG9zdCxcbiAgICAgIGZvcmNlLFxuICAgICk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX2ZpbGVBbHJlYWR5RXhpc3RFeGNlcHRpb24ocGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fZmlsZUFscmVhZHlFeGlzdEV4Y2VwdGlvblNldC5hZGQocGF0aCk7XG4gIH1cbiAgcHJvdGVjdGVkIG92ZXJyaWRlIF9maWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uKHBhdGg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2ZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb25TZXQuYWRkKHBhdGgpO1xuICB9XG5cbiAgb3ZlcnJpZGUgX2RvbmUoKSB7XG4gICAgdGhpcy5fZmlsZUFscmVhZHlFeGlzdEV4Y2VwdGlvblNldC5mb3JFYWNoKChwYXRoKSA9PiB7XG4gICAgICB0aGlzLl9zdWJqZWN0Lm5leHQoe1xuICAgICAgICBraW5kOiAnZXJyb3InLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ2FscmVhZHlFeGlzdCcsXG4gICAgICAgIHBhdGgsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgICB0aGlzLl9maWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uU2V0LmZvckVhY2goKHBhdGgpID0+IHtcbiAgICAgIHRoaXMuX3N1YmplY3QubmV4dCh7XG4gICAgICAgIGtpbmQ6ICdlcnJvcicsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnZG9lc05vdEV4aXN0JyxcbiAgICAgICAgcGF0aCxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdGhpcy5fZmlsZXNUb0RlbGV0ZS5mb3JFYWNoKChwYXRoKSA9PiB7XG4gICAgICAvLyBDaGVjayBpZiB0aGlzIGlzIGEgcmVuYW1pbmcuXG4gICAgICBmb3IgKGNvbnN0IFtmcm9tXSBvZiB0aGlzLl9maWxlc1RvUmVuYW1lKSB7XG4gICAgICAgIGlmIChmcm9tID09IHBhdGgpIHtcbiAgICAgICAgICAvLyBUaGUgZXZlbnQgaXMgc2VudCBsYXRlciBvbi5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3ViamVjdC5uZXh0KHsga2luZDogJ2RlbGV0ZScsIHBhdGggfSk7XG4gICAgfSk7XG4gICAgdGhpcy5fZmlsZXNUb1JlbmFtZS5mb3JFYWNoKChbcGF0aCwgdG9dKSA9PiB7XG4gICAgICB0aGlzLl9zdWJqZWN0Lm5leHQoeyBraW5kOiAncmVuYW1lJywgcGF0aCwgdG8gfSk7XG4gICAgfSk7XG4gICAgdGhpcy5fZmlsZXNUb0NyZWF0ZS5mb3JFYWNoKChjb250ZW50LCBwYXRoKSA9PiB7XG4gICAgICAvLyBDaGVjayBpZiB0aGlzIGlzIGEgcmVuYW1pbmcuXG4gICAgICBmb3IgKGNvbnN0IFssIHRvXSBvZiB0aGlzLl9maWxlc1RvUmVuYW1lKSB7XG4gICAgICAgIGlmICh0byA9PSBwYXRoKSB7XG4gICAgICAgICAgLy8gVGhlIGV2ZW50IGlzIHNlbnQgbGF0ZXIgb24uXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuX2ZpbGVBbHJlYWR5RXhpc3RFeGNlcHRpb25TZXQuaGFzKHBhdGgpIHx8XG4gICAgICAgIHRoaXMuX2ZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb25TZXQuaGFzKHBhdGgpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9zdWJqZWN0Lm5leHQoeyBraW5kOiAnY3JlYXRlJywgcGF0aCwgY29udGVudDogY29udGVudC5nZW5lcmF0ZSgpIH0pO1xuICAgIH0pO1xuICAgIHRoaXMuX2ZpbGVzVG9VcGRhdGUuZm9yRWFjaCgoY29udGVudCwgcGF0aCkgPT4ge1xuICAgICAgdGhpcy5fc3ViamVjdC5uZXh0KHsga2luZDogJ3VwZGF0ZScsIHBhdGgsIGNvbnRlbnQ6IGNvbnRlbnQuZ2VuZXJhdGUoKSB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuX3N1YmplY3QuY29tcGxldGUoKTtcblxuICAgIHJldHVybiBvZjx2b2lkPih1bmRlZmluZWQpO1xuICB9XG59XG4iXX0=