"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnsupportedPlatformException = exports.UnimplementedException = exports.MergeConflictException = exports.InvalidUpdateRecordException = exports.ContentHasMutatedException = exports.PathIsFileException = exports.PathIsDirectoryException = exports.FileAlreadyExistException = exports.FileDoesNotExistException = exports.UnknownException = exports.BaseException = void 0;
class BaseException extends Error {
    constructor(message = '') {
        super(message);
    }
}
exports.BaseException = BaseException;
class UnknownException extends BaseException {
    constructor(message) {
        super(message);
    }
}
exports.UnknownException = UnknownException;
// Exceptions
class FileDoesNotExistException extends BaseException {
    constructor(path) {
        super(`Path "${path}" does not exist.`);
    }
}
exports.FileDoesNotExistException = FileDoesNotExistException;
class FileAlreadyExistException extends BaseException {
    constructor(path) {
        super(`Path "${path}" already exist.`);
    }
}
exports.FileAlreadyExistException = FileAlreadyExistException;
class PathIsDirectoryException extends BaseException {
    constructor(path) {
        super(`Path "${path}" is a directory.`);
    }
}
exports.PathIsDirectoryException = PathIsDirectoryException;
class PathIsFileException extends BaseException {
    constructor(path) {
        super(`Path "${path}" is a file.`);
    }
}
exports.PathIsFileException = PathIsFileException;
/**
 * @deprecated since version 14. Use the same symbol from `@angular-devkit/schematics`.
 */
class ContentHasMutatedException extends BaseException {
    constructor(path) {
        super(`Content at path "${path}" has changed between the start and the end of an update.`);
    }
}
exports.ContentHasMutatedException = ContentHasMutatedException;
/**
 * @deprecated since version 14. Use the same symbol from `@angular-devkit/schematics`.
 */
class InvalidUpdateRecordException extends BaseException {
    constructor() {
        super(`Invalid record instance.`);
    }
}
exports.InvalidUpdateRecordException = InvalidUpdateRecordException;
/**
 * @deprecated since version 14. Use the same symbol from `@angular-devkit/schematics`.
 */
class MergeConflictException extends BaseException {
    constructor(path) {
        super(`A merge conflicted on path "${path}".`);
    }
}
exports.MergeConflictException = MergeConflictException;
/**
 * @deprecated since version 14. Create a custom exception implementation instead.
 */
class UnimplementedException extends BaseException {
    constructor() {
        super('This function is unimplemented.');
    }
}
exports.UnimplementedException = UnimplementedException;
/**
 * @deprecated since version 14. Create a custom exception implementation instead.
 */
