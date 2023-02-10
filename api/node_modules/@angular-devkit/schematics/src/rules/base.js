"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyToSubtree = exports.composeFileOperators = exports.forEach = exports.partitionApplyMerge = exports.when = exports.branchAndMerge = exports.asSource = exports.filter = exports.noop = exports.mergeWith = exports.apply = exports.chain = exports.empty = exports.source = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const exception_1 = require("../exception/exception");
const host_tree_1 = require("../tree/host-tree");
const interface_1 = require("../tree/interface");
const scoped_1 = require("../tree/scoped");
const static_1 = require("../tree/static");
const call_1 = require("./call");
/**
 * A Source that returns an tree as its single value.
 */
function source(tree) {
    return () => tree;
}
exports.source = source;
/**
 * A source that returns an empty tree.
 */
function empty() {
    return () => (0, static_1.empty)();
}
exports.empty = empty;
/**
 * Chain multiple rules into a single rule.
 */
function chain(rules) {
    return async (initialTree, context) => {
        let intermediateTree;
        for await (const rule of rules) {
            intermediateTree = (0, call_1.callRule)(rule, intermediateTree !== null && intermediateTree !== void 0 ? intermediateTree : initialTree, context);
        }
        return () => intermediateTree;
    };
}
exports.chain = chain;
/**
 * Apply multiple rules to a source, and returns the source transformed.
 */
function apply(source, rules) {
    return (context) => (0, call_1.callRule)(chain(rules), (0, call_1.callSource)(source, context), context);
}
exports.apply = apply;
/**
 * Merge an input tree with the source passed in.
 */
