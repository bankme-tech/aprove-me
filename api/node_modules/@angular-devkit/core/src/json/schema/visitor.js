"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.visitJsonSchema = exports.visitJson = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const pointer_1 = require("./pointer");
function _getObjectSubSchema(schema, key) {
    if (typeof schema !== 'object' || schema === null) {
        return undefined;
    }
    // Is it an object schema?
    if (typeof schema.properties == 'object' || schema.type == 'object') {
        if (typeof schema.properties == 'object' &&
            typeof schema.properties[key] == 'object') {
            return schema.properties[key];
        }
        if (typeof schema.additionalProperties == 'object') {
            return schema.additionalProperties;
        }
        return undefined;
    }
    // Is it an array schema?
    if (typeof schema.items == 'object' || schema.type == 'array') {
        return typeof schema.items == 'object' ? schema.items : undefined;
    }
    return undefined;
}
function _visitJsonRecursive(json, visitor, ptr, schema, refResolver, context, root) {
    if (schema === true || schema === false) {
        // There's no schema definition, so just visit the JSON recursively.
        schema = undefined;
    }
    // eslint-disable-next-line no-prototype-builtins
    if (schema && schema.hasOwnProperty('$ref') && typeof schema['$ref'] == 'string') {
        if (refResolver) {
            const resolved = refResolver(schema['$ref'], context);
            schema = resolved.schema;
            context = resolved.context;
        }
    }
    const value = visitor(json, ptr, schema, root);
    return ((0, rxjs_1.isObservable)(value) ? value : (0, rxjs_1.of)(value)).pipe((0, operators_1.concatMap)((value) => {
        if (Array.isArray(value)) {
            return (0, rxjs_1.concat)((0, rxjs_1.from)(value).pipe((0, operators_1.mergeMap)((item, i) => {
                return _visitJsonRecursive(item, visitor, (0, pointer_1.joinJsonPointer)(ptr, '' + i), _getObjectSubSchema(schema, '' + i), refResolver, context, root || value).pipe((0, operators_1.tap)((x) => (value[i] = x)));
            }), (0, operators_1.ignoreElements)()), (0, rxjs_1.of)(value));
        }
        else if (typeof value == 'object' && value !== null) {
            return (0, rxjs_1.concat)((0, rxjs_1.from)(Object.getOwnPropertyNames(value)).pipe((0, operators_1.mergeMap)((key) => {
                return _visitJsonRecursive(value[key], visitor, (0, pointer_1.joinJsonPointer)(ptr, key), _getObjectSubSchema(schema, key), refResolver, context, root || value).pipe((0, operators_1.tap)((x) => {
                    const descriptor = Object.getOwnPropertyDescriptor(value, key);
                    if (descriptor && descriptor.writable && value[key] !== x) {
                        value[key] = x;
                    }
                }));
            }), (0, operators_1.ignoreElements)()), (0, rxjs_1.of)(value));
        }
        else {
            return (0, rxjs_1.of)(value);
        }
    }));
}
/**
 * Visit all the properties in a JSON object, allowing to transform them. It supports calling
 * properties synchronously or asynchronously (through Observables).
 * The original object can be mutated or replaced entirely. In case where it's replaced, the new
 * value is returned. When it's mutated though the original object will be changed.
 *
 * Please note it is possible to have an infinite loop here (which will result in a stack overflow)
 * if you return 2 objects that references each others (or the same object all the time).
 *
 * @param {JsonValue} json The Json value to visit.
 * @param {JsonVisitor} visitor A function that will be called on every items.
 * @param {JsonObject} schema A JSON schema to pass through to the visitor (where possible).
 * @param refResolver a function to resolve references in the schema.
 * @returns {Observable< | undefined>} The observable of the new root, if the root changed.
 */
