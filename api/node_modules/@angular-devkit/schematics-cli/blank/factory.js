"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
function addSchematicToCollectionJson(collectionPath, schematicName, description) {
    return (tree) => {
        const collectionJson = tree.readJson(collectionPath);
        if (!(0, core_1.isJsonObject)(collectionJson) || !(0, core_1.isJsonObject)(collectionJson.schematics)) {
            throw new Error('Invalid collection.json; schematics needs to be an object.');
        }
        collectionJson['schematics'][schematicName] = description;
        tree.overwrite(collectionPath, JSON.stringify(collectionJson, undefined, 2));
    };
}
function default_1(options) {
    const schematicsVersion = require('@angular-devkit/schematics/package.json').version;
    const coreVersion = require('@angular-devkit/core/package.json').version;
    // Verify if we need to create a full project, or just add a new schematic.
    return (tree, context) => {
        if (!options.name) {
            throw new schematics_1.SchematicsException('name option is required.');
        }
        let collectionPath;
        try {
            const packageJson = tree.readJson('/package.json');
            if (typeof packageJson.schematics === 'string') {
                const p = (0, core_1.normalize)(packageJson.schematics);
                if (tree.exists(p)) {
                    collectionPath = p;
                }
            }
        }
        catch (_a) { }
        let source = (0, schematics_1.apply)((0, schematics_1.url)('./schematic-files'), [
            (0, schematics_1.template)({
                ...options,
                coreVersion,
                schematicsVersion,
                dot: '.',
                camelize: core_1.strings.camelize,
                dasherize: core_1.strings.dasherize,
            }),
        ]);
        // Simply create a new schematic project.
        if (!collectionPath) {
            collectionPath = (0, core_1.normalize)('/' + options.name + '/src/collection.json');
            source = (0, schematics_1.apply)((0, schematics_1.url)('./project-files'), [
                (0, schematics_1.template)({
                    ...options,
                    coreVersion,
                    schematicsVersion,
                    dot: '.',
                    camelize: core_1.strings.camelize,
                    dasherize: core_1.strings.dasherize,
                }),
                (0, schematics_1.mergeWith)(source),
                (0, schematics_1.move)(options.name),
            ]);
            context.addTask(new tasks_1.NodePackageInstallTask(options.name));
        }
        return (0, schematics_1.chain)([
            (0, schematics_1.mergeWith)(source),
            addSchematicToCollectionJson(collectionPath, core_1.strings.dasherize(options.name), {
                description: 'A blank schematic.',
                factory: './' + core_1.strings.dasherize(options.name) + '/index#' + core_1.strings.camelize(options.name),
            }),
        ]);
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3NfY2xpL2JsYW5rL2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFFSCwrQ0FBMEY7QUFDMUYsMkRBV29DO0FBQ3BDLDREQUEwRTtBQUcxRSxTQUFTLDRCQUE0QixDQUNuQyxjQUFvQixFQUNwQixhQUFxQixFQUNyQixXQUF1QjtJQUV2QixPQUFPLENBQUMsSUFBVSxFQUFFLEVBQUU7UUFDcEIsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUVyRCxJQUFJLENBQUMsSUFBQSxtQkFBWSxFQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBQSxtQkFBWSxFQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM3RSxNQUFNLElBQUksS0FBSyxDQUFDLDREQUE0RCxDQUFDLENBQUM7U0FDL0U7UUFFRCxjQUFjLENBQUMsWUFBWSxDQUFDLENBQUMsYUFBYSxDQUFDLEdBQUcsV0FBVyxDQUFDO1FBQzFELElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUMsQ0FBQztBQUNKLENBQUM7QUFFRCxtQkFBeUIsT0FBZTtJQUN0QyxNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUNyRixNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsbUNBQW1DLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFFekUsMkVBQTJFO0lBQzNFLE9BQU8sQ0FBQyxJQUFVLEVBQUUsT0FBeUIsRUFBRSxFQUFFO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBQ2pCLE1BQU0sSUFBSSxnQ0FBbUIsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1NBQzNEO1FBRUQsSUFBSSxjQUFnQyxDQUFDO1FBQ3JDLElBQUk7WUFDRixNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FFaEQsQ0FBQztZQUNGLElBQUksT0FBTyxXQUFXLENBQUMsVUFBVSxLQUFLLFFBQVEsRUFBRTtnQkFDOUMsTUFBTSxDQUFDLEdBQUcsSUFBQSxnQkFBUyxFQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNsQixjQUFjLEdBQUcsQ0FBQyxDQUFDO2lCQUNwQjthQUNGO1NBQ0Y7UUFBQyxXQUFNLEdBQUU7UUFFVixJQUFJLE1BQU0sR0FBRyxJQUFBLGtCQUFLLEVBQUMsSUFBQSxnQkFBRyxFQUFDLG1CQUFtQixDQUFDLEVBQUU7WUFDM0MsSUFBQSxxQkFBUSxFQUFDO2dCQUNQLEdBQUcsT0FBTztnQkFDVixXQUFXO2dCQUNYLGlCQUFpQjtnQkFDakIsR0FBRyxFQUFFLEdBQUc7Z0JBQ1IsUUFBUSxFQUFFLGNBQU8sQ0FBQyxRQUFRO2dCQUMxQixTQUFTLEVBQUUsY0FBTyxDQUFDLFNBQVM7YUFDN0IsQ0FBQztTQUNILENBQUMsQ0FBQztRQUVILHlDQUF5QztRQUN6QyxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ25CLGNBQWMsR0FBRyxJQUFBLGdCQUFTLEVBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsc0JBQXNCLENBQUMsQ0FBQztZQUN4RSxNQUFNLEdBQUcsSUFBQSxrQkFBSyxFQUFDLElBQUEsZ0JBQUcsRUFBQyxpQkFBaUIsQ0FBQyxFQUFFO2dCQUNyQyxJQUFBLHFCQUFRLEVBQUM7b0JBQ1AsR0FBSSxPQUFrQjtvQkFDdEIsV0FBVztvQkFDWCxpQkFBaUI7b0JBQ2pCLEdBQUcsRUFBRSxHQUFHO29CQUNSLFFBQVEsRUFBRSxjQUFPLENBQUMsUUFBUTtvQkFDMUIsU0FBUyxFQUFFLGNBQU8sQ0FBQyxTQUFTO2lCQUM3QixDQUFDO2dCQUNGLElBQUEsc0JBQVMsRUFBQyxNQUFNLENBQUM7Z0JBQ2pCLElBQUEsaUJBQUksRUFBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2FBQ25CLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSw4QkFBc0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUMzRDtRQUVELE9BQU8sSUFBQSxrQkFBSyxFQUFDO1lBQ1gsSUFBQSxzQkFBUyxFQUFDLE1BQU0sQ0FBQztZQUNqQiw0QkFBNEIsQ0FBQyxjQUFjLEVBQUUsY0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzVFLFdBQVcsRUFBRSxvQkFBb0I7Z0JBQ2pDLE9BQU8sRUFDTCxJQUFJLEdBQUcsY0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsU0FBUyxHQUFHLGNBQU8sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQzthQUN0RixDQUFDO1NBQ0gsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQTlERCw0QkE4REMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgSnNvbk9iamVjdCwgUGF0aCwgaXNKc29uT2JqZWN0LCBub3JtYWxpemUsIHN0cmluZ3MgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQge1xuICBSdWxlLFxuICBTY2hlbWF0aWNDb250ZXh0LFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxuICBUcmVlLFxuICBhcHBseSxcbiAgY2hhaW4sXG4gIG1lcmdlV2l0aCxcbiAgbW92ZSxcbiAgdGVtcGxhdGUsXG4gIHVybCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHsgTm9kZVBhY2thZ2VJbnN0YWxsVGFzayB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzL3Rhc2tzJztcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gJy4vc2NoZW1hJztcblxuZnVuY3Rpb24gYWRkU2NoZW1hdGljVG9Db2xsZWN0aW9uSnNvbihcbiAgY29sbGVjdGlvblBhdGg6IFBhdGgsXG4gIHNjaGVtYXRpY05hbWU6IHN0cmluZyxcbiAgZGVzY3JpcHRpb246IEpzb25PYmplY3QsXG4pOiBSdWxlIHtcbiAgcmV0dXJuICh0cmVlOiBUcmVlKSA9PiB7XG4gICAgY29uc3QgY29sbGVjdGlvbkpzb24gPSB0cmVlLnJlYWRKc29uKGNvbGxlY3Rpb25QYXRoKTtcblxuICAgIGlmICghaXNKc29uT2JqZWN0KGNvbGxlY3Rpb25Kc29uKSB8fCAhaXNKc29uT2JqZWN0KGNvbGxlY3Rpb25Kc29uLnNjaGVtYXRpY3MpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29sbGVjdGlvbi5qc29uOyBzY2hlbWF0aWNzIG5lZWRzIHRvIGJlIGFuIG9iamVjdC4nKTtcbiAgICB9XG5cbiAgICBjb2xsZWN0aW9uSnNvblsnc2NoZW1hdGljcyddW3NjaGVtYXRpY05hbWVdID0gZGVzY3JpcHRpb247XG4gICAgdHJlZS5vdmVyd3JpdGUoY29sbGVjdGlvblBhdGgsIEpTT04uc3RyaW5naWZ5KGNvbGxlY3Rpb25Kc29uLCB1bmRlZmluZWQsIDIpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbnM6IFNjaGVtYSk6IFJ1bGUge1xuICBjb25zdCBzY2hlbWF0aWNzVmVyc2lvbiA9IHJlcXVpcmUoJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzL3BhY2thZ2UuanNvbicpLnZlcnNpb247XG4gIGNvbnN0IGNvcmVWZXJzaW9uID0gcmVxdWlyZSgnQGFuZ3VsYXItZGV2a2l0L2NvcmUvcGFja2FnZS5qc29uJykudmVyc2lvbjtcblxuICAvLyBWZXJpZnkgaWYgd2UgbmVlZCB0byBjcmVhdGUgYSBmdWxsIHByb2plY3QsIG9yIGp1c3QgYWRkIGEgbmV3IHNjaGVtYXRpYy5cbiAgcmV0dXJuICh0cmVlOiBUcmVlLCBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSA9PiB7XG4gICAgaWYgKCFvcHRpb25zLm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBTY2hlbWF0aWNzRXhjZXB0aW9uKCduYW1lIG9wdGlvbiBpcyByZXF1aXJlZC4nKTtcbiAgICB9XG5cbiAgICBsZXQgY29sbGVjdGlvblBhdGg6IFBhdGggfCB1bmRlZmluZWQ7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHBhY2thZ2VKc29uID0gdHJlZS5yZWFkSnNvbignL3BhY2thZ2UuanNvbicpIGFzIHtcbiAgICAgICAgc2NoZW1hdGljczogdW5rbm93bjtcbiAgICAgIH07XG4gICAgICBpZiAodHlwZW9mIHBhY2thZ2VKc29uLnNjaGVtYXRpY3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGNvbnN0IHAgPSBub3JtYWxpemUocGFja2FnZUpzb24uc2NoZW1hdGljcyk7XG4gICAgICAgIGlmICh0cmVlLmV4aXN0cyhwKSkge1xuICAgICAgICAgIGNvbGxlY3Rpb25QYXRoID0gcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2gge31cblxuICAgIGxldCBzb3VyY2UgPSBhcHBseSh1cmwoJy4vc2NoZW1hdGljLWZpbGVzJyksIFtcbiAgICAgIHRlbXBsYXRlKHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgY29yZVZlcnNpb24sXG4gICAgICAgIHNjaGVtYXRpY3NWZXJzaW9uLFxuICAgICAgICBkb3Q6ICcuJyxcbiAgICAgICAgY2FtZWxpemU6IHN0cmluZ3MuY2FtZWxpemUsXG4gICAgICAgIGRhc2hlcml6ZTogc3RyaW5ncy5kYXNoZXJpemUsXG4gICAgICB9KSxcbiAgICBdKTtcblxuICAgIC8vIFNpbXBseSBjcmVhdGUgYSBuZXcgc2NoZW1hdGljIHByb2plY3QuXG4gICAgaWYgKCFjb2xsZWN0aW9uUGF0aCkge1xuICAgICAgY29sbGVjdGlvblBhdGggPSBub3JtYWxpemUoJy8nICsgb3B0aW9ucy5uYW1lICsgJy9zcmMvY29sbGVjdGlvbi5qc29uJyk7XG4gICAgICBzb3VyY2UgPSBhcHBseSh1cmwoJy4vcHJvamVjdC1maWxlcycpLCBbXG4gICAgICAgIHRlbXBsYXRlKHtcbiAgICAgICAgICAuLi4ob3B0aW9ucyBhcyBvYmplY3QpLFxuICAgICAgICAgIGNvcmVWZXJzaW9uLFxuICAgICAgICAgIHNjaGVtYXRpY3NWZXJzaW9uLFxuICAgICAgICAgIGRvdDogJy4nLFxuICAgICAgICAgIGNhbWVsaXplOiBzdHJpbmdzLmNhbWVsaXplLFxuICAgICAgICAgIGRhc2hlcml6ZTogc3RyaW5ncy5kYXNoZXJpemUsXG4gICAgICAgIH0pLFxuICAgICAgICBtZXJnZVdpdGgoc291cmNlKSxcbiAgICAgICAgbW92ZShvcHRpb25zLm5hbWUpLFxuICAgICAgXSk7XG5cbiAgICAgIGNvbnRleHQuYWRkVGFzayhuZXcgTm9kZVBhY2thZ2VJbnN0YWxsVGFzayhvcHRpb25zLm5hbWUpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2hhaW4oW1xuICAgICAgbWVyZ2VXaXRoKHNvdXJjZSksXG4gICAgICBhZGRTY2hlbWF0aWNUb0NvbGxlY3Rpb25Kc29uKGNvbGxlY3Rpb25QYXRoLCBzdHJpbmdzLmRhc2hlcml6ZShvcHRpb25zLm5hbWUpLCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnQSBibGFuayBzY2hlbWF0aWMuJyxcbiAgICAgICAgZmFjdG9yeTpcbiAgICAgICAgICAnLi8nICsgc3RyaW5ncy5kYXNoZXJpemUob3B0aW9ucy5uYW1lKSArICcvaW5kZXgjJyArIHN0cmluZ3MuY2FtZWxpemUob3B0aW9ucy5uYW1lKSxcbiAgICAgIH0pLFxuICAgIF0pO1xuICB9O1xufVxuIl19