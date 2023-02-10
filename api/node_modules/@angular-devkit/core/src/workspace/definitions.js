"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TargetDefinitionCollection = exports.ProjectDefinitionCollection = void 0;
class DefinitionCollection {
    constructor(initial, _listener) {
        this._listener = _listener;
        this._map = new Map(initial && Object.entries(initial));
    }
    delete(key) {
        var _a;
        const result = this._map.delete(key);
        if (result) {
            (_a = this._listener) === null || _a === void 0 ? void 0 : _a.call(this, key, undefined, this);
        }
        return result;
    }
    set(key, value) {
        var _a;
        const updatedValue = value !== this.get(key);
        if (updatedValue) {
            this._map.set(key, value);
            (_a = this._listener) === null || _a === void 0 ? void 0 : _a.call(this, key, value, this);
        }
        return this;
    }
    forEach(callbackfn, thisArg) {
        this._map.forEach((value, key) => callbackfn(value, key, this), thisArg);
    }
    get(key) {
        return this._map.get(key);
    }
    has(key) {
        return this._map.has(key);
    }
    get size() {
        return this._map.size;
    }
    [Symbol.iterator]() {
        return this._map[Symbol.iterator]();
    }
    entries() {
        return this._map.entries();
    }
    keys() {
        return this._map.keys();
    }
    values() {
        return this._map.values();
    }
}
function isJsonValue(value) {
    const visited = new Set();
    switch (typeof value) {
        case 'boolean':
        case 'number':
        case 'string':
            return true;
        case 'object':
            if (value === null) {
                return true;
            }
            visited.add(value);
            for (const property of Object.values(value)) {
                if (typeof value === 'object' && visited.has(property)) {
                    continue;
                }
                if (!isJsonValue(property)) {
                    return false;
                }
            }
            return true;
        default:
            return false;
    }
}
class ProjectDefinitionCollection extends DefinitionCollection {
    constructor(initial, listener) {
        super(initial, listener);
    }
    add(definition) {
        if (this.has(definition.name)) {
            throw new Error('Project name already exists.');
        }
        this._validateName(definition.name);
        const project = {
            root: definition.root,
            prefix: definition.prefix,
            sourceRoot: definition.sourceRoot,
            targets: new TargetDefinitionCollection(),
            extensions: {},
        };
        if (definition.targets) {
            for (const [name, target] of Object.entries(definition.targets)) {
                if (target) {
                    project.targets.set(name, target);
                }
            }
        }
        for (const [name, value] of Object.entries(definition)) {
            switch (name) {
                case 'name':
                case 'root':
                case 'sourceRoot':
                case 'prefix':
                case 'targets':
                    break;
                default:
                    if (isJsonValue(value)) {
                        project.extensions[name] = value;
                    }
                    else {
                        throw new TypeError(`"${name}" must be a JSON value.`);
                    }
                    break;
            }
        }
        super.set(definition.name, project);
        return project;
    }
    set(name, value) {
        this._validateName(name);
        super.set(name, value);
        return this;
    }
    _validateName(name) {
        if (typeof name !== 'string' || !/^(?:@\w[\w.-]*\/)?\w[\w.-]*$/.test(name)) {
            throw new Error('Project name must be a valid npm package name.');
        }
    }
}
exports.ProjectDefinitionCollection = ProjectDefinitionCollection;
class TargetDefinitionCollection extends DefinitionCollection {
    constructor(initial, listener) {
        super(initial, listener);
    }
    add(definition) {
        if (this.has(definition.name)) {
            throw new Error('Target name already exists.');
        }
        this._validateName(definition.name);
        const target = {
            builder: definition.builder,
            options: definition.options,
            configurations: definition.configurations,
            defaultConfiguration: definition.defaultConfiguration,
        };
        super.set(definition.name, target);
        return target;
    }
    set(name, value) {
        this._validateName(name);
        super.set(name, value);
        return this;
    }
    _validateName(name) {
        if (typeof name !== 'string') {
            throw new TypeError('Target name must be a string.');
        }
    }
}
exports.TargetDefinitionCollection = TargetDefinitionCollection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaW5pdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9jb3JlL3NyYy93b3Jrc3BhY2UvZGVmaW5pdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7O0FBK0JILE1BQU0sb0JBQW9CO0lBR3hCLFlBQVksT0FBMkIsRUFBVSxTQUEyQztRQUEzQyxjQUFTLEdBQVQsU0FBUyxDQUFrQztRQUMxRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFXOztRQUNoQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVyQyxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQUEsSUFBSSxDQUFDLFNBQVMscURBQUcsR0FBRyxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUN4QztRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxHQUFHLENBQUMsR0FBVyxFQUFFLEtBQVE7O1FBQ3ZCLE1BQU0sWUFBWSxHQUFHLEtBQUssS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTdDLElBQUksWUFBWSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUMxQixNQUFBLElBQUksQ0FBQyxTQUFTLHFEQUFHLEdBQUcsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDcEM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxPQUFPLENBQ0wsVUFBeUUsRUFDekUsT0FBVztRQUVYLElBQUks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Y2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBKc29uVmFsdWUgfSBmcm9tICcuLi9qc29uJztcblxuZXhwb3J0IGludGVyZmFjZSBXb3Jrc3BhY2VEZWZpbml0aW9uIHtcbiAgcmVhZG9ubHkgZXh0ZW5zaW9uczogUmVjb3JkPHN0cmluZywgSnNvblZhbHVlIHwgdW5kZWZpbmVkPjtcbiAgcmVhZG9ubHkgcHJvamVjdHM6IFByb2plY3REZWZpbml0aW9uQ29sbGVjdGlvbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9qZWN0RGVmaW5pdGlvbiB7XG4gIHJlYWRvbmx5IGV4dGVuc2lvbnM6IFJlY29yZDxzdHJpbmcsIEpzb25WYWx1ZSB8IHVuZGVmaW5lZD47XG4gIHJlYWRvbmx5IHRhcmdldHM6IFRhcmdldERlZmluaXRpb25Db2xsZWN0aW9uO1xuXG4gIHJvb3Q6IHN0cmluZztcbiAgcHJlZml4Pzogc3RyaW5nO1xuICBzb3VyY2VSb290Pzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRhcmdldERlZmluaXRpb24ge1xuICBvcHRpb25zPzogUmVjb3JkPHN0cmluZywgSnNvblZhbHVlIHwgdW5kZWZpbmVkPjtcbiAgY29uZmlndXJhdGlvbnM/OiBSZWNvcmQ8c3RyaW5nLCBSZWNvcmQ8c3RyaW5nLCBKc29uVmFsdWUgfCB1bmRlZmluZWQ+IHwgdW5kZWZpbmVkPjtcbiAgZGVmYXVsdENvbmZpZ3VyYXRpb24/OiBzdHJpbmc7XG4gIGJ1aWxkZXI6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgRGVmaW5pdGlvbkNvbGxlY3Rpb25MaXN0ZW5lcjxWIGV4dGVuZHMgb2JqZWN0PiA9IChcbiAgbmFtZTogc3RyaW5nLFxuICBuZXdWYWx1ZTogViB8IHVuZGVmaW5lZCxcbiAgY29sbGVjdGlvbjogRGVmaW5pdGlvbkNvbGxlY3Rpb248Vj4sXG4pID0+IHZvaWQ7XG5cbmNsYXNzIERlZmluaXRpb25Db2xsZWN0aW9uPFYgZXh0ZW5kcyBvYmplY3Q+IGltcGxlbWVudHMgUmVhZG9ubHlNYXA8c3RyaW5nLCBWPiB7XG4gIHByaXZhdGUgX21hcDogTWFwPHN0cmluZywgVj47XG5cbiAgY29uc3RydWN0b3IoaW5pdGlhbD86IFJlY29yZDxzdHJpbmcsIFY+LCBwcml2YXRlIF9saXN0ZW5lcj86IERlZmluaXRpb25Db2xsZWN0aW9uTGlzdGVuZXI8Vj4pIHtcbiAgICB0aGlzLl9tYXAgPSBuZXcgTWFwKGluaXRpYWwgJiYgT2JqZWN0LmVudHJpZXMoaW5pdGlhbCkpO1xuICB9XG5cbiAgZGVsZXRlKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5fbWFwLmRlbGV0ZShrZXkpO1xuXG4gICAgaWYgKHJlc3VsdCkge1xuICAgICAgdGhpcy5fbGlzdGVuZXI/LihrZXksIHVuZGVmaW5lZCwgdGhpcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHNldChrZXk6IHN0cmluZywgdmFsdWU6IFYpOiB0aGlzIHtcbiAgICBjb25zdCB1cGRhdGVkVmFsdWUgPSB2YWx1ZSAhPT0gdGhpcy5nZXQoa2V5KTtcblxuICAgIGlmICh1cGRhdGVkVmFsdWUpIHtcbiAgICAgIHRoaXMuX21hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICB0aGlzLl9saXN0ZW5lcj8uKGtleSwgdmFsdWUsIHRoaXMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZm9yRWFjaDxUPihcbiAgICBjYWxsYmFja2ZuOiAodmFsdWU6IFYsIGtleTogc3RyaW5nLCBtYXA6IERlZmluaXRpb25Db2xsZWN0aW9uPFY+KSA9PiB2b2lkLFxuICAgIHRoaXNBcmc/OiBULFxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9tYXAuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4gY2FsbGJhY2tmbih2YWx1ZSwga2V5LCB0aGlzKSwgdGhpc0FyZyk7XG4gIH1cblxuICBnZXQoa2V5OiBzdHJpbmcpOiBWIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fbWFwLmdldChrZXkpO1xuICB9XG5cbiAgaGFzKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX21hcC5oYXMoa2V5KTtcbiAgfVxuXG4gIGdldCBzaXplKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX21hcC5zaXplO1xuICB9XG5cbiAgW1N5bWJvbC5pdGVyYXRvcl0oKTogSXRlcmFibGVJdGVyYXRvcjxbc3RyaW5nLCBWXT4ge1xuICAgIHJldHVybiB0aGlzLl9tYXBbU3ltYm9sLml0ZXJhdG9yXSgpO1xuICB9XG5cbiAgZW50cmllcygpOiBJdGVyYWJsZUl0ZXJhdG9yPFtzdHJpbmcsIFZdPiB7XG4gICAgcmV0dXJuIHRoaXMuX21hcC5lbnRyaWVzKCk7XG4gIH1cblxuICBrZXlzKCk6IEl0ZXJhYmxlSXRlcmF0b3I8c3RyaW5nPiB7XG4gICAgcmV0dXJuIHRoaXMuX21hcC5rZXlzKCk7XG4gIH1cblxuICB2YWx1ZXMoKTogSXRlcmFibGVJdGVyYXRvcjxWPiB7XG4gICAgcmV0dXJuIHRoaXMuX21hcC52YWx1ZXMoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0pzb25WYWx1ZSh2YWx1ZTogdW5rbm93bik6IHZhbHVlIGlzIEpzb25WYWx1ZSB7XG4gIGNvbnN0IHZpc2l0ZWQgPSBuZXcgU2V0KCk7XG5cbiAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjYXNlICdvYmplY3QnOlxuICAgICAgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgdmlzaXRlZC5hZGQodmFsdWUpO1xuICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBvZiBPYmplY3QudmFsdWVzKHZhbHVlKSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2aXNpdGVkLmhhcyhwcm9wZXJ0eSkpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzSnNvblZhbHVlKHByb3BlcnR5KSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0RGVmaW5pdGlvbkNvbGxlY3Rpb24gZXh0ZW5kcyBEZWZpbml0aW9uQ29sbGVjdGlvbjxQcm9qZWN0RGVmaW5pdGlvbj4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICBpbml0aWFsPzogUmVjb3JkPHN0cmluZywgUHJvamVjdERlZmluaXRpb24+LFxuICAgIGxpc3RlbmVyPzogRGVmaW5pdGlvbkNvbGxlY3Rpb25MaXN0ZW5lcjxQcm9qZWN0RGVmaW5pdGlvbj4sXG4gICkge1xuICAgIHN1cGVyKGluaXRpYWwsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIGFkZChkZWZpbml0aW9uOiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHJvb3Q6IHN0cmluZztcbiAgICBzb3VyY2VSb290Pzogc3RyaW5nO1xuICAgIHByZWZpeD86IHN0cmluZztcbiAgICB0YXJnZXRzPzogUmVjb3JkPHN0cmluZywgVGFyZ2V0RGVmaW5pdGlvbiB8IHVuZGVmaW5lZD47XG4gICAgW2tleTogc3RyaW5nXTogdW5rbm93bjtcbiAgfSk6IFByb2plY3REZWZpbml0aW9uIHtcbiAgICBpZiAodGhpcy5oYXMoZGVmaW5pdGlvbi5uYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9qZWN0IG5hbWUgYWxyZWFkeSBleGlzdHMuJyk7XG4gICAgfVxuICAgIHRoaXMuX3ZhbGlkYXRlTmFtZShkZWZpbml0aW9uLm5hbWUpO1xuXG4gICAgY29uc3QgcHJvamVjdDogUHJvamVjdERlZmluaXRpb24gPSB7XG4gICAgICByb290OiBkZWZpbml0aW9uLnJvb3QsXG4gICAgICBwcmVmaXg6IGRlZmluaXRpb24ucHJlZml4LFxuICAgICAgc291cmNlUm9vdDogZGVmaW5pdGlvbi5zb3VyY2VSb290LFxuICAgICAgdGFyZ2V0czogbmV3IFRhcmdldERlZmluaXRpb25Db2xsZWN0aW9uKCksXG4gICAgICBleHRlbnNpb25zOiB7fSxcbiAgICB9O1xuXG4gICAgaWYgKGRlZmluaXRpb24udGFyZ2V0cykge1xuICAgICAgZm9yIChjb25zdCBbbmFtZSwgdGFyZ2V0XSBvZiBPYmplY3QuZW50cmllcyhkZWZpbml0aW9uLnRhcmdldHMpKSB7XG4gICAgICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgICBwcm9qZWN0LnRhcmdldHMuc2V0KG5hbWUsIHRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMoZGVmaW5pdGlvbikpIHtcbiAgICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgICBjYXNlICduYW1lJzpcbiAgICAgICAgY2FzZSAncm9vdCc6XG4gICAgICAgIGNhc2UgJ3NvdXJjZVJvb3QnOlxuICAgICAgICBjYXNlICdwcmVmaXgnOlxuICAgICAgICBjYXNlICd0YXJnZXRzJzpcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoaXNKc29uVmFsdWUodmFsdWUpKSB7XG4gICAgICAgICAgICBwcm9qZWN0LmV4dGVuc2lvbnNbbmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgXCIke25hbWV9XCIgbXVzdCBiZSBhIEpTT04gdmFsdWUuYCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHN1cGVyLnNldChkZWZpbml0aW9uLm5hbWUsIHByb2plY3QpO1xuXG4gICAgcmV0dXJuIHByb2plY3Q7XG4gIH1cblxuICBvdmVycmlkZSBzZXQobmFtZTogc3RyaW5nLCB2YWx1ZTogUHJvamVjdERlZmluaXRpb24pOiB0aGlzIHtcbiAgICB0aGlzLl92YWxpZGF0ZU5hbWUobmFtZSk7XG5cbiAgICBzdXBlci5zZXQobmFtZSwgdmFsdWUpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwcml2YXRlIF92YWxpZGF0ZU5hbWUobmFtZTogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCAhL14oPzpAXFx3W1xcdy4tXSpcXC8pP1xcd1tcXHcuLV0qJC8udGVzdChuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9qZWN0IG5hbWUgbXVzdCBiZSBhIHZhbGlkIG5wbSBwYWNrYWdlIG5hbWUuJyk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYXJnZXREZWZpbml0aW9uQ29sbGVjdGlvbiBleHRlbmRzIERlZmluaXRpb25Db2xsZWN0aW9uPFRhcmdldERlZmluaXRpb24+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgaW5pdGlhbD86IFJlY29yZDxzdHJpbmcsIFRhcmdldERlZmluaXRpb24+LFxuICAgIGxpc3RlbmVyPzogRGVmaW5pdGlvbkNvbGxlY3Rpb25MaXN0ZW5lcjxUYXJnZXREZWZpbml0aW9uPixcbiAgKSB7XG4gICAgc3VwZXIoaW5pdGlhbCwgbGlzdGVuZXIpO1xuICB9XG5cbiAgYWRkKFxuICAgIGRlZmluaXRpb246IHtcbiAgICAgIG5hbWU6IHN0cmluZztcbiAgICB9ICYgVGFyZ2V0RGVmaW5pdGlvbixcbiAgKTogVGFyZ2V0RGVmaW5pdGlvbiB7XG4gICAgaWYgKHRoaXMuaGFzKGRlZmluaXRpb24ubmFtZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGFyZ2V0IG5hbWUgYWxyZWFkeSBleGlzdHMuJyk7XG4gICAgfVxuICAgIHRoaXMuX3ZhbGlkYXRlTmFtZShkZWZpbml0aW9uLm5hbWUpO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0ge1xuICAgICAgYnVpbGRlcjogZGVmaW5pdGlvbi5idWlsZGVyLFxuICAgICAgb3B0aW9uczogZGVmaW5pdGlvbi5vcHRpb25zLFxuICAgICAgY29uZmlndXJhdGlvbnM6IGRlZmluaXRpb24uY29uZmlndXJhdGlvbnMsXG4gICAgICBkZWZhdWx0Q29uZmlndXJhdGlvbjogZGVmaW5pdGlvbi5kZWZhdWx0Q29uZmlndXJhdGlvbixcbiAgICB9O1xuXG4gICAgc3VwZXIuc2V0KGRlZmluaXRpb24ubmFtZSwgdGFyZ2V0KTtcblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH1cblxuICBvdmVycmlkZSBzZXQobmFtZTogc3RyaW5nLCB2YWx1ZTogVGFyZ2V0RGVmaW5pdGlvbik6IHRoaXMge1xuICAgIHRoaXMuX3ZhbGlkYXRlTmFtZShuYW1lKTtcblxuICAgIHN1cGVyLnNldChuYW1lLCB2YWx1ZSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbGlkYXRlTmFtZShuYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUYXJnZXQgbmFtZSBtdXN0IGJlIGEgc3RyaW5nLicpO1xuICAgIH1cbiAgfVxufVxuIl19