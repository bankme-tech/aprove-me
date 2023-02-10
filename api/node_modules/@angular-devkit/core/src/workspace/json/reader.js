"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.readJsonWorkspace = void 0;
const jsonc_parser_1 = require("jsonc-parser");
const utils_1 = require("../../json/utils");
const definitions_1 = require("../definitions");
const metadata_1 = require("./metadata");
const utilities_1 = require("./utilities");
const ANGULAR_WORKSPACE_EXTENSIONS = Object.freeze([
    'cli',
    'defaultProject',
    'newProjectRoot',
    'schematics',
]);
const ANGULAR_PROJECT_EXTENSIONS = Object.freeze(['cli', 'schematics', 'projectType', 'i18n']);
async function readJsonWorkspace(path, host, options = {}) {
    var _a, _b;
    const raw = await host.readFile(path);
    if (raw === undefined) {
        throw new Error('Unable to read workspace file.');
    }
    const ast = (0, jsonc_parser_1.parseTree)(raw, undefined, { allowTrailingComma: true, disallowComments: false });
    if ((ast === null || ast === void 0 ? void 0 : ast.type) !== 'object' || !ast.children) {
        throw new Error('Invalid workspace file - expected JSON object.');
    }
    // Version check
    const versionNode = (0, jsonc_parser_1.findNodeAtLocation)(ast, ['version']);
    if (!versionNode) {
        throw new Error('Unknown format - version specifier not found.');
    }
    const version = versionNode.value;
    if (version !== 1) {
        throw new Error(`Invalid format version detected - Expected:[ 1 ] Found: [ ${version} ]`);
    }
    const context = {
        host,
        metadata: new metadata_1.JsonWorkspaceMetadata(path, ast, raw),
        trackChanges: true,
        unprefixedWorkspaceExtensions: new Set([
            ...ANGULAR_WORKSPACE_EXTENSIONS,
            ...((_a = options.allowedWorkspaceExtensions) !== null && _a !== void 0 ? _a : []),
        ]),
        unprefixedProjectExtensions: new Set([
            ...ANGULAR_PROJECT_EXTENSIONS,
            ...((_b = options.allowedProjectExtensions) !== null && _b !== void 0 ? _b : []),
        ]),
        error(message, _node) {
            // TODO: Diagnostic reporting support
            throw new Error(message);
        },
        warn(message, _node) {
            // TODO: Diagnostic reporting support
            // eslint-disable-next-line no-console
            console.warn(message);
        },
    };
    const workspace = parseWorkspace(ast, context);
    return workspace;
}
exports.readJsonWorkspace = readJsonWorkspace;
function parseWorkspace(workspaceNode, context) {
    const jsonMetadata = context.metadata;
    let projects;
    let extensions;
    if (!context.trackChanges) {
        extensions = Object.create(null);
    }
    // TODO: `getNodeValue` - looks potentially expensive since it walks the whole tree and instantiates the full object structure each time.
    // Might be something to look at moving forward to optimize.
    const workspaceNodeValue = (0, jsonc_parser_1.getNodeValue)(workspaceNode);
    for (const [name, value] of Object.entries(workspaceNodeValue)) {
        if (name === '$schema' || name === 'version') {
            // skip
        }
        else if (name === 'projects') {
            const nodes = (0, jsonc_parser_1.findNodeAtLocation)(workspaceNode, ['projects']);
            if (!(0, utils_1.isJsonObject)(value) || !nodes) {
                context.error('Invalid "projects" field found; expected an object.', value);
                continue;
            }
            projects = parseProjectsObject(nodes, context);
        }
        else {
            if (!context.unprefixedWorkspaceExtensions.has(name) && !/^[a-z]{1,3}-.*/.test(name)) {
                context.warn(`Workspace extension with invalid name (${name}) found.`, name);
            }
            if (extensions) {
                extensions[name] = value;
            }
        }
    }
    let collectionListener;
    if (context.trackChanges) {
        collectionListener = (name, newValue) => {
            jsonMetadata.addChange(['projects', name], newValue, 'project');
        };
    }
    const projectCollection = new definitions_1.ProjectDefinitionCollection(projects, collectionListener);
    return {
        [metadata_1.JsonWorkspaceSymbol]: jsonMetadata,
        projects: projectCollection,
        // If not tracking changes the `extensions` variable will contain the parsed
        // values.  Otherwise the extensions are tracked via a virtual AST object.
        extensions: extensions !== null && extensions !== void 0 ? extensions : (0, utilities_1.createVirtualAstObject)(workspaceNodeValue, {
            exclude: ['$schema', 'version', 'projects'],
            listener(path, value) {
                jsonMetadata.addChange(path, value);
            },
        }),
    };
}
function parseProjectsObject(projectsNode, context) {
    const projects = Object.create(null);
    for (const [name, value] of Object.entries((0, jsonc_parser_1.getNodeValue)(projectsNode))) {
        const nodes = (0, jsonc_parser_1.findNodeAtLocation)(projectsNode, [name]);
        if (!(0, utils_1.isJsonObject)(value) || !nodes) {
            context.warn('Skipping invalid project value; expected an object.', value);
            continue;
        }
        projects[name] = parseProject(name, nodes, context);
    }
    return projects;
}
function parseProject(projectName, projectNode, context) {
    const jsonMetadata = context.metadata;
    let targets;
    let hasTargets = false;
    let extensions;
    let properties;
    if (!context.trackChanges) {
        // If not tracking changes, the parser will store the values directly in standard objects
        extensions = Object.create(null);
        properties = Object.create(null);
    }
    const projectNodeValue = (0, jsonc_parser_1.getNodeValue)(projectNode);
    if (!('root' in projectNodeValue)) {
        throw new Error(`Project "${projectName}" is missing a required property "root".`);
    }
    for (const [name, value] of Object.entries(projectNodeValue)) {
        switch (name) {
            case 'targets':
            case 'architect':
                const nodes = (0, jsonc_parser_1.findNodeAtLocation)(projectNode, [name]);
                if (!(0, utils_1.isJsonObject)(value) || !nodes) {
                    context.error(`Invalid "${name}" field found; expected an object.`, value);
                    break;
                }
                hasTargets = true;
                targets = parseTargetsObject(projectName, nodes, context);
                jsonMetadata.hasLegacyTargetsName = name === 'architect';
                break;
            case 'prefix':
            case 'root':
            case 'sourceRoot':
                if (typeof value !== 'string') {
                    context.warn(`Project property "${name}" should be a string.`, value);
                }
                if (properties) {
                    properties[name] = value;
                }
                break;
            default:
                if (!context.unprefixedProjectExtensions.has(name) && !/^[a-z]{1,3}-.*/.test(name)) {
                    context.warn(`Project '${projectName}' contains extension with invalid name (${name}).`, name);
                }
                if (extensions) {
                    extensions[name] = value;
                }
                break;
        }
    }
    let collectionListener;
    if (context.trackChanges) {
        collectionListener = (name, newValue, collection) => {
            if (hasTargets) {
                jsonMetadata.addChange(['projects', projectName, 'targets', name], newValue, 'target');
            }
            else {
                jsonMetadata.addChange(['projects', projectName, 'targets'], collection, 'targetcollection');
            }
        };
    }
    const base = {
        targets: new definitions_1.TargetDefinitionCollection(targets, collectionListener),
        // If not tracking changes the `extensions` variable will contain the parsed
        // values.  Otherwise the extensions are tracked via a virtual AST object.
        extensions: extensions !== null && extensions !== void 0 ? extensions : (0, utilities_1.createVirtualAstObject)(projectNodeValue, {
            exclude: ['architect', 'prefix', 'root', 'sourceRoot', 'targets'],
            listener(path, value) {
                jsonMetadata.addChange(['projects', projectName, ...path], value);
            },
        }),
    };
    const baseKeys = new Set(Object.keys(base));
    const project = properties !== null && properties !== void 0 ? properties : (0, utilities_1.createVirtualAstObject)(projectNodeValue, {
        include: ['prefix', 'root', 'sourceRoot', ...baseKeys],
        listener(path, value) {
            if (!baseKeys.has(path[0])) {
                jsonMetadata.addChange(['projects', projectName, ...path], value);
            }
        },
    });
    return Object.assign(project, base);
}
function parseTargetsObject(projectName, targetsNode, context) {
    const jsonMetadata = context.metadata;
    const targets = Object.create(null);
    for (const [name, value] of Object.entries((0, jsonc_parser_1.getNodeValue)(targetsNode))) {
        if (!(0, utils_1.isJsonObject)(value)) {
            context.warn('Skipping invalid target value; expected an object.', value);
            continue;
        }
        if (context.trackChanges) {
            targets[name] = (0, utilities_1.createVirtualAstObject)(value, {
                include: ['builder', 'options', 'configurations', 'defaultConfiguration'],
                listener(path, value) {
                    jsonMetadata.addChange(['projects', projectName, 'targets', name, ...path], value);
                },
            });
        }
        else {
            targets[name] = value;
        }
    }
    return targets;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5ndWxhcl9kZXZraXQvY29yZS9zcmMvd29ya3NwYWNlL2pzb24vcmVhZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7OztBQUVILCtDQUFpRjtBQUNqRiw0Q0FBMkQ7QUFDM0QsZ0RBT3dCO0FBRXhCLHlDQUF3RTtBQUN4RSwyQ0FBcUQ7QUFFckQsTUFBTSw0QkFBNEIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ2pELEtBQUs7SUFDTCxnQkFBZ0I7SUFDaEIsZ0JBQWdCO0lBQ2hCLFlBQVk7Q0FDYixDQUFDLENBQUM7QUFDSCxNQUFNLDBCQUEwQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsWUFBWSxFQUFFLGFBQWEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBaUJ4RixLQUFLLFVBQVUsaUJBQWlCLENBQ3JDLElBQVksRUFDWixJQUFtQixFQUNuQixVQUFnQyxFQUFFOztJQUVsQyxNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEMsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztLQUNuRDtJQUVELE1BQU0sR0FBRyxHQUFHLElBQUEsd0JBQVMsRUFBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDN0YsSUFBSSxDQUFBLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxJQUFJLE1BQUssUUFBUSxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtRQUMzQyxNQUFNLElBQUksS0FBSyxDQUFDLGdEQUFnRCxD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LElBQUksQ0FBQyxHQUFHLElBQUEsa0NBQXNCLEVBQW1CLEtBQUssRUFBRTtnQkFDOUQsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxzQkFBc0IsQ0FBQztnQkFDekUsUUFBUSxDQUFDLElBQUksRUFBRSxLQUFLO29CQUNsQixZQUFZLENBQUMsU0FBUyxDQUFDLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3JGLENBQUM7YUFDRixDQUFDLENBQUM7U0FDSjthQUFNO1lBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQW9DLENBQUM7U0FDdEQ7S0FDRjtJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgTm9kZSwgZmluZE5vZGVBdExvY2F0aW9uLCBnZXROb2RlVmFsdWUsIHBhcnNlVHJlZSB9IGZyb20gJ2pzb25jLXBhcnNlcic7XG5pbXBvcnQgeyBKc29uVmFsdWUsIGlzSnNvbk9iamVjdCB9IGZyb20gJy4uLy4uL2pzb24vdXRpbHMnO1xuaW1wb3J0IHtcbiAgRGVmaW5pdGlvbkNvbGxlY3Rpb25MaXN0ZW5lcixcbiAgUHJvamVjdERlZmluaXRpb24sXG4gIFByb2plY3REZWZpbml0aW9uQ29sbGVjdGlvbixcbiAgVGFyZ2V0RGVmaW5pdGlvbixcbiAgVGFyZ2V0RGVmaW5pdGlvbkNvbGxlY3Rpb24sXG4gIFdvcmtzcGFjZURlZmluaXRpb24sXG59IGZyb20gJy4uL2RlZmluaXRpb25zJztcbmltcG9ydCB7IFdvcmtzcGFjZUhvc3QgfSBmcm9tICcuLi9ob3N0JztcbmltcG9ydCB7IEpzb25Xb3Jrc3BhY2VNZXRhZGF0YSwgSnNvbldvcmtzcGFjZVN5bWJvbCB9IGZyb20gJy4vbWV0YWRhdGEnO1xuaW1wb3J0IHsgY3JlYXRlVmlydHVhbEFzdE9iamVjdCB9IGZyb20gJy4vdXRpbGl0aWVzJztcblxuY29uc3QgQU5HVUxBUl9XT1JLU1BBQ0VfRVhURU5TSU9OUyA9IE9iamVjdC5mcmVlemUoW1xuICAnY2xpJyxcbiAgJ2RlZmF1bHRQcm9qZWN0JyxcbiAgJ25ld1Byb2plY3RSb290JyxcbiAgJ3NjaGVtYXRpY3MnLFxuXSk7XG5jb25zdCBBTkdVTEFSX1BST0pFQ1RfRVhURU5TSU9OUyA9IE9iamVjdC5mcmVlemUoWydjbGknLCAnc2NoZW1hdGljcycsICdwcm9qZWN0VHlwZScsICdpMThuJ10pO1xuXG5pbnRlcmZhY2UgUGFyc2VyQ29udGV4dCB7XG4gIHJlYWRvbmx5IGhvc3Q6IFdvcmtzcGFjZUhvc3Q7XG4gIHJlYWRvbmx5IG1ldGFkYXRhOiBKc29uV29ya3NwYWNlTWV0YWRhdGE7XG4gIHJlYWRvbmx5IHRyYWNrQ2hhbmdlczogYm9vbGVhbjtcbiAgcmVhZG9ubHkgdW5wcmVmaXhlZFdvcmtzcGFjZUV4dGVuc2lvbnM6IFJlYWRvbmx5U2V0PHN0cmluZz47XG4gIHJlYWRvbmx5IHVucHJlZml4ZWRQcm9qZWN0RXh0ZW5zaW9uczogUmVhZG9ubHlTZXQ8c3RyaW5nPjtcbiAgZXJyb3IobWVzc2FnZTogc3RyaW5nLCBub2RlOiBKc29uVmFsdWUpOiB2b2lkO1xuICB3YXJuKG1lc3NhZ2U6IHN0cmluZywgbm9kZTogSnNvblZhbHVlKTogdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBKc29uV29ya3NwYWNlT3B0aW9ucyB7XG4gIGFsbG93ZWRQcm9qZWN0RXh0ZW5zaW9ucz86IHN0cmluZ1tdO1xuICBhbGxvd2VkV29ya3NwYWNlRXh0ZW5zaW9ucz86IHN0cmluZ1tdO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmVhZEpzb25Xb3Jrc3BhY2UoXG4gIHBhdGg6IHN0cmluZyxcbiAgaG9zdDogV29ya3NwYWNlSG9zdCxcbiAgb3B0aW9uczogSnNvbldvcmtzcGFjZU9wdGlvbnMgPSB7fSxcbik6IFByb21pc2U8V29ya3NwYWNlRGVmaW5pdGlvbj4ge1xuICBjb25zdCByYXcgPSBhd2FpdCBob3N0LnJlYWRGaWxlKHBhdGgpO1xuICBpZiAocmF3ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byByZWFkIHdvcmtzcGFjZSBmaWxlLicpO1xuICB9XG5cbiAgY29uc3QgYXN0ID0gcGFyc2VUcmVlKHJhdywgdW5kZWZpbmVkLCB7IGFsbG93VHJhaWxpbmdDb21tYTogdHJ1ZSwgZGlzYWxsb3dDb21tZW50czogZmFsc2UgfSk7XG4gIGlmIChhc3Q/LnR5cGUgIT09ICdvYmplY3QnIHx8ICFhc3QuY2hpbGRyZW4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgd29ya3NwYWNlIGZpbGUgLSBleHBlY3RlZCBKU09OIG9iamVjdC4nKTtcbiAgfVxuXG4gIC8vIFZlcnNpb24gY2hlY2tcbiAgY29uc3QgdmVyc2lvbk5vZGUgPSBmaW5kTm9kZUF0TG9jYXRpb24oYXN0LCBbJ3ZlcnNpb24nXSk7XG4gIGlmICghdmVyc2lvbk5vZGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZm9ybWF0IC0gdmVyc2lvbiBzcGVjaWZpZXIgbm90IGZvdW5kLicpO1xuICB9XG4gIGNvbnN0IHZlcnNpb24gPSB2ZXJzaW9uTm9kZS52YWx1ZTtcbiAgaWYgKHZlcnNpb24gIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEludmFsaWQgZm9ybWF0IHZlcnNpb24gZGV0ZWN0ZWQgLSBFeHBlY3RlZDpbIDEgXSBGb3VuZDogWyAke3ZlcnNpb259IF1gKTtcbiAgfVxuXG4gIGNvbnN0IGNvbnRleHQ6IFBhcnNlckNvbnRleHQgPSB7XG4gICAgaG9zdCxcbiAgICBtZXRhZGF0YTogbmV3IEpzb25Xb3Jrc3BhY2VNZXRhZGF0YShwYXRoLCBhc3QsIHJhdyksXG4gICAgdHJhY2tDaGFuZ2VzOiB0cnVlLFxuICAgIHVucHJlZml4ZWRXb3Jrc3BhY2VFeHRlbnNpb25zOiBuZXcgU2V0KFtcbiAgICAgIC4uLkFOR1VMQVJfV09SS1NQQUNFX0VYVEVOU0lPTlMsXG4gICAgICAuLi4ob3B0aW9ucy5hbGxvd2VkV29ya3NwYWNlRXh0ZW5zaW9ucyA/PyBbXSksXG4gICAgXSksXG4gICAgdW5wcmVmaXhlZFByb2plY3RFeHRlbnNpb25zOiBuZXcgU2V0KFtcbiAgICAgIC4uLkFOR1VMQVJfUFJPSkVDVF9FWFRFTlNJT05TLFxuICAgICAgLi4uKG9wdGlvbnMuYWxsb3dlZFByb2plY3RFeHRlbnNpb25zID8/IFtdKSxcbiAgICBdKSxcbiAgICBlcnJvcihtZXNzYWdlLCBfbm9kZSkge1xuICAgICAgLy8gVE9ETzogRGlhZ25vc3RpYyByZXBvcnRpbmcgc3VwcG9ydFxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgd2FybihtZXNzYWdlLCBfbm9kZSkge1xuICAgICAgLy8gVE9ETzogRGlhZ25vc3RpYyByZXBvcnRpbmcgc3VwcG9ydFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IHdvcmtzcGFjZSA9IHBhcnNlV29ya3NwYWNlKGFzdCwgY29udGV4dCk7XG5cbiAgcmV0dXJuIHdvcmtzcGFjZTtcbn1cblxuZnVuY3Rpb24gcGFyc2VXb3Jrc3BhY2Uod29ya3NwYWNlTm9kZTogTm9kZSwgY29udGV4dDogUGFyc2VyQ29udGV4dCk6IFdvcmtzcGFjZURlZmluaXRpb24ge1xuICBjb25zdCBqc29uTWV0YWRhdGEgPSBjb250ZXh0Lm1ldGFkYXRhO1xuICBsZXQgcHJvamVjdHM7XG4gIGxldCBleHRlbnNpb25zOiBSZWNvcmQ8c3RyaW5nLCBKc29uVmFsdWU+IHwgdW5kZWZpbmVkO1xuICBpZiAoIWNvbnRleHQudHJhY2tDaGFuZ2VzKSB7XG4gICAgZXh0ZW5zaW9ucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cblxuICAvLyBUT0RPOiBgZ2V0Tm9kZVZhbHVlYCAtIGxvb2tzIHBvdGVudGlhbGx5IGV4cGVuc2l2ZSBzaW5jZSBpdCB3YWxrcyB0aGUgd2hvbGUgdHJlZSBhbmQgaW5zdGFudGlhdGVzIHRoZSBmdWxsIG9iamVjdCBzdHJ1Y3R1cmUgZWFjaCB0aW1lLlxuICAvLyBNaWdodCBiZSBzb21ldGhpbmcgdG8gbG9vayBhdCBtb3ZpbmcgZm9yd2FyZCB0byBvcHRpbWl6ZS5cbiAgY29uc3Qgd29ya3NwYWNlTm9kZVZhbHVlID0gZ2V0Tm9kZVZhbHVlKHdvcmtzcGFjZU5vZGUpO1xuICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXM8SnNvblZhbHVlPih3b3Jrc3BhY2VOb2RlVmFsdWUpKSB7XG4gICAgaWYgKG5hbWUgPT09ICckc2NoZW1hJyB8fCBuYW1lID09PSAndmVyc2lvbicpIHtcbiAgICAgIC8vIHNraXBcbiAgICB9IGVsc2UgaWYgKG5hbWUgPT09ICdwcm9qZWN0cycpIHtcbiAgICAgIGNvbnN0IG5vZGVzID0gZmluZE5vZGVBdExvY2F0aW9uKHdvcmtzcGFjZU5vZGUsIFsncHJvamVjdHMnXSk7XG4gICAgICBpZiAoIWlzSnNvbk9iamVjdCh2YWx1ZSkgfHwgIW5vZGVzKSB7XG4gICAgICAgIGNvbnRleHQuZXJyb3IoJ0ludmFsaWQgXCJwcm9qZWN0c1wiIGZpZWxkIGZvdW5kOyBleHBlY3RlZCBhbiBvYmplY3QuJywgdmFsdWUpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgcHJvamVjdHMgPSBwYXJzZVByb2plY3RzT2JqZWN0KG5vZGVzLCBjb250ZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFjb250ZXh0LnVucHJlZml4ZWRXb3Jrc3BhY2VFeHRlbnNpb25zLmhhcyhuYW1lKSAmJiAhL15bYS16XXsxLDN9LS4qLy50ZXN0KG5hbWUpKSB7XG4gICAgICAgIGNvbnRleHQud2FybihgV29ya3NwYWNlIGV4dGVuc2lvbiB3aXRoIGludmFsaWQgbmFtZSAoJHtuYW1lfSkgZm91bmQuYCwgbmFtZSk7XG4gICAgICB9XG4gICAgICBpZiAoZXh0ZW5zaW9ucykge1xuICAgICAgICBleHRlbnNpb25zW25hbWVdID0gdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbGV0IGNvbGxlY3Rpb25MaXN0ZW5lcjogRGVmaW5pdGlvbkNvbGxlY3Rpb25MaXN0ZW5lcjxQcm9qZWN0RGVmaW5pdGlvbj4gfCB1bmRlZmluZWQ7XG4gIGlmIChjb250ZXh0LnRyYWNrQ2hhbmdlcykge1xuICAgIGNvbGxlY3Rpb25MaXN0ZW5lciA9IChuYW1lLCBuZXdWYWx1ZSkgPT4ge1xuICAgICAganNvbk1ldGFkYXRhLmFkZENoYW5nZShbJ3Byb2plY3RzJywgbmFtZV0sIG5ld1ZhbHVlLCAncHJvamVjdCcpO1xuICAgIH07XG4gIH1cblxuICBjb25zdCBwcm9qZWN0Q29sbGVjdGlvbiA9IG5ldyBQcm9qZWN0RGVmaW5pdGlvbkNvbGxlY3Rpb24ocHJvamVjdHMsIGNvbGxlY3Rpb25MaXN0ZW5lcik7XG5cbiAgcmV0dXJuIHtcbiAgICBbSnNvbldvcmtzcGFjZVN5bWJvbF06IGpzb25NZXRhZGF0YSxcbiAgICBwcm9qZWN0czogcHJvamVjdENvbGxlY3Rpb24sXG4gICAgLy8gSWYgbm90IHRyYWNraW5nIGNoYW5nZXMgdGhlIGBleHRlbnNpb25zYCB2YXJpYWJsZSB3aWxsIGNvbnRhaW4gdGhlIHBhcnNlZFxuICAgIC8vIHZhbHVlcy4gIE90aGVyd2lzZSB0aGUgZXh0ZW5zaW9ucyBhcmUgdHJhY2tlZCB2aWEgYSB2aXJ0dWFsIEFTVCBvYmplY3QuXG4gICAgZXh0ZW5zaW9uczpcbiAgICAgIGV4dGVuc2lvbnMgPz9cbiAgICAgIGNyZWF0ZVZpcnR1YWxBc3RPYmplY3Qod29ya3NwYWNlTm9kZVZhbHVlLCB7XG4gICAgICAgIGV4Y2x1ZGU6IFsnJHNjaGVtYScsICd2ZXJzaW9uJywgJ3Byb2plY3RzJ10sXG4gICAgICAgIGxpc3RlbmVyKHBhdGgsIHZhbHVlKSB7XG4gICAgICAgICAganNvbk1ldGFkYXRhLmFkZENoYW5nZShwYXRoLCB2YWx1ZSk7XG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgfSBhcyBXb3Jrc3BhY2VEZWZpbml0aW9uO1xufVxuXG5mdW5jdGlvbiBwYXJzZVByb2plY3RzT2JqZWN0KFxuICBwcm9qZWN0c05vZGU6IE5vZGUsXG4gIGNvbnRleHQ6IFBhcnNlckNvbnRleHQsXG4pOiBSZWNvcmQ8c3RyaW5nLCBQcm9qZWN0RGVmaW5pdGlvbj4ge1xuICBjb25zdCBwcm9qZWN0czogUmVjb3JkPHN0cmluZywgUHJvamVjdERlZmluaXRpb24+ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXM8SnNvblZhbHVlPihnZXROb2RlVmFsdWUocHJvamVjdHNOb2RlKSkpIHtcbiAgICBjb25zdCBub2RlcyA9IGZpbmROb2RlQXRMb2NhdGlvbihwcm9qZWN0c05vZGUsIFtuYW1lXSk7XG4gICAgaWYgKCFpc0pzb25PYmplY3QodmFsdWUpIHx8ICFub2Rlcykge1xuICAgICAgY29udGV4dC53YXJuKCdTa2lwcGluZyBpbnZhbGlkIHByb2plY3QgdmFsdWU7IGV4cGVjdGVkIGFuIG9iamVjdC4nLCB2YWx1ZSk7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBwcm9qZWN0c1tuYW1lXSA9IHBhcnNlUHJvamVjdChuYW1lLCBub2RlcywgY29udGV4dCk7XG4gIH1cblxuICByZXR1cm4gcHJvamVjdHM7XG59XG5cbmZ1bmN0aW9uIHBhcnNlUHJvamVjdChcbiAgcHJvamVjdE5hbWU6IHN0cmluZyxcbiAgcHJvamVjdE5vZGU6IE5vZGUsXG4gIGNvbnRleHQ6IFBhcnNlckNvbnRleHQsXG4pOiBQcm9qZWN0RGVmaW5pdGlvbiB7XG4gIGNvbnN0IGpzb25NZXRhZGF0YSA9IGNvbnRleHQubWV0YWRhdGE7XG4gIGxldCB0YXJnZXRzO1xuICBsZXQgaGFzVGFyZ2V0cyA9IGZhbHNlO1xuICBsZXQgZXh0ZW5zaW9uczogUmVjb3JkPHN0cmluZywgSnNvblZhbHVlPiB8IHVuZGVmaW5lZDtcbiAgbGV0IHByb3BlcnRpZXM6IFJlY29yZDwncm9vdCcgfCAnc291cmNlUm9vdCcgfCAncHJlZml4Jywgc3RyaW5nPiB8IHVuZGVmaW5lZDtcbiAgaWYgKCFjb250ZXh0LnRyYWNrQ2hhbmdlcykge1xuICAgIC8vIElmIG5vdCB0cmFja2luZyBjaGFuZ2VzLCB0aGUgcGFyc2VyIHdpbGwgc3RvcmUgdGhlIHZhbHVlcyBkaXJlY3RseSBpbiBzdGFuZGFyZCBvYmplY3RzXG4gICAgZXh0ZW5zaW9ucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgcHJvcGVydGllcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gIH1cblxuICBjb25zdCBwcm9qZWN0Tm9kZVZhbHVlID0gZ2V0Tm9kZVZhbHVlKHByb2plY3ROb2RlKTtcbiAgaWYgKCEoJ3Jvb3QnIGluIHByb2plY3ROb2RlVmFsdWUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBQcm9qZWN0IFwiJHtwcm9qZWN0TmFtZX1cIiBpcyBtaXNzaW5nIGEgcmVxdWlyZWQgcHJvcGVydHkgXCJyb290XCIuYCk7XG4gIH1cblxuICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXM8SnNvblZhbHVlPihwcm9qZWN0Tm9kZVZhbHVlKSkge1xuICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgY2FzZSAndGFyZ2V0cyc6XG4gICAgICBjYXNlICdhcmNoaXRlY3QnOlxuICAgICAgICBjb25zdCBub2RlcyA9IGZpbmROb2RlQXRMb2NhdGlvbihwcm9qZWN0Tm9kZSwgW25hbWVdKTtcbiAgICAgICAgaWYgKCFpc0pzb25PYmplY3QodmFsdWUpIHx8ICFub2Rlcykge1xuICAgICAgICAgIGNvbnRleHQuZXJyb3IoYEludmFsaWQgXCIke25hbWV9XCIgZmllbGQgZm91bmQ7IGV4cGVjdGVkIGFuIG9iamVjdC5gLCB2YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaGFzVGFyZ2V0cyA9IHRydWU7XG4gICAgICAgIHRhcmdldHMgPSBwYXJzZVRhcmdldHNPYmplY3QocHJvamVjdE5hbWUsIG5vZGVzLCBjb250ZXh0KTtcbiAgICAgICAganNvbk1ldGFkYXRhLmhhc0xlZ2FjeVRhcmdldHNOYW1lID0gbmFtZSA9PT0gJ2FyY2hpdGVjdCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncHJlZml4JzpcbiAgICAgIGNhc2UgJ3Jvb3QnOlxuICAgICAgY2FzZSAnc291cmNlUm9vdCc6XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgY29udGV4dC53YXJuKGBQcm9qZWN0IHByb3BlcnR5IFwiJHtuYW1lfVwiIHNob3VsZCBiZSBhIHN0cmluZy5gLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByb3BlcnRpZXMpIHtcbiAgICAgICAgICBwcm9wZXJ0aWVzW25hbWVdID0gdmFsdWUgYXMgc3RyaW5nO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKCFjb250ZXh0LnVucHJlZml4ZWRQcm9qZWN0RXh0ZW5zaW9ucy5oYXMobmFtZSkgJiYgIS9eW2Etel17MSwzfS0uKi8udGVzdChuYW1lKSkge1xuICAgICAgICAgIGNvbnRleHQud2FybihcbiAgICAgICAgICAgIGBQcm9qZWN0ICcke3Byb2plY3ROYW1lfScgY29udGFpbnMgZXh0ZW5zaW9uIHdpdGggaW52YWxpZCBuYW1lICgke25hbWV9KS5gLFxuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChleHRlbnNpb25zKSB7XG4gICAgICAgICAgZXh0ZW5zaW9uc1tuYW1lXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGxldCBjb2xsZWN0aW9uTGlzdGVuZXI6IERlZmluaXRpb25Db2xsZWN0aW9uTGlzdGVuZXI8VGFyZ2V0RGVmaW5pdGlvbj4gfCB1bmRlZmluZWQ7XG4gIGlmIChjb250ZXh0LnRyYWNrQ2hhbmdlcykge1xuICAgIGNvbGxlY3Rpb25MaXN0ZW5lciA9IChuYW1lLCBuZXdWYWx1ZSwgY29sbGVjdGlvbikgPT4ge1xuICAgICAgaWYgKGhhc1RhcmdldHMpIHtcbiAgICAgICAganNvbk1ldGFkYXRhLmFkZENoYW5nZShbJ3Byb2plY3RzJywgcHJvamVjdE5hbWUsICd0YXJnZXRzJywgbmFtZV0sIG5ld1ZhbHVlLCAndGFyZ2V0Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBqc29uTWV0YWRhdGEuYWRkQ2hhbmdlKFxuICAgICAgICAgIFsncHJvamVjdHMnLCBwcm9qZWN0TmFtZSwgJ3RhcmdldHMnXSxcbiAgICAgICAgICBjb2xsZWN0aW9uLFxuICAgICAgICAgICd0YXJnZXRjb2xsZWN0aW9uJyxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgY29uc3QgYmFzZSA9IHtcbiAgICB0YXJnZXRzOiBuZXcgVGFyZ2V0RGVmaW5pdGlvbkNvbGxlY3Rpb24odGFyZ2V0cywgY29sbGVjdGlvbkxpc3RlbmVyKSxcbiAgICAvLyBJZiBub3QgdHJhY2tpbmcgY2hhbmdlcyB0aGUgYGV4dGVuc2lvbnNgIHZhcmlhYmxlIHdpbGwgY29udGFpbiB0aGUgcGFyc2VkXG4gICAgLy8gdmFsdWVzLiAgT3RoZXJ3aXNlIHRoZSBleHRlbnNpb25zIGFyZSB0cmFja2VkIHZpYSBhIHZpcnR1YWwgQVNUIG9iamVjdC5cbiAgICBleHRlbnNpb25zOlxuICAgICAgZXh0ZW5zaW9ucyA/P1xuICAgICAgY3JlYXRlVmlydHVhbEFzdE9iamVjdChwcm9qZWN0Tm9kZVZhbHVlLCB7XG4gICAgICAgIGV4Y2x1ZGU6IFsnYXJjaGl0ZWN0JywgJ3ByZWZpeCcsICdyb290JywgJ3NvdXJjZVJvb3QnLCAndGFyZ2V0cyddLFxuICAgICAgICBsaXN0ZW5lcihwYXRoLCB2YWx1ZSkge1xuICAgICAgICAgIGpzb25NZXRhZGF0YS5hZGRDaGFuZ2UoWydwcm9qZWN0cycsIHByb2plY3ROYW1lLCAuLi5wYXRoXSwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgfSksXG4gIH07XG5cbiAgY29uc3QgYmFzZUtleXMgPSBuZXcgU2V0KE9iamVjdC5rZXlzKGJhc2UpKTtcbiAgY29uc3QgcHJvamVjdCA9XG4gICAgcHJvcGVydGllcyA/P1xuICAgIGNyZWF0ZVZpcnR1YWxBc3RPYmplY3Q8UHJvamVjdERlZmluaXRpb24+KHByb2plY3ROb2RlVmFsdWUsIHtcbiAgICAgIGluY2x1ZGU6IFsncHJlZml4JywgJ3Jvb3QnLCAnc291cmNlUm9vdCcsIC4uLmJhc2VLZXlzXSxcbiAgICAgIGxpc3RlbmVyKHBhdGgsIHZhbHVlKSB7XG4gICAgICAgIGlmICghYmFzZUtleXMuaGFzKHBhdGhbMF0pKSB7XG4gICAgICAgICAganNvbk1ldGFkYXRhLmFkZENoYW5nZShbJ3Byb2plY3RzJywgcHJvamVjdE5hbWUsIC4uLnBhdGhdLCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24ocHJvamVjdCwgYmFzZSkgYXMgUHJvamVjdERlZmluaXRpb247XG59XG5cbmZ1bmN0aW9uIHBhcnNlVGFyZ2V0c09iamVjdChcbiAgcHJvamVjdE5hbWU6IHN0cmluZyxcbiAgdGFyZ2V0c05vZGU6IE5vZGUsXG4gIGNvbnRleHQ6IFBhcnNlckNvbnRleHQsXG4pOiBSZWNvcmQ8c3RyaW5nLCBUYXJnZXREZWZpbml0aW9uPiB7XG4gIGNvbnN0IGpzb25NZXRhZGF0YSA9IGNvbnRleHQubWV0YWRhdGE7XG4gIGNvbnN0IHRhcmdldHM6IFJlY29yZDxzdHJpbmcsIFRhcmdldERlZmluaXRpb24+ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblxuICBmb3IgKGNvbnN0IFtuYW1lLCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXM8SnNvblZhbHVlPihnZXROb2RlVmFsdWUodGFyZ2V0c05vZGUpKSkge1xuICAgIGlmICghaXNKc29uT2JqZWN0KHZhbHVlKSkge1xuICAgICAgY29udGV4dC53YXJuKCdTa2lwcGluZyBpbnZhbGlkIHRhcmdldCB2YWx1ZTsgZXhwZWN0ZWQgYW4gb2JqZWN0LicsIHZhbHVlKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjb250ZXh0LnRyYWNrQ2hhbmdlcykge1xuICAgICAgdGFyZ2V0c1tuYW1lXSA9IGNyZWF0ZVZpcnR1YWxBc3RPYmplY3Q8VGFyZ2V0RGVmaW5pdGlvbj4odmFsdWUsIHtcbiAgICAgICAgaW5jbHVkZTogWydidWlsZGVyJywgJ29wdGlvbnMnLCAnY29uZmlndXJhdGlvbnMnLCAnZGVmYXVsdENvbmZpZ3VyYXRpb24nXSxcbiAgICAgICAgbGlzdGVuZXIocGF0aCwgdmFsdWUpIHtcbiAgICAgICAgICBqc29uTWV0YWRhdGEuYWRkQ2hhbmdlKFsncHJvamVjdHMnLCBwcm9qZWN0TmFtZSwgJ3RhcmdldHMnLCBuYW1lLCAuLi5wYXRoXSwgdmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRhcmdldHNbbmFtZV0gPSB2YWx1ZSBhcyB1bmtub3duIGFzIFRhcmdldERlZmluaXRpb247XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldHM7XG59XG4iXX0=