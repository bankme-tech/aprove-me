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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreSchemaRegistry = exports.SchemaValidationException = void 0;
const ajv_1 = __importDefault(require("ajv"));
const ajv_formats_1 = __importDefault(require("ajv-formats"));
const http = __importStar(require("http"));
const https = __importStar(require("https"));
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const Url = __importStar(require("url"));
const exception_1 = require("../../exception");
const utils_1 = require("../../utils");
const utils_2 = require("../utils");
const utility_1 = require("./utility");
const visitor_1 = require("./visitor");
class SchemaValidationException extends exception_1.BaseException {
    constructor(errors, baseMessage = 'Schema validation failed with the following errors:') {
        if (!errors || errors.length === 0) {
            super('Schema validation failed.');
            this.errors = [];
            return;
        }
        const messages = SchemaValidationException.createMessages(errors);
        super(`${baseMessage}\n  ${messages.join('\n  ')}`);
        this.errors = errors;
    }
    static createMessages(errors) {
        if (!errors || errors.length === 0) {
            return [];
        }
        const messages = errors.map((err) => {
            var _a;
            let message = `Data path ${JSON.stringify(err.instancePath)} ${err.message}`;
            if (err.params) {
                switch (err.keyword) {
                    case 'additionalProperties':
                        message += `(${err.params.additionalProperty})`;
                        break;
                    case 'enum':
                        message += `. Allowed values are: ${(_a = err.params.allowedValues) === null || _a === void 0 ? void 0 : _a.map((v) => `"${v}"`).join(', ')}`;
                        break;
                }
            }
            return message + '.';
        });
        return messages;
    }
}
exports.SchemaValidationException = SchemaValidationException;
class CoreSchemaRegistry {
    constructor(formats = []) {
        this._uriCache = new Map();
        this._uriHandlers = new Set();
        this._pre = new utils_1.PartiallyOrderedSet();
        this._post = new utils_1.PartiallyOrderedSet();
        this._smartDefaultKeyword = false;
        this._sourceMap = new Map();
        this._ajv = new ajv_1.default({
            strict: false,
            loadSchema: (uri) => this._fetch(uri),
            passContext: true,
        });
        (0, ajv_formats_1.default)(this._ajv);
        for (const format of formats) {
            this.addFormat(format);
        }
    }
    async _fetch(uri) {
        const maybeSchema = this._uriCache.get(uri);
        if (maybeSchema) {
            return maybeSchema;
        }
        // Try all handlers, one after the other.
        for (const handler of this._uriHandlers) {
            let handlerResult = handler(uri);
            if (handlerResult === null || handlerResult === undefined) {
                continue;
            }
            if ((0, rxjs_1.isObservable)(handlerResult)) {
                handlerResult = handlerResult.toPromise();
            }
            const value = await handlerResult;
            this._uriCache.set(uri, value);
            return value;
        }
        // If none are found, handle using http client.
        return new Promise((resolve, reject) => {
            const url = new Url.URL(uri);
            const client = url.protocol === 'https:' ? https : http;
            client.get(url, (res) => {
                if (!res.statusCode || res.statusCode >= 300) {
                    // Consume the rest of the data to free memory.
                    res.resume();
                    reject(new Error(`Request failed. Status Code: ${res.statusCode}`));
                }
                else {
                    res.setEncoding('utf8');
                    let data = '';
                    res.on('data', (chunk) => {
                        data += chunk;
                    });
                    res.on('end', () => {
                        try {
                            const json = JSON.parse(data);
                            this._uriCache.set(uri, json);
                            resolve(json);
                        }
                        catch (err) {
                            reject(err);
                        }
                    });
                }
            });
        });
    }
    /**
     * Add a transformation step before the validation of any Json.
     * @param {JsonVisitor} visitor The visitor to transform every value.
     * @param {JsonVisitor[]} deps A list of other visitors to run before.
     */
    addPreTransform(visitor, deps) {
        this._pre.add(visitor, deps);
    }
    /**
     * Add a transformation step after the validation of any Json. The JSON will not be validated
     * after the POST, so if transformations are not compatible with the Schema it will not result
     * in an error.
     * @param {JsonVisitor} visitor The visitor to transform every value.
     * @param {JsonVisitor[]} deps A list of other visitors to run before.
     */
    addPostTransform(visitor, deps) {
        this._post.add(visitor, deps);
    }
    _resolver(ref, validate) {
        if (!validate || !ref) {
            return {};
        }
        const schema = validate.schemaEnv.root.schema;
        const id = typeof schema === 'object' ? schema.$id : null;
        let fullReference = ref;
        if (typeof id === 'string') {
            fullReference = Url.resolve(id, ref);
            if (ref.startsWith('#')) {
                fullReference = id + fullReference;
            }
        }
        const resolvedSchema = this._ajv.getSchema(fullReference);
        return {
            context: resolvedSchema === null || resolvedSchema === void 0 ? void 0 : resolvedSchema.schemaEnv.validate,
            schema: resolvedSchema === null || resolvedSchema === void 0 ? void 0 : resolvedSchema.schema,
        };
    }
    /**
     * Flatten the Schema, resolving and replacing all the refs. Makes it into a synchronous schema
     * that is also easier to traverse. Does not cache the result.
     *
     * @param schema The schema or URI to flatten.
     * @returns An Observable of the flattened schema object.
     * @deprecated since 11.2 without replacement.
     * Producing a flatten schema document does not in all cases produce a schema with identical behavior to the original.
     * See: https://json-schema.org/draft/2019-09/json-schema-core.html#rfc.appendix.B.2
     */
    flatten(schema) {
        return (0, rxjs_1.from)(this._flatten(schema));
    }
    async _flatten(schema) {
        this._ajv.removeSchema(schema);
        this._currentCompilationSchemaInfo = undefined;
        const validate = await this._ajv.compileAsync(schema);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this;
        function visitor(current, pointer, parentSchema, index) {
            if (current &&
                parentSchema &&
                index &&
                (0, utils_2.isJsonObject)(current) &&
                Object.prototype.hasOwnProperty.call(current, '$ref') &&
                typeof current['$ref'] == 'string') {
                const resolved = self._resolver(current['$ref'], validate);
                if (resolved.schema) {
                    parentSchema[index] = resolved.schema;
                }
            }
        }
        const schemaCopy = (0, utils_1.deepCopy)(validate.schema);
        (0, visitor_1.visitJsonSchema)(schemaCopy, visitor);
        return schemaCopy;
    }
    /**
     * Compile and return a validation function for the Schema.
     *
     * @param schema The schema to validate. If a string, will fetch the schema before compiling it
     * (using schema as a URI).
     * @returns An Observable of the Validation function.
     */
    compile(schema) {
        return (0, rxjs_1.from)(this._compile(schema)).pipe((0, operators_1.map)((validate) => (value, options) => (0, rxjs_1.from)(validate(value, options))));
    }
    async _compile(schema) {
        if (typeof schema === 'boolean') {
            return async (data) => ({ success: schema, data });
        }
        const schemaInfo = {
            smartDefaultRecord: new Map(),
            promptDefinitions: [],
        };
        this._ajv.removeSchema(schema);
        let validator;
        try {
            this._currentCompilationSchemaInfo = schemaInfo;
            validator = this._ajv.compile(schema);
        }
        catch (e) {
            // This should eventually be refactored so that we we handle race condition where the same schema is validated at the same time.
            if (!(e instanceof ajv_1.default.MissingRefError)) {
                throw e;
            }
            validator = await this._ajv.compileAsync(schema);
        }
        finally {
            this._currentCompilationSchemaInfo = undefined;
        }
        return async (data, options) => {
            var _a;
            const validationOptions = {
                withPrompts: true,
                applyPostTransforms: true,
                applyPreTransforms: true,
                ...options,
            };
            const validationContext = {
                promptFieldsWithValue: new Set(),
            };
            // Apply pre-validation transforms
            if (validationOptions.applyPreTransforms) {
                for (const visitor of this._pre.values()) {
                    data = await (0, visitor_1.visitJson)(data, visitor, schema, this._resolver.bind(this), validator).toPromise();
                }
            }
            // Apply smart defaults
            await this._applySmartDefaults(data, schemaInfo.smartDefaultRecord);
            // Apply prompts
            if (validationOptions.withPrompts) {
                const visitor = (value, pointer) => {
                    if (value !== undefined) {
                        validationContext.promptFieldsWithValue.add(pointer);
                    }
                    return value;
                };
                if (typeof schema === 'object') {
                    await (0, visitor_1.visitJson)(data, visitor, schema, this._resolver.bind(this), validator).toPromise();
                }
                const definitions = schemaInfo.promptDefinitions.filter((def) => !validationContext.promptFieldsWithValue.has(def.id));
                if (definitions.length > 0) {
                    await this._applyPrompts(data, definitions);
                }
            }
            // Validate using ajv
            try {
                const success = await validator.call(validationContext, data);
                if (!success) {
                    return { data, success, errors: (_a = validator.errors) !== null && _a !== void 0 ? _a : [] };
                }
            }
            catch (error) {
                if (error instanceof ajv_1.default.ValidationError) {
                    return { data, success: false, errors: error.errors };
                }
                throw error;
            }
            // Apply post-validation transforms
            if (validationOptions.applyPostTransforms) {
                for (const visitor of this._post.values()) {
                    data = await (0, visitor_1.visitJson)(data, visitor, schema, this._resolver.bind(this), validator).toPromise();
                }
            }
            return { data, success: true };
        };
    }
    addFormat(format) {
        this._ajv.addFormat(format.name, format.formatter);
    }
    addSmartDefaultProvider(source, provider) {
        if (this._sourceMap.has(source)) {
            throw new Error(source);
        }
        this._sourceMap.set(source, provider);
        if (!this._smartDefaultKeyword) {
            this._smartDefaultKeyword = true;
            this._ajv.addKeyword({
                keyword: '$default',
                errors: false,
                valid: true,
                compile: (schema, _parentSchema, it) => {
                    const compilationSchemInfo = this._currentCompilationSchemaInfo;
                    if (compilationSchemInfo === undefined) {
                        return () => true;
                    }
                    // We cheat, heavily.
                    const pathArray = this.normalizeDataPathArr(it);
                    compilationSchemInfo.smartDefaultRecord.set(JSON.stringify(pathArray), schema);
                    return () => true;
                },
                metaSchema: {
                    type: 'object',
                    properties: {
                        '$source': { type: 'string' },
                    },
                    additionalProperties: true,
                    required: ['$source'],
                },
            });
        }
    }
    registerUriHandler(handler) {
        this._uriHandlers.add(handler);
    }
    usePromptProvider(provider) {
        const isSetup = !!this._promptProvider;
        this._promptProvider = provider;
        if (isSetup) {
            return;
        }
        this._ajv.addKeyword({
            keyword: 'x-prompt',
            errors: false,
            valid: true,
            compile: (schema, parentSchema, it) => {
                const compilationSchemInfo = this._currentCompilationSchemaInfo;
                if (!compilationSchemInfo) {
                    return () => true;
                }
                const path = '/' + this.normalizeDataPathArr(it).join('/');
                let type;
                let items;
                let message;
                if (typeof schema == 'string') {
                    message = schema;
                }
                else {
                    message = schema.message;
                    type = schema.type;
                    items = schema.items;
                }
                const propertyTypes = (0, utility_1.getTypesOfSchema)(parentSchema);
                if (!type) {
                    if (propertyTypes.size === 1 && propertyTypes.has('boolean')) {
                        type = 'confirmation';
                    }
                    else if (Array.isArray(parentSchema.enum)) {
                        type = 'list';
                    }
                    else if (propertyTypes.size === 1 &&
                        propertyTypes.has('array') &&
                        parentSchema.items &&
                        Array.isArray(parentSchema.items.enum)) {
                        type = 'list';
                    }
                    else {
                        type = 'input';
                    }
                }
                let multiselect;
                if (type === 'list') {
                    multiselect =
                        schema.multiselect === undefined
                            ? propertyTypes.size === 1 && propertyTypes.has('array')
                            : schema.multiselect;
                    const enumValues = multiselect
                        ? parentSchema.items &&
                            parentSchema.items.enum
                        : parentSchema.enum;
                    if (!items && Array.isArray(enumValues)) {
                        items = [];
                        for (const value of enumValues) {
                            if (typeof value == 'string') {
                                items.push(value);
                            }
                            else if (typeof value == 'object') {
                                // Invalid
                            }
                            else {
                                items.push({ label: value.toString(), value });
                            }
                        }
                    }
                }
                const definition = {
                    id: path,
                    type,
                    message,
                    raw: schema,
                    items,
                    multiselect,
                    propertyTypes,
                    default: typeof parentSchema.default == 'object' &&
                        parentSchema.default !== null &&
                        !Array.isArray(parentSchema.default)
                        ? undefined
                        : parentSchema.default,
                    async validator(data) {
                        var _a;
                        try {
                            const result = await it.self.validate(parentSchema, data);
                            // If the schema is sync then false will be returned on validation failure
                            if (result) {
                                return result;
                            }
                            else if ((_a = it.self.errors) === null || _a === void 0 ? void 0 : _a.length) {
                                // Validation errors will be present on the Ajv instance when sync
                                return it.self.errors[0].message;
                            }
                        }
                        catch (e) {
                            const validationError = e;
                            // If the schema is async then an error will be thrown on validation failure
                            if (Array.isArray(validationError.errors) && validationError.errors.length) {
                                return validationError.errors[0].message;
                            }
                        }
                        return false;
                    },
                };
                compilationSchemInfo.promptDefinitions.push(definition);
                return function () {
                    // If 'this' is undefined in the call, then it defaults to the global
                    // 'this'.
                    if (this && this.promptFieldsWithValue) {
                        this.promptFieldsWithValue.add(path);
                    }
                    return true;
                };
            },
            metaSchema: {
                oneOf: [
                    { type: 'string' },
                    {
                        type: 'object',
                        properties: {
                            'type': { type: 'string' },
                            'message': { type: 'string' },
                        },
                        additionalProperties: true,
                        required: ['message'],
                    },
                ],
            },
        });
    }
    async _applyPrompts(data, prompts) {
        const provider = this._promptProvider;
        if (!provider) {
            return;
        }
        const answers = await (0, rxjs_1.from)(provider(prompts)).toPromise();
        for (const path in answers) {
            const pathFragments = path.split('/').slice(1);
            CoreSchemaRegistry._set(data, pathFragments, answers[path], null, undefined, true);
        }
    }
    static _set(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data, fragments, value, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parent = null, parentProperty, force) {
        for (let index = 0; index < fragments.length; index++) {
            const fragment = fragments[index];
            if (/^i\d+$/.test(fragment)) {
                if (!Array.isArray(data)) {
                    return;
                }
                for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
                    CoreSchemaRegistry._set(data[dataIndex], fragments.slice(index + 1), value, data, `${dataIndex}`);
                }
                return;
            }
            if (!data && parent !== null && parentProperty) {
                data = parent[parentProperty] = {};
            }
            parent = data;
            parentProperty = fragment;
            data = data[fragment];
        }
        if (parent && parentProperty && (force || parent[parentProperty] === undefined)) {
            parent[parentProperty] = value;
        }
    }
    async _applySmartDefaults(data, smartDefaults) {
        for (const [pointer, schema] of smartDefaults.entries()) {
            const fragments = JSON.parse(pointer);
            const source = this._sourceMap.get(schema.$source);
            if (!source) {
                continue;
            }
            let value = source(schema);
            if ((0, rxjs_1.isObservable)(value)) {
                value = await value.toPromise();
            }
            CoreSchemaRegistry._set(data, fragments, value);
        }
    }
    useXDeprecatedProvider(onUsage) {
        this._ajv.addKeyword({
            keyword: 'x-deprecated',
            validate: (schema, _data, _parentSchema, dataCxt) => {
                if (schema) {
                    onUsage(`Option "${dataCxt === null || dataCxt === void 0 ? void 0 : dataCxt.parentDataProperty}" is deprecated${typeof schema == 'string' ? ': ' + schema : '.'}`);
                }
                return true;
            },
            errors: false,
        });
    }
    normalizeDataPathArr(it) {
        return it.dataPathArr
            .slice(1, it.dataLevel + 1)
            .map((p) => (typeof p === 'number' ? p : p.str.replace(/"/g, '')));
    }
}
exports.CoreSchemaRegistry = CoreSchemaRegistry;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9jb3JlL3NyYy9qc29uL3NjaGVtYS9yZWdpc3RyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUVILDhDQUEwRDtBQUMxRCw4REFBd0M7QUFDeEMsMkNBQTZCO0FBQzdCLDZDQUErQjtBQUMvQiwrQkFBc0Q7QUFDdEQsOENBQXFDO0FBQ3JDLHlDQUEyQjtBQUMzQiwrQ0FBZ0Q7QUFDaEQsdUNBQTREO0FBQzVELG9DQUEwRTtBQWUxRSx1Q0FBNkM7QUFDN0MsdUNBQXVEO0FBTXZELE1BQWEseUJBQTBCLFNBQVEseUJBQWE7SUFHMUQsWUFDRSxNQUErQixFQUMvQixXQUFXLEdBQUcscURBQXFEO1FBRW5FLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDbEMsS0FBSyxDQUFDLDJCQUEyQixDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFFakIsT0FBTztTQUNSO1FBRUQsTUFBTSxRQUFRLEdBQUcseUJBQXlCLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2xFLEtBQUssQ0FBQyxHQUFHLFdBQVcsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBRU0sTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUErQjtRQUMxRCxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sRUFBRSxDQUFDO1NBQ1g7UUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENB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QUFnQjtRQUMzQyxPQUFPLEVBQUUsQ0FBQyxXQUFXO2FBQ2xCLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7YUFDMUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Q0FDRjtBQS9rQkQsZ0RBK2tCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgQWp2LCB7IFNjaGVtYU9iakN4dCwgVmFsaWRhdGVGdW5jdGlvbiB9IGZyb20gJ2Fqdic7XG5pbXBvcnQgYWp2QWRkRm9ybWF0cyBmcm9tICdhanYtZm9ybWF0cyc7XG5pbXBvcnQgKiBhcyBodHRwIGZyb20gJ2h0dHAnO1xuaW1wb3J0ICogYXMgaHR0cHMgZnJvbSAnaHR0cHMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgZnJvbSwgaXNPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBVcmwgZnJvbSAndXJsJztcbmltcG9ydCB7IEJhc2VFeGNlcHRpb24gfSBmcm9tICcuLi8uLi9leGNlcHRpb24nO1xuaW1wb3J0IHsgUGFydGlhbGx5T3JkZXJlZFNldCwgZGVlcENvcHkgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBKc29uQXJyYXksIEpzb25PYmplY3QsIEpzb25WYWx1ZSwgaXNKc29uT2JqZWN0IH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHtcbiAgSnNvblBvaW50ZXIsXG4gIEpzb25WaXNpdG9yLFxuICBQcm9tcHREZWZpbml0aW9uLFxuICBQcm9tcHRQcm92aWRlcixcbiAgU2NoZW1hRm9ybWF0LFxuICBTY2hlbWFSZWdpc3RyeSxcbiAgU2NoZW1hVmFsaWRhdG9yLFxuICBTY2hlbWFWYWxpZGF0b3JFcnJvcixcbiAgU2NoZW1hVmFsaWRhdG9yT3B0aW9ucyxcbiAgU2NoZW1hVmFsaWRhdG9yUmVzdWx0LFxuICBTbWFydERlZmF1bHRQcm92aWRlcixcbn0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgSnNvblNjaGVtYSB9IGZyb20gJy4vc2NoZW1hJztcbmltcG9ydCB7IGdldFR5cGVzT2ZTY2hlbWEgfSBmcm9tICcuL3V0aWxpdHknO1xuaW1wb3J0IHsgdmlzaXRKc29uLCB2aXNpdEpzb25TY2hlbWEgfSBmcm9tICcuL3Zpc2l0b3InO1xuXG5leHBvcnQgdHlwZSBVcmlIYW5kbGVyID0gKFxuICB1cmk6IHN0cmluZyxcbikgPT4gT2JzZXJ2YWJsZTxKc29uT2JqZWN0PiB8IFByb21pc2U8SnNvbk9iamVjdD4gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG5leHBvcnQgY2xhc3MgU2NoZW1hVmFsaWRhdGlvbkV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBwdWJsaWMgcmVhZG9ubHkgZXJyb3JzOiBTY2hlbWFWYWxpZGF0b3JFcnJvcltdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGVycm9ycz86IFNjaGVtYVZhbGlkYXRvckVycm9yW10sXG4gICAgYmFzZU1lc3NhZ2UgPSAnU2NoZW1hIHZhbGlkYXRpb24gZmFpbGVkIHdpdGggdGhlIGZvbGxvd2luZyBlcnJvcnM6JyxcbiAgKSB7XG4gICAgaWYgKCFlcnJvcnMgfHwgZXJyb3JzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgc3VwZXIoJ1NjaGVtYSB2YWxpZGF0aW9uIGZhaWxlZC4nKTtcbiAgICAgIHRoaXMuZXJyb3JzID0gW107XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlcyA9IFNjaGVtYVZhbGlkYXRpb25FeGNlcHRpb24uY3JlYXRlTWVzc2FnZXMoZXJyb3JzKTtcbiAgICBzdXBlcihgJHtiYXNlTWVzc2FnZX1cXG4gICR7bWVzc2FnZXMuam9pbignXFxuICAnKX1gKTtcbiAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcbiAgfVxuXG4gIHB1YmxpYyBzdGF0aWMgY3JlYXRlTWVzc2FnZXMoZXJyb3JzPzogU2NoZW1hVmFsaWRhdG9yRXJyb3JbXSk6IHN0cmluZ1tdIHtcbiAgICBpZiAoIWVycm9ycyB8fCBlcnJvcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZXMgPSBlcnJvcnMubWFwKChlcnIpID0+IHtcbiAgICAgIGxldCBtZXNzYWdlID0gYERhdGEgcGF0aCAke0pTT04uc3RyaW5naWZ5KGVyci5pbnN0YW5jZVBhdGgpfSAke2Vyci5tZXNzYWdlfWA7XG4gICAgICBpZiAoZXJyLnBhcmFtcykge1xuICAgICAgICBzd2l0Y2ggKGVyci5rZXl3b3JkKSB7XG4gICAgICAgICAgY2FzZSAnYWRkaXRpb25hbFByb3BlcnRpZXMnOlxuICAgICAgICAgICAgbWVzc2FnZSArPSBgKCR7ZXJyLnBhcmFtcy5hZGRpdGlvbmFsUHJvcGVydHl9KWA7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgJ2VudW0nOlxuICAgICAgICAgICAgbWVzc2FnZSArPSBgLiBBbGxvd2VkIHZhbHVlcyBhcmU6ICR7KGVyci5wYXJhbXMuYWxsb3dlZFZhbHVlcyBhcyBzdHJpbmdbXSB8IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgPy5tYXAoKHYpID0+IGBcIiR7dn1cImApXG4gICAgICAgICAgICAgIC5qb2luKCcsICcpfWA7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWVzc2FnZSArICcuJztcbiAgICB9KTtcblxuICAgIHJldHVybiBtZXNzYWdlcztcbiAgfVxufVxuXG5pbnRlcmZhY2UgU2NoZW1hSW5mbyB7XG4gIHNtYXJ0RGVmYXVsdFJlY29yZDogTWFwPHN0cmluZywgSnNvbk9iamVjdD47XG4gIHByb21wdERlZmluaXRpb25zOiBBcnJheTxQcm9tcHREZWZpbml0aW9uPjtcbn1cblxuZXhwb3J0IGNsYXNzIENvcmVTY2hlbWFSZWdpc3RyeSBpbXBsZW1lbnRzIFNjaGVtYVJlZ2lzdHJ5IHtcbiAgcHJpdmF0ZSBfYWp2OiBBanY7XG4gIHByaXZhdGUgX3VyaUNhY2hlID0gbmV3IE1hcDxzdHJpbmcsIEpzb25PYmplY3Q+KCk7XG4gIHByaXZhdGUgX3VyaUhhbmRsZXJzID0gbmV3IFNldDxVcmlIYW5kbGVyPigpO1xuICBwcml2YXRlIF9wcmUgPSBuZXcgUGFydGlhbGx5T3JkZXJlZFNldDxKc29uVmlzaXRvcj4oKTtcbiAgcHJpdmF0ZSBfcG9zdCA9IG5ldyBQYXJ0aWFsbHlPcmRlcmVkU2V0PEpzb25WaXNpdG9yPigpO1xuXG4gIHByaXZhdGUgX2N1cnJlbnRDb21waWxhdGlvblNjaGVtYUluZm8/OiBTY2hlbWFJbmZvO1xuXG4gIHByaXZhdGUgX3NtYXJ0RGVmYXVsdEtleXdvcmQgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcHJvbXB0UHJvdmlkZXI/OiBQcm9tcHRQcm92aWRlcjtcbiAgcHJpdmF0ZSBfc291cmNlTWFwID0gbmV3IE1hcDxzdHJpbmcsIFNtYXJ0RGVmYXVsdFByb3ZpZGVyPHt9Pj4oKTtcblxuICBjb25zdHJ1Y3Rvcihmb3JtYXRzOiBTY2hlbWFGb3JtYXRbXSA9IFtdKSB7XG4gICAgdGhpcy5fYWp2ID0gbmV3IEFqdih7XG4gICAgICBzdHJpY3Q6IGZhbHNlLFxuICAgICAgbG9hZFNjaGVtYTogKHVyaTogc3RyaW5nKSA9PiB0aGlzLl9mZXRjaCh1cmkpLFxuICAgICAgcGFzc0NvbnRleHQ6IHRydWUsXG4gICAgfSk7XG5cbiAgICBhanZBZGRGb3JtYXRzKHRoaXMuX2Fqdik7XG5cbiAgICBmb3IgKGNvbnN0IGZvcm1hdCBvZiBmb3JtYXRzKSB7XG4gICAgICB0aGlzLmFkZEZvcm1hdChmb3JtYXQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2ZldGNoKHVyaTogc3RyaW5nKTogUHJvbWlzZTxKc29uT2JqZWN0PiB7XG4gICAgY29uc3QgbWF5YmVTY2hlbWEgPSB0aGlzLl91cmlDYWNoZS5nZXQodXJpKTtcblxuICAgIGlmIChtYXliZVNjaGVtYSkge1xuICAgICAgcmV0dXJuIG1heWJlU2NoZW1hO1xuICAgIH1cblxuICAgIC8vIFRyeSBhbGwgaGFuZGxlcnMsIG9uZSBhZnRlciB0aGUgb3RoZXIuXG4gICAgZm9yIChjb25zdCBoYW5kbGVyIG9mIHRoaXMuX3VyaUhhbmRsZXJzKSB7XG4gICAgICBsZXQgaGFuZGxlclJlc3VsdCA9IGhhbmRsZXIodXJpKTtcbiAgICAgIGlmIChoYW5kbGVyUmVzdWx0ID09PSBudWxsIHx8IGhhbmRsZXJSZXN1bHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzT2JzZXJ2YWJsZShoYW5kbGVyUmVzdWx0KSkge1xuICAgICAgICBoYW5kbGVyUmVzdWx0ID0gaGFuZGxlclJlc3VsdC50b1Byb21pc2UoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsdWUgPSBhd2FpdCBoYW5kbGVyUmVzdWx0O1xuICAgICAgdGhpcy5fdXJpQ2FjaGUuc2V0KHVyaSwgdmFsdWUpO1xuXG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgLy8gSWYgbm9uZSBhcmUgZm91bmQsIGhhbmRsZSB1c2luZyBodHRwIGNsaWVudC5cbiAgICByZXR1cm4gbmV3IFByb21pc2U8SnNvbk9iamVjdD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgdXJsID0gbmV3IFVybC5VUkwodXJpKTtcbiAgICAgIGNvbnN0IGNsaWVudCA9IHVybC5wcm90b2NvbCA9PT0gJ2h0dHBzOicgPyBodHRwcyA6IGh0dHA7XG4gICAgICBjbGllbnQuZ2V0KHVybCwgKHJlcykgPT4ge1xuICAgICAgICBpZiAoIXJlcy5zdGF0dXNDb2RlIHx8IHJlcy5zdGF0dXNDb2RlID49IDMwMCkge1xuICAgICAgICAgIC8vIENvbnN1bWUgdGhlIHJlc3Qgb2YgdGhlIGRhdGEgdG8gZnJlZSBtZW1vcnkuXG4gICAgICAgICAgcmVzLnJlc3VtZSgpO1xuICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoYFJlcXVlc3QgZmFpbGVkLiBTdGF0dXMgQ29kZTogJHtyZXMuc3RhdHVzQ29kZX1gKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzLnNldEVuY29kaW5nKCd1dGY4Jyk7XG4gICAgICAgICAgbGV0IGRhdGEgPSAnJztcbiAgICAgICAgICByZXMub24oJ2RhdGEnLCAoY2h1bmspID0+IHtcbiAgICAgICAgICAgIGRhdGEgKz0gY2h1bms7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmVzLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCBqc29uID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgICAgdGhpcy5fdXJpQ2FjaGUuc2V0KHVyaSwganNvbik7XG4gICAgICAgICAgICAgIHJlc29sdmUoanNvbik7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBhIHRyYW5zZm9ybWF0aW9uIHN0ZXAgYmVmb3JlIHRoZSB2YWxpZGF0aW9uIG9mIGFueSBKc29uLlxuICAgKiBAcGFyYW0ge0pzb25WaXNpdG9yfSB2aXNpdG9yIFRoZSB2aXNpdG9yIHRvIHRyYW5zZm9ybSBldmVyeSB2YWx1ZS5cbiAgICogQHBhcmFtIHtKc29uVmlzaXRvcltdfSBkZXBzIEEgbGlzdCBvZiBvdGhlciB2aXNpdG9ycyB0byBydW4gYmVmb3JlLlxuICAgKi9cbiAgYWRkUHJlVHJhbnNmb3JtKHZpc2l0b3I6IEpzb25WaXNpdG9yLCBkZXBzPzogSnNvblZpc2l0b3JbXSkge1xuICAgIHRoaXMuX3ByZS5hZGQodmlzaXRvciwgZGVwcyk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGEgdHJhbnNmb3JtYXRpb24gc3RlcCBhZnRlciB0aGUgdmFsaWRhdGlvbiBvZiBhbnkgSnNvbi4gVGhlIEpTT04gd2lsbCBub3QgYmUgdmFsaWRhdGVkXG4gICAqIGFmdGVyIHRoZSBQT1NULCBzbyBpZiB0cmFuc2Zvcm1hdGlvbnMgYXJlIG5vdCBjb21wYXRpYmxlIHdpdGggdGhlIFNjaGVtYSBpdCB3aWxsIG5vdCByZXN1bHRcbiAgICogaW4gYW4gZXJyb3IuXG4gICAqIEBwYXJhbSB7SnNvblZpc2l0b3J9IHZpc2l0b3IgVGhlIHZpc2l0b3IgdG8gdHJhbnNmb3JtIGV2ZXJ5IHZhbHVlLlxuICAgKiBAcGFyYW0ge0pzb25WaXNpdG9yW119IGRlcHMgQSBsaXN0IG9mIG90aGVyIHZpc2l0b3JzIHRvIHJ1biBiZWZvcmUuXG4gICAqL1xuICBhZGRQb3N0VHJhbnNmb3JtKHZpc2l0b3I6IEpzb25WaXNpdG9yLCBkZXBzPzogSnNvblZpc2l0b3JbXSkge1xuICAgIHRoaXMuX3Bvc3QuYWRkKHZpc2l0b3IsIGRlcHMpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9yZXNvbHZlcihcbiAgICByZWY6IHN0cmluZyxcbiAgICB2YWxpZGF0ZT86IFZhbGlkYXRlRnVuY3Rpb24sXG4gICk6IHsgY29udGV4dD86IFZhbGlkYXRlRnVuY3Rpb247IHNjaGVtYT86IEpzb25PYmplY3QgfSB7XG4gICAgaWYgKCF2YWxpZGF0ZSB8fCAhcmVmKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuXG4gICAgY29uc3Qgc2NoZW1hID0gdmFsaWRhdGUuc2NoZW1hRW52LnJvb3Quc2NoZW1hO1xuICAgIGNvbnN0IGlkID0gdHlwZW9mIHNjaGVtYSA9PT0gJ29iamVjdCcgPyBzY2hlbWEuJGlkIDogbnVsbDtcblxuICAgIGxldCBmdWxsUmVmZXJlbmNlID0gcmVmO1xuICAgIGlmICh0eXBlb2YgaWQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBmdWxsUmVmZXJlbmNlID0gVXJsLnJlc29sdmUoaWQsIHJlZik7XG5cbiAgICAgIGlmIChyZWYuc3RhcnRzV2l0aCgnIycpKSB7XG4gICAgICAgIGZ1bGxSZWZlcmVuY2UgPSBpZCArIGZ1bGxSZWZlcmVuY2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcmVzb2x2ZWRTY2hlbWEgPSB0aGlzLl9hanYuZ2V0U2NoZW1hKGZ1bGxSZWZlcmVuY2UpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbnRleHQ6IHJlc29sdmVkU2NoZW1hPy5zY2hlbWFFbnYudmFsaWRhdGUsXG4gICAgICBzY2hlbWE6IHJlc29sdmVkU2NoZW1hPy5zY2hlbWEgYXMgSnNvbk9iamVjdCxcbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIEZsYXR0ZW4gdGhlIFNjaGVtYSwgcmVzb2x2aW5nIGFuZCByZXBsYWNpbmcgYWxsIHRoZSByZWZzLiBNYWtlcyBpdCBpbnRvIGEgc3luY2hyb25vdXMgc2NoZW1hXG4gICAqIHRoYXQgaXMgYWxzbyBlYXNpZXIgdG8gdHJhdmVyc2UuIERvZXMgbm90IGNhY2hlIHRoZSByZXN1bHQuXG4gICAqXG4gICAqIEBwYXJhbSBzY2hlbWEgVGhlIHNjaGVtYSBvciBVUkkgdG8gZmxhdHRlbi5cbiAgICogQHJldHVybnMgQW4gT2JzZXJ2YWJsZSBvZiB0aGUgZmxhdHRlbmVkIHNjaGVtYSBvYmplY3QuXG4gICAqIEBkZXByZWNhdGVkIHNpbmNlIDExLjIgd2l0aG91dCByZXBsYWNlbWVudC5cbiAgICogUHJvZHVjaW5nIGEgZmxhdHRlbiBzY2hlbWEgZG9jdW1lbnQgZG9lcyBub3QgaW4gYWxsIGNhc2VzIHByb2R1Y2UgYSBzY2hlbWEgd2l0aCBpZGVudGljYWwgYmVoYXZpb3IgdG8gdGhlIG9yaWdpbmFsLlxuICAgKiBTZWU6IGh0dHBzOi8vanNvbi1zY2hlbWEub3JnL2RyYWZ0LzIwMTktMDkvanNvbi1zY2hlbWEtY29yZS5odG1sI3JmYy5hcHBlbmRpeC5CLjJcbiAgICovXG4gIGZsYXR0ZW4oc2NoZW1hOiBKc29uT2JqZWN0KTogT2JzZXJ2YWJsZTxKc29uT2JqZWN0PiB7XG4gICAgcmV0dXJuIGZyb20odGhpcy5fZmxhdHRlbihzY2hlbWEpKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX2ZsYXR0ZW4oc2NoZW1hOiBKc29uT2JqZWN0KTogUHJvbWlzZTxKc29uT2JqZWN0PiB7XG4gICAgdGhpcy5fYWp2LnJlbW92ZVNjaGVtYShzY2hlbWEpO1xuXG4gICAgdGhpcy5fY3VycmVudENvbXBpbGF0aW9uU2NoZW1hSW5mbyA9IHVuZGVmaW5lZDtcbiAgICBjb25zdCB2YWxpZGF0ZSA9IGF3YWl0IHRoaXMuX2Fqdi5jb21waWxlQXN5bmMoc2NoZW1hKTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhc1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gdmlzaXRvcihcbiAgICAgIGN1cnJlbnQ6IEpzb25PYmplY3QgfCBKc29uQXJyYXksXG4gICAgICBwb2ludGVyOiBKc29uUG9pbnRlcixcbiAgICAgIHBhcmVudFNjaGVtYT86IEpzb25PYmplY3QgfCBKc29uQXJyYXksXG4gICAgICBpbmRleD86IHN0cmluZyxcbiAgICApIHtcbiAgICAgIGlmIChcbiAgICAgICAgY3VycmVudCAmJlxuICAgICAgICBwYXJlbnRTY2hlbWEgJiZcbiAgICAgICAgaW5kZXggJiZcbiAgICAgICAgaXNKc29uT2JqZWN0KGN1cnJlbnQpICYmXG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChjdXJyZW50LCAnJHJlZicpICYmXG4gICAgICAgIHR5cGVvZiBjdXJyZW50WyckcmVmJ10gPT0gJ3N0cmluZydcbiAgICAgICkge1xuICAgICAgICBjb25zdCByZXNvbHZlZCA9IHNlbGYuX3Jlc29sdmVyKGN1cnJlbnRbJyRyZWYnXSwgdmFsaWRhdGUpO1xuXG4gICAgICAgIGlmIChyZXNvbHZlZC5zY2hlbWEpIHtcbiAgICAgICAgICAocGFyZW50U2NoZW1hIGFzIEpzb25PYmplY3QpW2luZGV4XSA9IHJlc29sdmVkLnNjaGVtYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUNvcHkgPSBkZWVwQ29weSh2YWxpZGF0ZS5zY2hlbWEgYXMgSnNvbk9iamVjdCk7XG4gICAgdmlzaXRKc29uU2NoZW1hKHNjaGVtYUNvcHksIHZpc2l0b3IpO1xuXG4gICAgcmV0dXJuIHNjaGVtYUNvcHk7XG4gIH1cblxuICAvKipcbiAgICogQ29tcGlsZSBhbmQgcmV0dXJuIGEgdmFsaWRhdGlvbiBmdW5jdGlvbiBmb3IgdGhlIFNjaGVtYS5cbiAgICpcbiAgICogQHBhcmFtIHNjaGVtYSBUaGUgc2NoZW1hIHRvIHZhbGlkYXRlLiBJZiBhIHN0cmluZywgd2lsbCBmZXRjaCB0aGUgc2NoZW1hIGJlZm9yZSBjb21waWxpbmcgaXRcbiAgICogKHVzaW5nIHNjaGVtYSBhcyBhIFVSSSkuXG4gICAqIEByZXR1cm5zIEFuIE9ic2VydmFibGUgb2YgdGhlIFZhbGlkYXRpb24gZnVuY3Rpb24uXG4gICAqL1xuICBjb21waWxlKHNjaGVtYTogSnNvblNjaGVtYSk6IE9ic2VydmFibGU8U2NoZW1hVmFsaWRhdG9yPiB7XG4gICAgcmV0dXJuIGZyb20odGhpcy5fY29tcGlsZShzY2hlbWEpKS5waXBlKFxuICAgICAgbWFwKCh2YWxpZGF0ZSkgPT4gKHZhbHVlLCBvcHRpb25zKSA9PiBmcm9tKHZhbGlkYXRlKHZhbHVlLCBvcHRpb25zKSkpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9jb21waWxlKFxuICAgIHNjaGVtYTogSnNvblNjaGVtYSxcbiAgKTogUHJvbWlzZTxcbiAgICAoZGF0YTogSnNvblZhbHVlLCBvcHRpb25zPzogU2NoZW1hVmFsaWRhdG9yT3B0aW9ucykgPT4gUHJvbWlzZTxTY2hlbWFWYWxpZGF0b3JSZXN1bHQ+XG4gID4ge1xuICAgIGlmICh0eXBlb2Ygc2NoZW1hID09PSAnYm9vbGVhbicpIHtcbiAgICAgIHJldHVybiBhc3luYyAoZGF0YSkgPT4gKHsgc3VjY2Vzczogc2NoZW1hLCBkYXRhIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IHNjaGVtYUluZm86IFNjaGVtYUluZm8gPSB7XG4gICAgICBzbWFydERlZmF1bHRSZWNvcmQ6IG5ldyBNYXA8c3RyaW5nLCBKc29uT2JqZWN0PigpLFxuICAgICAgcHJvbXB0RGVmaW5pdGlvbnM6IFtdLFxuICAgIH07XG5cbiAgICB0aGlzLl9hanYucmVtb3ZlU2NoZW1hKHNjaGVtYSk7XG4gICAgbGV0IHZhbGlkYXRvcjogVmFsaWRhdGVGdW5jdGlvbjtcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLl9jdXJyZW50Q29tcGlsYXRpb25TY2hlbWFJbmZvID0gc2NoZW1hSW5mbztcbiAgICAgIHZhbGlkYXRvciA9IHRoaXMuX2Fqdi5jb21waWxlKHNjaGVtYSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gVGhpcyBzaG91bGQgZXZlbnR1YWxseSBiZSByZWZhY3RvcmVkIHNvIHRoYXQgd2Ugd2UgaGFuZGxlIHJhY2UgY29uZGl0aW9uIHdoZXJlIHRoZSBzYW1lIHNjaGVtYSBpcyB2YWxpZGF0ZWQgYXQgdGhlIHNhbWUgdGltZS5cbiAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBBanYuTWlzc2luZ1JlZkVycm9yKSkge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuXG4gICAgICB2YWxpZGF0b3IgPSBhd2FpdCB0aGlzLl9hanYuY29tcGlsZUFzeW5jKHNjaGVtYSk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuX2N1cnJlbnRDb21waWxhdGlvblNjaGVtYUluZm8gPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFzeW5jIChkYXRhOiBKc29uVmFsdWUsIG9wdGlvbnM/OiBTY2hlbWFWYWxpZGF0b3JPcHRpb25zKSA9PiB7XG4gICAgICBjb25zdCB2YWxpZGF0aW9uT3B0aW9uczogU2NoZW1hVmFsaWRhdG9yT3B0aW9ucyA9IHtcbiAgICAgICAgd2l0aFByb21wdHM6IHRydWUsXG4gICAgICAgIGFwcGx5UG9zdFRyYW5zZm9ybXM6IHRydWUsXG4gICAgICAgIGFwcGx5UHJlVHJhbnNmb3JtczogdHJ1ZSxcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIH07XG4gICAgICBjb25zdCB2YWxpZGF0aW9uQ29udGV4dCA9IHtcbiAgICAgICAgcHJvbXB0RmllbGRzV2l0aFZhbHVlOiBuZXcgU2V0PHN0cmluZz4oKSxcbiAgICAgIH07XG5cbiAgICAgIC8vIEFwcGx5IHByZS12YWxpZGF0aW9uIHRyYW5zZm9ybXNcbiAgICAgIGlmICh2YWxpZGF0aW9uT3B0aW9ucy5hcHBseVByZVRyYW5zZm9ybXMpIHtcbiAgICAgICAgZm9yIChjb25zdCB2aXNpdG9yIG9mIHRoaXMuX3ByZS52YWx1ZXMoKSkge1xuICAgICAgICAgIGRhdGEgPSBhd2FpdCB2aXNpdEpzb24oXG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgdmlzaXRvcixcbiAgICAgICAgICAgIHNjaGVtYSxcbiAgICAgICAgICAgIHRoaXMuX3Jlc29sdmVyLmJpbmQodGhpcyksXG4gICAgICAgICAgICB2YWxpZGF0b3IsXG4gICAgICAgICAgKS50b1Byb21pc2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBBcHBseSBzbWFydCBkZWZhdWx0c1xuICAgICAgYXdhaXQgdGhpcy5fYXBwbHlTbWFydERlZmF1bHRzKGRhdGEsIHNjaGVtYUluZm8uc21hcnREZWZhdWx0UmVjb3JkKTtcblxuICAgICAgLy8gQXBwbHkgcHJvbXB0c1xuICAgICAgaWYgKHZhbGlkYXRpb25PcHRpb25zLndpdGhQcm9tcHRzKSB7XG4gICAgICAgIGNvbnN0IHZpc2l0b3I6IEpzb25WaXNpdG9yID0gKHZhbHVlLCBwb2ludGVyKSA9PiB7XG4gICAgICAgICAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25Db250ZXh0LnByb21wdEZpZWxkc1dpdGhWYWx1ZS5hZGQocG9pbnRlcik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICBpZiAodHlwZW9mIHNjaGVtYSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBhd2FpdCB2aXNpdEpzb24oZGF0YSwgdmlzaXRvciwgc2NoZW1hLCB0aGlzLl9yZXNvbHZlci5iaW5kKHRoaXMpLCB2YWxpZGF0b3IpLnRvUHJvbWlzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZGVmaW5pdGlvbnMgPSBzY2hlbWFJbmZvLnByb21wdERlZmluaXRpb25zLmZpbHRlcihcbiAgICAgICAgICAoZGVmKSA9PiAhdmFsaWRhdGlvbkNvbnRleHQucHJvbXB0RmllbGRzV2l0aFZhbHVlLmhhcyhkZWYuaWQpLFxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChkZWZpbml0aW9ucy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5fYXBwbHlQcm9tcHRzKGRhdGEsIGRlZmluaXRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBWYWxpZGF0ZSB1c2luZyBhanZcbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHN1Y2Nlc3MgPSBhd2FpdCB2YWxpZGF0b3IuY2FsbCh2YWxpZGF0aW9uQ29udGV4dCwgZGF0YSk7XG5cbiAgICAgICAgaWYgKCFzdWNjZXNzKSB7XG4gICAgICAgICAgcmV0dXJuIHsgZGF0YSwgc3VjY2VzcywgZXJyb3JzOiB2YWxpZGF0b3IuZXJyb3JzID8/IFtdIH07XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEFqdi5WYWxpZGF0aW9uRXJyb3IpIHtcbiAgICAgICAgICByZXR1cm4geyBkYXRhLCBzdWNjZXNzOiBmYWxzZSwgZXJyb3JzOiBlcnJvci5lcnJvcnMgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuXG4gICAgICAvLyBBcHBseSBwb3N0LXZhbGlkYXRpb24gdHJhbnNmb3Jtc1xuICAgICAgaWYgKHZhbGlkYXRpb25PcHRpb25zLmFwcGx5UG9zdFRyYW5zZm9ybXMpIHtcbiAgICAgICAgZm9yIChjb25zdCB2aXNpdG9yIG9mIHRoaXMuX3Bvc3QudmFsdWVzKCkpIHtcbiAgICAgICAgICBkYXRhID0gYXdhaXQgdmlzaXRKc29uKFxuICAgICAgICAgICAgZGF0YSxcbiAgICAgICAgICAgIHZpc2l0b3IsXG4gICAgICAgICAgICBzY2hlbWEsXG4gICAgICAgICAgICB0aGlzLl9yZXNvbHZlci5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgdmFsaWRhdG9yLFxuICAgICAgICAgICkudG9Qcm9taXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgZGF0YSwgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH07XG4gIH1cblxuICBhZGRGb3JtYXQoZm9ybWF0OiBTY2hlbWFGb3JtYXQpOiB2b2lkIHtcbiAgICB0aGlzLl9hanYuYWRkRm9ybWF0KGZvcm1hdC5uYW1lLCBmb3JtYXQuZm9ybWF0dGVyKTtcbiAgfVxuXG4gIGFkZFNtYXJ0RGVmYXVsdFByb3ZpZGVyPFQ+KHNvdXJjZTogc3RyaW5nLCBwcm92aWRlcjogU21hcnREZWZhdWx0UHJvdmlkZXI8VD4pIHtcbiAgICBpZiAodGhpcy5fc291cmNlTWFwLmhhcyhzb3VyY2UpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3Ioc291cmNlKTtcbiAgICB9XG5cbiAgICB0aGlzLl9zb3VyY2VNYXAuc2V0KHNvdXJjZSwgcHJvdmlkZXIgYXMgdW5rbm93biBhcyBTbWFydERlZmF1bHRQcm92aWRlcjx7fT4pO1xuXG4gICAgaWYgKCF0aGlzLl9zbWFydERlZmF1bHRLZXl3b3JkKSB7XG4gICAgICB0aGlzLl9zbWFydERlZmF1bHRLZXl3b3JkID0gdHJ1ZTtcblxuICAgICAgdGhpcy5fYWp2LmFkZEtleXdvcmQoe1xuICAgICAgICBrZXl3b3JkOiAnJGRlZmF1bHQnLFxuICAgICAgICBlcnJvcnM6IGZhbHNlLFxuICAgICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgICAgY29tcGlsZTogKHNjaGVtYSwgX3BhcmVudFNjaGVtYSwgaXQpID0+IHtcbiAgICAgICAgICBjb25zdCBjb21waWxhdGlvblNjaGVtSW5mbyA9IHRoaXMuX2N1cnJlbnRDb21waWxhdGlvblNjaGVtYUluZm87XG4gICAgICAgICAgaWYgKGNvbXBpbGF0aW9uU2NoZW1JbmZvID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAoKSA9PiB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIFdlIGNoZWF0LCBoZWF2aWx5LlxuICAgICAgICAgIGNvbnN0IHBhdGhBcnJheSA9IHRoaXMubm9ybWFsaXplRGF0YVBhdGhBcnIoaXQpO1xuICAgICAgICAgIGNvbXBpbGF0aW9uU2NoZW1JbmZvLnNtYXJ0RGVmYXVsdFJlY29yZC5zZXQoSlNPTi5zdHJpbmdpZnkocGF0aEFycmF5KSwgc2NoZW1hKTtcblxuICAgICAgICAgIHJldHVybiAoKSA9PiB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICBtZXRhU2NoZW1hOiB7XG4gICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgJyRzb3VyY2UnOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhZGRpdGlvbmFsUHJvcGVydGllczogdHJ1ZSxcbiAgICAgICAgICByZXF1aXJlZDogWyckc291cmNlJ10sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZWdpc3RlclVyaUhhbmRsZXIoaGFuZGxlcjogVXJpSGFuZGxlcikge1xuICAgIHRoaXMuX3VyaUhhbmRsZXJzLmFkZChoYW5kbGVyKTtcbiAgfVxuXG4gIHVzZVByb21wdFByb3ZpZGVyKHByb3ZpZGVyOiBQcm9tcHRQcm92aWRlcikge1xuICAgIGNvbnN0IGlzU2V0dXAgPSAhIXRoaXMuX3Byb21wdFByb3ZpZGVyO1xuXG4gICAgdGhpcy5fcHJvbXB0UHJvdmlkZXIgPSBwcm92aWRlcjtcblxuICAgIGlmIChpc1NldHVwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fYWp2LmFkZEtleXdvcmQoe1xuICAgICAga2V5d29yZDogJ3gtcHJvbXB0JyxcbiAgICAgIGVycm9yczogZmFsc2UsXG4gICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgIGNvbXBpbGU6IChzY2hlbWEsIHBhcmVudFNjaGVtYSwgaXQpID0+IHtcbiAgICAgICAgY29uc3QgY29tcGlsYXRpb25TY2hlbUluZm8gPSB0aGlzLl9jdXJyZW50Q29tcGlsYXRpb25TY2hlbWFJbmZvO1xuICAgICAgICBpZiAoIWNvbXBpbGF0aW9uU2NoZW1JbmZvKSB7XG4gICAgICAgICAgcmV0dXJuICgpID0+IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXRoID0gJy8nICsgdGhpcy5ub3JtYWxpemVEYXRhUGF0aEFycihpdCkuam9pbignLycpO1xuXG4gICAgICAgIGxldCB0eXBlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAgIGxldCBpdGVtczogQXJyYXk8c3RyaW5nIHwgeyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbiB9PiB8IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IG1lc3NhZ2U6IHN0cmluZztcbiAgICAgICAgaWYgKHR5cGVvZiBzY2hlbWEgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBtZXNzYWdlID0gc2NoZW1hO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG1lc3NhZ2UgPSBzY2hlbWEubWVzc2FnZTtcbiAgICAgICAgICB0eXBlID0gc2NoZW1hLnR5cGU7XG4gICAgICAgICAgaXRlbXMgPSBzY2hlbWEuaXRlbXM7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwcm9wZXJ0eVR5cGVzID0gZ2V0VHlwZXNPZlNjaGVtYShwYXJlbnRTY2hlbWEgYXMgSnNvbk9iamVjdCk7XG4gICAgICAgIGlmICghdHlwZSkge1xuICAgICAgICAgIGlmIChwcm9wZXJ0eVR5cGVzLnNpemUgPT09IDEgJiYgcHJvcGVydHlUeXBlcy5oYXMoJ2Jvb2xlYW4nKSkge1xuICAgICAgICAgICAgdHlwZSA9ICdjb25maXJtYXRpb24nO1xuICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheSgocGFyZW50U2NoZW1hIGFzIEpzb25PYmplY3QpLmVudW0pKSB7XG4gICAgICAgICAgICB0eXBlID0gJ2xpc3QnO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICBwcm9wZXJ0eVR5cGVzLnNpemUgPT09IDEgJiZcbiAgICAgICAgICAgIHByb3BlcnR5VHlwZXMuaGFzKCdhcnJheScpICYmXG4gICAgICAgICAgICAocGFyZW50U2NoZW1hIGFzIEpzb25PYmplY3QpLml0ZW1zICYmXG4gICAgICAgICAgICBBcnJheS5pc0FycmF5KCgocGFyZW50U2NoZW1hIGFzIEpzb25PYmplY3QpLml0ZW1zIGFzIEpzb25PYmplY3QpLmVudW0pXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0eXBlID0gJ2xpc3QnO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0eXBlID0gJ2lucHV0JztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbXVsdGlzZWxlY3Q7XG4gICAgICAgIGlmICh0eXBlID09PSAnbGlzdCcpIHtcbiAgICAgICAgICBtdWx0aXNlbGVjdCA9XG4gICAgICAgICAgICBzY2hlbWEubXVsdGlzZWxlY3QgPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICA/IHByb3BlcnR5VHlwZXMuc2l6ZSA9PT0gMSAmJiBwcm9wZXJ0eVR5cGVzLmhhcygnYXJyYXknKVxuICAgICAgICAgICAgICA6IHNjaGVtYS5tdWx0aXNlbGVjdDtcblxuICAgICAgICAgIGNvbnN0IGVudW1WYWx1ZXMgPSBtdWx0aXNlbGVjdFxuICAgICAgICAgICAgPyAocGFyZW50U2NoZW1hIGFzIEpzb25PYmplY3QpLml0ZW1zICYmXG4gICAgICAgICAgICAgICgocGFyZW50U2NoZW1hIGFzIEpzb25PYmplY3QpLml0ZW1zIGFzIEpzb25PYmplY3QpLmVudW1cbiAgICAgICAgICAgIDogKHBhcmVudFNjaGVtYSBhcyBKc29uT2JqZWN0KS5lbnVtO1xuICAgICAgICAgIGlmICghaXRlbXMgJiYgQXJyYXkuaXNBcnJheShlbnVtVmFsdWVzKSkge1xuICAgICAgICAgICAgaXRlbXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgZW51bVZhbHVlcykge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaCh2YWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgLy8gSW52YWxpZFxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goeyBsYWJlbDogdmFsdWUudG9TdHJpbmcoKSwgdmFsdWUgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBkZWZpbml0aW9uOiBQcm9tcHREZWZpbml0aW9uID0ge1xuICAgICAgICAgIGlkOiBwYXRoLFxuICAgICAgICAgIHR5cGUsXG4gICAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgICByYXc6IHNjaGVtYSxcbiAgICAgICAgICBpdGVtcyxcbiAgICAgICAgICBtdWx0aXNlbGVjdCxcbiAgICAgICAgICBwcm9wZXJ0eVR5cGVzLFxuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0eXBlb2YgKHBhcmVudFNjaGVtYSBhcyBKc29uT2JqZWN0KS5kZWZhdWx0ID09ICdvYmplY3QnICYmXG4gICAgICAgICAgICAocGFyZW50U2NoZW1hIGFzIEpzb25PYmplY3QpLmRlZmF1bHQgIT09IG51bGwgJiZcbiAgICAgICAgICAgICFBcnJheS5pc0FycmF5KChwYXJlbnRTY2hlbWEgYXMgSnNvbk9iamVjdCkuZGVmYXVsdClcbiAgICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgICAgOiAoKHBhcmVudFNjaGVtYSBhcyBKc29uT2JqZWN0KS5kZWZhdWx0IGFzIHN0cmluZ1tdKSxcbiAgICAgICAgICBhc3luYyB2YWxpZGF0b3IoZGF0YTogSnNvblZhbHVlKTogUHJvbWlzZTxib29sZWFuIHwgc3RyaW5nPiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBpdC5zZWxmLnZhbGlkYXRlKHBhcmVudFNjaGVtYSwgZGF0YSk7XG4gICAgICAgICAgICAgIC8vIElmIHRoZSBzY2hlbWEgaXMgc3luYyB0aGVuIGZhbHNlIHdpbGwgYmUgcmV0dXJuZWQgb24gdmFsaWRhdGlvbiBmYWlsdXJlXG4gICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0IGFzIGJvb2xlYW4gfCBzdHJpbmc7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXQuc2VsZi5lcnJvcnM/Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIFZhbGlkYXRpb24gZXJyb3JzIHdpbGwgYmUgcHJlc2VudCBvbiB0aGUgQWp2IGluc3RhbmNlIHdoZW4gc3luY1xuICAgICAgICAgICAgICAgIHJldHVybiBpdC5zZWxmLmVycm9yc1swXS5tZXNzYWdlIGFzIHN0cmluZztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3IgPSBlIGFzIHsgZXJyb3JzPzogRXJyb3JbXSB9O1xuICAgICAgICAgICAgICAvLyBJZiB0aGUgc2NoZW1hIGlzIGFzeW5jIHRoZW4gYW4gZXJyb3Igd2lsbCBiZSB0aHJvd24gb24gdmFsaWRhdGlvbiBmYWlsdXJlXG4gICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KHZhbGlkYXRpb25FcnJvci5lcnJvcnMpICYmIHZhbGlkYXRpb25FcnJvci5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25FcnJvci5lcnJvcnNbMF0ubWVzc2FnZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb21waWxhdGlvblNjaGVtSW5mby5wcm9tcHREZWZpbml0aW9ucy5wdXNoKGRlZmluaXRpb24pO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodGhpczogeyBwcm9tcHRGaWVsZHNXaXRoVmFsdWU6IFNldDxzdHJpbmc+IH0pIHtcbiAgICAgICAgICAvLyBJZiAndGhpcycgaXMgdW5kZWZpbmVkIGluIHRoZSBjYWxsLCB0aGVuIGl0IGRlZmF1bHRzIHRvIHRoZSBnbG9iYWxcbiAgICAgICAgICAvLyAndGhpcycuXG4gICAgICAgICAgaWYgKHRoaXMgJiYgdGhpcy5wcm9tcHRGaWVsZHNXaXRoVmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMucHJvbXB0RmllbGRzV2l0aFZhbHVlLmFkZChwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgICBtZXRhU2NoZW1hOiB7XG4gICAgICAgIG9uZU9mOiBbXG4gICAgICAgICAgeyB0eXBlOiAnc3RyaW5nJyB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAndHlwZSc6IHsgdHlwZTogJ3N0cmluZycgfSxcbiAgICAgICAgICAgICAgJ21lc3NhZ2UnOiB7IHR5cGU6ICdzdHJpbmcnIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWRkaXRpb25hbFByb3BlcnRpZXM6IHRydWUsXG4gICAgICAgICAgICByZXF1aXJlZDogWydtZXNzYWdlJ10sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9hcHBseVByb21wdHMoZGF0YTogSnNvblZhbHVlLCBwcm9tcHRzOiBBcnJheTxQcm9tcHREZWZpbml0aW9uPik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHByb3ZpZGVyID0gdGhpcy5fcHJvbXB0UHJvdmlkZXI7XG4gICAgaWYgKCFwcm92aWRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGFuc3dlcnMgPSBhd2FpdCBmcm9tKHByb3ZpZGVyKHByb21wdHMpKS50b1Byb21pc2UoKTtcbiAgICBmb3IgKGNvbnN0IHBhdGggaW4gYW5zd2Vycykge1xuICAgICAgY29uc3QgcGF0aEZyYWdtZW50cyA9IHBhdGguc3BsaXQoJy8nKS5zbGljZSgxKTtcblxuICAgICAgQ29yZVNjaGVtYVJlZ2lzdHJ5Ll9zZXQoZGF0YSwgcGF0aEZyYWdtZW50cywgYW5zd2Vyc1twYXRoXSwgbnVsbCwgdW5kZWZpbmVkLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfc2V0KFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgZGF0YTogYW55LFxuICAgIGZyYWdtZW50czogc3RyaW5nW10sXG4gICAgdmFsdWU6IHVua25vd24sXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBwYXJlbnQ6IGFueSA9IG51bGwsXG4gICAgcGFyZW50UHJvcGVydHk/OiBzdHJpbmcsXG4gICAgZm9yY2U/OiBib29sZWFuLFxuICApOiB2b2lkIHtcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgZnJhZ21lbnRzLmxlbmd0aDsgaW5kZXgrKykge1xuICAgICAgY29uc3QgZnJhZ21lbnQgPSBmcmFnbWVudHNbaW5kZXhdO1xuICAgICAgaWYgKC9eaVxcZCskLy50ZXN0KGZyYWdtZW50KSkge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBkYXRhSW5kZXggPSAwOyBkYXRhSW5kZXggPCBkYXRhLmxlbmd0aDsgZGF0YUluZGV4KyspIHtcbiAgICAgICAgICBDb3JlU2NoZW1hUmVnaXN0cnkuX3NldChcbiAgICAgICAgICAgIGRhdGFbZGF0YUluZGV4XSxcbiAgICAgICAgICAgIGZyYWdtZW50cy5zbGljZShpbmRleCArIDEpLFxuICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgYCR7ZGF0YUluZGV4fWAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYXRhICYmIHBhcmVudCAhPT0gbnVsbCAmJiBwYXJlbnRQcm9wZXJ0eSkge1xuICAgICAgICBkYXRhID0gcGFyZW50W3BhcmVudFByb3BlcnR5XSA9IHt9O1xuICAgICAgfVxuXG4gICAgICBwYXJlbnQgPSBkYXRhO1xuICAgICAgcGFyZW50UHJvcGVydHkgPSBmcmFnbWVudDtcbiAgICAgIGRhdGEgPSBkYXRhW2ZyYWdtZW50XTtcbiAgICB9XG5cbiAgICBpZiAocGFyZW50ICYmIHBhcmVudFByb3BlcnR5ICYmIChmb3JjZSB8fCBwYXJlbnRbcGFyZW50UHJvcGVydHldID09PSB1bmRlZmluZWQpKSB7XG4gICAgICBwYXJlbnRbcGFyZW50UHJvcGVydHldID0gdmFsdWU7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBfYXBwbHlTbWFydERlZmF1bHRzPFQ+KFxuICAgIGRhdGE6IFQsXG4gICAgc21hcnREZWZhdWx0czogTWFwPHN0cmluZywgSnNvbk9iamVjdD4sXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGZvciAoY29uc3QgW3BvaW50ZXIsIHNjaGVtYV0gb2Ygc21hcnREZWZhdWx0cy5lbnRyaWVzKCkpIHtcbiAgICAgIGNvbnN0IGZyYWdtZW50cyA9IEpTT04ucGFyc2UocG9pbnRlcik7XG4gICAgICBjb25zdCBzb3VyY2UgPSB0aGlzLl9zb3VyY2VNYXAuZ2V0KHNjaGVtYS4kc291cmNlIGFzIHN0cmluZyk7XG4gICAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHZhbHVlID0gc291cmNlKHNjaGVtYSk7XG4gICAgICBpZiAoaXNPYnNlcnZhYmxlPHt9Pih2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSBhd2FpdCB2YWx1ZS50b1Byb21pc2UoKTtcbiAgICAgIH1cblxuICAgICAgQ29yZVNjaGVtYVJlZ2lzdHJ5Ll9zZXQoZGF0YSwgZnJhZ21lbnRzLCB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgdXNlWERlcHJlY2F0ZWRQcm92aWRlcihvblVzYWdlOiAobWVzc2FnZTogc3RyaW5nKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fYWp2LmFkZEtleXdvcmQoe1xuICAgICAga2V5d29yZDogJ3gtZGVwcmVjYXRlZCcsXG4gICAgICB2YWxpZGF0ZTogKHNjaGVtYSwgX2RhdGEsIF9wYXJlbnRTY2hlbWEsIGRhdGFDeHQpID0+IHtcbiAgICAgICAgaWYgKHNjaGVtYSkge1xuICAgICAgICAgIG9uVXNhZ2UoXG4gICAgICAgICAgICBgT3B0aW9uIFwiJHtkYXRhQ3h0Py5wYXJlbnREYXRhUHJvcGVydHl9XCIgaXMgZGVwcmVjYXRlZCR7XG4gICAgICAgICAgICAgIHR5cGVvZiBzY2hlbWEgPT0gJ3N0cmluZycgPyAnOiAnICsgc2NoZW1hIDogJy4nXG4gICAgICAgICAgICB9YCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9LFxuICAgICAgZXJyb3JzOiBmYWxzZSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgbm9ybWFsaXplRGF0YVBhdGhBcnIoaXQ6IFNjaGVtYU9iakN4dCk6IChudW1iZXIgfCBzdHJpbmcpW10ge1xuICAgIHJldHVybiBpdC5kYXRhUGF0aEFyclxuICAgICAgLnNsaWNlKDEsIGl0LmRhdGFMZXZlbCArIDEpXG4gICAgICAubWFwKChwKSA9PiAodHlwZW9mIHAgPT09ICdudW1iZXInID8gcCA6IHAuc3RyLnJlcGxhY2UoL1wiL2csICcnKSkpO1xuICB9XG59XG4iXX0=