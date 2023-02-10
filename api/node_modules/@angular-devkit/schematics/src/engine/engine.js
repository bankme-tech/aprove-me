"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchematicEngine = exports.TaskScheduler = exports.CollectionImpl = exports.UnknownTaskDependencyException = exports.UnregisteredTaskException = exports.SchematicEngineConflictingException = exports.PrivateSchematicException = exports.UnknownSchematicException = exports.CircularCollectionException = exports.UnknownCollectionException = exports.UnknownUrlSourceProtocol = void 0;
const core_1 = require("@angular-devkit/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const interface_1 = require("../tree/interface");
const null_1 = require("../tree/null");
const static_1 = require("../tree/static");
const schematic_1 = require("./schematic");
class UnknownUrlSourceProtocol extends core_1.BaseException {
    constructor(url) {
        super(`Unknown Protocol on url "${url}".`);
    }
}
exports.UnknownUrlSourceProtocol = UnknownUrlSourceProtocol;
class UnknownCollectionException extends core_1.BaseException {
    constructor(name) {
        super(`Unknown collection "${name}".`);
    }
}
exports.UnknownCollectionException = UnknownCollectionException;
class CircularCollectionException extends core_1.BaseException {
    constructor(name) {
        super(`Circular collection reference "${name}".`);
    }
}
exports.CircularCollectionException = CircularCollectionException;
class UnknownSchematicException extends core_1.BaseException {
    constructor(name, collection) {
        super(`Schematic "${name}" not found in collection "${collection.name}".`);
    }
}
exports.UnknownSchematicException = UnknownSchematicException;
class PrivateSchematicException extends core_1.BaseException {
    constructor(name, collection) {
        super(`Schematic "${name}" not found in collection "${collection.name}".`);
    }
}
exports.PrivateSchematicException = PrivateSchematicException;
class SchematicEngineConflictingException extends core_1.BaseException {
    constructor() {
        super(`A schematic was called from a different engine as its parent.`);
    }
}
exports.SchematicEngineConflictingException = SchematicEngineConflictingException;
class UnregisteredTaskException extends core_1.BaseException {
    constructor(name, schematic) {
        const addendum = schematic ? ` in schematic "${schematic.name}"` : '';
        super(`Unregistered task "${name}"${addendum}.`);
    }
}
exports.UnregisteredTaskException = UnregisteredTaskException;
class UnknownTaskDependencyException extends core_1.BaseException {
    constructor(id) {
        super(`Unknown task dependency [ID: ${id.id}].`);
    }
}
exports.UnknownTaskDependencyException = UnknownTaskDependencyException;
class CollectionImpl {
    constructor(_description, _engine, baseDescriptions) {
        this._description = _description;
        this._engine = _engine;
        this.baseDescriptions = baseDescriptions;
    }
    get description() {
        return this._description;
    }
    get name() {
        return this.description.name || '<unknown>';
    }
    createSchematic(name, allowPrivate = false) {
        return this._engine.createSchematic(name, this, allowPrivate);
    }
    listSchematicNames(includeHidden) {
        return this._engine.listSchematicNames(this, includeHidden);
    }
}
exports.CollectionImpl = CollectionImpl;
class TaskScheduler {
    constructor(_context) {
        this._context = _context;
        this._queue = new core_1.PriorityQueue((x, y) => x.priority - y.priority);
        this._taskIds = new Map();
    }
    _calculatePriority(dependencies) {
        if (dependencies.size === 0) {
            return 0;
        }
        const prio = [...dependencies].reduce((prio, task) => prio + task.priority, 1);
        return prio;
    }
    _mapDependencies(dependencies) {
        if (!dependencies) {
            return new Set();
        }
        const tasks = dependencies.map((dep) => {
            const task = this._taskIds.get(dep);
            if (!task) {
                throw new UnknownTaskDependencyException(dep);
            }
            return task;
        });
        return new Set(tasks);
    }
    schedule(taskConfiguration) {
        const dependencies = this._mapDependencies(taskConfiguration.dependencies);
        const priority = this._calculatePriority(dependencies);
        const task = {
            id: TaskScheduler._taskIdCounter++,
            priority,
            configuration: taskConfiguration,
            context: this._context,
        };
        this._queue.push(task);
        const id = { id: task.id };
        this._taskIds.set(id, task);
        return id;
    }
    finalize() {
        const tasks = this._queue.toArray();
        this._queue.clear();
        this._taskIds.clear();
        return tasks;
    }
}
exports.TaskScheduler = TaskScheduler;
TaskScheduler._taskIdCounter = 1;
class SchematicEngine {
    constructor(_host, _workflow) {
        this._host = _host;
        this._workflow = _workflow;
        this._collectionCache = new Map();
        this._schematicCache = new WeakMap();
        this._taskSchedulers = new Array();
    }
    get workflow() {
        return this._workflow || null;
    }
    get defaultMergeStrategy() {
        return this._host.defaultMergeStrategy || interface_1.MergeStrategy.Default;
    }
    createCollection(name, requester) {
        let collection = this._collectionCache.get(name);
        if (collection) {
            return collection;
        }
        const [description, bases] = this._createCollectionDescription(name, requester === null || requester === void 0 ? void 0 : requester.description);
        collection = new CollectionImpl(description, this, bases);
        this._collectionCache.set(name, collection);
        this._schematicCache.set(collection, new Map());
        return collection;
    }
    _createCollectionDescription(name, requester, parentNames) {
        const description = this._host.createCollectionDescription(name, requester);
        if (!description) {
            throw new UnknownCollectionException(name);
        }
        if (parentNames && parentNames.has(description.name)) {
            throw new CircularCollectionException(name);
        }
        const bases = new Array();
        if (description.extends) {
            parentNames = (parentNames || new Set()).add(description.name);
            for (const baseName of description.extends) {
                const [base, baseBases] = this._createCollectionDescription(baseName, description, new Set(parentNames));
                bases.unshift(base, ...baseBases);
            }
        }
        return [description, bases];
    }
    createContext(schematic, parent, executionOptions) {
        // Check for inconsistencies.
        if (parent && parent.engine && parent.engine !== this) {
            throw new SchematicEngineConflictingException();
        }
        let interactive = true;
        if (executionOptions && executionOptions.interactive != undefined) {
            interactive = executionOptions.interactive;
        }
        else if (parent && parent.interactive != undefined) {
            interactive = parent.interactive;
        }
        let context = {
            debug: (parent && parent.debug) || false,
            engine: this,
            logger: (parent && parent.logger && parent.logger.createChild(schematic.description.name)) ||
                new core_1.logging.NullLogger(),
            schematic,
            strategy: parent && parent.strategy !== undefined ? parent.strategy : this.defaultMergeStrategy,
            interactive,
            addTask,
        };
        const maybeNewContext = this._host.transformContext(context);
        if (maybeNewContext) {
            context = maybeNewContext;
        }
        const taskScheduler = new TaskScheduler(context);
        const host = this._host;
        this._taskSchedulers.push(taskScheduler);
        function addTask(task, dependencies) {
            const config = task.toConfiguration();
            if (!host.hasTaskExecutor(config.name)) {
                throw new UnregisteredTaskException(config.name, schematic.description);
            }
            config.dependencies = config.dependencies || [];
            if (dependencies) {
                config.dependencies.unshift(...dependencies);
            }
            return taskScheduler.schedule(config);
        }
        return context;
    }
    createSchematic(name, collection, allowPrivate = false) {
        const schematicMap = this._schematicCache.get(collection);
        let schematic = schematicMap === null || schematicMap === void 0 ? void 0 : schematicMap.get(name);
        if (schematic) {
            return schematic;
        }
        let collectionDescription = collection.description;
        let description = this._host.createSchematicDescription(name, collection.description);
        if (!description) {
            if (collection.baseDescriptions) {
                for (const base of collection.baseDescriptions) {
                    description = this._host.createSchematicDescription(name, base);
                    if (description) {
                        collectionDescription = base;
                        break;
                    }
                }
            }
            if (!description) {
                // Report the error for the top level schematic collection
                throw new UnknownSchematicException(name, collection.description);
            }
        }
        if (description.private && !allowPrivate) {
            throw new PrivateSchematicException(name, collection.description);
        }
        const factory = this._host.getSchematicRuleFactory(description, collectionDescription);
        schematic = new schematic_1.SchematicImpl(description, factory, collection, this);
        schematicMap === null || schematicMap === void 0 ? void 0 : schematicMap.set(name, schematic);
        return schematic;
    }
    listSchematicNames(collection, includeHidden) {
        const names = this._host.listSchematicNames(collection.description, includeHidden);
        if (collection.baseDescriptions) {
            for (const base of collection.baseDescriptions) {
                names.push(...this._host.listSchematicNames(base, includeHidden));
            }
        }
        // remove duplicates
        return [...new Set(names)].sort();
    }
    transformOptions(schematic, options, context) {
        return this._host.transformOptions(schematic.description, options, context);
    }
    createSourceFromUrl(url, context) {
        switch (url.protocol) {
            case 'null:':
                return () => new null_1.NullTree();
            case 'empty:':
                return () => (0, static_1.empty)();
            default:
                const hostSource = this._host.createSourceFromUrl(url, context);
                if (!hostSource) {
                    throw new UnknownUrlSourceProtocol(url.toString());
                }
                return hostSource;
        }
    }
    executePostTasks() {
        const executors = new Map();
        const taskObservable = (0, rxjs_1.from)(this._taskSchedulers).pipe((0, operators_1.concatMap)((scheduler) => scheduler.finalize()), (0, operators_1.concatMap)((task) => {
            const { name, options } = task.configuration;
            const executor = executors.get(name);
            if (executor) {
                return executor(options, task.context);
            }
            return this._host.createTaskExecutor(name).pipe((0, operators_1.concatMap)((executor) => {
                executors.set(name, executor);
                return executor(options, task.context);
            }));
        }));
        return taskObservable;
    }
}
exports.SchematicEngine = SchematicEngine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5naW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5ndWxhcl9kZXZraXQvc2NoZW1hdGljcy9zcmMvZW5naW5lL2VuZ2luZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7QUFFSCwrQ0FBNkU7QUFDN0UsK0JBQTBEO0FBQzFELDhDQUEyQztBQUUzQyxpREFBa0Q7QUFDbEQsdUNBQXdDO0FBQ3hDLDJDQUF1QztBQW1CdkMsMkNBQTRDO0FBRTVDLE1BQWEsd0JBQXlCLFNBQVEsb0JBQWE7SUFDekQsWUFBWSxHQUFXO1FBQ3JCLEtBQUssQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDO0NBQ0Y7QUFKRCw0REFJQztBQUVELE1BQWEsMEJBQTJCLFNBQVEsb0JBQWE7SUFDM0QsWUFBWSxJQUFZO1FBQ3RCLEtBQUssQ0FBQyx1QkFBdUIsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQ0Y7QUFKRCxnRUFJQztBQUVELE1BQWEsMkJBQTRCLFNBQVEsb0JBQWE7SUFDNUQsWUFBWSxJQUFZO1FBQ3RCLEtBQUssQ0FBQyxrQ0FBa0MsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUNwRCxDQUFDO0NBQ0Y7QUFKRCxrRUFJQztBQUVELE1BQWEseUJBQTBCLFNBQVEsb0JBQWE7SUFDMUQsWUFBWSxJQUFZLEVBQUUsVUFBcUM7UUFDN0QsS0FBSyxDQUFDLGNBQWMsSUFBSSw4QkFBOEIsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUM7SUFDN0UsQ0FBQztDQUNGO0FBSkQsOERBSUM7QUFFRCxNQUFhLHlCQUEwQixTQUFRLG9CQUFhO0lBQzFELFlBQVksSUFBWSxFQUFFLFVBQXFDO1FBQzdELEtBQUssQ0FBQyxjQUFjLElBQUksOEJBQThCLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDO0lBQzdFLENBQUM7Q0FDRjtBQUpE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QUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLElBQUksUUFBUSxFQUFFO2dCQUNaLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDeEM7WUFFRCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUM3QyxJQUFBLHFCQUFTLEVBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDckIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBRTlCLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekMsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNILENBQUM7UUFFRixPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0NBQ0Y7QUExT0QsMENBME9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IEJhc2VFeGNlcHRpb24sIFByaW9yaXR5UXVldWUsIGxvZ2dpbmcgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBmcm9tIGFzIG9ic2VydmFibGVGcm9tIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBjb25jYXRNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBVcmwgfSBmcm9tICd1cmwnO1xuaW1wb3J0IHsgTWVyZ2VTdHJhdGVneSB9IGZyb20gJy4uL3RyZWUvaW50ZXJmYWNlJztcbmltcG9ydCB7IE51bGxUcmVlIH0gZnJvbSAnLi4vdHJlZS9udWxsJztcbmltcG9ydCB7IGVtcHR5IH0gZnJvbSAnLi4vdHJlZS9zdGF0aWMnO1xuaW1wb3J0IHsgV29ya2Zsb3cgfSBmcm9tICcuLi93b3JrZmxvdy9pbnRlcmZhY2UnO1xuaW1wb3J0IHtcbiAgQ29sbGVjdGlvbixcbiAgQ29sbGVjdGlvbkRlc2NyaXB0aW9uLFxuICBFbmdpbmUsXG4gIEVuZ2luZUhvc3QsXG4gIEV4ZWN1dGlvbk9wdGlvbnMsXG4gIFNjaGVtYXRpYyxcbiAgU2NoZW1hdGljQ29udGV4dCxcbiAgU2NoZW1hdGljRGVzY3JpcHRpb24sXG4gIFNvdXJjZSxcbiAgVGFza0NvbmZpZ3VyYXRpb24sXG4gIFRhc2tDb25maWd1cmF0aW9uR2VuZXJhdG9yLFxuICBUYXNrRXhlY3V0b3IsXG4gIFRhc2tJZCxcbiAgVGFza0luZm8sXG4gIFR5cGVkU2NoZW1hdGljQ29udGV4dCxcbn0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2NoZW1hdGljSW1wbCB9IGZyb20gJy4vc2NoZW1hdGljJztcblxuZXhwb3J0IGNsYXNzIFVua25vd25VcmxTb3VyY2VQcm90b2NvbCBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3Rvcih1cmw6IHN0cmluZykge1xuICAgIHN1cGVyKGBVbmtub3duIFByb3RvY29sIG9uIHVybCBcIiR7dXJsfVwiLmApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBVbmtub3duQ29sbGVjdGlvbkV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgVW5rbm93biBjb2xsZWN0aW9uIFwiJHtuYW1lfVwiLmApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDaXJjdWxhckNvbGxlY3Rpb25FeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nKSB7XG4gICAgc3VwZXIoYENpcmN1bGFyIGNvbGxlY3Rpb24gcmVmZXJlbmNlIFwiJHtuYW1lfVwiLmApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBVbmtub3duU2NoZW1hdGljRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZywgY29sbGVjdGlvbjogQ29sbGVjdGlvbkRlc2NyaXB0aW9uPHt9Pikge1xuICAgIHN1cGVyKGBTY2hlbWF0aWMgXCIke25hbWV9XCIgbm90IGZvdW5kIGluIGNvbGxlY3Rpb24gXCIke2NvbGxlY3Rpb24ubmFtZX1cIi5gKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgUHJpdmF0ZVNjaGVtYXRpY0V4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsIGNvbGxlY3Rpb246IENvbGxlY3Rpb25EZXNjcmlwdGlvbjx7fT4pIHtcbiAgICBzdXBlcihgU2NoZW1hdGljIFwiJHtuYW1lfVwiIG5vdCBmb3VuZCBpbiBjb2xsZWN0aW9uIFwiJHtjb2xsZWN0aW9uLm5hbWV9XCIuYCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNjaGVtYXRpY0VuZ2luZUNvbmZsaWN0aW5nRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKGBBIHNjaGVtYXRpYyB3YXMgY2FsbGVkIGZyb20gYSBkaWZmZXJlbnQgZW5naW5lIGFzIGl0cyBwYXJlbnQuYCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFVucmVnaXN0ZXJlZFRhc2tFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBzY2hlbWF0aWM/OiBTY2hlbWF0aWNEZXNjcmlwdGlvbjx7fSwge30+KSB7XG4gICAgY29uc3QgYWRkZW5kdW0gPSBzY2hlbWF0aWMgPyBgIGluIHNjaGVtYXRpYyBcIiR7c2NoZW1hdGljLm5hbWV9XCJgIDogJyc7XG4gICAgc3VwZXIoYFVucmVnaXN0ZXJlZCB0YXNrIFwiJHtuYW1lfVwiJHthZGRlbmR1bX0uYCk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFVua25vd25UYXNrRGVwZW5kZW5jeUV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihpZDogVGFza0lkKSB7XG4gICAgc3VwZXIoYFVua25vd24gdGFzayBkZXBlbmRlbmN5IFtJRDogJHtpZC5pZH1dLmApO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uSW1wbDxDb2xsZWN0aW9uVCBleHRlbmRzIG9iamVjdCwgU2NoZW1hdGljVCBleHRlbmRzIG9iamVjdD5cbiAgaW1wbGVtZW50cyBDb2xsZWN0aW9uPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPlxue1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9kZXNjcmlwdGlvbjogQ29sbGVjdGlvbkRlc2NyaXB0aW9uPENvbGxlY3Rpb25UPixcbiAgICBwcml2YXRlIF9lbmdpbmU6IFNjaGVtYXRpY0VuZ2luZTxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4sXG4gICAgcHVibGljIHJlYWRvbmx5IGJhc2VEZXNjcmlwdGlvbnM/OiBBcnJheTxDb2xsZWN0aW9uRGVzY3JpcHRpb248Q29sbGVjdGlvblQ+PixcbiAgKSB7fVxuXG4gIGdldCBkZXNjcmlwdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fZGVzY3JpcHRpb247XG4gIH1cbiAgZ2V0IG5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb24ubmFtZSB8fCAnPHVua25vd24+JztcbiAgfVxuXG4gIGNyZWF0ZVNjaGVtYXRpYyhuYW1lOiBzdHJpbmcsIGFsbG93UHJpdmF0ZSA9IGZhbHNlKTogU2NoZW1hdGljPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPiB7XG4gICAgcmV0dXJuIHRoaXMuX2VuZ2luZS5jcmVhdGVTY2hlbWF0aWMobmFtZSwgdGhpcywgYWxsb3dQcml2YXRlKTtcbiAgfVxuXG4gIGxpc3RTY2hlbWF0aWNOYW1lcyhpbmNsdWRlSGlkZGVuPzogYm9vbGVhbik6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fZW5naW5lLmxpc3RTY2hlbWF0aWNOYW1lcyh0aGlzLCBpbmNsdWRlSGlkZGVuKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGFza1NjaGVkdWxlciB7XG4gIHByaXZhdGUgX3F1ZXVlID0gbmV3IFByaW9yaXR5UXVldWU8VGFza0luZm8+KCh4LCB5KSA9PiB4LnByaW9yaXR5IC0geS5wcmlvcml0eSk7XG4gIHByaXZhdGUgX3Rhc2tJZHMgPSBuZXcgTWFwPFRhc2tJZCwgVGFza0luZm8+KCk7XG4gIHByaXZhdGUgc3RhdGljIF90YXNrSWRDb3VudGVyID0gMTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0KSB7fVxuXG4gIHByaXZhdGUgX2NhbGN1bGF0ZVByaW9yaXR5KGRlcGVuZGVuY2llczogU2V0PFRhc2tJbmZvPik6IG51bWJlciB7XG4gICAgaWYgKGRlcGVuZGVuY2llcy5zaXplID09PSAwKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICBjb25zdCBwcmlvID0gWy4uLmRlcGVuZGVuY2llc10ucmVkdWNlKChwcmlvLCB0YXNrKSA9PiBwcmlvICsgdGFzay5wcmlvcml0eSwgMSk7XG5cbiAgICByZXR1cm4gcHJpbztcbiAgfVxuXG4gIHByaXZhdGUgX21hcERlcGVuZGVuY2llcyhkZXBlbmRlbmNpZXM/OiBBcnJheTxUYXNrSWQ+KTogU2V0PFRhc2tJbmZvPiB7XG4gICAgaWYgKCFkZXBlbmRlbmNpZXMpIHtcbiAgICAgIHJldHVybiBuZXcgU2V0KCk7XG4gICAgfVxuXG4gICAgY29uc3QgdGFza3MgPSBkZXBlbmRlbmNpZXMubWFwKChkZXApID0+IHtcbiAgICAgIGNvbnN0IHRhc2sgPSB0aGlzLl90YXNrSWRzLmdldChkZXApO1xuICAgICAgaWYgKCF0YXNrKSB7XG4gICAgICAgIHRocm93IG5ldyBVbmtub3duVGFza0RlcGVuZGVuY3lFeGNlcHRpb24oZGVwKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRhc2s7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3IFNldCh0YXNrcyk7XG4gIH1cblxuICBzY2hlZHVsZTxUIGV4dGVuZHMgb2JqZWN0Pih0YXNrQ29uZmlndXJhdGlvbjogVGFza0NvbmZpZ3VyYXRpb248VD4pOiBUYXNrSWQge1xuICAgIGNvbnN0IGRlcGVuZGVuY2llcyA9IHRoaXMuX21hcERlcGVuZGVuY2llcyh0YXNrQ29uZmlndXJhdGlvbi5kZXBlbmRlbmNpZXMpO1xuICAgIGNvbnN0IHByaW9yaXR5ID0gdGhpcy5fY2FsY3VsYXRlUHJpb3JpdHkoZGVwZW5kZW5jaWVzKTtcblxuICAgIGNvbnN0IHRhc2sgPSB7XG4gICAgICBpZDogVGFza1NjaGVkdWxlci5fdGFza0lkQ291bnRlcisrLFxuICAgICAgcHJpb3JpdHksXG4gICAgICBjb25maWd1cmF0aW9uOiB0YXNrQ29uZmlndXJhdGlvbixcbiAgICAgIGNvbnRleHQ6IHRoaXMuX2NvbnRleHQsXG4gICAgfTtcblxuICAgIHRoaXMuX3F1ZXVlLnB1c2godGFzayk7XG5cbiAgICBjb25zdCBpZCA9IHsgaWQ6IHRhc2suaWQgfTtcbiAgICB0aGlzLl90YXNrSWRzLnNldChpZCwgdGFzayk7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBmaW5hbGl6ZSgpOiBSZWFkb25seUFycmF5PFRhc2tJbmZvPiB7XG4gICAgY29uc3QgdGFza3MgPSB0aGlzLl9xdWV1ZS50b0FycmF5KCk7XG4gICAgdGhpcy5fcXVldWUuY2xlYXIoKTtcbiAgICB0aGlzLl90YXNrSWRzLmNsZWFyKCk7XG5cbiAgICByZXR1cm4gdGFza3M7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNjaGVtYXRpY0VuZ2luZTxDb2xsZWN0aW9uVCBleHRlbmRzIG9iamVjdCwgU2NoZW1hdGljVCBleHRlbmRzIG9iamVjdD5cbiAgaW1wbGVtZW50cyBFbmdpbmU8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+XG57XG4gIHByaXZhdGUgX2NvbGxlY3Rpb25DYWNoZSA9IG5ldyBNYXA8c3RyaW5nLCBDb2xsZWN0aW9uSW1wbDxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4+KCk7XG4gIHByaXZhdGUgX3NjaGVtYXRpY0NhY2hlID0gbmV3IFdlYWtNYXA8XG4gICAgQ29sbGVjdGlvbjxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4sXG4gICAgTWFwPHN0cmluZywgU2NoZW1hdGljSW1wbDxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4+XG4gID4oKTtcbiAgcHJpdmF0ZSBfdGFza1NjaGVkdWxlcnMgPSBuZXcgQXJyYXk8VGFza1NjaGVkdWxlcj4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9ob3N0OiBFbmdpbmVIb3N0PENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPiwgcHJvdGVjdGVkIF93b3JrZmxvdz86IFdvcmtmbG93KSB7fVxuXG4gIGdldCB3b3JrZmxvdygpIHtcbiAgICByZXR1cm4gdGhpcy5fd29ya2Zsb3cgfHwgbnVsbDtcbiAgfVxuICBnZXQgZGVmYXVsdE1lcmdlU3RyYXRlZ3koKSB7XG4gICAgcmV0dXJuIHRoaXMuX2hvc3QuZGVmYXVsdE1lcmdlU3RyYXRlZ3kgfHwgTWVyZ2VTdHJhdGVneS5EZWZhdWx0O1xuICB9XG5cbiAgY3JlYXRlQ29sbGVjdGlvbihcbiAgICBuYW1lOiBzdHJpbmcsXG4gICAgcmVxdWVzdGVyPzogQ29sbGVjdGlvbjxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4sXG4gICk6IENvbGxlY3Rpb248Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+IHtcbiAgICBsZXQgY29sbGVjdGlvbiA9IHRoaXMuX2NvbGxlY3Rpb25DYWNoZS5nZXQobmFtZSk7XG4gICAgaWYgKGNvbGxlY3Rpb24pIHtcbiAgICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICAgIH1cblxuICAgIGNvbnN0IFtkZXNjcmlwdGlvbiwgYmFzZXNdID0gdGhpcy5fY3JlYXRlQ29sbGVjdGlvbkRlc2NyaXB0aW9uKG5hbWUsIHJlcXVlc3Rlcj8uZGVzY3JpcHRpb24pO1xuXG4gICAgY29sbGVjdGlvbiA9IG5ldyBDb2xsZWN0aW9uSW1wbDxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4oZGVzY3JpcHRpb24sIHRoaXMsIGJhc2VzKTtcbiAgICB0aGlzLl9jb2xsZWN0aW9uQ2FjaGUuc2V0KG5hbWUsIGNvbGxlY3Rpb24pO1xuICAgIHRoaXMuX3NjaGVtYXRpY0NhY2hlLnNldChjb2xsZWN0aW9uLCBuZXcgTWFwKCkpO1xuXG4gICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gIH1cblxuICBwcml2YXRlIF9jcmVhdGVDb2xsZWN0aW9uRGVzY3JpcHRpb24oXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIHJlcXVlc3Rlcj86IENvbGxlY3Rpb25EZXNjcmlwdGlvbjxDb2xsZWN0aW9uVD4sXG4gICAgcGFyZW50TmFtZXM/OiBTZXQ8c3RyaW5nPixcbiAgKTogW0NvbGxlY3Rpb25EZXNjcmlwdGlvbjxDb2xsZWN0aW9uVD4sIEFycmF5PENvbGxlY3Rpb25EZXNjcmlwdGlvbjxDb2xsZWN0aW9uVD4+XSB7XG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSB0aGlzLl9ob3N0LmNyZWF0ZUNvbGxlY3Rpb25EZXNjcmlwdGlvbihuYW1lLCByZXF1ZXN0ZXIpO1xuICAgIGlmICghZGVzY3JpcHRpb24pIHtcbiAgICAgIHRocm93IG5ldyBVbmtub3duQ29sbGVjdGlvbkV4Y2VwdGlvbihuYW1lKTtcbiAgICB9XG4gICAgaWYgKHBhcmVudE5hbWVzICYmIHBhcmVudE5hbWVzLmhhcyhkZXNjcmlwdGlvbi5uYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IENpcmN1bGFyQ29sbGVjdGlvbkV4Y2VwdGlvbihuYW1lKTtcbiAgICB9XG5cbiAgICBjb25zdCBiYXNlcyA9IG5ldyBBcnJheTxDb2xsZWN0aW9uRGVzY3JpcHRpb248Q29sbGVjdGlvblQ+PigpO1xuICAgIGlmIChkZXNjcmlwdGlvbi5leHRlbmRzKSB7XG4gICAgICBwYXJlbnROYW1lcyA9IChwYXJlbnROYW1lcyB8fCBuZXcgU2V0PHN0cmluZz4oKSkuYWRkKGRlc2NyaXB0aW9uLm5hbWUpO1xuICAgICAgZm9yIChjb25zdCBiYXNlTmFtZSBvZiBkZXNjcmlwdGlvbi5leHRlbmRzKSB7XG4gICAgICAgIGNvbnN0IFtiYXNlLCBiYXNlQmFzZXNdID0gdGhpcy5fY3JlYXRlQ29sbGVjdGlvbkRlc2NyaXB0aW9uKFxuICAgICAgICAgIGJhc2VOYW1lLFxuICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgIG5ldyBTZXQocGFyZW50TmFtZXMpLFxuICAgICAgICApO1xuXG4gICAgICAgIGJhc2VzLnVuc2hpZnQoYmFzZSwgLi4uYmFzZUJhc2VzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gW2Rlc2NyaXB0aW9uLCBiYXNlc107XG4gIH1cblxuICBjcmVhdGVDb250ZXh0KFxuICAgIHNjaGVtYXRpYzogU2NoZW1hdGljPENvbGxlY3Rpb25ULCBTY2hlbWF0aWNUPixcbiAgICBwYXJlbnQ/OiBQYXJ0aWFsPFR5cGVkU2NoZW1hdGljQ29udGV4dDxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4+LFxuICAgIGV4ZWN1dGlvbk9wdGlvbnM/OiBQYXJ0aWFsPEV4ZWN1dGlvbk9wdGlvbnM+LFxuICApOiBUeXBlZFNjaGVtYXRpY0NvbnRleHQ8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+IHtcbiAgICAvLyBDaGVjayBmb3IgaW5jb25zaXN0ZW5jaWVzLlxuICAgIGlmIChwYXJlbnQgJiYgcGFyZW50LmVuZ2luZSAmJiBwYXJlbnQuZW5naW5lICE9PSB0aGlzKSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljRW5naW5lQ29uZmxpY3RpbmdFeGNlcHRpb24oKTtcbiAgICB9XG5cbiAgICBsZXQgaW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgIGlmIChleGVjdXRpb25PcHRpb25zICYmIGV4ZWN1dGlvbk9wdGlvbnMuaW50ZXJhY3RpdmUgIT0gdW5kZWZpbmVkKSB7XG4gICAgICBpbnRlcmFjdGl2ZSA9IGV4ZWN1dGlvbk9wdGlvbnMuaW50ZXJhY3RpdmU7XG4gICAgfSBlbHNlIGlmIChwYXJlbnQgJiYgcGFyZW50LmludGVyYWN0aXZlICE9IHVuZGVmaW5lZCkge1xuICAgICAgaW50ZXJhY3RpdmUgPSBwYXJlbnQuaW50ZXJhY3RpdmU7XG4gICAgfVxuXG4gICAgbGV0IGNvbnRleHQ6IFR5cGVkU2NoZW1hdGljQ29udGV4dDxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4gPSB7XG4gICAgICBkZWJ1ZzogKHBhcmVudCAmJiBwYXJlbnQuZGVidWcpIHx8IGZhbHNlLFxuICAgICAgZW5naW5lOiB0aGlzLFxuICAgICAgbG9nZ2VyOlxuICAgICAgICAocGFyZW50ICYmIHBhcmVudC5sb2dnZXIgJiYgcGFyZW50LmxvZ2dlci5jcmVhdGVDaGlsZChzY2hlbWF0aWMuZGVzY3JpcHRpb24ubmFtZSkpIHx8XG4gICAgICAgIG5ldyBsb2dnaW5nLk51bGxMb2dnZXIoKSxcbiAgICAgIHNjaGVtYXRpYyxcbiAgICAgIHN0cmF0ZWd5OlxuICAgICAgICBwYXJlbnQgJiYgcGFyZW50LnN0cmF0ZWd5ICE9PSB1bmRlZmluZWQgPyBwYXJlbnQuc3RyYXRlZ3kgOiB0aGlzLmRlZmF1bHRNZXJnZVN0cmF0ZWd5LFxuICAgICAgaW50ZXJhY3RpdmUsXG4gICAgICBhZGRUYXNrLFxuICAgIH07XG5cbiAgICBjb25zdCBtYXliZU5ld0NvbnRleHQgPSB0aGlzLl9ob3N0LnRyYW5zZm9ybUNvbnRleHQoY29udGV4dCk7XG4gICAgaWYgKG1heWJlTmV3Q29udGV4dCkge1xuICAgICAgY29udGV4dCA9IG1heWJlTmV3Q29udGV4dDtcbiAgICB9XG5cbiAgICBjb25zdCB0YXNrU2NoZWR1bGVyID0gbmV3IFRhc2tTY2hlZHVsZXIoY29udGV4dCk7XG4gICAgY29uc3QgaG9zdCA9IHRoaXMuX2hvc3Q7XG4gICAgdGhpcy5fdGFza1NjaGVkdWxlcnMucHVzaCh0YXNrU2NoZWR1bGVyKTtcblxuICAgIGZ1bmN0aW9uIGFkZFRhc2s8VCBleHRlbmRzIG9iamVjdD4oXG4gICAgICB0YXNrOiBUYXNrQ29uZmlndXJhdGlvbkdlbmVyYXRvcjxUPixcbiAgICAgIGRlcGVuZGVuY2llcz86IEFycmF5PFRhc2tJZD4sXG4gICAgKTogVGFza0lkIHtcbiAgICAgIGNvbnN0IGNvbmZpZyA9IHRhc2sudG9Db25maWd1cmF0aW9uKCk7XG5cbiAgICAgIGlmICghaG9zdC5oYXNUYXNrRXhlY3V0b3IoY29uZmlnLm5hbWUpKSB7XG4gICAgICAgIHRocm93IG5ldyBVbnJlZ2lzdGVyZWRUYXNrRXhjZXB0aW9uKGNvbmZpZy5uYW1lLCBzY2hlbWF0aWMuZGVzY3JpcHRpb24pO1xuICAgICAgfVxuXG4gICAgICBjb25maWcuZGVwZW5kZW5jaWVzID0gY29uZmlnLmRlcGVuZGVuY2llcyB8fCBbXTtcbiAgICAgIGlmIChkZXBlbmRlbmNpZXMpIHtcbiAgICAgICAgY29uZmlnLmRlcGVuZGVuY2llcy51bnNoaWZ0KC4uLmRlcGVuZGVuY2llcyk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0YXNrU2NoZWR1bGVyLnNjaGVkdWxlKGNvbmZpZyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRleHQ7XG4gIH1cblxuICBjcmVhdGVTY2hlbWF0aWMoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGNvbGxlY3Rpb246IENvbGxlY3Rpb248Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+LFxuICAgIGFsbG93UHJpdmF0ZSA9IGZhbHNlLFxuICApOiBTY2hlbWF0aWM8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+IHtcbiAgICBjb25zdCBzY2hlbWF0aWNNYXAgPSB0aGlzLl9zY2hlbWF0aWNDYWNoZS5nZXQoY29sbGVjdGlvbik7XG5cbiAgICBsZXQgc2NoZW1hdGljID0gc2NoZW1hdGljTWFwPy5nZXQobmFtZSk7XG4gICAgaWYgKHNjaGVtYXRpYykge1xuICAgICAgcmV0dXJuIHNjaGVtYXRpYztcbiAgICB9XG5cbiAgICBsZXQgY29sbGVjdGlvbkRlc2NyaXB0aW9uID0gY29sbGVjdGlvbi5kZXNjcmlwdGlvbjtcbiAgICBsZXQgZGVzY3JpcHRpb24gPSB0aGlzLl9ob3N0LmNyZWF0ZVNjaGVtYXRpY0Rlc2NyaXB0aW9uKG5hbWUsIGNvbGxlY3Rpb24uZGVzY3JpcHRpb24pO1xuICAgIGlmICghZGVzY3JpcHRpb24pIHtcbiAgICAgIGlmIChjb2xsZWN0aW9uLmJhc2VEZXNjcmlwdGlvbnMpIHtcbiAgICAgICAgZm9yIChjb25zdCBiYXNlIG9mIGNvbGxlY3Rpb24uYmFzZURlc2NyaXB0aW9ucykge1xuICAgICAgICAgIGRlc2NyaXB0aW9uID0gdGhpcy5faG9zdC5jcmVhdGVTY2hlbWF0aWNEZXNjcmlwdGlvbihuYW1lLCBiYXNlKTtcbiAgICAgICAgICBpZiAoZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIGNvbGxlY3Rpb25EZXNjcmlwdGlvbiA9IGJhc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICghZGVzY3JpcHRpb24pIHtcbiAgICAgICAgLy8gUmVwb3J0IHRoZSBlcnJvciBmb3IgdGhlIHRvcCBsZXZlbCBzY2hlbWF0aWMgY29sbGVjdGlvblxuICAgICAgICB0aHJvdyBuZXcgVW5rbm93blNjaGVtYXRpY0V4Y2VwdGlvbihuYW1lLCBjb2xsZWN0aW9uLmRlc2NyaXB0aW9uKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGVzY3JpcHRpb24ucHJpdmF0ZSAmJiAhYWxsb3dQcml2YXRlKSB7XG4gICAgICB0aHJvdyBuZXcgUHJpdmF0ZVNjaGVtYXRpY0V4Y2VwdGlvbihuYW1lLCBjb2xsZWN0aW9uLmRlc2NyaXB0aW9uKTtcbiAgICB9XG5cbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5faG9zdC5nZXRTY2hlbWF0aWNSdWxlRmFjdG9yeShkZXNjcmlwdGlvbiwgY29sbGVjdGlvbkRlc2NyaXB0aW9uKTtcbiAgICBzY2hlbWF0aWMgPSBuZXcgU2NoZW1hdGljSW1wbDxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4oZGVzY3JpcHRpb24sIGZhY3RvcnksIGNvbGxlY3Rpb24sIHRoaXMpO1xuXG4gICAgc2NoZW1hdGljTWFwPy5zZXQobmFtZSwgc2NoZW1hdGljKTtcblxuICAgIHJldHVybiBzY2hlbWF0aWM7XG4gIH1cblxuICBsaXN0U2NoZW1hdGljTmFtZXMoXG4gICAgY29sbGVjdGlvbjogQ29sbGVjdGlvbjxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4sXG4gICAgaW5jbHVkZUhpZGRlbj86IGJvb2xlYW4sXG4gICk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBuYW1lcyA9IHRoaXMuX2hvc3QubGlzdFNjaGVtYXRpY05hbWVzKGNvbGxlY3Rpb24uZGVzY3JpcHRpb24sIGluY2x1ZGVIaWRkZW4pO1xuXG4gICAgaWYgKGNvbGxlY3Rpb24uYmFzZURlc2NyaXB0aW9ucykge1xuICAgICAgZm9yIChjb25zdCBiYXNlIG9mIGNvbGxlY3Rpb24uYmFzZURlc2NyaXB0aW9ucykge1xuICAgICAgICBuYW1lcy5wdXNoKC4uLnRoaXMuX2hvc3QubGlzdFNjaGVtYXRpY05hbWVzKGJhc2UsIGluY2x1ZGVIaWRkZW4pKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyByZW1vdmUgZHVwbGljYXRlc1xuICAgIHJldHVybiBbLi4ubmV3IFNldChuYW1lcyldLnNvcnQoKTtcbiAgfVxuXG4gIHRyYW5zZm9ybU9wdGlvbnM8T3B0aW9uVCBleHRlbmRzIG9iamVjdCwgUmVzdWx0VCBleHRlbmRzIG9iamVjdD4oXG4gICAgc2NoZW1hdGljOiBTY2hlbWF0aWM8Q29sbGVjdGlvblQsIFNjaGVtYXRpY1Q+LFxuICAgIG9wdGlvbnM6IE9wdGlvblQsXG4gICAgY29udGV4dD86IFR5cGVkU2NoZW1hdGljQ29udGV4dDxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4sXG4gICk6IE9ic2VydmFibGU8UmVzdWx0VD4ge1xuICAgIHJldHVybiB0aGlzLl9ob3N0LnRyYW5zZm9ybU9wdGlvbnM8T3B0aW9uVCwgUmVzdWx0VD4oc2NoZW1hdGljLmRlc2NyaXB0aW9uLCBvcHRpb25zLCBjb250ZXh0KTtcbiAgfVxuXG4gIGNyZWF0ZVNvdXJjZUZyb21VcmwodXJsOiBVcmwsIGNvbnRleHQ6IFR5cGVkU2NoZW1hdGljQ29udGV4dDxDb2xsZWN0aW9uVCwgU2NoZW1hdGljVD4pOiBTb3VyY2Uge1xuICAgIHN3aXRjaCAodXJsLnByb3RvY29sKSB7XG4gICAgICBjYXNlICdudWxsOic6XG4gICAgICAgIHJldHVybiAoKSA9PiBuZXcgTnVsbFRyZWUoKTtcbiAgICAgIGNhc2UgJ2VtcHR5Oic6XG4gICAgICAgIHJldHVybiAoKSA9PiBlbXB0eSgpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc3QgaG9zdFNvdXJjZSA9IHRoaXMuX2hvc3QuY3JlYXRlU291cmNlRnJvbVVybCh1cmwsIGNvbnRleHQpO1xuICAgICAgICBpZiAoIWhvc3RTb3VyY2UpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVW5rbm93blVybFNvdXJjZVByb3RvY29sKHVybC50b1N0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBob3N0U291cmNlO1xuICAgIH1cbiAgfVxuXG4gIGV4ZWN1dGVQb3N0VGFza3MoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgY29uc3QgZXhlY3V0b3JzID0gbmV3IE1hcDxzdHJpbmcsIFRhc2tFeGVjdXRvcj4oKTtcblxuICAgIGNvbnN0IHRhc2tPYnNlcnZhYmxlID0gb2JzZXJ2YWJsZUZyb20odGhpcy5fdGFza1NjaGVkdWxlcnMpLnBpcGUoXG4gICAgICBjb25jYXRNYXAoKHNjaGVkdWxlcikgPT4gc2NoZWR1bGVyLmZpbmFsaXplKCkpLFxuICAgICAgY29uY2F0TWFwKCh0YXNrKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbmFtZSwgb3B0aW9ucyB9ID0gdGFzay5jb25maWd1cmF0aW9uO1xuXG4gICAgICAgIGNvbnN0IGV4ZWN1dG9yID0gZXhlY3V0b3JzLmdldChuYW1lKTtcbiAgICAgICAgaWYgKGV4ZWN1dG9yKSB7XG4gICAgICAgICAgcmV0dXJuIGV4ZWN1dG9yKG9wdGlvbnMsIHRhc2suY29udGV4dCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5faG9zdC5jcmVhdGVUYXNrRXhlY3V0b3IobmFtZSkucGlwZShcbiAgICAgICAgICBjb25jYXRNYXAoKGV4ZWN1dG9yKSA9PiB7XG4gICAgICAgICAgICBleGVjdXRvcnMuc2V0KG5hbWUsIGV4ZWN1dG9yKTtcblxuICAgICAgICAgICAgcmV0dXJuIGV4ZWN1dG9yKG9wdGlvbnMsIHRhc2suY29udGV4dCk7XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgcmV0dXJuIHRhc2tPYnNlcnZhYmxlO1xuICB9XG59XG4iXX0=