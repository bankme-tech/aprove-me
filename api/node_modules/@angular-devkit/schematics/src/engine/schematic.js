"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchematicImpl = exports.InvalidSchematicsNameException = void 0;
const core_1 = require("@angular-devkit/core");
const operators_1 = require("rxjs/operators");
const call_1 = require("../rules/call");
const scoped_1 = require("../tree/scoped");
class InvalidSchematicsNameException extends core_1.BaseException {
    constructor(name) {
        super(`Schematics has invalid name: "${name}".`);
    }
}
exports.InvalidSchematicsNameException = InvalidSchematicsNameException;
class SchematicImpl {
    constructor(_description, _factory, _collection, _engine) {
        this._description = _description;
        this._factory = _factory;
        this._collection = _collection;
        this._engine = _engine;
        if (!_description.name.match(/^[-@/_.a-zA-Z0-9]+$/)) {
            throw new InvalidSchematicsNameException(_description.name);
        }
    }
    get description() {
        return this._description;
    }
    get collection() {
        return this._collection;
    }
    call(options, host, parentContext, executionOptions) {
        const context = this._engine.createContext(this, parentContext, executionOptions);
        return host.pipe((0, operators_1.first)(), (0, operators_1.concatMap)((tree) => this._engine
            .transformOptions(this, options, context)
            .pipe((0, operators_1.map)((o) => [tree, o]))), (0, operators_1.concatMap)(([tree, transformedOptions]) => {
            let input;
            let scoped = false;
            if (executionOptions && executionOptions.scope) {
                scoped = true;
                input = new scoped_1.ScopedTree(tree, executionOptions.scope);
            }
            else {
                input = tree;
            }
            return (0, call_1.callRule)(this._factory(transformedOptions), input, context).pipe((0, operators_1.map)((output) => {
                if (output === input) {
                    return tree;
                }
                else if (scoped) {
                    tree.merge(output);
                    return tree;
                }
                else {
                    return output;
                }
            }));
        }));
    }
}
exports.SchematicImpl = SchematicImpl;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5ndWxhcl9kZXZraXQvc2NoZW1hdGljcy9zcmMvZW5naW5lL3NjaGVtYXRpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7QUFFSCwrQ0FBcUQ7QUFFckQsOENBQXVEO0FBQ3ZELHdDQUF5QztBQUV6QywyQ0FBNEM7QUFXNUMsTUFBYSw4QkFBK0IsU0FBUSxvQkFBYTtJQUMvRCxZQUFZLElBQVk7UUFDdEIsS0FBSyxDQUFDLGlDQUFpQyxJQUFJLElBQUksQ0FBQyxDQUFDO0lBQ25ELENBQUM7Q0FDRjtBQUpELHdFQUlDO0FBRUQsTUFBYSxhQUFhO0lBR3hCLFlBQ1UsWUFBMkQsRUFDM0QsUUFBeUIsRUFDekIsV0FBZ0QsRUFDaEQsT0FBd0M7UUFIeEMsaUJBQVksR0FBWixZQUFZLENBQStDO1FBQzNELGFBQVEsR0FBUixRQUFRLENBQWlCO1FBQ3pCLGdCQUFXLEdBQVgsV0FBVyxDQUFxQztRQUNoRCxZQUFPLEdBQVAsT0FBTyxDQUFpQztRQUVoRCxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLENBQUMsRUFBRTtZQUNuRCxNQUFNLElBQUksOEJBQThCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzdEO0lBQ0gsQ0FBQztJQUVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDO0lBQ0QsSUFBSSxVQUFVO1FBQ1osT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLENBQ0YsT0FBZ0IsRUFDaEIsSUFBc0IsRUFDdEIsYUFBdUUsRUFDdkUsZ0JBQTRDO1FBRTVDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUVsRixPQUFPLElBQUksQ0FBQyxJQUFJLENBQ2QsSUFBQSxpQkFBSyxHQUFFLEVBQ1AsSUFBQSxxQkFBUyxFQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDakIsSUFBSSxDQUFDLE9BQU87YUFDVCxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQzthQUN4QyxJQUFJLENBQUMsSUFBQSxlQUFHLEVBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBb0IsQ0FBQyxDQUFDLENBQ2xELEVBQ0QsSUFBQSxxQkFBUyxFQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLENBQUMsRUFBRSxFQUFFO1lBQ3ZDLElBQUksS0FBVyxDQUFDO1lBQ2hCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLGdCQUFnQixJQUFJLGdCQUFnQixDQUFDLEtBQUssRUFBRTtnQkFDOUMsTUFBTSxHQUFHLElBQUksQ0FBQztnQkFDZCxLQUFLLEdBQUcsSUFBSSxtQkFBVSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0RDtpQkFBTTtnQkFDTCxLQUFLLEdBQUcsSUFBSSxDQUFDO2FBQ2Q7WUFFRCxPQUFPLElBQUEsZUFBUSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsa0JBQWtCLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUNyRSxJQUFBLGVBQUcsRUFBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNiLElBQUksTUFBTSxLQUFLLEtBQUssRUFBRTtvQkFDcEIsT0FBTyxJQUFJLENBQUM7aUJBQ2I7cUJBQU0sSUFBSSxNQUFNLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBRW5CLE9BQU8sSUFBSSxDQUFDO2lCQUNiO3FCQUFNO29CQUNMLE9BQU8sTUFBTSxDQUFDO2lCQUNmO1lBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDO0NBQ0Y7QUE5REQsc0NBOERDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IEJhc2VFeGNlcHRpb24gfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb25jYXRNYXAsIGZpcnN0LCBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBjYWxsUnVsZSB9IGZyb20gJy4uL3J1bGVzL2NhbGwnO1xuaW1wb3J0IHsgVHJlZSB9IGZyb20gJy4uL3RyZWUvaW50ZXJmYWNlJztcbmltcG9ydCB7IFNjb3BlZFRyZWUgfSBmcm9tICcuLi90cmVlL3Njb3BlZCc7XG5pbXBvcnQge1xuICBDb2xsZWN0aW9uLFxuICBFbmdpbmUsXG4gIEV4ZWN1dGlvbk9wdGlvbnMsXG4gIFJ1bGVGYWN0b3J5LFxuICBTY2hlbWF0aWMsXG4gIFNjaGVtYXRpY0Rlc2NyaXB0aW9uLFxuICBUeXBlZFNjaGVtYXRpY0NvbnRleHQsXG59IGZyb20gJy4vaW50ZXJmYWNlJztcblxuZXhwb3J0IGNsYXNzIEludmFsaWRTY2hlbWF0aWNzTmFtZUV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgU2NoZW1hdGljcyBoYXMgaW52YWxpZCBuYW1lOiBcIiR7bmFtZX1cIi5gKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2NoZW1hdGljSW1wbDxDb2xsZWN0aW9uVCBleHRlbmRzIG9iamVjdCwgU2NoZW1hdGljVCBleHRlbmRzIG9iamVjdD5cbiAgaW1wbGVtZW50cyBTY2hlbWF0aWM8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+XG57XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2Rlc2NyaXB0aW9uOiBTY2hlbWF0aWNEZXNjcmlwdGlvbjxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4sXG4gICAgcHJpdmF0ZSBfZmFjdG9yeTogUnVsZUZhY3Rvcnk8e30+LFxuICAgIHByaXZhdGUgX2NvbGxlY3Rpb246IENvbGxlY3Rpb248Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+LFxuICAgIHByaXZhdGUgX2VuZ2luZTogRW5naW5lPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPixcbiAgKSB7XG4gICAgaWYgKCFfZGVzY3JpcHRpb24ubmFtZS5tYXRjaCgvXlstQC9fLmEtekEtWjAtOV0rJC8pKSB7XG4gICAgICB0aHJvdyBuZXcgSW52YWxpZFNjaGVtYXRpY3NOYW1lRXhjZXB0aW9uKF9kZXNjcmlwdGlvbi5uYW1lKTtcbiAgICB9XG4gIH1cblxuICBnZXQgZGVzY3JpcHRpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Rlc2NyaXB0aW9uO1xuICB9XG4gIGdldCBjb2xsZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9jb2xsZWN0aW9uO1xuICB9XG5cbiAgY2FsbDxPcHRpb25UIGV4dGVuZHMgb2JqZWN0PihcbiAgICBvcHRpb25zOiBPcHRpb25ULFxuICAgIGhvc3Q6IE9ic2VydmFibGU8VHJlZT4sXG4gICAgcGFyZW50Q29udGV4dD86IFBhcnRpYWw8VHlwZWRTY2hlbWF0aWNDb250ZXh0PENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPj4sXG4gICAgZXhlY3V0aW9uT3B0aW9ucz86IFBhcnRpYWw8RXhlY3V0aW9uT3B0aW9ucz4sXG4gICk6IE9ic2VydmFibGU8VHJlZT4ge1xuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLl9lbmdpbmUuY3JlYXRlQ29udGV4dCh0aGlzLCBwYXJlbnRDb250ZXh0LCBleGVjdXRpb25PcHRpb25zKTtcblxuICAgIHJldHVybiBob3N0LnBpcGUoXG4gICAgICBmaXJzdCgpLFxuICAgICAgY29uY2F0TWFwKCh0cmVlKSA9PlxuICAgICAgICB0aGlzLl9lbmdpbmVcbiAgICAgICAgICAudHJhbnNmb3JtT3B0aW9ucyh0aGlzLCBvcHRpb25zLCBjb250ZXh0KVxuICAgICAgICAgIC5waXBlKG1hcCgobykgPT4gW3RyZWUsIG9dIGFzIFtUcmVlLCBPcHRpb25UXSkpLFxuICAgICAgKSxcbiAgICAgIGNvbmNhdE1hcCgoW3RyZWUsIHRyYW5zZm9ybWVkT3B0aW9uc10pID0+IHtcbiAgICAgICAgbGV0IGlucHV0OiBUcmVlO1xuICAgICAgICBsZXQgc2NvcGVkID0gZmFsc2U7XG4gICAgICAgIGlmIChleGVjdXRpb25PcHRpb25zICYmIGV4ZWN1dGlvbk9wdGlvbnMuc2NvcGUpIHtcbiAgICAgICAgICBzY29wZWQgPSB0cnVlO1xuICAgICAgICAgIGlucHV0ID0gbmV3IFNjb3BlZFRyZWUodHJlZSwgZXhlY3V0aW9uT3B0aW9ucy5zY29wZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5wdXQgPSB0cmVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNhbGxSdWxlKHRoaXMuX2ZhY3RvcnkodHJhbnNmb3JtZWRPcHRpb25zKSwgaW5wdXQsIGNvbnRleHQpLnBpcGUoXG4gICAgICAgICAgbWFwKChvdXRwdXQpID0+IHtcbiAgICAgICAgICAgIGlmIChvdXRwdXQgPT09IGlucHV0KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cmVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChzY29wZWQpIHtcbiAgICAgICAgICAgICAgdHJlZS5tZXJnZShvdXRwdXQpO1xuXG4gICAgICAgICAgICAgIHJldHVybiB0cmVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIG91dHB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSxcbiAgICAgICAgKTtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cbn1cbiJdfQ==