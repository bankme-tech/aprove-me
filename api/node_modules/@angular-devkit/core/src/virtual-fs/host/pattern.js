"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatternMatchingHost = void 0;
const resolver_1 = require("./resolver");
/**
 */
class PatternMatchingHost extends resolver_1.ResolverHost {
    constructor() {
        super(...arguments);
        this._patterns = new Map();
    }
    addPattern(pattern, replacementFn) {
        // Simple GLOB pattern replacement.
        const reString = '^(' +
            (Array.isArray(pattern) ? pattern : [pattern])
                .map((ex) => '(' +
                ex
                    .split(/[/\\]/g)
                    .map((f) => f
                    .replace(/[-[\]{}()+?.^$|]/g, '\\$&')
                    .replace(/^\*\*/g, '(.+?)?')
                    .replace(/\*/g, '[^/\\\\]*'))
                    .join('[/\\\\]') +
                ')')
                .join('|') +
            ')($|/|\\\\)';
        this._patterns.set(new RegExp(reString), replacementFn);
    }
    _resolve(path) {
        let newPath = path;
        this._patterns.forEach((fn, re) => {
            if (re.test(path)) {
                newPath = fn(newPath);
            }
        });
        return newPath;
    }
}
exports.PatternMatchingHost = PatternMatchingHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0dGVybi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2NvcmUvc3JjL3ZpcnR1YWwtZnMvaG9zdC9wYXR0ZXJuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7OztBQUdILHlDQUEwQztBQUkxQztHQUNHO0FBQ0gsTUFBYSxtQkFBZ0QsU0FBUSx1QkFBb0I7SUFBekY7O1FBQ1ksY0FBUyxHQUFHLElBQUksR0FBRyxFQUErQixDQUFDO0lBcUMvRCxDQUFDO0lBbkNDLFVBQVUsQ0FBQyxPQUEwQixFQUFFLGFBQWtDO1FBQ3ZFLG1DQUFtQztRQUNuQyxNQUFNLFFBQVEsR0FDWixJQUFJO1lBQ0osQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzNDLEdBQUcsQ0FDRixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQ0wsR0FBRztnQkFDSCxFQUFFO3FCQUNDLEtBQUssQ0FBQyxRQUFRLENBQUM7cUJBQ2YsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FDVCxDQUFDO3FCQUNFLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUM7cUJBQ3BDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO3FCQUMzQixPQUFPLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUMvQjtxQkFDQSxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNsQixHQUFHLENBQ047aUJBQ0EsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNaLGFBQWEsQ0FBQztRQUVoQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRVMsUUFBUSxDQUFDLElBQVU7UUFDM0IsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO1lBQ2hDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDakIsT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUN2QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBdENELGtEQXNDQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBQYXRoIH0gZnJvbSAnLi4vcGF0aCc7XG5pbXBvcnQgeyBSZXNvbHZlckhvc3QgfSBmcm9tICcuL3Jlc29sdmVyJztcblxuZXhwb3J0IHR5cGUgUmVwbGFjZW1lbnRGdW5jdGlvbiA9IChwYXRoOiBQYXRoKSA9PiBQYXRoO1xuXG4vKipcbiAqL1xuZXhwb3J0IGNsYXNzIFBhdHRlcm5NYXRjaGluZ0hvc3Q8U3RhdHNUIGV4dGVuZHMgb2JqZWN0ID0ge30+IGV4dGVuZHMgUmVzb2x2ZXJIb3N0PFN0YXRzVD4ge1xuICBwcm90ZWN0ZWQgX3BhdHRlcm5zID0gbmV3IE1hcDxSZWdFeHAsIFJlcGxhY2VtZW50RnVuY3Rpb24+KCk7XG5cbiAgYWRkUGF0dGVybihwYXR0ZXJuOiBzdHJpbmcgfCBzdHJpbmdbXSwgcmVwbGFjZW1lbnRGbjogUmVwbGFjZW1lbnRGdW5jdGlvbikge1xuICAgIC8vIFNpbXBsZSBHTE9CIHBhdHRlcm4gcmVwbGFjZW1lbnQuXG4gICAgY29uc3QgcmVTdHJpbmcgPVxuICAgICAgJ14oJyArXG4gICAgICAoQXJyYXkuaXNBcnJheShwYXR0ZXJuKSA/IHBhdHRlcm4gOiBbcGF0dGVybl0pXG4gICAgICAgIC5tYXAoXG4gICAgICAgICAgKGV4KSA9PlxuICAgICAgICAgICAgJygnICtcbiAgICAgICAgICAgIGV4XG4gICAgICAgICAgICAgIC5zcGxpdCgvWy9cXFxcXS9nKVxuICAgICAgICAgICAgICAubWFwKChmKSA9PlxuICAgICAgICAgICAgICAgIGZcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9bLVtcXF17fSgpKz8uXiR8XS9nLCAnXFxcXCQmJylcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9eXFwqXFwqL2csICcoLis/KT8nKVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcKi9nLCAnW14vXFxcXFxcXFxdKicpLFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIC5qb2luKCdbL1xcXFxcXFxcXScpICtcbiAgICAgICAgICAgICcpJyxcbiAgICAgICAgKVxuICAgICAgICAuam9pbignfCcpICtcbiAgICAgICcpKCR8L3xcXFxcXFxcXCknO1xuXG4gICAgdGhpcy5fcGF0dGVybnMuc2V0KG5ldyBSZWdFeHAocmVTdHJpbmcpLCByZXBsYWNlbWVudEZuKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfcmVzb2x2ZShwYXRoOiBQYXRoKSB7XG4gICAgbGV0IG5ld1BhdGggPSBwYXRoO1xuICAgIHRoaXMuX3BhdHRlcm5zLmZvckVhY2goKGZuLCByZSkgPT4ge1xuICAgICAgaWYgKHJlLnRlc3QocGF0aCkpIHtcbiAgICAgICAgbmV3UGF0aCA9IGZuKG5ld1BhdGgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ld1BhdGg7XG4gIH1cbn1cbiJdfQ==