class UnsupportedPlatformException extends BaseException {
    constructor() {
        super('This platform is not supported by this code path.');
    }
}
exports.UnsupportedPlatformException = UnsupportedPlatformException;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhjZXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5ndWxhcl9kZXZraXQvY29yZS9zcmMvZXhjZXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7OztBQUVILE1BQWEsYUFBYyxTQUFRLEtBQUs7SUFDdEMsWUFBWSxPQUFPLEdBQUcsRUFBRTtRQUN0QixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDakIsQ0FBQztDQUNGO0FBSkQsc0NBSUM7QUFFRCxNQUFhLGdCQUFpQixTQUFRLGFBQWE7SUFDakQsWUFBWSxPQUFlO1FBQ3pCLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNqQixDQUFDO0NBQ0Y7QUFKRCw0Q0FJQztBQUVELGFBQWE7QUFDYixNQUFhLHlCQUEwQixTQUFRLGFBQWE7SUFDMUQsWUFBWSxJQUFZO1FBQ3RCLEtBQUssQ0FBQyxTQUFTLElBQUksbUJBQW1CLENBQUMsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7QUFKRCw4REFJQztBQUNELE1BQWEseUJBQTBCLFNBQVEsYUFBYTtJQUMxRCxZQUFZLElBQVk7UUFDdEIsS0FBSyxDQUFDLFNBQVMsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Q0FDRjtBQUpELDhEQUlDO0FBQ0QsTUFBYSx3QkFBeUIsU0FBUSxhQUFhO0lBQ3pELFlBQVksSUFBWTtRQUN0QixLQUFLLENBQUMsU0FBUyxJQUFJLG1CQUFtQixDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNGO0FBSkQsNERBSUM7QUFDRCxNQUFhLG1CQUFvQixTQUFRLGFBQWE7SUFDcEQsWUFBWSxJQUFZO1FBQ3RCLEtBQUssQ0FBQyxTQUFTLElBQUksY0FBYyxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNGO0FBSkQsa0RBSUM7QUFFRDs7R0FFRztBQUNILE1BQWEsMEJBQTJCLFNBQVEsYUFBYTtJQUMzRCxZQUFZLElBQVk7UUFDdEIsS0FBSyxDQUFDLG9CQUFvQixJQUFJLDJEQUEyRCxDQUFDLENBQUM7SUFDN0YsQ0FBQztDQUNGO0FBSkQsZ0VBSUM7QUFFRDs7R0FFRztBQUVILE1BQWEsNEJBQTZCLFNBQVEsYUFBYTtJQUM3RDtRQUNFLEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Q0FDRjtBQUpELG9FQUlDO0FBRUQ7O0dBRUc7QUFDSCxNQUFhLHNCQUF1QixTQUFRLGFBQWE7SUFDdkQsWUFBWSxJQUFZO1FBQ3RCLEtBQUssQ0FBQywrQkFBK0IsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUNqRCxDQUFDO0NBQ0Y7QUFKRCx3REFJQztBQUVEOztHQUVHO0FBQ0gsTUFBYSxzQkFBdUIsU0FBUSxhQUFhO0lBQ3ZEO1FBQ0UsS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNGO0FBSkQsd0RBSUM7QUFFRDs7R0FFRztBQUNILE1BQWEsNEJBQTZCLFNBQVEsYUFBYTtJQUM3RDtRQUNFLEtBQUssQ0FBQyxtREFBbUQsQ0FBQyxDQUFDO0lBQzdELENBQUM7Q0FDRjtBQUpELG9FQUlDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmV4cG9ydCBjbGFzcyBCYXNlRXhjZXB0aW9uIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlID0gJycpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVW5rbm93bkV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICBzdXBlcihtZXNzYWdlKTtcbiAgfVxufVxuXG4vLyBFeGNlcHRpb25zXG5leHBvcnQgY2xhc3MgRmlsZURvZXNOb3RFeGlzdEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgUGF0aCBcIiR7cGF0aH1cIiBkb2VzIG5vdCBleGlzdC5gKTtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIEZpbGVBbHJlYWR5RXhpc3RFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IocGF0aDogc3RyaW5nKSB7XG4gICAgc3VwZXIoYFBhdGggXCIke3BhdGh9XCIgYWxyZWFkeSBleGlzdC5gKTtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIFBhdGhJc0RpcmVjdG9yeUV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgUGF0aCBcIiR7cGF0aH1cIiBpcyBhIGRpcmVjdG9yeS5gKTtcbiAgfVxufVxuZXhwb3J0IGNsYXNzIFBhdGhJc0ZpbGVFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IocGF0aDogc3RyaW5nKSB7XG4gICAgc3VwZXIoYFBhdGggXCIke3BhdGh9XCIgaXMgYSBmaWxlLmApO1xuICB9XG59XG5cbi8qKlxuICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAxNC4gVXNlIHRoZSBzYW1lIHN5bWJvbCBmcm9tIGBAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljc2AuXG4gKi9cbmV4cG9ydCBjbGFzcyBDb250ZW50SGFzTXV0YXRlZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgQ29udGVudCBhdCBwYXRoIFwiJHtwYXRofVwiIGhhcyBjaGFuZ2VkIGJldHdlZW4gdGhlIHN0YXJ0IGFuZCB0aGUgZW5kIG9mIGFuIHVwZGF0ZS5gKTtcbiAgfVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gMTQuIFVzZSB0aGUgc2FtZSBzeW1ib2wgZnJvbSBgQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3NgLlxuICovXG5cbmV4cG9ydCBjbGFzcyBJbnZhbGlkVXBkYXRlUmVjb3JkRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKGBJbnZhbGlkIHJlY29yZCBpbnN0YW5jZS5gKTtcbiAgfVxufVxuXG4vKipcbiAqIEBkZXByZWNhdGVkIHNpbmNlIHZlcnNpb24gMTQuIFVzZSB0aGUgc2FtZSBzeW1ib2wgZnJvbSBgQGFuZ3VsYXItZGV2a2l0L3NjaGVtYXRpY3NgLlxuICovXG5leHBvcnQgY2xhc3MgTWVyZ2VDb25mbGljdEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcihwYXRoOiBzdHJpbmcpIHtcbiAgICBzdXBlcihgQSBtZXJnZSBjb25mbGljdGVkIG9uIHBhdGggXCIke3BhdGh9XCIuYCk7XG4gIH1cbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDE0LiBDcmVhdGUgYSBjdXN0b20gZXhjZXB0aW9uIGltcGxlbWVudGF0aW9uIGluc3RlYWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBVbmltcGxlbWVudGVkRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCdUaGlzIGZ1bmN0aW9uIGlzIHVuaW1wbGVtZW50ZWQuJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBAZGVwcmVjYXRlZCBzaW5jZSB2ZXJzaW9uIDE0LiBDcmVhdGUgYSBjdXN0b20gZXhjZXB0aW9uIGltcGxlbWVudGF0aW9uIGluc3RlYWQuXG4gKi9cbmV4cG9ydCBjbGFzcyBVbnN1cHBvcnRlZFBsYXRmb3JtRXhjZXB0aW9uIGV4dGVuZHMgQmFzZUV4Y2VwdGlvbiB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCdUaGlzIHBsYXRmb3JtIGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhpcyBjb2RlIHBhdGguJyk7XG4gIH1cbn1cbiJdfQ==