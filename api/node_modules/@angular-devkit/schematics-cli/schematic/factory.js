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
function default_1(options) {
    const schematicsVersion = require('@angular-devkit/schematics/package.json').version;
    const coreVersion = require('@angular-devkit/core/package.json').version;
    return (_, context) => {
        context.addTask(new tasks_1.NodePackageInstallTask(options.name));
        return (0, schematics_1.mergeWith)((0, schematics_1.apply)((0, schematics_1.url)('./files'), [
            (0, schematics_1.partitionApplyMerge)((p) => !/\/src\/.*?\/files\//.test(p), (0, schematics_1.template)({
                ...options,
                coreVersion,
                schematicsVersion,
                dot: '.',
                dasherize: core_1.strings.dasherize,
            })),
            (0, schematics_1.move)(options.name),
        ]));
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3NfY2xpL3NjaGVtYXRpYy9mYWN0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsK0NBQStDO0FBQy9DLDJEQVFvQztBQUNwQyw0REFBMEU7QUFHMUUsbUJBQXlCLE9BQWU7SUFDdEMsTUFBTSxpQkFBaUIsR0FBRyxPQUFPLENBQUMseUNBQXlDLENBQUMsQ0FBQyxPQUFPLENBQUM7SUFDckYsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLG1DQUFtQyxDQUFDLENBQUMsT0FBTyxDQUFDO0lBRXpFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUU7UUFDcEIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLDhCQUFzQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTFELE9BQU8sSUFBQSxzQkFBUyxFQUNkLElBQUEsa0JBQUssRUFBQyxJQUFBLGdCQUFHLEVBQUMsU0FBUyxDQUFDLEVBQUU7WUFDcEIsSUFBQSxnQ0FBbUIsRUFDakIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUNyQyxJQUFBLHFCQUFRLEVBQUM7Z0JBQ1AsR0FBRyxPQUFPO2dCQUNWLFdBQVc7Z0JBQ1gsaUJBQWlCO2dCQUNqQixHQUFHLEVBQUUsR0FBRztnQkFDUixTQUFTLEVBQUUsY0FBTyxDQUFDLFNBQVM7YUFDN0IsQ0FBQyxDQUNIO1lBQ0QsSUFBQSxpQkFBSSxFQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7U0FDbkIsQ0FBQyxDQUNILENBQUM7SUFDSixDQUFDLENBQUM7QUFDSixDQUFDO0FBdkJELDRCQXVCQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBzdHJpbmdzIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHtcbiAgUnVsZSxcbiAgYXBwbHksXG4gIG1lcmdlV2l0aCxcbiAgbW92ZSxcbiAgcGFydGl0aW9uQXBwbHlNZXJnZSxcbiAgdGVtcGxhdGUsXG4gIHVybCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3MnO1xuaW1wb3J0IHsgTm9kZVBhY2thZ2VJbnN0YWxsVGFzayB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzL3Rhc2tzJztcbmltcG9ydCB7IFNjaGVtYSB9IGZyb20gJy4vc2NoZW1hJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG9wdGlvbnM6IFNjaGVtYSk6IFJ1bGUge1xuICBjb25zdCBzY2hlbWF0aWNzVmVyc2lvbiA9IHJlcXVpcmUoJ0Bhbmd1bGFyLWRldmtpdC9zY2hlbWF0aWNzL3BhY2thZ2UuanNvbicpLnZlcnNpb247XG4gIGNvbnN0IGNvcmVWZXJzaW9uID0gcmVxdWlyZSgnQGFuZ3VsYXItZGV2a2l0L2NvcmUvcGFja2FnZS5qc29uJykudmVyc2lvbjtcblxuICByZXR1cm4gKF8sIGNvbnRleHQpID0+IHtcbiAgICBjb250ZXh0LmFkZFRhc2sobmV3IE5vZGVQYWNrYWdlSW5zdGFsbFRhc2sob3B0aW9ucy5uYW1lKSk7XG5cbiAgICByZXR1cm4gbWVyZ2VXaXRoKFxuICAgICAgYXBwbHkodXJsKCcuL2ZpbGVzJyksIFtcbiAgICAgICAgcGFydGl0aW9uQXBwbHlNZXJnZShcbiAgICAgICAgICAocCkgPT4gIS9cXC9zcmNcXC8uKj9cXC9maWxlc1xcLy8udGVzdChwKSxcbiAgICAgICAgICB0ZW1wbGF0ZSh7XG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgY29yZVZlcnNpb24sXG4gICAgICAgICAgICBzY2hlbWF0aWNzVmVyc2lvbixcbiAgICAgICAgICAgIGRvdDogJy4nLFxuICAgICAgICAgICAgZGFzaGVyaXplOiBzdHJpbmdzLmRhc2hlcml6ZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgKSxcbiAgICAgICAgbW92ZShvcHRpb25zLm5hbWUpLFxuICAgICAgXSksXG4gICAgKTtcbiAgfTtcbn1cbiJdfQ==