function visitJson(json, visitor, schema, refResolver, context) {
    return _visitJsonRecursive(json, visitor, (0, pointer_1.buildJsonPointer)([]), schema, refResolver, context);
}
exports.visitJson = visitJson;
function visitJsonSchema(schema, visitor) {
    if (schema === false || schema === true) {
        // Nothing to visit.
        return;
    }
    const keywords = {
        additionalItems: true,
        items: true,
        contains: true,
        additionalProperties: true,
        propertyNames: true,
        not: true,
    };
    const arrayKeywords = {
        items: true,
        allOf: true,
        anyOf: true,
        oneOf: true,
    };
    const propsKeywords = {
        definitions: true,
        properties: true,
        patternProperties: true,
        additionalProperties: true,
        dependencies: true,
        items: true,
    };
    function _traverse(schema, jsonPtr, rootSchema, parentSchema, keyIndex) {
        if (schema && typeof schema == 'object' && !Array.isArray(schema)) {
            visitor(schema, jsonPtr, parentSchema, keyIndex);
            for (const key of Object.keys(schema)) {
                const sch = schema[key];
                if (key in propsKeywords) {
                    if (sch && typeof sch == 'object') {
                        for (const prop of Object.keys(sch)) {
                            _traverse(sch[prop], (0, pointer_1.joinJsonPointer)(jsonPtr, key, prop), rootSchema, schema, prop);
                        }
                    }
                }
                else if (key in keywords) {
                    _traverse(sch, (0, pointer_1.joinJsonPointer)(jsonPtr, key), rootSchema, schema, key);
                }
                else if (key in arrayKeywords) {
                    if (Array.isArray(sch)) {
                        for (let i = 0; i < sch.length; i++) {
                            _traverse(sch[i], (0, pointer_1.joinJsonPointer)(jsonPtr, key, '' + i), rootSchema, sch, '' + i);
                        }
                    }
                }
                else if (Array.isArray(sch)) {
                    for (let i = 0; i < sch.length; i++) {
                        _traverse(sch[i], (0, pointer_1.joinJsonPointer)(jsonPtr, key, '' + i), rootSchema, sch, '' + i);
                    }
                }
            }
        }
    }
    _traverse(schema, (0, pointer_1.buildJsonPointer)([]), schema);
}
exports.visitJsonSchema = visitJsonSchema;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlzaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2NvcmUvc3JjL2pzb24vc2NoZW1hL3Zpc2l0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7O0FBRUgsK0JBQWtGO0FBQ2xGLDhDQUEwRTtBQUcxRSx1Q0FBOEQ7QUFPOUQsU0FBUyxtQkFBbUIsQ0FBQyxNQUE4QixFQUFFLEdBQVc7SUFDdEUsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLElBQUksTUFBTSxLQUFLLElBQUksRUFBRTtRQUNqRCxPQUFPLFNBQVMsQ0FBQztLQUNsQjtJQUVELDBCQUEwQjtJQUMxQixJQUFJLE9BQU8sTUFBTSxDQUFDLFVBQVUsSUFBSSxRQUFRLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxRQUFRLEVBQUU7UUFDbkUsSUFDRSxPQUFPLE1BQU0sQ0FBQyxVQUFVLElBQUksUUFBUTtZQUNwQyxPQUFRLE1BQU0sQ0FBQyxVQUF5QixDQUFDLEdBQUcsQ0FBQyxJQUFJLFFBQVEsRUFDekQ7WUFDQSxPQUFRLE1BQU0sQ0FBQyxVQUF5QixDQUFDLEdBQUcsQ0FBZSxDQUFDO1NBQzdEO1FBQ0QsSUFBSSxPQUFPLE1BQU0sQ0FBQyxvQkFBb0IsSUFBSSxRQUFRLEVBQUU7WUFDbEQsT0FBTyxNQUFNLENBQUMsb0JBQWtDLENBQUM7U0FDbEQ7UUFFRCxPQUFPLFNBQVMsQ0FBQztLQUNsQjtJQUVELHlCQUF5QjtJQUN6QixJQUFJLE9BQU8sTUFBTSxDQUFDLEtBQUssSUFBSSxRQUFRLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxPQUFPLEVBQUU7UUFDN0QsT0FBTyxPQUFPLE1BQU0sQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLENBQUMsQ0FBRSxNQUFNLENBQUMsS0FBb0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0tBQ25GO0lBRUQsT0FBTyxT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LENBQUMsQ0FBQztpQkFDdEY7cUJBQU0sSUFBSSxHQUFHLElBQUksYUFBYSxFQUFFO29CQUMvQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ3RCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOzRCQUNuQyxTQUFTLENBQ1AsR0FBRyxDQUFDLENBQUMsQ0FBYyxFQUNuQixJQUFBLHlCQUFlLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQ3JDLFVBQVUsRUFDVixHQUFHLEVBQ0gsRUFBRSxHQUFHLENBQUMsQ0FDUCxDQUFDO3lCQUNIO3FCQUNGO2lCQUNGO3FCQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDN0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ25DLFNBQVMsQ0FDUCxHQUFHLENBQUMsQ0FBQyxDQUFjLEVBQ25CLElBQUEseUJBQWUsRUFBQyxPQUFPLEVBQUUsR0FBRyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFDckMsVUFBVSxFQUNWLEdBQUcsRUFDSCxFQUFFLEdBQUcsQ0FBQyxDQUNQLENBQUM7cUJBQ0g7aUJBQ0Y7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBQSwwQkFBZ0IsRUFBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNsRCxDQUFDO0FBckZELDBDQXFGQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBjb25jYXQsIGZyb20sIGlzT2JzZXJ2YWJsZSwgb2YgYXMgb2JzZXJ2YWJsZU9mIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb25jYXRNYXAsIGlnbm9yZUVsZW1lbnRzLCBtZXJnZU1hcCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSnNvbkFycmF5LCBKc29uT2JqZWN0LCBKc29uVmFsdWUgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBKc29uUG9pbnRlciwgSnNvblNjaGVtYVZpc2l0b3IsIEpzb25WaXNpdG9yIH0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgYnVpbGRKc29uUG9pbnRlciwgam9pbkpzb25Qb2ludGVyIH0gZnJvbSAnLi9wb2ludGVyJztcbmltcG9ydCB7IEpzb25TY2hlbWEgfSBmcm9tICcuL3NjaGVtYSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVmZXJlbmNlUmVzb2x2ZXI8Q29udGV4dFQ+IHtcbiAgKHJlZjogc3RyaW5nLCBjb250ZXh0PzogQ29udGV4dFQpOiB7IGNvbnRleHQ/OiBDb250ZXh0VDsgc2NoZW1hPzogSnNvbk9iamVjdCB9O1xufVxuXG5mdW5jdGlvbiBfZ2V0T2JqZWN0U3ViU2NoZW1hKHNjaGVtYTogSnNvblNjaGVtYSB8IHVuZGVmaW5lZCwga2V5OiBzdHJpbmcpOiBKc29uT2JqZWN0IHwgdW5kZWZpbmVkIHtcbiAgaWYgKHR5cGVvZiBzY2hlbWEgIT09ICdvYmplY3QnIHx8IHNjaGVtYSA9PT0gbnVsbCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBJcyBpdCBhbiBvYmplY3Qgc2NoZW1hP1xuICBpZiAodHlwZW9mIHNjaGVtYS5wcm9wZXJ0aWVzID09ICdvYmplY3QnIHx8IHNjaGVtYS50eXBlID09ICdvYmplY3QnKSB7XG4gICAgaWYgKFxuICAgICAgdHlwZW9mIHNjaGVtYS5wcm9wZXJ0aWVzID09ICdvYmplY3QnICYmXG4gICAgICB0eXBlb2YgKHNjaGVtYS5wcm9wZXJ0aWVzIGFzIEpzb25PYmplY3QpW2tleV0gPT0gJ29iamVjdCdcbiAgICApIHtcbiAgICAgIHJldHVybiAoc2NoZW1hLnByb3BlcnRpZXMgYXMgSnNvbk9iamVjdClba2V5XSBhcyBKc29uT2JqZWN0O1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyA9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHNjaGVtYS5hZGRpdGlvbmFsUHJvcGVydGllcyBhcyBKc29uT2JqZWN0O1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBJcyBpdCBhbiBhcnJheSBzY2hlbWE/XG4gIGlmICh0eXBlb2Ygc2NoZW1hLml0ZW1zID09ICdvYmplY3QnIHx8IHNjaGVtYS50eXBlID09ICdhcnJheScpIHtcbiAgICByZXR1cm4gdHlwZW9mIHNjaGVtYS5pdGVtcyA9PSAnb2JqZWN0JyA/IChzY2hlbWEuaXRlbXMgYXMgSnNvbk9iamVjdCkgOiB1bmRlZmluZWQ7XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBfdmlzaXRKc29uUmVjdXJzaXZlPENvbnRleHRUPihcbiAganNvbjogSnNvblZhbHVlLFxuICB2aXNpdG9yOiBKc29uVmlzaXRvcixcbiAgcHRyOiBKc29uUG9pbnRlcixcbiAgc2NoZW1hPzogSnNvblNjaGVtYSxcbiAgcmVmUmVzb2x2ZXI/OiBSZWZlcmVuY2VSZXNvbHZlcjxDb250ZXh0VD4sXG4gIGNvbnRleHQ/OiBDb250ZXh0VCxcbiAgcm9vdD86IEpzb25PYmplY3QgfCBKc29uQXJyYXksXG4pOiBPYnNlcnZhYmxlPEpzb25WYWx1ZT4ge1xuICBpZiAoc2NoZW1hID09PSB0cnVlIHx8IHNjaGVtYSA9PT0gZmFsc2UpIHtcbiAgICAvLyBUaGVyZSdzIG5vIHNjaGVtYSBkZWZpbml0aW9uLCBzbyBqdXN0IHZpc2l0IHRoZSBKU09OIHJlY3Vyc2l2ZWx5LlxuICAgIHNjaGVtYSA9IHVuZGVmaW5lZDtcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcHJvdG90eXBlLWJ1aWx0aW5zXG4gIGlmIChzY2hlbWEgJiYgc2NoZW1hLmhhc093blByb3BlcnR5KCckcmVmJykgJiYgdHlwZW9mIHNjaGVtYVsnJHJlZiddID09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHJlZlJlc29sdmVyKSB7XG4gICAgICBjb25zdCByZXNvbHZlZCA9IHJlZlJlc29sdmVyKHNjaGVtYVsnJHJlZiddLCBjb250ZXh0KTtcbiAgICAgIHNjaGVtYSA9IHJlc29sdmVkLnNjaGVtYTtcbiAgICAgIGNvbnRleHQgPSByZXNvbHZlZC5jb250ZXh0O1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHZhbHVlID0gdmlzaXRvcihqc29uLCBwdHIsIHNjaGVtYSBhcyBKc29uT2JqZWN0LCByb290KTtcblxuICByZXR1cm4gKGlzT2JzZXJ2YWJsZTxKc29uVmFsdWU+KHZhbHVlKSA/IHZhbHVlIDogb2JzZXJ2YWJsZU9mKHZhbHVlKSkucGlwZShcbiAgICBjb25jYXRNYXAoKHZhbHVlKSA9PiB7XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIGNvbmNhdChcbiAgICAgICAgICBmcm9tKHZhbHVlKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKGl0ZW0sIGkpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIF92aXNpdEpzb25SZWN1cnNpdmUoXG4gICAgICAgICAgICAgICAgaXRlbSxcbiAgICAgICAgICAgICAgICB2aXNpdG9yLFxuICAgICAgICAgICAgICAgIGpvaW5Kc29uUG9pbnRlcihwdHIsICcnICsgaSksXG4gICAgICAgICAgICAgICAgX2dldE9iamVjdFN1YlNjaGVtYShzY2hlbWEsICcnICsgaSksXG4gICAgICAgICAgICAgICAgcmVmUmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICAgICAgICByb290IHx8IHZhbHVlLFxuICAgICAgICAgICAgICApLnBpcGUodGFwPEpzb25WYWx1ZT4oKHgpID0+ICh2YWx1ZVtpXSA9IHgpKSk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGlnbm9yZUVsZW1lbnRzKCksXG4gICAgICAgICAgKSxcbiAgICAgICAgICBvYnNlcnZhYmxlT2Y8SnNvblZhbHVlPih2YWx1ZSksXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gY29uY2F0KFxuICAgICAgICAgIGZyb20oT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsdWUpKS5waXBlKFxuICAgICAgICAgICAgbWVyZ2VNYXAoKGtleSkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gX3Zpc2l0SnNvblJlY3Vyc2l2ZShcbiAgICAgICAgICAgICAgICB2YWx1ZVtrZXldLFxuICAgICAgICAgICAgICAgIHZpc2l0b3IsXG4gICAgICAgICAgICAgICAgam9pbkpzb25Qb2ludGVyKHB0ciwga2V5KSxcbiAgICAgICAgICAgICAgICBfZ2V0T2JqZWN0U3ViU2NoZW1hKHNjaGVtYSwga2V5KSxcbiAgICAgICAgICAgICAgICByZWZSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgICAgIHJvb3QgfHwgdmFsdWUsXG4gICAgICAgICAgICAgICkucGlwZShcbiAgICAgICAgICAgICAgICB0YXA8SnNvblZhbHVlPigoeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgZGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodmFsdWUsIGtleSk7XG4gICAgICAgICAgICAgICAgICBpZiAoZGVzY3JpcHRvciAmJiBkZXNjcmlwdG9yLndyaXRhYmxlICYmIHZhbHVlW2tleV0gIT09IHgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVba2V5XSA9IHg7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGlnbm9yZUVsZW1lbnRzKCksXG4gICAgICAgICAgKSxcbiAgICAgICAgICBvYnNlcnZhYmxlT2YodmFsdWUpLFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9ic2VydmFibGVPZih2YWx1ZSk7XG4gICAgICB9XG4gICAgfSksXG4gICk7XG59XG5cbi8qKlxuICogVmlzaXQgYWxsIHRoZSBwcm9wZXJ0aWVzIGluIGEgSlNPTiBvYmplY3QsIGFsbG93aW5nIHRvIHRyYW5zZm9ybSB0aGVtLiBJdCBzdXBwb3J0cyBjYWxsaW5nXG4gKiBwcm9wZXJ0aWVzIHN5bmNocm9ub3VzbHkgb3IgYXN5bmNocm9ub3VzbHkgKHRocm91Z2ggT2JzZXJ2YWJsZXMpLlxuICogVGhlIG9yaWdpbmFsIG9iamVjdCBjYW4gYmUgbXV0YXRlZCBvciByZXBsYWNlZCBlbnRpcmVseS4gSW4gY2FzZSB3aGVyZSBpdCdzIHJlcGxhY2VkLCB0aGUgbmV3XG4gKiB2YWx1ZSBpcyByZXR1cm5lZC4gV2hlbiBpdCdzIG11dGF0ZWQgdGhvdWdoIHRoZSBvcmlnaW5hbCBvYmplY3Qgd2lsbCBiZSBjaGFuZ2VkLlxuICpcbiAqIFBsZWFzZSBub3RlIGl0IGlzIHBvc3NpYmxlIHRvIGhhdmUgYW4gaW5maW5pdGUgbG9vcCBoZXJlICh3aGljaCB3aWxsIHJlc3VsdCBpbiBhIHN0YWNrIG92ZXJmbG93KVxuICogaWYgeW91IHJldHVybiAyIG9iamVjdHMgdGhhdCByZWZlcmVuY2VzIGVhY2ggb3RoZXJzIChvciB0aGUgc2FtZSBvYmplY3QgYWxsIHRoZSB0aW1lKS5cbiAqXG4gKiBAcGFyYW0ge0pzb25WYWx1ZX0ganNvbiBUaGUgSnNvbiB2YWx1ZSB0byB2aXNpdC5cbiAqIEBwYXJhbSB7SnNvblZpc2l0b3J9IHZpc2l0b3IgQSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIG9uIGV2ZXJ5IGl0ZW1zLlxuICogQHBhcmFtIHtKc29uT2JqZWN0fSBzY2hlbWEgQSBKU09OIHNjaGVtYSB0byBwYXNzIHRocm91Z2ggdG8gdGhlIHZpc2l0b3IgKHdoZXJlIHBvc3NpYmxlKS5cbiAqIEBwYXJhbSByZWZSZXNvbHZlciBhIGZ1bmN0aW9uIHRvIHJlc29sdmUgcmVmZXJlbmNlcyBpbiB0aGUgc2NoZW1hLlxuICogQHJldHVybnMge09ic2VydmFibGU8IHwgdW5kZWZpbmVkPn0gVGhlIG9ic2VydmFibGUgb2YgdGhlIG5ldyByb290LCBpZiB0aGUgcm9vdCBjaGFuZ2VkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdmlzaXRKc29uPENvbnRleHRUPihcbiAganNvbjogSnNvblZhbHVlLFxuICB2aXNpdG9yOiBKc29uVmlzaXRvcixcbiAgc2NoZW1hPzogSnNvblNjaGVtYSxcbiAgcmVmUmVzb2x2ZXI/OiBSZWZlcmVuY2VSZXNvbHZlcjxDb250ZXh0VD4sXG4gIGNvbnRleHQ/OiBDb250ZXh0VCxcbik6IE9ic2VydmFibGU8SnNvblZhbHVlPiB7XG4gIHJldHVybiBfdmlzaXRKc29uUmVjdXJzaXZlKGpzb24sIHZpc2l0b3IsIGJ1aWxkSnNvblBvaW50ZXIoW10pLCBzY2hlbWEsIHJlZlJlc29sdmVyLCBjb250ZXh0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZpc2l0SnNvblNjaGVtYShzY2hlbWE6IEpzb25TY2hlbWEsIHZpc2l0b3I6IEpzb25TY2hlbWFWaXNpdG9yKSB7XG4gIGlmIChzY2hlbWEgPT09IGZhbHNlIHx8IHNjaGVtYSA9PT0gdHJ1ZSkge1xuICAgIC8vIE5vdGhpbmcgdG8gdmlzaXQuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qga2V5d29yZHMgPSB7XG4gICAgYWRkaXRpb25hbEl0ZW1zOiB0cnVlLFxuICAgIGl0ZW1zOiB0cnVlLFxuICAgIGNvbnRhaW5zOiB0cnVlLFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB0cnVlLFxuICAgIHByb3BlcnR5TmFtZXM6IHRydWUsXG4gICAgbm90OiB0cnVlLFxuICB9O1xuXG4gIGNvbnN0IGFycmF5S2V5d29yZHMgPSB7XG4gICAgaXRlbXM6IHRydWUsXG4gICAgYWxsT2Y6IHRydWUsXG4gICAgYW55T2Y6IHRydWUsXG4gICAgb25lT2Y6IHRydWUsXG4gIH07XG5cbiAgY29uc3QgcHJvcHNLZXl3b3JkcyA9IHtcbiAgICBkZWZpbml0aW9uczogdHJ1ZSxcbiAgICBwcm9wZXJ0aWVzOiB0cnVlLFxuICAgIHBhdHRlcm5Qcm9wZXJ0aWVzOiB0cnVlLFxuICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiB0cnVlLFxuICAgIGRlcGVuZGVuY2llczogdHJ1ZSxcbiAgICBpdGVtczogdHJ1ZSxcbiAgfTtcblxuICBmdW5jdGlvbiBfdHJhdmVyc2UoXG4gICAgc2NoZW1hOiBKc29uT2JqZWN0IHwgSnNvbkFycmF5LFxuICAgIGpzb25QdHI6IEpzb25Qb2ludGVyLFxuICAgIHJvb3RTY2hlbWE6IEpzb25PYmplY3QsXG4gICAgcGFyZW50U2NoZW1hPzogSnNvbk9iamVjdCB8IEpzb25BcnJheSxcbiAgICBrZXlJbmRleD86IHN0cmluZyxcbiAgKSB7XG4gICAgaWYgKHNjaGVtYSAmJiB0eXBlb2Ygc2NoZW1hID09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHNjaGVtYSkpIHtcbiAgICAgIHZpc2l0b3Ioc2NoZW1hLCBqc29uUHRyLCBwYXJlbnRTY2hlbWEsIGtleUluZGV4KTtcblxuICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoc2NoZW1hKSkge1xuICAgICAgICBjb25zdCBzY2ggPSBzY2hlbWFba2V5XTtcbiAgICAgICAgaWYgKGtleSBpbiBwcm9wc0tleXdvcmRzKSB7XG4gICAgICAgICAgaWYgKHNjaCAmJiB0eXBlb2Ygc2NoID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByb3Agb2YgT2JqZWN0LmtleXMoc2NoKSkge1xuICAgICAgICAgICAgICBfdHJhdmVyc2UoXG4gICAgICAgICAgICAgICAgKHNjaCBhcyBKc29uT2JqZWN0KVtwcm9wXSBhcyBKc29uT2JqZWN0LFxuICAgICAgICAgICAgICAgIGpvaW5Kc29uUG9pbnRlcihqc29uUHRyLCBrZXksIHByb3ApLFxuICAgICAgICAgICAgICAgIHJvb3RTY2hlbWEsXG4gICAgICAgICAgICAgICAgc2NoZW1hLFxuICAgICAgICAgICAgICAgIHByb3AsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGtleSBpbiBrZXl3b3Jkcykge1xuICAgICAgICAgIF90cmF2ZXJzZShzY2ggYXMgSnNvbk9iamVjdCwgam9pbkpzb25Qb2ludGVyKGpzb25QdHIsIGtleSksIHJvb3RTY2hlbWEsIHNjaGVtYSwga2V5KTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkgaW4gYXJyYXlLZXl3b3Jkcykge1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHNjaCkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2NoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIF90cmF2ZXJzZShcbiAgICAgICAgICAgICAgICBzY2hbaV0gYXMgSnNvbkFycmF5LFxuICAgICAgICAgICAgICAgIGpvaW5Kc29uUG9pbnRlcihqc29uUHRyLCBrZXksICcnICsgaSksXG4gICAgICAgICAgICAgICAgcm9vdFNjaGVtYSxcbiAgICAgICAgICAgICAgICBzY2gsXG4gICAgICAgICAgICAgICAgJycgKyBpLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHNjaCkpIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNjaC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgX3RyYXZlcnNlKFxuICAgICAgICAgICAgICBzY2hbaV0gYXMgSnNvbkFycmF5LFxuICAgICAgICAgICAgICBqb2luSnNvblBvaW50ZXIoanNvblB0ciwga2V5LCAnJyArIGkpLFxuICAgICAgICAgICAgICByb290U2NoZW1hLFxuICAgICAgICAgICAgICBzY2gsXG4gICAgICAgICAgICAgICcnICsgaSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3RyYXZlcnNlKHNjaGVtYSwgYnVpbGRKc29uUG9pbnRlcihbXSksIHNjaGVtYSk7XG59XG4iXX0=