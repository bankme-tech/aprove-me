"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1() {
    return (options, context) => {
        if (!(options === null || options === void 0 ? void 0 : options.name)) {
            throw new Error('RunSchematicTask requires an options object with a non-empty name property.');
        }
        const maybeWorkflow = context.engine.workflow;
        const collection = options.collection || context.schematic.collection.description.name;
        if (!maybeWorkflow) {
            throw new Error('Need Workflow to support executing schematics as post tasks.');
        }
        return maybeWorkflow.execute({
            collection: collection,
            schematic: options.name,
            options: options.options,
            // Allow private when calling from the same collection.
            allowPrivate: collection == context.schematic.collection.description.name,
        });
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhlY3V0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmd1bGFyX2RldmtpdC9zY2hlbWF0aWNzL3Rhc2tzL3J1bi1zY2hlbWF0aWMvZXhlY3V0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7QUFLSDtJQUNFLE9BQU8sQ0FBQyxPQUFnRCxFQUFFLE9BQXlCLEVBQUUsRUFBRTtRQUNyRixJQUFJLENBQUMsQ0FBQSxPQUFPLGFBQVAsT0FBTyx1QkFBUCxPQUFPLENBQUUsSUFBSSxDQUFBLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FDYiw2RUFBNkUsQ0FDOUUsQ0FBQztTQUNIO1FBRUQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7UUFDOUMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBRXZGLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw4REFBOEQsQ0FBQyxDQUFDO1NBQ2pGO1FBRUQsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQzNCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFNBQVMsRUFBRSxPQUFPLENBQUMsSUFBSTtZQUN2QixPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87WUFDeEIsdURBQXVEO1lBQ3ZELFlBQVksRUFBRSxVQUFVLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLElBQUk7U0FDMUUsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQXZCRCw0QkF1QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgU2NoZW1hdGljQ29udGV4dCwgVGFza0V4ZWN1dG9yIH0gZnJvbSAnLi4vLi4vc3JjJztcbmltcG9ydCB7IFJ1blNjaGVtYXRpY1Rhc2tPcHRpb25zIH0gZnJvbSAnLi9vcHRpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCk6IFRhc2tFeGVjdXRvcjxSdW5TY2hlbWF0aWNUYXNrT3B0aW9uczx7fT4+IHtcbiAgcmV0dXJuIChvcHRpb25zOiBSdW5TY2hlbWF0aWNUYXNrT3B0aW9uczx7fT4gfCB1bmRlZmluZWQsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpID0+IHtcbiAgICBpZiAoIW9wdGlvbnM/Lm5hbWUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1J1blNjaGVtYXRpY1Rhc2sgcmVxdWlyZXMgYW4gb3B0aW9ucyBvYmplY3Qgd2l0aCBhIG5vbi1lbXB0eSBuYW1lIHByb3BlcnR5LicsXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IG1heWJlV29ya2Zsb3cgPSBjb250ZXh0LmVuZ2luZS53b3JrZmxvdztcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gb3B0aW9ucy5jb2xsZWN0aW9uIHx8IGNvbnRleHQuc2NoZW1hdGljLmNvbGxlY3Rpb24uZGVzY3JpcHRpb24ubmFtZTtcblxuICAgIGlmICghbWF5YmVXb3JrZmxvdykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZWVkIFdvcmtmbG93IHRvIHN1cHBvcnQgZXhlY3V0aW5nIHNjaGVtYXRpY3MgYXMgcG9zdCB0YXNrcy4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWF5YmVXb3JrZmxvdy5leGVjdXRlKHtcbiAgICAgIGNvbGxlY3Rpb246IGNvbGxlY3Rpb24sXG4gICAgICBzY2hlbWF0aWM6IG9wdGlvbnMubmFtZSxcbiAgICAgIG9wdGlvbnM6IG9wdGlvbnMub3B0aW9ucyxcbiAgICAgIC8vIEFsbG93IHByaXZhdGUgd2hlbiBjYWxsaW5nIGZyb20gdGhlIHNhbWUgY29sbGVjdGlvbi5cbiAgICAgIGFsbG93UHJpdmF0ZTogY29sbGVjdGlvbiA9PSBjb250ZXh0LnNjaGVtYXRpYy5jb2xsZWN0aW9uLmRlc2NyaXB0aW9uLm5hbWUsXG4gICAgfSk7XG4gIH07XG59XG4iXX0=