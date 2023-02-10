"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUndefinedDefaults = void 0;
const utils_1 = require("../utils");
const utility_1 = require("./utility");
function addUndefinedDefaults(value, _pointer, schema) {
    if (typeof schema === 'boolean' || schema === undefined) {
        return value;
    }
    value !== null && value !== void 0 ? value : (value = schema.default);
    const types = (0, utility_1.getTypesOfSchema)(schema);
    if (types.size === 0) {
        return value;
    }
    let type;
    if (types.size === 1) {
        // only one potential type
        type = Array.from(types)[0];
    }
    else if (types.size === 2 && types.has('array') && types.has('object')) {
        // need to create one of them and array is simpler
        type = 'array';
    }
    else if (schema.properties && types.has('object')) {
        // assume object
        type = 'object';
    }
    else if (schema.items && types.has('array')) {
        // assume array
        type = 'array';
    }
    else {
        // anything else needs to be checked by the consumer anyway
        return value;
    }
    if (type === 'array') {
        return value == undefined ? [] : value;
    }
    if (type === 'object') {
        let newValue;
        if (value == undefined) {
            newValue = {};
        }
        else if ((0, utils_1.isJsonObject)(value)) {
            newValue = value;
        }
        else {
            return value;
        }
        if (!(0, utils_1.isJsonObject)(schema.properties)) {
            return newValue;
        }
        for (const [propName, schemaObject] of Object.entries(schema.properties)) {
            if (propName === '$schema' || !(0, utils_1.isJsonObject)(schemaObject)) {
                continue;
            }
            const value = newValue[propName];
            if (value === undefined) {
                newValue[propName] = schemaObject.default;
            }
            else if ((0, utils_1.isJsonObject)(value)) {
                // Basic support for oneOf and anyOf.
                const propertySchemas = schemaObject.oneOf || schemaObject.anyOf;
                const allProperties = Object.keys(value);
                // Locate a schema which declares all the properties that the object contains.
                const adjustedSchema = (0, utils_1.isJsonArray)(propertySchemas) &&
                    propertySchemas.find((s) => {
                        if (!(0, utils_1.isJsonObject)(s)) {
                            return false;
                        }
                        const schemaType = (0, utility_1.getTypesOfSchema)(s);
                        if (schemaType.size === 1 && schemaType.has('object') && (0, utils_1.isJsonObject)(s.properties)) {
                            const properties = Object.keys(s.properties);
                            return allProperties.every((key) => properties.includes(key));
                        }
                        return false;
                    });
                if (adjustedSchema && (0, utils_1.isJsonObject)(adjustedSchema)) {
                    newValue[propName] = addUndefinedDefaults(value, _pointer, adjustedSchema);
                }
            }
        }
        return newValue;
    }
    return value;
}
exports.addUndefinedDefaults = addUndefinedDefaults;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3Jtcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2NvcmUvc3JjL2pzb24vc2NoZW1hL3RyYW5zZm9ybXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7O0FBRUgsb0NBQTRFO0FBRzVFLHVDQUE2QztBQUU3QyxTQUFnQixvQkFBb0IsQ0FDbEMsS0FBZ0IsRUFDaEIsUUFBcUIsRUFDckIsTUFBbUI7SUFFbkIsSUFBSSxPQUFPLE1BQU0sS0FBSyxTQUFTLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtRQUN2RCxPQUFPLEtBQUssQ0FBQztLQUNkO0lBRUQsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLElBQUwsS0FBSyxHQUFLLE1BQU0sQ0FBQyxPQUFPLEVBQUM7SUFFekIsTUFBTSxLQUFLLEdBQUcsSUFBQSwwQkFBZ0IsRUFBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO1FBQ3BCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7SUFFRCxJQUFJLElBQUksQ0FBQztJQUNULElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUU7UUFDcEIsMEJBQTBCO1FBQzFCLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzdCO1NBQU0sSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDeEUsa0RBQWtEO1FBQ2xELElBQUksR0FBRyxPQUFPLENBQUM7S0FDaEI7U0FBTSxJQUFJLE1BQU0sQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMs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Q0Y7U0FDRjtRQUVELE9BQU8sUUFBUSxDQUFDO0tBQ2pCO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDO0FBNUZELG9EQTRGQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBKc29uT2JqZWN0LCBKc29uVmFsdWUsIGlzSnNvbkFycmF5LCBpc0pzb25PYmplY3QgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBKc29uUG9pbnRlciB9IGZyb20gJy4vaW50ZXJmYWNlJztcbmltcG9ydCB7IEpzb25TY2hlbWEgfSBmcm9tICcuL3NjaGVtYSc7XG5pbXBvcnQgeyBnZXRUeXBlc09mU2NoZW1hIH0gZnJvbSAnLi91dGlsaXR5JztcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFVuZGVmaW5lZERlZmF1bHRzKFxuICB2YWx1ZTogSnNvblZhbHVlLFxuICBfcG9pbnRlcjogSnNvblBvaW50ZXIsXG4gIHNjaGVtYT86IEpzb25TY2hlbWEsXG4pOiBKc29uVmFsdWUge1xuICBpZiAodHlwZW9mIHNjaGVtYSA9PT0gJ2Jvb2xlYW4nIHx8IHNjaGVtYSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgdmFsdWUgPz89IHNjaGVtYS5kZWZhdWx0O1xuXG4gIGNvbnN0IHR5cGVzID0gZ2V0VHlwZXNPZlNjaGVtYShzY2hlbWEpO1xuICBpZiAodHlwZXMuc2l6ZSA9PT0gMCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGxldCB0eXBlO1xuICBpZiAodHlwZXMuc2l6ZSA9PT0gMSkge1xuICAgIC8vIG9ubHkgb25lIHBvdGVudGlhbCB0eXBlXG4gICAgdHlwZSA9IEFycmF5LmZyb20odHlwZXMpWzBdO1xuICB9IGVsc2UgaWYgKHR5cGVzLnNpemUgPT09IDIgJiYgdHlwZXMuaGFzKCdhcnJheScpICYmIHR5cGVzLmhhcygnb2JqZWN0JykpIHtcbiAgICAvLyBuZWVkIHRvIGNyZWF0ZSBvbmUgb2YgdGhlbSBhbmQgYXJyYXkgaXMgc2ltcGxlclxuICAgIHR5cGUgPSAnYXJyYXknO1xuICB9IGVsc2UgaWYgKHNjaGVtYS5wcm9wZXJ0aWVzICYmIHR5cGVzLmhhcygnb2JqZWN0JykpIHtcbiAgICAvLyBhc3N1bWUgb2JqZWN0XG4gICAgdHlwZSA9ICdvYmplY3QnO1xuICB9IGVsc2UgaWYgKHNjaGVtYS5pdGVtcyAmJiB0eXBlcy5oYXMoJ2FycmF5JykpIHtcbiAgICAvLyBhc3N1bWUgYXJyYXlcbiAgICB0eXBlID0gJ2FycmF5JztcbiAgfSBlbHNlIHtcbiAgICAvLyBhbnl0aGluZyBlbHNlIG5lZWRzIHRvIGJlIGNoZWNrZWQgYnkgdGhlIGNvbnN1bWVyIGFueXdheVxuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuXG4gIGlmICh0eXBlID09PSAnYXJyYXknKSB7XG4gICAgcmV0dXJuIHZhbHVlID09IHVuZGVmaW5lZCA/IFtdIDogdmFsdWU7XG4gIH1cblxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBsZXQgbmV3VmFsdWU7XG4gICAgaWYgKHZhbHVlID09IHVuZGVmaW5lZCkge1xuICAgICAgbmV3VmFsdWUgPSB7fSBhcyBKc29uT2JqZWN0O1xuICAgIH0gZWxzZSBpZiAoaXNKc29uT2JqZWN0KHZhbHVlKSkge1xuICAgICAgbmV3VmFsdWUgPSB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGlmICghaXNKc29uT2JqZWN0KHNjaGVtYS5wcm9wZXJ0aWVzKSkge1xuICAgICAgcmV0dXJuIG5ld1ZhbHVlO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgW3Byb3BOYW1lLCBzY2hlbWFPYmplY3RdIG9mIE9iamVjdC5lbnRyaWVzKHNjaGVtYS5wcm9wZXJ0aWVzKSkge1xuICAgICAgaWYgKHByb3BOYW1lID09PSAnJHNjaGVtYScgfHwgIWlzSnNvbk9iamVjdChzY2hlbWFPYmplY3QpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB2YWx1ZSA9IG5ld1ZhbHVlW3Byb3BOYW1lXTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5ld1ZhbHVlW3Byb3BOYW1lXSA9IHNjaGVtYU9iamVjdC5kZWZhdWx0O1xuICAgICAgfSBlbHNlIGlmIChpc0pzb25PYmplY3QodmFsdWUpKSB7XG4gICAgICAgIC8vIEJhc2ljIHN1cHBvcnQgZm9yIG9uZU9mIGFuZCBhbnlPZi5cbiAgICAgICAgY29uc3QgcHJvcGVydHlTY2hlbWFzID0gc2NoZW1hT2JqZWN0Lm9uZU9mIHx8IHNjaGVtYU9iamVjdC5hbnlPZjtcbiAgICAgICAgY29uc3QgYWxsUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgICAgICAgLy8gTG9jYXRlIGEgc2NoZW1hIHdoaWNoIGRlY2xhcmVzIGFsbCB0aGUgcHJvcGVydGllcyB0aGF0IHRoZSBvYmplY3QgY29udGFpbnMuXG4gICAgICAgIGNvbnN0IGFkanVzdGVkU2NoZW1hID1cbiAgICAgICAgICBpc0pzb25BcnJheShwcm9wZXJ0eVNjaGVtYXMpICYmXG4gICAgICAgICAgcHJvcGVydHlTY2hlbWFzLmZpbmQoKHMpID0+IHtcbiAgICAgICAgICAgIGlmICghaXNKc29uT2JqZWN0KHMpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3Qgc2NoZW1hVHlwZSA9IGdldFR5cGVzT2ZTY2hlbWEocyk7XG4gICAgICAgICAgICBpZiAoc2NoZW1hVHlwZS5zaXplID09PSAxICYmIHNjaGVtYVR5cGUuaGFzKCdvYmplY3QnKSAmJiBpc0pzb25PYmplY3Qocy5wcm9wZXJ0aWVzKSkge1xuICAgICAgICAgICAgICBjb25zdCBwcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMocy5wcm9wZXJ0aWVzKTtcblxuICAgICAgICAgICAgICByZXR1cm4gYWxsUHJvcGVydGllcy5ldmVyeSgoa2V5KSA9PiBwcm9wZXJ0aWVzLmluY2x1ZGVzKGtleSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKGFkanVzdGVkU2NoZW1hICYmIGlzSnNvbk9iamVjdChhZGp1c3RlZFNjaGVtYSkpIHtcbiAgICAgICAgICBuZXdWYWx1ZVtwcm9wTmFtZV0gPSBhZGRVbmRlZmluZWREZWZhdWx0cyh2YWx1ZSwgX3BvaW50ZXIsIGFkanVzdGVkU2NoZW1hKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXdWYWx1ZTtcbiAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn1cbiJdfQ==