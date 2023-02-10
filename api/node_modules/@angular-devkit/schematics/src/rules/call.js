"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.callRule = exports.callSource = exports.InvalidSourceResultException = exports.InvalidRuleResultException = void 0;
const core_1 = require("@angular-devkit/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const interface_1 = require("../tree/interface");
function _getTypeOfResult(value) {
    if (value === undefined) {
        return 'undefined';
    }
    else if (value === null) {
        return 'null';
    }
    else if (typeof value == 'function') {
        return `Function()`;
    }
    else if (typeof value != 'object') {
        return `${typeof value}(${JSON.stringify(value)})`;
    }
    else {
        if (Object.getPrototypeOf(value) == Object) {
            return `Object(${JSON.stringify(value)})`;
        }
        else if (value.constructor) {
            return `Instance of class ${value.constructor.name}`;
        }
        else {
            return 'Unknown Object';
        }
    }
}
/**
 * When a rule or source returns an invalid value.
 */
class InvalidRuleResultException extends core_1.BaseException {
    constructor(value) {
        super(`Invalid rule result: ${_getTypeOfResult(value)}.`);
    }
}
exports.InvalidRuleResultException = InvalidRuleResultException;
class InvalidSourceResultException extends core_1.BaseException {
    constructor(value) {
        super(`Invalid source result: ${_getTypeOfResult(value)}.`);
    }
}
exports.InvalidSourceResultException = InvalidSourceResultException;
function callSource(source, context) {
    return (0, rxjs_1.defer)(async () => {
        let result = source(context);
        if ((0, rxjs_1.isObservable)(result)) {
            result = await result.pipe((0, operators_1.defaultIfEmpty)()).toPromise();
        }
        if (result && interface_1.TreeSymbol in result) {
            return result;
        }
        throw new InvalidSourceResultException(result);
    });
}
exports.callSource = callSource;
function callRule(rule, input, context) {
    if ((0, rxjs_1.isObservable)(input)) {
        return input.pipe((0, operators_1.mergeMap)((inputTree) => callRuleAsync(rule, inputTree, context)));
    }
    else {
        return (0, rxjs_1.defer)(() => callRuleAsync(rule, input, context));
    }
}
exports.callRule = callRule;
async function callRuleAsync(rule, tree, context) {
    let result = await rule(tree, context);
    while (typeof result === 'function') {
        // This is considered a Rule, chain the rule and return its output.
        result = await result(tree, context);
    }
    if (typeof result === 'undefined') {
        return tree;
    }
    if ((0, rxjs_1.isObservable)(result)) {
        result = await result.pipe((0, operators_1.defaultIfEmpty)(tree)).toPromise();
    }
    if (result && interface_1.TreeSymbol in result) {
        return result;
    }
    throw new InvalidRuleResultException(result);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3Mvc3JjL3J1bGVzL2NhbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7O0FBRUgsK0NBQXFEO0FBQ3JELCtCQUF1RDtBQUN2RCw4Q0FBMEQ7QUFFMUQsaURBQXFEO0FBRXJELFNBQVMsZ0JBQWdCLENBQUMsS0FBVTtJQUNsQyxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7UUFDdkIsT0FBTyxXQUFXLENBQUM7S0FDcEI7U0FBTSxJQUFJLEtBQUssS0FBSyxJQUFJLEVBQUU7UUFDekIsT0FBTyxNQUFNLENBQUM7S0FDZjtTQUFNLElBQUksT0FBTyxLQUFLLElBQUksVUFBVSxFQUFFO1FBQ3JDLE9BQU8sWUFBWSxDQUFDO0tBQ3JCO1NBQU0sSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFRLEVBQUU7UUFDbkMsT0FBTyxHQUFHLE9BQU8sS0FBSyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztLQUNwRDtTQUFNO1FBQ0wsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sRUFBRTtZQUMxQyxPQUFPLFVBQVUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQzNDO2FBQU0sSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFO1lBQzVCLE9BQU8scUJBQXFCLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDdEQ7YUFBTTtZQUNMLE9BQU8sZ0JBQWdCLENBQUM7U0FDekI7S0FDRjtBQUNILENBQUM7QUFFRDs7R0FFRztBQUNILE1BQWEsMEJBQTJCLFNBQVEsb0JBQWE7SUFDM0QsWUFBWSxLQUFVO1FBQ3BCLEtBQUssQ0FBQyx3QkFBd0IsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVELENBQUM7Q0FDRjtBQUpELGdFQUlDO0FBRUQsTUFBYSw0QkFBNkIsU0FBUSxvQkFBYTtJQUM3RCxZQUFZLEtBQVU7UUFDcEIsS0FBSyxDQUFDLDBCQUEwQixnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDOUQsQ0FBQztDQUNGO0FBSkQsb0VBSUM7QUFFRCxTQUFnQixVQUFVLENBQUMsTUFBYyxFQUFFLE9BQXlCO0lBQ2xFLE9BQU8sSUFBQSxZQUFLLEVBQUMsS0FBSyxJQUFJLEVBQUU7UUFDdEIsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTdCLElBQUksSUFBQSxtQkFBWSxFQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3hCLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBQSwwQkFBYyxHQUFFLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUMxRDtRQUVELElBQUksTUFBTSxJQUFJLHNCQUFVLElBQUksTUFBTSxFQUFFO1lBQ2xDLE9BQU8sTUFBYyxDQUFDO1NBQ3ZCO1FBRUQsTUFBTSxJQUFJLDRCQUE0QixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2pELENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQztBQWRELGdDQWNDO0FBRUQsU0FBZ0IsUUFBUSxDQUN0QixJQUFVLEVBQ1YsS0FBOEIsRUFDOUIsT0FBeUI7SUFFekIsSUFBSSxJQUFBLG1CQUFZLEVBQUMsS0FBSyxDQUFDLEVBQUU7UUFDdkIsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUEsb0JBQVEsRUFBQyxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3JGO1NBQU07UUFDTCxPQUFPLElBQUEsWUFBSyxFQUFDLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDekQ7QUFDSCxDQUFDO0FBVkQsNEJBVUM7QUFFRCxLQUFLLFVBQVUsYUFBYSxDQUFDLElBQVUsRUFBRSxJQUFVLEVBQUUsT0FBeUI7SUFDNUUsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBRXZDLE9BQU8sT0FBTyxNQUFNLEtBQUssVUFBVSxFQUFFO1FBQ25DLG1FQUFtRTtRQUNuRSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDakMsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUVELElBQUksSUFBQSxtQkFBWSxFQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3hCLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBQSwwQkFBYyxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDOUQ7SUFFRCxJQUFJLE1BQU0sSUFBSSxzQkFBVSxJQUFJLE1BQU0sRUFBRTtRQUNsQyxPQUFPLE1BQWMsQ0FBQztLQUN2QjtJQUVELE1BQU0sSUFBSSwwQkFBMEIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IEJhc2VFeGNlcHRpb24gfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBkZWZlciwgaXNPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWZhdWx0SWZFbXB0eSwgbWVyZ2VNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBSdWxlLCBTY2hlbWF0aWNDb250ZXh0LCBTb3VyY2UgfSBmcm9tICcuLi9lbmdpbmUvaW50ZXJmYWNlJztcbmltcG9ydCB7IFRyZWUsIFRyZWVTeW1ib2wgfSBmcm9tICcuLi90cmVlL2ludGVyZmFjZSc7XG5cbmZ1bmN0aW9uIF9nZXRUeXBlT2ZSZXN1bHQodmFsdWU/OiB7fSk6IHN0cmluZyB7XG4gIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuICd1bmRlZmluZWQnO1xuICB9IGVsc2UgaWYgKHZhbHVlID09PSBudWxsKSB7XG4gICAgcmV0dXJuICdudWxsJztcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBgRnVuY3Rpb24oKWA7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGAke3R5cGVvZiB2YWx1ZX0oJHtKU09OLnN0cmluZ2lmeSh2YWx1ZSl9KWA7XG4gIH0gZWxzZSB7XG4gICAgaWYgKE9iamVjdC5nZXRQcm90b3R5cGVPZih2YWx1ZSkgPT0gT2JqZWN0KSB7XG4gICAgICByZXR1cm4gYE9iamVjdCgke0pTT04uc3RyaW5naWZ5KHZhbHVlKX0pYDtcbiAgICB9IGVsc2UgaWYgKHZhbHVlLmNvbnN0cnVjdG9yKSB7XG4gICAgICByZXR1cm4gYEluc3RhbmNlIG9mIGNsYXNzICR7dmFsdWUuY29uc3RydWN0b3IubmFtZX1gO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gJ1Vua25vd24gT2JqZWN0JztcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBXaGVuIGEgcnVsZSBvciBzb3VyY2UgcmV0dXJucyBhbiBpbnZhbGlkIHZhbHVlLlxuICovXG5leHBvcnQgY2xhc3MgSW52YWxpZFJ1bGVSZXN1bHRFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IodmFsdWU/OiB7fSkge1xuICAgIHN1cGVyKGBJbnZhbGlkIHJ1bGUgcmVzdWx0OiAke19nZXRUeXBlT2ZSZXN1bHQodmFsdWUpfS5gKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW52YWxpZFNvdXJjZVJlc3VsdEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3Rvcih2YWx1ZT86IHt9KSB7XG4gICAgc3VwZXIoYEludmFsaWQgc291cmNlIHJlc3VsdDogJHtfZ2V0VHlwZU9mUmVzdWx0KHZhbHVlKX0uYCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGxTb3VyY2Uoc291cmNlOiBTb3VyY2UsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpOiBPYnNlcnZhYmxlPFRyZWU+IHtcbiAgcmV0dXJuIGRlZmVyKGFzeW5jICgpID0+IHtcbiAgICBsZXQgcmVzdWx0ID0gc291cmNlKGNvbnRleHQpO1xuXG4gICAgaWYgKGlzT2JzZXJ2YWJsZShyZXN1bHQpKSB7XG4gICAgICByZXN1bHQgPSBhd2FpdCByZXN1bHQucGlwZShkZWZhdWx0SWZFbXB0eSgpKS50b1Byb21pc2UoKTtcbiAgICB9XG5cbiAgICBpZiAocmVzdWx0ICYmIFRyZWVTeW1ib2wgaW4gcmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0IGFzIFRyZWU7XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEludmFsaWRTb3VyY2VSZXN1bHRFeGNlcHRpb24ocmVzdWx0KTtcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxsUnVsZShcbiAgcnVsZTogUnVsZSxcbiAgaW5wdXQ6IFRyZWUgfCBPYnNlcnZhYmxlPFRyZWU+LFxuICBjb250ZXh0OiBTY2hlbWF0aWNDb250ZXh0LFxuKTogT2JzZXJ2YWJsZTxUcmVlPiB7XG4gIGlmIChpc09ic2VydmFibGUoaW5wdXQpKSB7XG4gICAgcmV0dXJuIGlucHV0LnBpcGUobWVyZ2VNYXAoKGlucHV0VHJlZSkgPT4gY2FsbFJ1bGVBc3luYyhydWxlLCBpbnB1dFRyZWUsIGNvbnRleHQpKSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGRlZmVyKCgpID0+IGNhbGxSdWxlQXN5bmMocnVsZSwgaW5wdXQsIGNvbnRleHQpKTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBjYWxsUnVsZUFzeW5jKHJ1bGU6IFJ1bGUsIHRyZWU6IFRyZWUsIGNvbnRleHQ6IFNjaGVtYXRpY0NvbnRleHQpOiBQcm9taXNlPFRyZWU+IHtcbiAgbGV0IHJlc3VsdCA9IGF3YWl0IHJ1bGUodHJlZSwgY29udGV4dCk7XG5cbiAgd2hpbGUgKHR5cGVvZiByZXN1bHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAvLyBUaGlzIGlzIGNvbnNpZGVyZWQgYSBSdWxlLCBjaGFpbiB0aGUgcnVsZSBhbmQgcmV0dXJuIGl0cyBvdXRwdXQuXG4gICAgcmVzdWx0ID0gYXdhaXQgcmVzdWx0KHRyZWUsIGNvbnRleHQpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiByZXN1bHQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHRyZWU7XG4gIH1cblxuICBpZiAoaXNPYnNlcnZhYmxlKHJlc3VsdCkpIHtcbiAgICByZXN1bHQgPSBhd2FpdCByZXN1bHQucGlwZShkZWZhdWx0SWZFbXB0eSh0cmVlKSkudG9Qcm9taXNlKCk7XG4gIH1cblxuICBpZiAocmVzdWx0ICYmIFRyZWVTeW1ib2wgaW4gcmVzdWx0KSB7XG4gICAgcmV0dXJuIHJlc3VsdCBhcyBUcmVlO1xuICB9XG5cbiAgdGhyb3cgbmV3IEludmFsaWRSdWxlUmVzdWx0RXhjZXB0aW9uKHJlc3VsdCk7XG59XG4iXX0=