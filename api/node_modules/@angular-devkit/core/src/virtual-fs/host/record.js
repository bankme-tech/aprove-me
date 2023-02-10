"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.CordHost = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const exception_1 = require("../../exception");
const memory_1 = require("./memory");
/**
 * A Host that records changes to the underlying Host, while keeping a record of Create, Overwrite,
 * Rename and Delete of files.
 *
 * This is fully compatible with Host, but will keep a staging of every changes asked. That staging
 * follows the principle of the Tree (e.g. can create a file that already exists).
 *
 * Using `create()` and `overwrite()` will force those operations, but using `write` will add
 * the create/overwrite records IIF the files does/doesn't already exist.
 */
class CordHost extends memory_1.SimpleMemoryHost {
    constructor(_back) {
        super();
        this._back = _back;
        this._filesToCreate = new Set();
        this._filesToRename = new Map();
        this._filesToRenameRevert = new Map();
        this._filesToDelete = new Set();
        this._filesToOverwrite = new Set();
    }
    get backend() {
        return this._back;
    }
    get capabilities() {
        // Our own host is always Synchronous, but the backend might not be.
        return {
            synchronous: this._back.capabilities.synchronous,
        };
    }
    /**
     * Create a copy of this host, including all actions made.
     * @returns {CordHost} The carbon copy.
     */
    clone() {
        const dolly = new CordHost(this._back);
        dolly._cache = new Map(this._cache);
        dolly._filesToCreate = new Set(this._filesToCreate);
        dolly._filesToRename = new Map(this._filesToRename);
        dolly._filesToRenameRevert = new Map(this._filesToRenameRevert);
        dolly._filesToDelete = new Set(this._filesToDelete);
        dolly._filesToOverwrite = new Set(this._filesToOverwrite);
        return dolly;
    }
    /**
     * Commit the changes recorded to a Host. It is assumed that the host does have the same structure
     * as the host that was used for backend (could be the same host).
     * @param host The host to create/delete/rename/overwrite files to.
     * @param force Whether to skip existence checks when creating/overwriting. This is
     *   faster but might lead to incorrect states. Because Hosts natively don't support creation
     *   versus overwriting (it's only writing), we check for existence before completing a request.
     * @returns An observable that completes when done, or error if an error occured.
     */
    commit(host, force = false) {
        // Really commit everything to the actual host.
        return (0, rxjs_1.from)(this.records()).pipe((0, operators_1.concatMap)((record) => {
            switch (record.kind) {
                case 'delete':
                    return host.delete(record.path);
                case 'rename':
                    return host.rename(record.from, record.to);
                case 'create':
                    return host.exists(record.path).pipe((0, operators_1.switchMap)((exists) => {
                        if (exists && !force) {
                            return (0, rxjs_1.throwError)(new exception_1.FileAlreadyExistException(record.path));
                        }
                        else {
                            return host.write(record.path, record.content);
                        }
                    }));
                case 'overwrite':
                    return host.exists(record.path).pipe((0, operators_1.switchMap)((exists) => {
                        if (!exists && !force) {
                            return (0, rxjs_1.throwError)(new exception_1.FileDoesNotExistException(record.path));
                        }
                        else {
                            return host.write(record.path, record.content);
                        }
                    }));
            }
        }), (0, operators_1.reduce)(() => { }));
    }
    records() {
        return [
            ...[...this._filesToDelete.values()].map((path) => ({
                kind: 'delete',
                path,
            })),
            ...[...this._filesToRename.entries()].map(([from, to]) => ({
                kind: 'rename',
                from,
                to,
            })),
            ...[...this._filesToCreate.values()].map((path) => ({
                kind: 'create',
                path,
                content: this._read(path),
            })),
            ...[...this._filesToOverwrite.values()].map((path) => ({
                kind: 'overwrite',
                path,
                content: this._read(path),
            })),
        ];
    }
    /**
     * Specialized version of {@link CordHost#write} which forces the creation of a file whether it
     * exists or not.
     * @param {} path
     * @param {FileBuffer} content
     * @returns {Observable<void>}
     */
    create(path, content) {
        if (super._exists(path)) {
            throw new exception_1.FileAlreadyExistException(path);
        }
        if (this._filesToDelete.has(path)) {
            this._filesToDelete.delete(path);
            this._filesToOverwrite.add(path);
        }
        else {
            this._filesToCreate.add(path);
        }
        return super.write(path, content);
    }
    overwrite(path, content) {
        return this.isDirectory(path).pipe((0, operators_1.switchMap)((isDir) => {
            if (isDir) {
                return (0, rxjs_1.throwError)(new exception_1.PathIsDirectoryException(path));
            }
            return this.exists(path);
        }), (0, operators_1.switchMap)((exists) => {
            if (!exists) {
                return (0, rxjs_1.throwError)(new exception_1.FileDoesNotExistException(path));
            }
            if (!this._filesToCreate.has(path)) {
                this._filesToOverwrite.add(path);
            }
            return super.write(path, content);
        }));
    }
    write(path, content) {
        return this.exists(path).pipe((0, operators_1.switchMap)((exists) => {
            if (exists) {
                // It exists, but might be being renamed or deleted. In that case we want to create it.
                if (this.willRename(path) || this.willDelete(path)) {
                    return this.create(path, content);
                }
                else {
                    return this.overwrite(path, content);
                }
            }
            else {
                return this.create(path, content);
            }
        }));
    }
    read(path) {
        if (this._exists(path)) {
            return super.read(path);
        }
        return this._back.read(path);
    }
    delete(path) {
        if (this._exists(path)) {
            if (this._filesToCreate.has(path)) {
                this._filesToCreate.delete(path);
            }
            else if (this._filesToOverwrite.has(path)) {
                this._filesToOverwrite.delete(path);
                this._filesToDelete.add(path);
            }
            else {
                const maybeOrigin = this._filesToRenameRevert.get(path);
                if (maybeOrigin) {
                    this._filesToRenameRevert.delete(path);
                    this._filesToRename.delete(maybeOrigin);
                    this._filesToDelete.add(maybeOrigin);
                }
                else {
                    return (0, rxjs_1.throwError)(new exception_1.UnknownException(`This should never happen. Path: ${JSON.stringify(path)}.`));
                }
            }
            return super.delete(path);
        }
        else {
            return this._back.exists(path).pipe((0, operators_1.switchMap)((exists) => {
                if (exists) {
                    this._filesToDelete.add(path);
                    return (0, rxjs_1.of)();
                }
                else {
                    return (0, rxjs_1.throwError)(new exception_1.FileDoesNotExistException(path));
                }
            }));
        }
    }
    rename(from, to) {
        return (0, rxjs_1.concat)(this.exists(to), this.exists(from)).pipe((0, operators_1.toArray)(), (0, operators_1.switchMap)(([existTo, existFrom]) => {
            if (!existFrom) {
                return (0, rxjs_1.throwError)(new exception_1.FileDoesNotExistException(from));
            }
            if (from === to) {
                return rxjs_1.EMPTY;
            }
            if (existTo) {
                return (0, rxjs_1.throwError)(new exception_1.FileAlreadyExistException(to));
            }
            // If we're renaming a file that's been created, shortcircuit to creating the `to` path.
            if (this._filesToCreate.has(from)) {
                this._filesToCreate.delete(from);
                this._filesToCreate.add(to);
                return super.rename(from, to);
            }
            if (this._filesToOverwrite.has(from)) {
                this._filesToOverwrite.delete(from);
                // Recursively call this function. This is so we don't repeat the bottom logic. This
                // if will be by-passed because we just deleted the `from` path from files to overwrite.
                return (0, rxjs_1.concat)(this.rename(from, to), new rxjs_1.Observable((x) => {
                    this._filesToOverwrite.add(to);
                    x.complete();
                }));
            }
            if (this._filesToDelete.has(to)) {
                this._filesToDelete.delete(to);
                this._filesToDelete.add(from);
                this._filesToOverwrite.add(to);
                // We need to delete the original and write the new one.
                return this.read(from).pipe((0, operators_1.map)((content) => this._write(to, content)));
            }
            const maybeTo1 = this._filesToRenameRevert.get(from);
            if (maybeTo1) {
                // We already renamed to this file (A => from), let's rename the former to the new
                // path (A => to).
                this._filesToRename.delete(maybeTo1);
                this._filesToRenameRevert.delete(from);
                from = maybeTo1;
            }
            this._filesToRename.set(from, to);
            this._filesToRenameRevert.set(to, from);
            // If the file is part of our data, just rename it internally.
            if (this._exists(from)) {
                return super.rename(from, to);
            }
            else {
                // Create a file with the same content.
                return this._back.read(from).pipe((0, operators_1.switchMap)((content) => super.write(to, content)));
            }
        }));
    }
    list(path) {
        return (0, rxjs_1.concat)(super.list(path), this._back.list(path)).pipe((0, operators_1.reduce)((list, curr) => {
            curr.forEach((elem) => list.add(elem));
            return list;
        }, new Set()), (0, operators_1.map)((set) => [...set]));
    }
    exists(path) {
        return this._exists(path)
            ? (0, rxjs_1.of)(true)
            : this.willDelete(path) || this.willRename(path)
                ? (0, rxjs_1.of)(false)
                : this._back.exists(path);
    }
    isDirectory(path) {
        return this._exists(path) ? super.isDirectory(path) : this._back.isDirectory(path);
    }
    isFile(path) {
        return this._exists(path)
            ? super.isFile(path)
            : this.willDelete(path) || this.willRename(path)
                ? (0, rxjs_1.of)(false)
                : this._back.isFile(path);
    }
    stat(path) {
        return this._exists(path)
            ? super.stat(path)
            : this.willDelete(path) || this.willRename(path)
                ? (0, rxjs_1.of)(null)
                : this._back.stat(path);
    }
    watch(path, options) {
        // Watching not supported.
        return null;
    }
    willCreate(path) {
        return this._filesToCreate.has(path);
    }
    willOverwrite(path) {
        return this._filesToOverwrite.has(path);
    }
    willDelete(path) {
        return this._filesToDelete.has(path);
    }
    willRename(path) {
        return this._filesToRename.has(path);
    }
    willRenameTo(path, to) {
        return this._filesToRename.get(path) === to;
    }
}
exports.CordHost = CordHost;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5ndWxhcl9kZXZraXQvY29yZS9zcmMvdmlydHVhbC1mcy9ob3N0L3JlY29yZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7QUFFSCwrQkFBeUY7QUFDekYsOENBQTRFO0FBQzVFLCtDQUt5QjtBQVV6QixxQ0FBNEM7QUF1QjVDOzs7Ozs7Ozs7R0FTRztBQUNILE1BQWEsUUFBUyxTQUFRLHlCQUFnQjtJQU81QyxZQUFzQixLQUFtQjtRQUN2QyxLQUFLLEVBQUUsQ0FBQztRQURZLFVBQUssR0FBTCxLQUFLLENBQWM7UUFOL0IsbUJBQWMsR0FBRyxJQUFJLEdBQUcsRUFBUSxDQUFDO1FBQ2pDLG1CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQWMsQ0FBQztRQUN2Qyx5QkFBb0IsR0FBRyxJQUFJLEdBQUcsRUFBYyxDQUFDO1FBQzdDLG1CQUFjLEdBQUcsSUFBSSxHQUFHLEVBQVEsQ0FBQztRQUNqQyxzQkFBaUIsR0FBRyxJQUFJLEdBQUcsRUFBUSxDQUFDO0lBSTlDLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsQ0FBQztJQUNELElBQWEsWUFBWTtRQUN2QixvRUFBb0U7UUFDcEUsT0FBTztZQUNMLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXO1NBQ2pELENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsS0FBSztRQUNILE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV2QyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQyxLQUFLLENBQUMsY0FBYyxHQUFHLElBQUksR0FBRyxD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QyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBQ0QsVUFBVSxDQUFDLElBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsVUFBVSxDQUFDLElBQVU7UUFDbkIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2QyxDQUFDO0lBQ0QsWUFBWSxDQUFDLElBQVUsRUFBRSxFQUFRO1FBQy9CLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlDLENBQUM7Q0FDRjtBQTVWRCw0QkE0VkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHsgRU1QVFksIE9ic2VydmFibGUsIGNvbmNhdCwgZnJvbSBhcyBvYnNlcnZhYmxlRnJvbSwgb2YsIHRocm93RXJyb3IgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGNvbmNhdE1hcCwgbWFwLCByZWR1Y2UsIHN3aXRjaE1hcCwgdG9BcnJheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7XG4gIEZpbGVBbHJlYWR5RXhpc3RFeGNlcHRpb24sXG4gIEZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb24sXG4gIFBhdGhJc0RpcmVjdG9yeUV4Y2VwdGlvbixcbiAgVW5rbm93bkV4Y2VwdGlvbixcbn0gZnJvbSAnLi4vLi4vZXhjZXB0aW9uJztcbmltcG9ydCB7IFBhdGgsIFBhdGhGcmFnbWVudCB9IGZyb20gJy4uL3BhdGgnO1xuaW1wb3J0IHtcbiAgRmlsZUJ1ZmZlcixcbiAgSG9zdCxcbiAgSG9zdENhcGFiaWxpdGllcyxcbiAgSG9zdFdhdGNoT3B0aW9ucyxcbiAgUmVhZG9ubHlIb3N0LFxuICBTdGF0cyxcbn0gZnJvbSAnLi9pbnRlcmZhY2UnO1xuaW1wb3J0IHsgU2ltcGxlTWVtb3J5SG9zdCB9IGZyb20gJy4vbWVtb3J5JztcblxuZXhwb3J0IGludGVyZmFjZSBDb3JkSG9zdENyZWF0ZSB7XG4gIGtpbmQ6ICdjcmVhdGUnO1xuICBwYXRoOiBQYXRoO1xuICBjb250ZW50OiBGaWxlQnVmZmVyO1xufVxuZXhwb3J0IGludGVyZmFjZSBDb3JkSG9zdE92ZXJ3cml0ZSB7XG4gIGtpbmQ6ICdvdmVyd3JpdGUnO1xuICBwYXRoOiBQYXRoO1xuICBjb250ZW50OiBGaWxlQnVmZmVyO1xufVxuZXhwb3J0IGludGVyZmFjZSBDb3JkSG9zdFJlbmFtZSB7XG4gIGtpbmQ6ICdyZW5hbWUnO1xuICBmcm9tOiBQYXRoO1xuICB0bzogUGF0aDtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgQ29yZEhvc3REZWxldGUge1xuICBraW5kOiAnZGVsZXRlJztcbiAgcGF0aDogUGF0aDtcbn1cbmV4cG9ydCB0eXBlIENvcmRIb3N0UmVjb3JkID0gQ29yZEhvc3RDcmVhdGUgfCBDb3JkSG9zdE92ZXJ3cml0ZSB8IENvcmRIb3N0UmVuYW1lIHwgQ29yZEhvc3REZWxldGU7XG5cbi8qKlxuICogQSBIb3N0IHRoYXQgcmVjb3JkcyBjaGFuZ2VzIHRvIHRoZSB1bmRlcmx5aW5nIEhvc3QsIHdoaWxlIGtlZXBpbmcgYSByZWNvcmQgb2YgQ3JlYXRlLCBPdmVyd3JpdGUsXG4gKiBSZW5hbWUgYW5kIERlbGV0ZSBvZiBmaWxlcy5cbiAqXG4gKiBUaGlzIGlzIGZ1bGx5IGNvbXBhdGlibGUgd2l0aCBIb3N0LCBidXQgd2lsbCBrZWVwIGEgc3RhZ2luZyBvZiBldmVyeSBjaGFuZ2VzIGFza2VkLiBUaGF0IHN0YWdpbmdcbiAqIGZvbGxvd3MgdGhlIHByaW5jaXBsZSBvZiB0aGUgVHJlZSAoZS5nLiBjYW4gY3JlYXRlIGEgZmlsZSB0aGF0IGFscmVhZHkgZXhpc3RzKS5cbiAqXG4gKiBVc2luZyBgY3JlYXRlKClgIGFuZCBgb3ZlcndyaXRlKClgIHdpbGwgZm9yY2UgdGhvc2Ugb3BlcmF0aW9ucywgYnV0IHVzaW5nIGB3cml0ZWAgd2lsbCBhZGRcbiAqIHRoZSBjcmVhdGUvb3ZlcndyaXRlIHJlY29yZHMgSUlGIHRoZSBmaWxlcyBkb2VzL2RvZXNuJ3QgYWxyZWFkeSBleGlzdC5cbiAqL1xuZXhwb3J0IGNsYXNzIENvcmRIb3N0IGV4dGVuZHMgU2ltcGxlTWVtb3J5SG9zdCB7XG4gIHByb3RlY3RlZCBfZmlsZXNUb0NyZWF0ZSA9IG5ldyBTZXQ8UGF0aD4oKTtcbiAgcHJvdGVjdGVkIF9maWxlc1RvUmVuYW1lID0gbmV3IE1hcDxQYXRoLCBQYXRoPigpO1xuICBwcm90ZWN0ZWQgX2ZpbGVzVG9SZW5hbWVSZXZlcnQgPSBuZXcgTWFwPFBhdGgsIFBhdGg+KCk7XG4gIHByb3RlY3RlZCBfZmlsZXNUb0RlbGV0ZSA9IG5ldyBTZXQ8UGF0aD4oKTtcbiAgcHJvdGVjdGVkIF9maWxlc1RvT3ZlcndyaXRlID0gbmV3IFNldDxQYXRoPigpO1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfYmFjazogUmVhZG9ubHlIb3N0KSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuXG4gIGdldCBiYWNrZW5kKCk6IFJlYWRvbmx5SG9zdCB7XG4gICAgcmV0dXJuIHRoaXMuX2JhY2s7XG4gIH1cbiAgb3ZlcnJpZGUgZ2V0IGNhcGFiaWxpdGllcygpOiBIb3N0Q2FwYWJpbGl0aWVzIHtcbiAgICAvLyBPdXIgb3duIGhvc3QgaXMgYWx3YXlzIFN5bmNocm9ub3VzLCBidXQgdGhlIGJhY2tlbmQgbWlnaHQgbm90IGJlLlxuICAgIHJldHVybiB7XG4gICAgICBzeW5jaHJvbm91czogdGhpcy5fYmFjay5jYXBhYmlsaXRpZXMuc3luY2hyb25vdXMsXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBjb3B5IG9mIHRoaXMgaG9zdCwgaW5jbHVkaW5nIGFsbCBhY3Rpb25zIG1hZGUuXG4gICAqIEByZXR1cm5zIHtDb3JkSG9zdH0gVGhlIGNhcmJvbiBjb3B5LlxuICAgKi9cbiAgY2xvbmUoKTogQ29yZEhvc3Qge1xuICAgIGNvbnN0IGRvbGx5ID0gbmV3IENvcmRIb3N0KHRoaXMuX2JhY2spO1xuXG4gICAgZG9sbHkuX2NhY2hlID0gbmV3IE1hcCh0aGlzLl9jYWNoZSk7XG4gICAgZG9sbHkuX2ZpbGVzVG9DcmVhdGUgPSBuZXcgU2V0KHRoaXMuX2ZpbGVzVG9DcmVhdGUpO1xuICAgIGRvbGx5Ll9maWxlc1RvUmVuYW1lID0gbmV3IE1hcCh0aGlzLl9maWxlc1RvUmVuYW1lKTtcbiAgICBkb2xseS5fZmlsZXNUb1JlbmFtZVJldmVydCA9IG5ldyBNYXAodGhpcy5fZmlsZXNUb1JlbmFtZVJldmVydCk7XG4gICAgZG9sbHkuX2ZpbGVzVG9EZWxldGUgPSBuZXcgU2V0KHRoaXMuX2ZpbGVzVG9EZWxldGUpO1xuICAgIGRvbGx5Ll9maWxlc1RvT3ZlcndyaXRlID0gbmV3IFNldCh0aGlzLl9maWxlc1RvT3ZlcndyaXRlKTtcblxuICAgIHJldHVybiBkb2xseTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb21taXQgdGhlIGNoYW5nZXMgcmVjb3JkZWQgdG8gYSBIb3N0LiBJdCBpcyBhc3N1bWVkIHRoYXQgdGhlIGhvc3QgZG9lcyBoYXZlIHRoZSBzYW1lIHN0cnVjdHVyZVxuICAgKiBhcyB0aGUgaG9zdCB0aGF0IHdhcyB1c2VkIGZvciBiYWNrZW5kIChjb3VsZCBiZSB0aGUgc2FtZSBob3N0KS5cbiAgICogQHBhcmFtIGhvc3QgVGhlIGhvc3QgdG8gY3JlYXRlL2RlbGV0ZS9yZW5hbWUvb3ZlcndyaXRlIGZpbGVzIHRvLlxuICAgKiBAcGFyYW0gZm9yY2UgV2hldGhlciB0byBza2lwIGV4aXN0ZW5jZSBjaGVja3Mgd2hlbiBjcmVhdGluZy9vdmVyd3JpdGluZy4gVGhpcyBpc1xuICAgKiAgIGZhc3RlciBidXQgbWlnaHQgbGVhZCB0byBpbmNvcnJlY3Qgc3RhdGVzLiBCZWNhdXNlIEhvc3RzIG5hdGl2ZWx5IGRvbid0IHN1cHBvcnQgY3JlYXRpb25cbiAgICogICB2ZXJzdXMgb3ZlcndyaXRpbmcgKGl0J3Mgb25seSB3cml0aW5nKSwgd2UgY2hlY2sgZm9yIGV4aXN0ZW5jZSBiZWZvcmUgY29tcGxldGluZyBhIHJlcXVlc3QuXG4gICAqIEByZXR1cm5zIEFuIG9ic2VydmFibGUgdGhhdCBjb21wbGV0ZXMgd2hlbiBkb25lLCBvciBlcnJvciBpZiBhbiBlcnJvciBvY2N1cmVkLlxuICAgKi9cbiAgY29tbWl0KGhvc3Q6IEhvc3QsIGZvcmNlID0gZmFsc2UpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICAvLyBSZWFsbHkgY29tbWl0IGV2ZXJ5dGhpbmcgdG8gdGhlIGFjdHVhbCBob3N0LlxuICAgIHJldHVybiBvYnNlcnZhYmxlRnJvbSh0aGlzLnJlY29yZHMoKSkucGlwZShcbiAgICAgIGNvbmNhdE1hcCgocmVjb3JkKSA9PiB7XG4gICAgICAgIHN3aXRjaCAocmVjb3JkLmtpbmQpIHtcbiAgICAgICAgICBjYXNlICdkZWxldGUnOlxuICAgICAgICAgICAgcmV0dXJuIGhvc3QuZGVsZXRlKHJlY29yZC5wYXRoKTtcbiAgICAgICAgICBjYXNlICdyZW5hbWUnOlxuICAgICAgICAgICAgcmV0dXJuIGhvc3QucmVuYW1lKHJlY29yZC5mcm9tLCByZWNvcmQudG8pO1xuICAgICAgICAgIGNhc2UgJ2NyZWF0ZSc6XG4gICAgICAgICAgICByZXR1cm4gaG9zdC5leGlzdHMocmVjb3JkLnBhdGgpLnBpcGUoXG4gICAgICAgICAgICAgIHN3aXRjaE1hcCgoZXhpc3RzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV4aXN0cyAmJiAhZm9yY2UpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBGaWxlQWxyZWFkeUV4aXN0RXhjZXB0aW9uKHJlY29yZC5wYXRoKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBob3N0LndyaXRlKHJlY29yZC5wYXRoLCByZWNvcmQuY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgY2FzZSAnb3ZlcndyaXRlJzpcbiAgICAgICAgICAgIHJldHVybiBob3N0LmV4aXN0cyhyZWNvcmQucGF0aCkucGlwZShcbiAgICAgICAgICAgICAgc3dpdGNoTWFwKChleGlzdHMpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIWV4aXN0cyAmJiAhZm9yY2UpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBGaWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uKHJlY29yZC5wYXRoKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBob3N0LndyaXRlKHJlY29yZC5wYXRoLCByZWNvcmQuY29udGVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgcmVkdWNlKCgpID0+IHt9KSxcbiAgICApO1xuICB9XG5cbiAgcmVjb3JkcygpOiBDb3JkSG9zdFJlY29yZFtdIHtcbiAgICByZXR1cm4gW1xuICAgICAgLi4uWy4uLnRoaXMuX2ZpbGVzVG9EZWxldGUudmFsdWVzKCldLm1hcChcbiAgICAgICAgKHBhdGgpID0+XG4gICAgICAgICAgKHtcbiAgICAgICAgICAgIGtpbmQ6ICdkZWxldGUnLFxuICAgICAgICAgICAgcGF0aCxcbiAgICAgICAgICB9IGFzIENvcmRIb3N0UmVjb3JkKSxcbiAgICAgICksXG4gICAgICAuLi5bLi4udGhpcy5fZmlsZXNUb1JlbmFtZS5lbnRyaWVzKCldLm1hcChcbiAgICAgICAgKFtmcm9tLCB0b10pID0+XG4gICAgICAgICAgKHtcbiAgICAgICAgICAgIGtpbmQ6ICdyZW5hbWUnLFxuICAgICAgICAgICAgZnJvbSxcbiAgICAgICAgICAgIHRvLFxuICAgICAgICAgIH0gYXMgQ29yZEhvc3RSZWNvcmQpLFxuICAgICAgKSxcbiAgICAgIC4uLlsuLi50aGlzLl9maWxlc1RvQ3JlYXRlLnZhbHVlcygpXS5tYXAoXG4gICAgICAgIChwYXRoKSA9PlxuICAgICAgICAgICh7XG4gICAgICAgICAgICBraW5kOiAnY3JlYXRlJyxcbiAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLl9yZWFkKHBhdGgpLFxuICAgICAgICAgIH0gYXMgQ29yZEhvc3RSZWNvcmQpLFxuICAgICAgKSxcbiAgICAgIC4uLlsuLi50aGlzLl9maWxlc1RvT3ZlcndyaXRlLnZhbHVlcygpXS5tYXAoXG4gICAgICAgIChwYXRoKSA9PlxuICAgICAgICAgICh7XG4gICAgICAgICAgICBraW5kOiAnb3ZlcndyaXRlJyxcbiAgICAgICAgICAgIHBhdGgsXG4gICAgICAgICAgICBjb250ZW50OiB0aGlzLl9yZWFkKHBhdGgpLFxuICAgICAgICAgIH0gYXMgQ29yZEhvc3RSZWNvcmQpLFxuICAgICAgKSxcbiAgICBdO1xuICB9XG5cbiAgLyoqXG4gICAqIFNwZWNpYWxpemVkIHZlcnNpb24gb2Yge0BsaW5rIENvcmRIb3N0I3dyaXRlfSB3aGljaCBmb3JjZXMgdGhlIGNyZWF0aW9uIG9mIGEgZmlsZSB3aGV0aGVyIGl0XG4gICAqIGV4aXN0cyBvciBub3QuXG4gICAqIEBwYXJhbSB7fSBwYXRoXG4gICAqIEBwYXJhbSB7RmlsZUJ1ZmZlcn0gY29udGVudFxuICAgKiBAcmV0dXJucyB7T2JzZXJ2YWJsZTx2b2lkPn1cbiAgICovXG4gIGNyZWF0ZShwYXRoOiBQYXRoLCBjb250ZW50OiBGaWxlQnVmZmVyKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgaWYgKHN1cGVyLl9leGlzdHMocGF0aCkpIHtcbiAgICAgIHRocm93IG5ldyBGaWxlQWxyZWFkeUV4aXN0RXhjZXB0aW9uKHBhdGgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9maWxlc1RvRGVsZXRlLmhhcyhwYXRoKSkge1xuICAgICAgdGhpcy5fZmlsZXNUb0RlbGV0ZS5kZWxldGUocGF0aCk7XG4gICAgICB0aGlzLl9maWxlc1RvT3ZlcndyaXRlLmFkZChwYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZmlsZXNUb0NyZWF0ZS5hZGQocGF0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cGVyLndyaXRlKHBhdGgsIGNvbnRlbnQpO1xuICB9XG5cbiAgb3ZlcndyaXRlKHBhdGg6IFBhdGgsIGNvbnRlbnQ6IEZpbGVCdWZmZXIpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5pc0RpcmVjdG9yeShwYXRoKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChpc0RpcikgPT4ge1xuICAgICAgICBpZiAoaXNEaXIpIHtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgUGF0aElzRGlyZWN0b3J5RXhjZXB0aW9uKHBhdGgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmV4aXN0cyhwYXRoKTtcbiAgICAgIH0pLFxuICAgICAgc3dpdGNoTWFwKChleGlzdHMpID0+IHtcbiAgICAgICAgaWYgKCFleGlzdHMpIHtcbiAgICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihuZXcgRmlsZURvZXNOb3RFeGlzdEV4Y2VwdGlvbihwYXRoKSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXMuX2ZpbGVzVG9DcmVhdGUuaGFzKHBhdGgpKSB7XG4gICAgICAgICAgdGhpcy5fZmlsZXNUb092ZXJ3cml0ZS5hZGQocGF0aCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VwZXIud3JpdGUocGF0aCwgY29udGVudCk7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgb3ZlcnJpZGUgd3JpdGUocGF0aDogUGF0aCwgY29udGVudDogRmlsZUJ1ZmZlcik6IE9ic2VydmFibGU8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLmV4aXN0cyhwYXRoKS5waXBlKFxuICAgICAgc3dpdGNoTWFwKChleGlzdHMpID0+IHtcbiAgICAgICAgaWYgKGV4aXN0cykge1xuICAgICAgICAgIC8vIEl0IGV4aXN0cywgYnV0IG1pZ2h0IGJlIGJlaW5nIHJlbmFtZWQgb3IgZGVsZXRlZC4gSW4gdGhhdCBjYXNlIHdlIHdhbnQgdG8gY3JlYXRlIGl0LlxuICAgICAgICAgIGlmICh0aGlzLndpbGxSZW5hbWUocGF0aCkgfHwgdGhpcy53aWxsRGVsZXRlKHBhdGgpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGUocGF0aCwgY29udGVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm92ZXJ3cml0ZShwYXRoLCBjb250ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlKHBhdGgsIGNvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgb3ZlcnJpZGUgcmVhZChwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxGaWxlQnVmZmVyPiB7XG4gICAgaWYgKHRoaXMuX2V4aXN0cyhwYXRoKSkge1xuICAgICAgcmV0dXJuIHN1cGVyLnJlYWQocGF0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuX2JhY2sucmVhZChwYXRoKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGRlbGV0ZShwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuX2V4aXN0cyhwYXRoKSkge1xuICAgICAgaWYgKHRoaXMuX2ZpbGVzVG9DcmVhdGUuaGFzKHBhdGgpKSB7XG4gICAgICAgIHRoaXMuX2ZpbGVzVG9DcmVhdGUuZGVsZXRlKHBhdGgpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9maWxlc1RvT3ZlcndyaXRlLmhhcyhwYXRoKSkge1xuICAgICAgICB0aGlzLl9maWxlc1RvT3ZlcndyaXRlLmRlbGV0ZShwYXRoKTtcbiAgICAgICAgdGhpcy5fZmlsZXNUb0RlbGV0ZS5hZGQocGF0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBtYXliZU9yaWdpbiA9IHRoaXMuX2ZpbGVzVG9SZW5hbWVSZXZlcnQuZ2V0KHBhdGgpO1xuICAgICAgICBpZiAobWF5YmVPcmlnaW4pIHtcbiAgICAgICAgICB0aGlzLl9maWxlc1RvUmVuYW1lUmV2ZXJ0LmRlbGV0ZShwYXRoKTtcbiAgICAgICAgICB0aGlzLl9maWxlc1RvUmVuYW1lLmRlbGV0ZShtYXliZU9yaWdpbik7XG4gICAgICAgICAgdGhpcy5fZmlsZXNUb0RlbGV0ZS5hZGQobWF5YmVPcmlnaW4pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKFxuICAgICAgICAgICAgbmV3IFVua25vd25FeGNlcHRpb24oYFRoaXMgc2hvdWxkIG5ldmVyIGhhcHBlbi4gUGF0aDogJHtKU09OLnN0cmluZ2lmeShwYXRoKX0uYCksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc3VwZXIuZGVsZXRlKHBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fYmFjay5leGlzdHMocGF0aCkucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChleGlzdHMpID0+IHtcbiAgICAgICAgICBpZiAoZXhpc3RzKSB7XG4gICAgICAgICAgICB0aGlzLl9maWxlc1RvRGVsZXRlLmFkZChwYXRoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG9mPHZvaWQ+KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aHJvd0Vycm9yKG5ldyBGaWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uKHBhdGgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBvdmVycmlkZSByZW5hbWUoZnJvbTogUGF0aCwgdG86IFBhdGgpOiBPYnNlcnZhYmxlPHZvaWQ+IHtcbiAgICByZXR1cm4gY29uY2F0KHRoaXMuZXhpc3RzKHRvKSwgdGhpcy5leGlzdHMoZnJvbSkpLnBpcGUoXG4gICAgICB0b0FycmF5KCksXG4gICAgICBzd2l0Y2hNYXAoKFtleGlzdFRvLCBleGlzdEZyb21dKSA9PiB7XG4gICAgICAgIGlmICghZXhpc3RGcm9tKSB7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEZpbGVEb2VzTm90RXhpc3RFeGNlcHRpb24oZnJvbSkpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmcm9tID09PSB0bykge1xuICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChleGlzdFRvKSB7XG4gICAgICAgICAgcmV0dXJuIHRocm93RXJyb3IobmV3IEZpbGVBbHJlYWR5RXhpc3RFeGNlcHRpb24odG8pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHdlJ3JlIHJlbmFtaW5nIGEgZmlsZSB0aGF0J3MgYmVlbiBjcmVhdGVkLCBzaG9ydGNpcmN1aXQgdG8gY3JlYXRpbmcgdGhlIGB0b2AgcGF0aC5cbiAgICAgICAgaWYgKHRoaXMuX2ZpbGVzVG9DcmVhdGUuaGFzKGZyb20pKSB7XG4gICAgICAgICAgdGhpcy5fZmlsZXNUb0NyZWF0ZS5kZWxldGUoZnJvbSk7XG4gICAgICAgICAgdGhpcy5fZmlsZXNUb0NyZWF0ZS5hZGQodG8pO1xuXG4gICAgICAgICAgcmV0dXJuIHN1cGVyLnJlbmFtZShmcm9tLCB0byk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ZpbGVzVG9PdmVyd3JpdGUuaGFzKGZyb20pKSB7XG4gICAgICAgICAgdGhpcy5fZmlsZXNUb092ZXJ3cml0ZS5kZWxldGUoZnJvbSk7XG5cbiAgICAgICAgICAvLyBSZWN1cnNpdmVseSBjYWxsIHRoaXMgZnVuY3Rpb24uIFRoaXMgaXMgc28gd2UgZG9uJ3QgcmVwZWF0IHRoZSBib3R0b20gbG9naWMuIFRoaXNcbiAgICAgICAgICAvLyBpZiB3aWxsIGJlIGJ5LXBhc3NlZCBiZWNhdXNlIHdlIGp1c3QgZGVsZXRlZCB0aGUgYGZyb21gIHBhdGggZnJvbSBmaWxlcyB0byBvdmVyd3JpdGUuXG4gICAgICAgICAgcmV0dXJuIGNvbmNhdChcbiAgICAgICAgICAgIHRoaXMucmVuYW1lKGZyb20sIHRvKSxcbiAgICAgICAgICAgIG5ldyBPYnNlcnZhYmxlPG5ldmVyPigoeCkgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9maWxlc1RvT3ZlcndyaXRlLmFkZCh0byk7XG4gICAgICAgICAgICAgIHguY29tcGxldGUoKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2ZpbGVzVG9EZWxldGUuaGFzKHRvKSkge1xuICAgICAgICAgIHRoaXMuX2ZpbGVzVG9EZWxldGUuZGVsZXRlKHRvKTtcbiAgICAgICAgICB0aGlzLl9maWxlc1RvRGVsZXRlLmFkZChmcm9tKTtcbiAgICAgICAgICB0aGlzLl9maWxlc1RvT3ZlcndyaXRlLmFkZCh0byk7XG5cbiAgICAgICAgICAvLyBXZSBuZWVkIHRvIGRlbGV0ZSB0aGUgb3JpZ2luYWwgYW5kIHdyaXRlIHRoZSBuZXcgb25lLlxuICAgICAgICAgIHJldHVybiB0aGlzLnJlYWQoZnJvbSkucGlwZShtYXAoKGNvbnRlbnQpID0+IHRoaXMuX3dyaXRlKHRvLCBjb250ZW50KSkpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWF5YmVUbzEgPSB0aGlzLl9maWxlc1RvUmVuYW1lUmV2ZXJ0LmdldChmcm9tKTtcbiAgICAgICAgaWYgKG1heWJlVG8xKSB7XG4gICAgICAgICAgLy8gV2UgYWxyZWFkeSByZW5hbWVkIHRvIHRoaXMgZmlsZSAoQSA9PiBmcm9tKSwgbGV0J3MgcmVuYW1lIHRoZSBmb3JtZXIgdG8gdGhlIG5ld1xuICAgICAgICAgIC8vIHBhdGggKEEgPT4gdG8pLlxuICAgICAgICAgIHRoaXMuX2ZpbGVzVG9SZW5hbWUuZGVsZXRlKG1heWJlVG8xKTtcbiAgICAgICAgICB0aGlzLl9maWxlc1RvUmVuYW1lUmV2ZXJ0LmRlbGV0ZShmcm9tKTtcbiAgICAgICAgICBmcm9tID0gbWF5YmVUbzE7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9maWxlc1RvUmVuYW1lLnNldChmcm9tLCB0byk7XG4gICAgICAgIHRoaXMuX2ZpbGVzVG9SZW5hbWVSZXZlcnQuc2V0KHRvLCBmcm9tKTtcblxuICAgICAgICAvLyBJZiB0aGUgZmlsZSBpcyBwYXJ0IG9mIG91ciBkYXRhLCBqdXN0IHJlbmFtZSBpdCBpbnRlcm5hbGx5LlxuICAgICAgICBpZiAodGhpcy5fZXhpc3RzKGZyb20pKSB7XG4gICAgICAgICAgcmV0dXJuIHN1cGVyLnJlbmFtZShmcm9tLCB0byk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQ3JlYXRlIGEgZmlsZSB3aXRoIHRoZSBzYW1lIGNvbnRlbnQuXG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2sucmVhZChmcm9tKS5waXBlKHN3aXRjaE1hcCgoY29udGVudCkgPT4gc3VwZXIud3JpdGUodG8sIGNvbnRlbnQpKSk7XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICBvdmVycmlkZSBsaXN0KHBhdGg6IFBhdGgpOiBPYnNlcnZhYmxlPFBhdGhGcmFnbWVudFtdPiB7XG4gICAgcmV0dXJuIGNvbmNhdChzdXBlci5saXN0KHBhdGgpLCB0aGlzLl9iYWNrLmxpc3QocGF0aCkpLnBpcGUoXG4gICAgICByZWR1Y2UoKGxpc3Q6IFNldDxQYXRoRnJhZ21lbnQ+LCBjdXJyOiBQYXRoRnJhZ21lbnRbXSkgPT4ge1xuICAgICAgICBjdXJyLmZvckVhY2goKGVsZW0pID0+IGxpc3QuYWRkKGVsZW0pKTtcblxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICAgIH0sIG5ldyBTZXQ8UGF0aEZyYWdtZW50PigpKSxcbiAgICAgIG1hcCgoc2V0KSA9PiBbLi4uc2V0XSksXG4gICAgKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGV4aXN0cyhwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2V4aXN0cyhwYXRoKVxuICAgICAgPyBvZih0cnVlKVxuICAgICAgOiB0aGlzLndpbGxEZWxldGUocGF0aCkgfHwgdGhpcy53aWxsUmVuYW1lKHBhdGgpXG4gICAgICA/IG9mKGZhbHNlKVxuICAgICAgOiB0aGlzLl9iYWNrLmV4aXN0cyhwYXRoKTtcbiAgfVxuICBvdmVycmlkZSBpc0RpcmVjdG9yeShwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIHRoaXMuX2V4aXN0cyhwYXRoKSA/IHN1cGVyLmlzRGlyZWN0b3J5KHBhdGgpIDogdGhpcy5fYmFjay5pc0RpcmVjdG9yeShwYXRoKTtcbiAgfVxuICBvdmVycmlkZSBpc0ZpbGUocGF0aDogUGF0aCk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLl9leGlzdHMocGF0aClcbiAgICAgID8gc3VwZXIuaXNGaWxlKHBhdGgpXG4gICAgICA6IHRoaXMud2lsbERlbGV0ZShwYXRoKSB8fCB0aGlzLndpbGxSZW5hbWUocGF0aClcbiAgICAgID8gb2YoZmFsc2UpXG4gICAgICA6IHRoaXMuX2JhY2suaXNGaWxlKHBhdGgpO1xuICB9XG5cbiAgb3ZlcnJpZGUgc3RhdChwYXRoOiBQYXRoKTogT2JzZXJ2YWJsZTxTdGF0cyB8IG51bGw+IHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX2V4aXN0cyhwYXRoKVxuICAgICAgPyBzdXBlci5zdGF0KHBhdGgpXG4gICAgICA6IHRoaXMud2lsbERlbGV0ZShwYXRoKSB8fCB0aGlzLndpbGxSZW5hbWUocGF0aClcbiAgICAgID8gb2YobnVsbClcbiAgICAgIDogdGhpcy5fYmFjay5zdGF0KHBhdGgpO1xuICB9XG5cbiAgb3ZlcnJpZGUgd2F0Y2gocGF0aDogUGF0aCwgb3B0aW9ucz86IEhvc3RXYXRjaE9wdGlvbnMpIHtcbiAgICAvLyBXYXRjaGluZyBub3Qgc3VwcG9ydGVkLlxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgd2lsbENyZWF0ZShwYXRoOiBQYXRoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbGVzVG9DcmVhdGUuaGFzKHBhdGgpO1xuICB9XG4gIHdpbGxPdmVyd3JpdGUocGF0aDogUGF0aCkge1xuICAgIHJldHVybiB0aGlzLl9maWxlc1RvT3ZlcndyaXRlLmhhcyhwYXRoKTtcbiAgfVxuICB3aWxsRGVsZXRlKHBhdGg6IFBhdGgpIHtcbiAgICByZXR1cm4gdGhpcy5fZmlsZXNUb0RlbGV0ZS5oYXMocGF0aCk7XG4gIH1cbiAgd2lsbFJlbmFtZShwYXRoOiBQYXRoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpbGVzVG9SZW5hbWUuaGFzKHBhdGgpO1xuICB9XG4gIHdpbGxSZW5hbWVUbyhwYXRoOiBQYXRoLCB0bzogUGF0aCkge1xuICAgIHJldHVybiB0aGlzLl9maWxlc1RvUmVuYW1lLmdldChwYXRoKSA9PT0gdG87XG4gIH1cbn1cbiJdfQ==