function mergeWith(source, strategy = interface_1.MergeStrategy.Default) {
    return (tree, context) => {
        return (0, call_1.callSource)(source, context).pipe((0, operators_1.map)((sourceTree) => tree.merge(sourceTree, strategy || context.strategy)), (0, operators_1.mapTo)(tree));
    };
}
exports.mergeWith = mergeWith;
function noop() {
    return () => { };
}
exports.noop = noop;
function filter(predicate) {
    return (tree) => {
        if (host_tree_1.HostTree.isHostTree(tree)) {
            return new host_tree_1.FilterHostTree(tree, predicate);
        }
        else {
            throw new exception_1.SchematicsException('Tree type is not supported.');
        }
    };
}
exports.filter = filter;
function asSource(rule) {
    return (context) => (0, call_1.callRule)(rule, (0, static_1.empty)(), context);
}
exports.asSource = asSource;
function branchAndMerge(rule, strategy = interface_1.MergeStrategy.Default) {
    return (tree, context) => {
        return (0, call_1.callRule)(rule, tree.branch(), context).pipe((0, operators_1.map)((branch) => tree.merge(branch, strategy || context.strategy)), (0, operators_1.mapTo)(tree));
    };
}
exports.branchAndMerge = branchAndMerge;
function when(predicate, operator) {
    return (entry) => {
        if (predicate(entry.path, entry)) {
            return operator(entry);
        }
        else {
            return entry;
        }
    };
}
exports.when = when;
function partitionApplyMerge(predicate, ruleYes, ruleNo) {
    return (tree, context) => {
        const [yes, no] = (0, static_1.partition)(tree, predicate);
        return (0, rxjs_1.concat)((0, call_1.callRule)(ruleYes, yes, context), (0, call_1.callRule)(ruleNo || noop(), no, context)).pipe((0, operators_1.toArray)(), (0, operators_1.map)(([yesTree, noTree]) => {
            yesTree.merge(noTree, context.strategy);
            return yesTree;
        }));
    };
}
exports.partitionApplyMerge = partitionApplyMerge;
function forEach(operator) {
    return (tree) => {
        tree.visit((path, entry) => {
            if (!entry) {
                return;
            }
            const newEntry = operator(entry);
            if (newEntry === entry) {
                return;
            }
            if (newEntry === null) {
                tree.delete(path);
                return;
            }
            if (newEntry.path != path) {
                tree.rename(path, newEntry.path);
            }
            if (!newEntry.content.equals(entry.content)) {
                tree.overwrite(newEntry.path, newEntry.content);
            }
        });
    };
}
exports.forEach = forEach;
function composeFileOperators(operators) {
    return (entry) => {
        let current = entry;
        for (const op of operators) {
            current = op(current);
            if (current === null) {
                // Deleted, just return.
                return null;
            }
        }
        return current;
    };
}
exports.composeFileOperators = composeFileOperators;
function applyToSubtree(path, rules) {
    return (tree, context) => {
        const scoped = new scoped_1.ScopedTree(tree, path);
        return (0, call_1.callRule)(chain(rules), scoped, context).pipe((0, operators_1.map)((result) => {
            if (result === scoped) {
                return tree;
            }
            else {
                throw new exception_1.SchematicsException('Original tree must be returned from all rules when using "applyToSubtree".');
            }
        }));
    };
}
exports.applyToSubtree = applyToSubtree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3Mvc3JjL3J1bGVzL2Jhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7O0FBRUgsK0JBQTBDO0FBQzFDLDhDQUFxRDtBQUVyRCxzREFBNkQ7QUFDN0QsaURBQTZEO0FBQzdELGlEQUFrRjtBQUNsRiwyQ0FBNEM7QUFDNUMsMkNBQWlFO0FBQ2pFLGlDQUE4QztBQUU5Qzs7R0FFRztBQUNILFNBQWdCLE1BQU0sQ0FBQyxJQUFVO0lBQy9CLE9BQU8sR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO0FBQ3BCLENBQUM7QUFGRCx3QkFFQztBQUVEOztHQUVHO0FBQ0gsU0FBZ0IsS0FBSztJQUNuQixPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUEsY0FBVyxHQUFFLENBQUM7QUFDN0IsQ0FBQztBQUZELHNCQUVDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixLQUFLLENBQUMsS0FBMkM7SUFDL0QsT0FBTyxLQUFLLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxFQUFFO1FBQ3BDLElBQUksZ0JBQThDLENBQUM7UUFDbkQsSUFBSSxLQUFLLEVBQUUsTUFBTSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQzlCLGdCQUFnQixHQUFHLElBQUEsZUFBUSxFQUFDLElBQUksRUFBRSxnQkFBZ0IsYUFBaEIsZ0JBQWdCLGNBQWhCLGdCQUFnQixHQUFJLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztTQUM3RTtRQUVELE9BQU8sR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQVRELHNCQVNDO0FBRUQ7O0dBRUc7QUFDSCxTQUFnQixLQUFLLENBQUMsTUFBYyxFQUFFLEtBQWE7SUFDakQsT0FBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsSUFBQSxl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QUM7SUFDTCxDQUFDLENBQUM7QUFDSixDQUFDO0FBdkJELDBCQXVCQztBQUVELFNBQWdCLG9CQUFvQixDQUFDLFNBQXlCO0lBQzVELE9BQU8sQ0FBQyxLQUFnQixFQUFFLEVBQUU7UUFDMUIsSUFBSSxPQUFPLEdBQXFCLEtBQUssQ0FBQztRQUN0QyxLQUFLLE1BQU0sRUFBRSxJQUFJLFNBQVMsRUFBRTtZQUMxQixPQUFPLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRXRCLElBQUksT0FBTyxLQUFLLElBQUksRUFBRTtnQkFDcEIsd0JBQXdCO2dCQUN4QixPQUFPLElBQUksQ0FBQzthQUNiO1NBQ0Y7UUFFRCxPQUFPLE9BQU8sQ0FBQztJQUNqQixDQUFDLENBQUM7QUFDSixDQUFDO0FBZEQsb0RBY0M7QUFFRCxTQUFnQixjQUFjLENBQUMsSUFBWSxFQUFFLEtBQWE7SUFDeEQsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRTtRQUN2QixNQUFNLE1BQU0sR0FBRyxJQUFJLG1CQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTFDLE9BQU8sSUFBQSxlQUFRLEVBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ2pELElBQUEsZUFBRyxFQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDYixJQUFJLE1BQU0sS0FBSyxNQUFNLEVBQUU7Z0JBQ3JCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLCtCQUFtQixDQUMzQiw0RUFBNEUsQ0FDN0UsQ0FBQzthQUNIO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUM7QUFoQkQsd0NBZ0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IE9ic2VydmFibGUsIGNvbmNhdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwLCBtYXBUbywgdG9BcnJheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEZpbGVPcGVyYXRvciwgUnVsZSwgU291cmNlIH0gZnJvbSAnLi4vZW5naW5lL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBTY2hlbWF0aWNzRXhjZXB0aW9uIH0gZnJvbSAnLi4vZXhjZXB0aW9uL2V4Y2VwdGlvbic7XG5pbXBvcnQgeyBGaWx0ZXJIb3N0VHJlZSwgSG9zdFRyZWUgfSBmcm9tICcuLi90cmVlL2hvc3QtdHJlZSc7XG5pbXBvcnQgeyBGaWxlRW50cnksIEZpbGVQcmVkaWNhdGUsIE1lcmdlU3RyYXRlZ3ksIFRyZWUgfSBmcm9tICcuLi90cmVlL2ludGVyZmFjZSc7XG5pbXBvcnQgeyBTY29wZWRUcmVlIH0gZnJvbSAnLi4vdHJlZS9zY29wZWQnO1xuaW1wb3J0IHsgcGFydGl0aW9uLCBlbXB0eSBhcyBzdGF0aWNFbXB0eSB9IGZyb20gJy4uL3RyZWUvc3RhdGljJztcbmltcG9ydCB7IGNhbGxSdWxlLCBjYWxsU291cmNlIH0gZnJvbSAnLi9jYWxsJztcblxuLyoqXG4gKiBBIFNvdXJjZSB0aGF0IHJldHVybnMgYW4gdHJlZSBhcyBpdHMgc2luZ2xlIHZhbHVlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc291cmNlKHRyZWU6IFRyZWUpOiBTb3VyY2Uge1xuICByZXR1cm4gKCkgPT4gdHJlZTtcbn1cblxuLyoqXG4gKiBBIHNvdXJjZSB0aGF0IHJldHVybnMgYW4gZW1wdHkgdHJlZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVtcHR5KCk6IFNvdXJjZSB7XG4gIHJldHVybiAoKSA9PiBzdGF0aWNFbXB0eSgpO1xufVxuXG4vKipcbiAqIENoYWluIG11bHRpcGxlIHJ1bGVzIGludG8gYSBzaW5nbGUgcnVsZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNoYWluKHJ1bGVzOiBJdGVyYWJsZTxSdWxlPiB8IEFzeW5jSXRlcmFibGU8UnVsZT4pOiBSdWxlIHtcbiAgcmV0dXJuIGFzeW5jIChpbml0aWFsVHJlZSwgY29udGV4dCkgPT4ge1xuICAgIGxldCBpbnRlcm1lZGlhdGVUcmVlOiBPYnNlcnZhYmxlPFRyZWU+IHwgdW5kZWZpbmVkO1xuICAgIGZvciBhd2FpdCAoY29uc3QgcnVsZSBvZiBydWxlcykge1xuICAgICAgaW50ZXJtZWRpYXRlVHJlZSA9IGNhbGxSdWxlKHJ1bGUsIGludGVybWVkaWF0ZVRyZWUgPz8gaW5pdGlhbFRyZWUsIGNvbnRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiAoKSA9PiBpbnRlcm1lZGlhdGVUcmVlO1xuICB9O1xufVxuXG4vKipcbiAqIEFwcGx5IG11bHRpcGxlIHJ1bGVzIHRvIGEgc291cmNlLCBhbmQgcmV0dXJucyB0aGUgc291cmNlIHRyYW5zZm9ybWVkLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoc291cmNlOiBTb3VyY2UsIHJ1bGVzOiBSdWxlW10pOiBTb3VyY2Uge1xuICByZXR1cm4gKGNvbnRleHQpID0+IGNhbGxSdWxlKGNoYWluKHJ1bGVzKSwgY2FsbFNvdXJjZShzb3VyY2UsIGNvbnRleHQpLCBjb250ZXh0KTtcbn1cblxuLyoqXG4gKiBNZXJnZSBhbiBpbnB1dCB0cmVlIHdpdGggdGhlIHNvdXJjZSBwYXNzZWQgaW4uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZVdpdGgoc291cmNlOiBTb3VyY2UsIHN0cmF0ZWd5OiBNZXJnZVN0cmF0ZWd5ID0gTWVyZ2VTdHJhdGVneS5EZWZhdWx0KTogUnVsZSB7XG4gIHJldHVybiAodHJlZSwgY29udGV4dCkgPT4ge1xuICAgIHJldHVybiBjYWxsU291cmNlKHNvdXJjZSwgY29udGV4dCkucGlwZShcbiAgICAgIG1hcCgoc291cmNlVHJlZSkgPT4gdHJlZS5tZXJnZShzb3VyY2VUcmVlLCBzdHJhdGVneSB8fCBjb250ZXh0LnN0cmF0ZWd5KSksXG4gICAgICBtYXBUbyh0cmVlKSxcbiAgICApO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9vcCgpOiBSdWxlIHtcbiAgcmV0dXJuICgpID0+IHt9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyKHByZWRpY2F0ZTogRmlsZVByZWRpY2F0ZTxib29sZWFuPik6IFJ1bGUge1xuICByZXR1cm4gKHRyZWU6IFRyZWUpID0+IHtcbiAgICBpZiAoSG9zdFRyZWUuaXNIb3N0VHJlZSh0cmVlKSkge1xuICAgICAgcmV0dXJuIG5ldyBGaWx0ZXJIb3N0VHJlZSh0cmVlLCBwcmVkaWNhdGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbignVHJlZSB0eXBlIGlzIG5vdCBzdXBwb3J0ZWQuJyk7XG4gICAgfVxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXNTb3VyY2UocnVsZTogUnVsZSk6IFNvdXJjZSB7XG4gIHJldHVybiAoY29udGV4dCkgPT4gY2FsbFJ1bGUocnVsZSwgc3RhdGljRW1wdHkoKSwgY29udGV4dCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBicmFuY2hBbmRNZXJnZShydWxlOiBSdWxlLCBzdHJhdGVneSA9IE1lcmdlU3RyYXRlZ3kuRGVmYXVsdCk6IFJ1bGUge1xuICByZXR1cm4gKHRyZWUsIGNvbnRleHQpID0+IHtcbiAgICByZXR1cm4gY2FsbFJ1bGUocnVsZSwgdHJlZS5icmFuY2goKSwgY29udGV4dCkucGlwZShcbiAgICAgIG1hcCgoYnJhbmNoKSA9PiB0cmVlLm1lcmdlKGJyYW5jaCwgc3RyYXRlZ3kgfHwgY29udGV4dC5zdHJhdGVneSkpLFxuICAgICAgbWFwVG8odHJlZSksXG4gICAgKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHdoZW4ocHJlZGljYXRlOiBGaWxlUHJlZGljYXRlPGJvb2xlYW4+LCBvcGVyYXRvcjogRmlsZU9wZXJhdG9yKTogRmlsZU9wZXJhdG9yIHtcbiAgcmV0dXJuIChlbnRyeTogRmlsZUVudHJ5KSA9PiB7XG4gICAgaWYgKHByZWRpY2F0ZShlbnRyeS5wYXRoLCBlbnRyeSkpIHtcbiAgICAgIHJldHVybiBvcGVyYXRvcihlbnRyeSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBlbnRyeTtcbiAgICB9XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJ0aXRpb25BcHBseU1lcmdlKFxuICBwcmVkaWNhdGU6IEZpbGVQcmVkaWNhdGU8Ym9vbGVhbj4sXG4gIHJ1bGVZZXM6IFJ1bGUsXG4gIHJ1bGVObz86IFJ1bGUsXG4pOiBSdWxlIHtcbiAgcmV0dXJuICh0cmVlLCBjb250ZXh0KSA9PiB7XG4gICAgY29uc3QgW3llcywgbm9dID0gcGFydGl0aW9uKHRyZWUsIHByZWRpY2F0ZSk7XG5cbiAgICByZXR1cm4gY29uY2F0KGNhbGxSdWxlKHJ1bGVZZXMsIHllcywgY29udGV4dCksIGNhbGxSdWxlKHJ1bGVObyB8fCBub29wKCksIG5vLCBjb250ZXh0KSkucGlwZShcbiAgICAgIHRvQXJyYXkoKSxcbiAgICAgIG1hcCgoW3llc1RyZWUsIG5vVHJlZV0pID0+IHtcbiAgICAgICAgeWVzVHJlZS5tZXJnZShub1RyZWUsIGNvbnRleHQuc3RyYXRlZ3kpO1xuXG4gICAgICAgIHJldHVybiB5ZXNUcmVlO1xuICAgICAgfSksXG4gICAgKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvckVhY2gob3BlcmF0b3I6IEZpbGVPcGVyYXRvcik6IFJ1bGUge1xuICByZXR1cm4gKHRyZWU6IFRyZWUpID0+IHtcbiAgICB0cmVlLnZpc2l0KChwYXRoLCBlbnRyeSkgPT4ge1xuICAgICAgaWYgKCFlbnRyeSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBuZXdFbnRyeSA9IG9wZXJhdG9yKGVudHJ5KTtcbiAgICAgIGlmIChuZXdFbnRyeSA9PT0gZW50cnkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKG5ld0VudHJ5ID09PSBudWxsKSB7XG4gICAgICAgIHRyZWUuZGVsZXRlKHBhdGgpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChuZXdFbnRyeS5wYXRoICE9IHBhdGgpIHtcbiAgICAgICAgdHJlZS5yZW5hbWUocGF0aCwgbmV3RW50cnkucGF0aCk7XG4gICAgICB9XG4gICAgICBpZiAoIW5ld0VudHJ5LmNvbnRlbnQuZXF1YWxzKGVudHJ5LmNvbnRlbnQpKSB7XG4gICAgICAgIHRyZWUub3ZlcndyaXRlKG5ld0VudHJ5LnBhdGgsIG5ld0VudHJ5LmNvbnRlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29tcG9zZUZpbGVPcGVyYXRvcnMob3BlcmF0b3JzOiBGaWxlT3BlcmF0b3JbXSk6IEZpbGVPcGVyYXRvciB7XG4gIHJldHVybiAoZW50cnk6IEZpbGVFbnRyeSkgPT4ge1xuICAgIGxldCBjdXJyZW50OiBGaWxlRW50cnkgfCBudWxsID0gZW50cnk7XG4gICAgZm9yIChjb25zdCBvcCBvZiBvcGVyYXRvcnMpIHtcbiAgICAgIGN1cnJlbnQgPSBvcChjdXJyZW50KTtcblxuICAgICAgaWYgKGN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgLy8gRGVsZXRlZCwganVzdCByZXR1cm4uXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjdXJyZW50O1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYXBwbHlUb1N1YnRyZWUocGF0aDogc3RyaW5nLCBydWxlczogUnVsZVtdKTogUnVsZSB7XG4gIHJldHVybiAodHJlZSwgY29udGV4dCkgPT4ge1xuICAgIGNvbnN0IHNjb3BlZCA9IG5ldyBTY29wZWRUcmVlKHRyZWUsIHBhdGgpO1xuXG4gICAgcmV0dXJuIGNhbGxSdWxlKGNoYWluKHJ1bGVzKSwgc2NvcGVkLCBjb250ZXh0KS5waXBlKFxuICAgICAgbWFwKChyZXN1bHQpID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gc2NvcGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRyZWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFNjaGVtYXRpY3NFeGNlcHRpb24oXG4gICAgICAgICAgICAnT3JpZ2luYWwgdHJlZSBtdXN0IGJlIHJldHVybmVkIGZyb20gYWxsIHJ1bGVzIHdoZW4gdXNpbmcgXCJhcHBseVRvU3VidHJlZVwiLicsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcbiAgfTtcbn1cbiJdfQ==