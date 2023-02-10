"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndentLogger = void 0;
const operators_1 = require("rxjs/operators");
const logger_1 = require("./logger");
/**
 * Keep an map of indentation => array of indentations based on the level.
 * This is to optimize calculating the prefix based on the indentation itself. Since most logs
 * come from similar levels, and with similar indentation strings, this will be shared by all
 * loggers. Also, string concatenation is expensive so performing concats for every log entries
 * is expensive; this alleviates it.
 */
const indentationMap = {};
class IndentLogger extends logger_1.Logger {
    constructor(name, parent = null, indentation = '  ') {
        super(name, parent);
        indentationMap[indentation] = indentationMap[indentation] || [''];
        const indentMap = indentationMap[indentation];
        this._observable = this._observable.pipe((0, operators_1.map)((entry) => {
            const l = entry.path.filter((x) => !!x).length;
            if (l >= indentMap.length) {
                let current = indentMap[indentMap.length - 1];
                while (l >= indentMap.length) {
                    current += indentation;
                    indentMap.push(current);
                }
            }
            entry.message = indentMap[l] + entry.message.split(/\n/).join('\n' + indentMap[l]);
            return entry;
        }));
    }
}
exports.IndentLogger = IndentLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5ndWxhcl9kZXZraXQvY29yZS9zcmMvbG9nZ2VyL2luZGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7QUFFSCw4Q0FBcUM7QUFDckMscUNBQWtDO0FBRWxDOzs7Ozs7R0FNRztBQUNILE1BQU0sY0FBYyxHQUE0QyxFQUFFLENBQUM7QUFFbkUsTUFBYSxZQUFhLFNBQVEsZUFBTTtJQUN0QyxZQUFZLElBQVksRUFBRSxTQUF3QixJQUFJLEVBQUUsV0FBVyxHQUFHLElBQUk7UUFDeEUsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUVwQixjQUFjLENBQUMsV0FBVyxDQUFDLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbEUsTUFBTSxTQUFTLEdBQUcsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRTlDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQ3RDLElBQUEsZUFBRyxFQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDWixNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztZQUMvQyxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxFQUFFO2dCQUN6QixJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsT0FBTyxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtvQkFDNUIsT0FBTyxJQUFJLFdBQVcsQ0FBQztvQkFDdkIsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFDekI7YUFDRjtZQUVELEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkYsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBeEJELG9DQXdCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBMb2dnZXIgfSBmcm9tICcuL2xvZ2dlcic7XG5cbi8qKlxuICogS2VlcCBhbiBtYXAgb2YgaW5kZW50YXRpb24gPT4gYXJyYXkgb2YgaW5kZW50YXRpb25zIGJhc2VkIG9uIHRoZSBsZXZlbC5cbiAqIFRoaXMgaXMgdG8gb3B0aW1pemUgY2FsY3VsYXRpbmcgdGhlIHByZWZpeCBiYXNlZCBvbiB0aGUgaW5kZW50YXRpb24gaXRzZWxmLiBTaW5jZSBtb3N0IGxvZ3NcbiAqIGNvbWUgZnJvbSBzaW1pbGFyIGxldmVscywgYW5kIHdpdGggc2ltaWxhciBpbmRlbnRhdGlvbiBzdHJpbmdzLCB0aGlzIHdpbGwgYmUgc2hhcmVkIGJ5IGFsbFxuICogbG9nZ2Vycy4gQWxzbywgc3RyaW5nIGNvbmNhdGVuYXRpb24gaXMgZXhwZW5zaXZlIHNvIHBlcmZvcm1pbmcgY29uY2F0cyBmb3IgZXZlcnkgbG9nIGVudHJpZXNcbiAqIGlzIGV4cGVuc2l2ZTsgdGhpcyBhbGxldmlhdGVzIGl0LlxuICovXG5jb25zdCBpbmRlbnRhdGlvbk1hcDogeyBbaW5kZW50YXRpb25UeXBlOiBzdHJpbmddOiBzdHJpbmdbXSB9ID0ge307XG5cbmV4cG9ydCBjbGFzcyBJbmRlbnRMb2dnZXIgZXh0ZW5kcyBMb2dnZXIge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIHBhcmVudDogTG9nZ2VyIHwgbnVsbCA9IG51bGwsIGluZGVudGF0aW9uID0gJyAgJykge1xuICAgIHN1cGVyKG5hbWUsIHBhcmVudCk7XG5cbiAgICBpbmRlbnRhdGlvbk1hcFtpbmRlbnRhdGlvbl0gPSBpbmRlbnRhdGlvbk1hcFtpbmRlbnRhdGlvbl0gfHwgWycnXTtcbiAgICBjb25zdCBpbmRlbnRNYXAgPSBpbmRlbnRhdGlvbk1hcFtpbmRlbnRhdGlvbl07XG5cbiAgICB0aGlzLl9vYnNlcnZhYmxlID0gdGhpcy5fb2JzZXJ2YWJsZS5waXBlKFxuICAgICAgbWFwKChlbnRyeSkgPT4ge1xuICAgICAgICBjb25zdCBsID0gZW50cnkucGF0aC5maWx0ZXIoKHgpID0+ICEheCkubGVuZ3RoO1xuICAgICAgICBpZiAobCA+PSBpbmRlbnRNYXAubGVuZ3RoKSB7XG4gICAgICAgICAgbGV0IGN1cnJlbnQgPSBpbmRlbnRNYXBbaW5kZW50TWFwLmxlbmd0aCAtIDFdO1xuICAgICAgICAgIHdoaWxlIChsID49IGluZGVudE1hcC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGN1cnJlbnQgKz0gaW5kZW50YXRpb247XG4gICAgICAgICAgICBpbmRlbnRNYXAucHVzaChjdXJyZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbnRyeS5tZXNzYWdlID0gaW5kZW50TWFwW2xdICsgZW50cnkubWVzc2FnZS5zcGxpdCgvXFxuLykuam9pbignXFxuJyArIGluZGVudE1hcFtsXSk7XG5cbiAgICAgICAgcmV0dXJuIGVudHJ5O1xuICAgICAgfSksXG4gICAgKTtcbiAgfVxufVxuIl19