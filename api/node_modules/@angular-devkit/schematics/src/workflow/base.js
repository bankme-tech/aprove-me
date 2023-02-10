"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseWorkflow = void 0;
const core_1 = require("@angular-devkit/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const engine_1 = require("../engine");
const exception_1 = require("../exception/exception");
const formats_1 = require("../formats");
const dryrun_1 = require("../sink/dryrun");
const host_1 = require("../sink/host");
const host_tree_1 = require("../tree/host-tree");
/**
 * Base class for workflows. Even without abstract methods, this class should not be used without
 * surrounding some initialization for the registry and host. This class only adds life cycle and
 * dryrun/force support. You need to provide any registry and task executors that you need to
 * support.
 * See {@see NodeWorkflow} implementation for how to make a specialized subclass of this.
 * TODO: add default set of CoreSchemaRegistry transforms. Once the job refactor is done, use that
 *       as the support for tasks.
 *
 * @public
 */
class BaseWorkflow {
    constructor(options) {
        this._reporter = new rxjs_1.Subject();
        this._lifeCycle = new rxjs_1.Subject();
        this._host = options.host;
        this._engineHost = options.engineHost;
        if (options.registry) {
            this._registry = options.registry;
        }
        else {
            this._registry = new core_1.schema.CoreSchemaRegistry(formats_1.standardFormats);
            this._registry.addPostTransform(core_1.schema.transforms.addUndefinedDefaults);
        }
        this._engine = new engine_1.SchematicEngine(this._engineHost, this);
        this._context = [];
        this._force = options.force || false;
        this._dryRun = options.dryRun || false;
    }
    get context() {
        const maybeContext = this._context[this._context.length - 1];
        if (!maybeContext) {
            throw new Error('Cannot get context when workflow is not executing...');
        }
        return maybeContext;
    }
    get engine() {
        return this._engine;
    }
    get engineHost() {
        return this._engineHost;
    }
    get registry() {
        return this._registry;
    }
    get reporter() {
        return this._reporter.asObservable();
    }
    get lifeCycle() {
        return this._lifeCycle.asObservable();
    }
    _createSinks() {
        let error = false;
        const dryRunSink = new dryrun_1.DryRunSink(this._host, this._force);
        const dryRunSubscriber = dryRunSink.reporter.subscribe((event) => {
            this._reporter.next(event);
            error = error || event.kind == 'error';
        });
        // We need two sinks if we want to output what will happen, and actually do the work.
        return [
            dryRunSink,
            // Add a custom sink that clean ourselves and throws an error if an error happened.
            {
                commit() {
                    dryRunSubscriber.unsubscribe();
                    if (error) {
                        return (0, rxjs_1.throwError)(new exception_1.UnsuccessfulWorkflowExecution());
                    }
                    return (0, rxjs_1.of)();
                },
            },
            // Only add a HostSink if this is not a dryRun.
            ...(!this._dryRun ? [new host_1.HostSink(this._host, this._force)] : []),
        ];
    }
    execute(options) {
        const parentContext = this._context[this._context.length - 1];
        if (!parentContext) {
            this._lifeCycle.next({ kind: 'start' });
        }
        /** Create the collection and the schematic. */
        const collection = this._engine.createCollection(options.collection);
        // Only allow private schematics if called from the same collection.
        const allowPrivate = options.allowPrivate || (parentContext && parentContext.collection === options.collection);
        const schematic = collection.createSchematic(options.schematic, allowPrivate);
        const sinks = this._createSinks();
        this._lifeCycle.next({ kind: 'workflow-start' });
        const context = {
            ...options,
            debug: options.debug || false,
            logger: options.logger || (parentContext && parentContext.logger) || new core_1.logging.NullLogger(),
            parentContext,
        };
        this._context.push(context);
        return schematic
            .call(options.options, (0, rxjs_1.of)(new host_tree_1.HostTree(this._host)), { logger: context.logger })
            .pipe((0, operators_1.concatMap)((tree) => {
            // Process all sinks.
            return (0, rxjs_1.concat)((0, rxjs_1.from)(sinks).pipe((0, operators_1.concatMap)((sink) => sink.commit(tree)), (0, operators_1.ignoreElements)()), (0, rxjs_1.of)(tree));
        }), (0, operators_1.concatMap)(() => {
            if (this._dryRun) {
                return rxjs_1.EMPTY;
            }
            this._lifeCycle.next({ kind: 'post-tasks-start' });
            return this._engine
                .executePostTasks()
                .pipe((0, operators_1.tap)({ complete: () => this._lifeCycle.next({ kind: 'post-tasks-end' }) }), (0, operators_1.defaultIfEmpty)(), (0, operators_1.last)());
        }), (0, operators_1.tap)({
            complete: () => {
                this._lifeCycle.next({ kind: 'workflow-end' });
                this._context.pop();
                if (this._context.length == 0) {
                    this._lifeCycle.next({ kind: 'end' });
                }
            },
        }));
    }
}
exports.BaseWorkflow = BaseWorkflow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3Mvc3JjL3dvcmtmbG93L2Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7O0FBRUgsK0NBQWtFO0FBQ2xFLCtCQUFnRjtBQUNoRiw4Q0FBc0Y7QUFDdEYsc0NBQWdFO0FBQ2hFLHNEQUF1RTtBQUN2RSx3Q0FBNkM7QUFDN0MsMkNBQXlEO0FBQ3pELHVDQUF3QztBQUV4QyxpREFBNkM7QUFrQjdDOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFzQixZQUFZO0lBZWhDLFlBQVksT0FBNEI7UUFSOUIsY0FBUyxHQUF5QixJQUFJLGNBQU8sRUFBRSxDQUFDO1FBQ2hELGVBQVUsR0FBNEIsSUFBSSxjQUFPLEVBQUUsQ0FBQztRQVE1RCxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBRXRDLElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUM7U0FDbkM7YUFBTTtZQUNMLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxhQUFNLENBQUMsa0JBQWtCLENBQUMseUJBQWUsQ0FBQyxDQUFDO1lBQ2hFLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsYUFBTSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1NBQ3pFO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLHdCQUFlLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVuQixJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FB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LFlBQUssQ0FBQzthQUNkO1lBRUQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUUsQ0FBQyxDQUFDO1lBRW5ELE9BQU8sSUFBSSxDQUFDLE9BQU87aUJBQ2hCLGdCQUFnQixFQUFFO2lCQUNsQixJQUFJLENBQ0gsSUFBQSxlQUFHLEVBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFDekUsSUFBQSwwQkFBYyxHQUFFLEVBQ2hCLElBQUEsZ0JBQUksR0FBRSxDQUNQLENBQUM7UUFDTixDQUFDLENBQUMsRUFDRixJQUFBLGVBQUcsRUFBQztZQUNGLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztnQkFFcEIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7aUJBQ3ZDO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FDSCxDQUFDO0lBQ04sQ0FBQztDQUNGO0FBM0pELG9DQTJKQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBsb2dnaW5nLCBzY2hlbWEsIHZpcnR1YWxGcyB9IGZyb20gJ0Bhbmd1bGFyLWRldmtpdC9jb3JlJztcbmltcG9ydCB7IEVNUFRZLCBPYnNlcnZhYmxlLCBTdWJqZWN0LCBjb25jYXQsIGZyb20sIG9mLCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb25jYXRNYXAsIGRlZmF1bHRJZkVtcHR5LCBpZ25vcmVFbGVtZW50cywgbGFzdCwgdGFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgRW5naW5lLCBFbmdpbmVIb3N0LCBTY2hlbWF0aWNFbmdpbmUgfSBmcm9tICcuLi9lbmdpbmUnO1xuaW1wb3J0IHsgVW5zdWNjZXNzZnVsV29ya2Zsb3dFeGVjdXRpb24gfSBmcm9tICcuLi9leGNlcHRpb24vZXhjZXB0aW9uJztcbmltcG9ydCB7IHN0YW5kYXJkRm9ybWF0cyB9IGZyb20gJy4uL2Zvcm1hdHMnO1xuaW1wb3J0IHsgRHJ5UnVuRXZlbnQsIERyeVJ1blNpbmsgfSBmcm9tICcuLi9zaW5rL2RyeXJ1bic7XG5pbXBvcnQgeyBIb3N0U2luayB9IGZyb20gJy4uL3NpbmsvaG9zdCc7XG5pbXBvcnQgeyBTaW5rIH0gZnJvbSAnLi4vc2luay9zaW5rJztcbmltcG9ydCB7IEhvc3RUcmVlIH0gZnJvbSAnLi4vdHJlZS9ob3N0LXRyZWUnO1xuaW1wb3J0IHsgVHJlZSB9IGZyb20gJy4uL3RyZWUvaW50ZXJmYWNlJztcbmltcG9ydCB7XG4gIExpZmVDeWNsZUV2ZW50LFxuICBSZXF1aXJlZFdvcmtmbG93RXhlY3V0aW9uQ29udGV4dCxcbiAgV29ya2Zsb3csXG4gIFdvcmtmbG93RXhlY3V0aW9uQ29udGV4dCxcbn0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJhc2VXb3JrZmxvd09wdGlvbnMge1xuICBob3N0OiB2aXJ0dWFsRnMuSG9zdDtcbiAgZW5naW5lSG9zdDogRW5naW5lSG9zdDx7fSwge30+O1xuICByZWdpc3RyeT86IHNjaGVtYS5Db3JlU2NoZW1hUmVnaXN0cnk7XG5cbiAgZm9yY2U/OiBib29sZWFuO1xuICBkcnlSdW4/OiBib29sZWFuO1xufVxuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIHdvcmtmbG93cy4gRXZlbiB3aXRob3V0IGFic3RyYWN0IG1ldGhvZHMsIHRoaXMgY2xhc3Mgc2hvdWxkIG5vdCBiZSB1c2VkIHdpdGhvdXRcbiAqIHN1cnJvdW5kaW5nIHNvbWUgaW5pdGlhbGl6YXRpb24gZm9yIHRoZSByZWdpc3RyeSBhbmQgaG9zdC4gVGhpcyBjbGFzcyBvbmx5IGFkZHMgbGlmZSBjeWNsZSBhbmRcbiAqIGRyeXJ1bi9mb3JjZSBzdXBwb3J0LiBZb3UgbmVlZCB0byBwcm92aWRlIGFueSByZWdpc3RyeSBhbmQgdGFzayBleGVjdXRvcnMgdGhhdCB5b3UgbmVlZCB0b1xuICogc3VwcG9ydC5cbiAqIFNlZSB7QHNlZSBOb2RlV29ya2Zsb3d9IGltcGxlbWVudGF0aW9uIGZvciBob3cgdG8gbWFrZSBhIHNwZWNpYWxpemVkIHN1YmNsYXNzIG9mIHRoaXMuXG4gKiBUT0RPOiBhZGQgZGVmYXVsdCBzZXQgb2YgQ29yZVNjaGVtYVJlZ2lzdHJ5IHRyYW5zZm9ybXMuIE9uY2UgdGhlIGpvYiByZWZhY3RvciBpcyBkb25lLCB1c2UgdGhhdFxuICogICAgICAgYXMgdGhlIHN1cHBvcnQgZm9yIHRhc2tzLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJhc2VXb3JrZmxvdyBpbXBsZW1lbnRzIFdvcmtmbG93IHtcbiAgcHJvdGVjdGVkIF9lbmdpbmU6IEVuZ2luZTx7fSwge30+O1xuICBwcm90ZWN0ZWQgX2VuZ2luZUhvc3Q6IEVuZ2luZUhvc3Q8e30sIHt9PjtcbiAgcHJvdGVjdGVkIF9yZWdpc3RyeTogc2NoZW1hLkNvcmVTY2hlbWFSZWdpc3RyeTtcblxuICBwcm90ZWN0ZWQgX2hvc3Q6IHZpcnR1YWxGcy5Ib3N0O1xuXG4gIHByb3RlY3RlZCBfcmVwb3J0ZXI6IFN1YmplY3Q8RHJ5UnVuRXZlbnQ+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHJvdGVjdGVkIF9saWZlQ3ljbGU6IFN1YmplY3Q8TGlmZUN5Y2xlRXZlbnQ+ID0gbmV3IFN1YmplY3QoKTtcblxuICBwcm90ZWN0ZWQgX2NvbnRleHQ6IFdvcmtmbG93RXhlY3V0aW9uQ29udGV4dFtdO1xuXG4gIHByb3RlY3RlZCBfZm9yY2U6IGJvb2xlYW47XG4gIHByb3RlY3RlZCBfZHJ5UnVuOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM6IEJhc2VXb3JrZmxvd09wdGlvbnMpIHtcbiAgICB0aGlzLl9ob3N0ID0gb3B0aW9ucy5ob3N0O1xuICAgIHRoaXMuX2VuZ2luZUhvc3QgPSBvcHRpb25zLmVuZ2luZUhvc3Q7XG5cbiAgICBpZiAob3B0aW9ucy5yZWdpc3RyeSkge1xuICAgICAgdGhpcy5fcmVnaXN0cnkgPSBvcHRpb25zLnJlZ2lzdHJ5O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9yZWdpc3RyeSA9IG5ldyBzY2hlbWEuQ29yZVNjaGVtYVJlZ2lzdHJ5KHN0YW5kYXJkRm9ybWF0cyk7XG4gICAgICB0aGlzLl9yZWdpc3RyeS5hZGRQb3N0VHJhbnNmb3JtKHNjaGVtYS50cmFuc2Zvcm1zLmFkZFVuZGVmaW5lZERlZmF1bHRzKTtcbiAgICB9XG5cbiAgICB0aGlzLl9lbmdpbmUgPSBuZXcgU2NoZW1hdGljRW5naW5lKHRoaXMuX2VuZ2luZUhvc3QsIHRoaXMpO1xuXG4gICAgdGhpcy5fY29udGV4dCA9IFtdO1xuXG4gICAgdGhpcy5fZm9yY2UgPSBvcHRpb25zLmZvcmNlIHx8IGZhbHNlO1xuICAgIHRoaXMuX2RyeVJ1biA9IG9wdGlvbnMuZHJ5UnVuIHx8IGZhbHNlO1xuICB9XG5cbiAgZ2V0IGNvbnRleHQoKTogUmVhZG9ubHk8V29ya2Zsb3dFeGVjdXRpb25Db250ZXh0PiB7XG4gICAgY29uc3QgbWF5YmVDb250ZXh0ID0gdGhpcy5fY29udGV4dFt0aGlzLl9jb250ZXh0Lmxlbmd0aCAtIDFdO1xuICAgIGlmICghbWF5YmVDb250ZXh0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBnZXQgY29udGV4dCB3aGVuIHdvcmtmbG93IGlzIG5vdCBleGVjdXRpbmcuLi4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbWF5YmVDb250ZXh0O1xuICB9XG4gIGdldCBlbmdpbmUoKTogRW5naW5lPHt9LCB7fT4ge1xuICAgIHJldHVybiB0aGlzLl9lbmdpbmU7XG4gIH1cbiAgZ2V0IGVuZ2luZUhvc3QoKTogRW5naW5lSG9zdDx7fSwge30+IHtcbiAgICByZXR1cm4gdGhpcy5fZW5naW5lSG9zdDtcbiAgfVxuICBnZXQgcmVnaXN0cnkoKTogc2NoZW1hLlNjaGVtYVJlZ2lzdHJ5IHtcbiAgICByZXR1cm4gdGhpcy5fcmVnaXN0cnk7XG4gIH1cbiAgZ2V0IHJlcG9ydGVyKCk6IE9ic2VydmFibGU8RHJ5UnVuRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcmVwb3J0ZXIuYXNPYnNlcnZhYmxlKCk7XG4gIH1cbiAgZ2V0IGxpZmVDeWNsZSgpOiBPYnNlcnZhYmxlPExpZmVDeWNsZUV2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuX2xpZmVDeWNsZS5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfY3JlYXRlU2lua3MoKTogU2lua1tdIHtcbiAgICBsZXQgZXJyb3IgPSBmYWxzZTtcblxuICAgIGNvbnN0IGRyeVJ1blNpbmsgPSBuZXcgRHJ5UnVuU2luayh0aGlzLl9ob3N0LCB0aGlzLl9mb3JjZSk7XG4gICAgY29uc3QgZHJ5UnVuU3Vic2NyaWJlciA9IGRyeVJ1blNpbmsucmVwb3J0ZXIuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgdGhpcy5fcmVwb3J0ZXIubmV4dChldmVudCk7XG4gICAgICBlcnJvciA9IGVycm9yIHx8IGV2ZW50LmtpbmQgPT0gJ2Vycm9yJztcbiAgICB9KTtcblxuICAgIC8vIFdlIG5lZWQgdHdvIHNpbmtzIGlmIHdlIHdhbnQgdG8gb3V0cHV0IHdoYXQgd2lsbCBoYXBwZW4sIGFuZCBhY3R1YWxseSBkbyB0aGUgd29yay5cbiAgICByZXR1cm4gW1xuICAgICAgZHJ5UnVuU2luayxcbiAgICAgIC8vIEFkZCBhIGN1c3RvbSBzaW5rIHRoYXQgY2xlYW4gb3Vyc2VsdmVzIGFuZCB0aHJvd3MgYW4gZXJyb3IgaWYgYW4gZXJyb3IgaGFwcGVuZWQuXG4gICAgICB7XG4gICAgICAgIGNvbW1pdCgpIHtcbiAgICAgICAgICBkcnlSdW5TdWJzY3JpYmVyLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgVW5zdWNjZXNzZnVsV29ya2Zsb3dFeGVjdXRpb24oKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIG9mKCk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuXG4gICAgICAvLyBPbmx5IGFkZCBhIEhvc3RTaW5rIGlmIHRoaXMgaXMgbm90IGEgZHJ5UnVuLlxuICAgICAgLi4uKCF0aGlzLl9kcnlSdW4gPyBbbmV3IEhvc3RTaW5rKHRoaXMuX2hvc3QsIHRoaXMuX2ZvcmNlKV0gOiBbXSksXG4gICAgXTtcbiAgfVxuXG4gIGV4ZWN1dGUoXG4gICAgb3B0aW9uczogUGFydGlhbDxXb3JrZmxvd0V4ZWN1dGlvbkNvbnRleHQ+ICYgUmVxdWlyZWRXb3JrZmxvd0V4ZWN1dGlvbkNvbnRleHQsXG4gICk6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIGNvbnN0IHBhcmVudENvbnRleHQgPSB0aGlzLl9jb250ZXh0W3RoaXMuX2NvbnRleHQubGVuZ3RoIC0gMV07XG5cbiAgICBpZiAoIXBhcmVudENvbnRleHQpIHtcbiAgICAgIHRoaXMuX2xpZmVDeWNsZS5uZXh0KHsga2luZDogJ3N0YXJ0JyB9KTtcbiAgICB9XG5cbiAgICAvKiogQ3JlYXRlIHRoZSBjb2xsZWN0aW9uIGFuZCB0aGUgc2NoZW1hdGljLiAqL1xuICAgIGNvbnN0IGNvbGxlY3Rpb24gPSB0aGlzLl9lbmdpbmUuY3JlYXRlQ29sbGVjdGlvbihvcHRpb25zLmNvbGxlY3Rpb24pO1xuICAgIC8vIE9ubHkgYWxsb3cgcHJpdmF0ZSBzY2hlbWF0aWNzIGlmIGNhbGxlZCBmcm9tIHRoZSBzYW1lIGNvbGxlY3Rpb24uXG4gICAgY29uc3QgYWxsb3dQcml2YXRlID1cbiAgICAgIG9wdGlvbnMuYWxsb3dQcml2YXRlIHx8IChwYXJlbnRDb250ZXh0ICYmIHBhcmVudENvbnRleHQuY29sbGVjdGlvbiA9PT0gb3B0aW9ucy5jb2xsZWN0aW9uKTtcbiAgICBjb25zdCBzY2hlbWF0aWMgPSBjb2xsZWN0aW9uLmNyZWF0ZVNjaGVtYXRpYyhvcHRpb25zLnNjaGVtYXRpYywgYWxsb3dQcml2YXRlKTtcblxuICAgIGNvbnN0IHNpbmtzID0gdGhpcy5fY3JlYXRlU2lua3MoKTtcblxuICAgIHRoaXMuX2xpZmVDeWNsZS5uZXh0KHsga2luZDogJ3dvcmtmbG93LXN0YXJ0JyB9KTtcblxuICAgIGNvbnN0IGNvbnRleHQgPSB7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgZGVidWc6IG9wdGlvbnMuZGVidWcgfHwgZmFsc2UsXG4gICAgICBsb2dnZXI6IG9wdGlvbnMubG9nZ2VyIHx8IChwYXJlbnRDb250ZXh0ICYmIHBhcmVudENvbnRleHQubG9nZ2VyKSB8fCBuZXcgbG9nZ2luZy5OdWxsTG9nZ2VyKCksXG4gICAgICBwYXJlbnRDb250ZXh0LFxuICAgIH07XG4gICAgdGhpcy5fY29udGV4dC5wdXNoKGNvbnRleHQpO1xuXG4gICAgcmV0dXJuIHNjaGVtYXRpY1xuICAgICAgLmNhbGwob3B0aW9ucy5vcHRpb25zLCBvZihuZXcgSG9zdFRyZWUodGhpcy5faG9zdCkpLCB7IGxvZ2dlcjogY29udGV4dC5sb2dnZXIgfSlcbiAgICAgIC5waXBlKFxuICAgICAgICBjb25jYXRNYXAoKHRyZWU6IFRyZWUpID0+IHtcbiAgICAgICAgICAvLyBQcm9jZXNzIGFsbCBzaW5rcy5cbiAgICAgICAgICByZXR1cm4gY29uY2F0KFxuICAgICAgICAgICAgZnJvbShzaW5rcykucGlwZShcbiAgICAgICAgICAgICAgY29uY2F0TWFwKChzaW5rKSA9PiBzaW5rLmNvbW1pdCh0cmVlKSksXG4gICAgICAgICAgICAgIGlnbm9yZUVsZW1lbnRzKCksXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgb2YodHJlZSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICAgIGNvbmNhdE1hcCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuX2RyeVJ1bikge1xuICAgICAgICAgICAgcmV0dXJuIEVNUFRZO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuX2xpZmVDeWNsZS5uZXh0KHsga2luZDogJ3Bvc3QtdGFza3Mtc3RhcnQnIH0pO1xuXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2VuZ2luZVxuICAgICAgICAgICAgLmV4ZWN1dGVQb3N0VGFza3MoKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgIHRhcCh7IGNvbXBsZXRlOiAoKSA9PiB0aGlzLl9saWZlQ3ljbGUubmV4dCh7IGtpbmQ6ICdwb3N0LXRhc2tzLWVuZCcgfSkgfSksXG4gICAgICAgICAgICAgIGRlZmF1bHRJZkVtcHR5KCksXG4gICAgICAgICAgICAgIGxhc3QoKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pLFxuICAgICAgICB0YXAoe1xuICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9saWZlQ3ljbGUubmV4dCh7IGtpbmQ6ICd3b3JrZmxvdy1lbmQnIH0pO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dC5wb3AoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2NvbnRleHQubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgdGhpcy5fbGlmZUN5Y2xlLm5leHQoeyBraW5kOiAnZW5kJyB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gIH1cbn1cbiJdfQ==