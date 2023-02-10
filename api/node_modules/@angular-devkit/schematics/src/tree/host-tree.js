"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterHostTree = exports.HostCreateTree = exports.HostTree = exports.HostDirEntry = void 0;
const core_1 = require("@angular-devkit/core");
const jsonc_parser_1 = require("jsonc-parser");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const util_1 = require("util");
const exception_1 = require("../exception/exception");
const delegate_1 = require("./delegate");
const entry_1 = require("./entry");
const interface_1 = require("./interface");
const recorder_1 = require("./recorder");
const scoped_1 = require("./scoped");
let _uniqueId = 0;
class HostDirEntry {
    constructor(parent, path, _host, _tree) {
        this.parent = parent;
        this.path = path;
        this._host = _host;
        this._tree = _tree;
    }
    get subdirs() {
        return this._host
            .list(this.path)
            .filter((fragment) => this._host.isDirectory((0, core_1.join)(this.path, fragment)));
    }
    get subfiles() {
        return this._host
            .list(this.path)
            .filter((fragment) => this._host.isFile((0, core_1.join)(this.path, fragment)));
    }
    dir(name) {
        return this._tree.getDir((0, core_1.join)(this.path, name));
    }
    file(name) {
        return this._tree.get((0, core_1.join)(this.path, name));
    }
    visit(visitor) {
        try {
            this.getSubfilesRecursively().forEach((file) => visitor(file.path, file));
        }
        catch (e) {
            if (e !== interface_1.FileVisitorCancelToken) {
                throw e;
            }
        }
    }
    getSubfilesRecursively() {
        function _recurse(entry) {
            return entry.subdirs.reduce((files, subdir) => [...files, ..._recurse(entry.dir(subdir))], entry.subfiles.map((subfile) => entry.file(subfile)));
        }
        return _recurse(this);
    }
}
exports.HostDirEntry = HostDirEntry;
class HostTree {
    [interface_1.TreeSymbol]() {
        return this;
    }
    static isHostTree(tree) {
        if (tree instanceof HostTree) {
            return true;
        }
        if (typeof tree === 'object' && typeof tree._ancestry === 'object') {
            return true;
        }
        return false;
    }
    constructor(_backend = new core_1.virtualFs.Empty()) {
        this._backend = _backend;
        this._id = --_uniqueId;
        this._ancestry = new Set();
        this._dirCache = new Map();
        this._record = new core_1.virtualFs.CordHost(new core_1.virtualFs.SafeReadonlyHost(_backend));
        this._recordSync = new core_1.virtualFs.SyncDelegateHost(this._record);
    }
    _normalizePath(path) {
        return (0, core_1.normalize)('/' + path);
    }
    _willCreate(path) {
        return this._record.willCreate(path);
    }
    _willOverwrite(path) {
        return this._record.willOverwrite(path);
    }
    _willDelete(path) {
        return this._record.willDelete(path);
    }
    _willRename(path) {
        return this._record.willRename(path);
    }
    branch() {
        const branchedTree = new HostTree(this._backend);
        branchedTree._record = this._record.clone();
        branchedTree._recordSync = new core_1.virtualFs.SyncDelegateHost(branchedTree._record);
        branchedTree._ancestry = new Set(this._ancestry).add(this._id);
        return branchedTree;
    }
    isAncestorOf(tree) {
        if (tree instanceof HostTree) {
            return tree._ancestry.has(this._id);
        }
        if (tree instanceof delegate_1.DelegateTree) {
            return this.isAncestorOf(tree._other);
        }
        if (tree instanceof scoped_1.ScopedTree) {
            return this.isAncestorOf(tree._base);
        }
        return false;
    }
    merge(other, strategy = interface_1.MergeStrategy.Default) {
        if (other === this) {
            // Merging with yourself? Tsk tsk. Nothing to do at least.
            return;
        }
        if (this.isAncestorOf(other)) {
            // Workaround for merging a branch back into one of its ancestors
            // More complete branch point tracking is required to avoid
            strategy |= interface_1.MergeStrategy.Overwrite;
        }
        const creationConflictAllowed = (strategy & interface_1.MergeStrategy.AllowCreationConflict) == interface_1.MergeStrategy.AllowCreationConflict;
        const overwriteConflictAllowed = (strategy & interface_1.MergeStrategy.AllowOverwriteConflict) == interface_1.MergeStrategy.AllowOverwriteConflict;
        const deleteConflictAllowed = (strategy & interface_1.MergeStrategy.AllowDeleteConflict) == interface_1.MergeStrategy.AllowDeleteConflict;
        other.actions.forEach((action) => {
            switch (action.kind) {
                case 'c': {
                    const { path, content } = action;
                    if (this._willCreate(path) || this._willOverwrite(path) || this.exists(path)) {
                        const existingContent = this.read(path);
                        if (existingContent && content.equals(existingContent)) {
                            // Identical outcome; no action required
                            return;
                        }
                        if (!creationConflictAllowed) {
                            throw new exception_1.MergeConflictException(path);
                        }
                        this._record.overwrite(path, content).subscribe();
                    }
                    else {
                        this._record.create(path, content).subscribe();
                    }
                    return;
                }
                case 'o': {
                    const { path, content } = action;
                    if (this._willDelete(path) && !overwriteConflictAllowed) {
                        throw new exception_1.MergeConflictException(path);
                    }
                    // Ignore if content is the same (considered the same change).
                    if (this._willOverwrite(path)) {
                        const existingContent = this.read(path);
                        if (existingContent && content.equals(existingContent)) {
                            // Identical outcome; no action required
                            return;
                        }
                        if (!overwriteConflictAllowed) {
                            throw new exception_1.MergeConflictException(path);
                        }
                    }
                    // We use write here as merge validation has already been done, and we want to let
                    // the CordHost do its job.
                    this._record.write(path, content).subscribe();
                    return;
                }
                case 'r': {
                    const { path, to } = action;
                    if (this._willDelete(path)) {
                        throw new exception_1.MergeConflictException(path);
                    }
                    if (this._willRename(path)) {
                        if (this._record.willRenameTo(path, to)) {
                            // Identical outcome; no action required
                            return;
                        }
                        // No override possible for renaming.
                        throw new exception_1.MergeConflictException(path);
                    }
                    this.rename(path, to);
                    return;
                }
                case 'd': {
                    const { path } = action;
                    if (this._willDelete(path)) {
                        // TODO: This should technically check the content (e.g., hash on delete)
                        // Identical outcome; no action required
                        return;
                    }
                    if (!this.exists(path) && !deleteConflictAllowed) {
                        throw new exception_1.MergeConflictException(path);
                    }
                    this._recordSync.delete(path);
                    return;
                }
            }
        });
    }
    get root() {
        return this.getDir('/');
    }
    // Readonly.
    read(path) {
        const entry = this.get(path);
        return entry ? entry.content : null;
    }
    readText(path) {
        const data = this.read(path);
        if (data === null) {
            throw new exception_1.FileDoesNotExistException(path);
        }
        const decoder = new util_1.TextDecoder('utf-8', { fatal: true });
        try {
            // With the `fatal` option enabled, invalid data will throw a TypeError
            return decoder.decode(data);
        }
        catch (e) {
            if (e instanceof TypeError) {
                throw new Error(`Failed to decode "${path}" as UTF-8 text.`);
            }
            throw e;
        }
    }
    readJson(path) {
        const content = this.readText(path);
        const errors = [];
        const result = (0, jsonc_parser_1.parse)(content, errors, { allowTrailingComma: true });
        // If there is a parse error throw with the error information
        if (errors[0]) {
            const { error, offset } = errors[0];
            throw new Error(`Failed to parse "${path}" as JSON. ${(0, jsonc_parser_1.printParseErrorCode)(error)} at offset: ${offset}.`);
        }
        return result;
    }
    exists(path) {
        return this._recordSync.isFile(this._normalizePath(path));
    }
    get(path) {
        const p = this._normalizePath(path);
        if (this._recordSync.isDirectory(p)) {
            throw new core_1.PathIsDirectoryException(p);
        }
        if (!this._recordSync.exists(p)) {
            return null;
        }
        return new entry_1.LazyFileEntry(p, () => Buffer.from(this._recordSync.read(p)));
    }
    getDir(path) {
        const p = this._normalizePath(path);
        if (this._recordSync.isFile(p)) {
            throw new core_1.PathIsFileException(p);
        }
        let maybeCache = this._dirCache.get(p);
        if (!maybeCache) {
            let parent = (0, core_1.dirname)(p);
            if (p === parent) {
                parent = null;
            }
            maybeCache = new HostDirEntry(parent && this.getDir(parent), p, this._recordSync, this);
            this._dirCache.set(p, maybeCache);
        }
        return maybeCache;
    }
    visit(visitor) {
        this.root.visit((path, entry) => {
            visitor(path, entry);
        });
    }
    // Change content of host files.
    overwrite(path, content) {
        const p = this._normalizePath(path);
        if (!this._recordSync.exists(p)) {
            throw new exception_1.FileDoesNotExistException(p);
        }
        const c = typeof content == 'string' ? Buffer.from(content) : content;
        this._record.overwrite(p, c).subscribe();
    }
    beginUpdate(path) {
        const entry = this.get(path);
        if (!entry) {
            throw new exception_1.FileDoesNotExistException(path);
        }
        return recorder_1.UpdateRecorderBase.createFromFileEntry(entry);
    }
    commitUpdate(record) {
        if (record instanceof recorder_1.UpdateRecorderBase) {
            const path = record.path;
            const entry = this.get(path);
            if (!entry) {
                throw new exception_1.ContentHasMutatedException(path);
            }
            else {
                const newContent = record.apply(entry.content);
                if (!newContent.equals(entry.content)) {
                    this.overwrite(path, newContent);
                }
            }
        }
        else {
            throw new exception_1.InvalidUpdateRecordException();
        }
    }
    // Structural methods.
    create(path, content) {
        const p = this._normalizePath(path);
        if (this._recordSync.exists(p)) {
            throw new exception_1.FileAlreadyExistException(p);
        }
        const c = typeof content == 'string' ? Buffer.from(content) : content;
        this._record.create(p, c).subscribe();
    }
    delete(path) {
        this._recordSync.delete(this._normalizePath(path));
    }
    rename(from, to) {
        this._recordSync.rename(this._normalizePath(from), this._normalizePath(to));
    }
    apply(action, strategy) {
        throw new exception_1.SchematicsException('Apply not implemented on host trees.');
    }
    *generateActions() {
        for (const record of this._record.records()) {
            switch (record.kind) {
                case 'create':
                    yield {
                        id: this._id,
                        parent: 0,
                        kind: 'c',
                        path: record.path,
                        content: Buffer.from(record.content),
                    };
                    break;
                case 'overwrite':
                    yield {
                        id: this._id,
                        parent: 0,
                        kind: 'o',
                        path: record.path,
                        content: Buffer.from(record.content),
                    };
                    break;
                case 'rename':
                    yield {
                        id: this._id,
                        parent: 0,
                        kind: 'r',
                        path: record.from,
                        to: record.to,
                    };
                    break;
                case 'delete':
                    yield {
                        id: this._id,
                        parent: 0,
                        kind: 'd',
                        path: record.path,
                    };
                    break;
            }
        }
    }
    get actions() {
        // Create a list of all records until we hit our original backend. This is to support branches
        // that diverge from each others.
        return Array.from(this.generateActions());
    }
}
exports.HostTree = HostTree;
class HostCreateTree extends HostTree {
    constructor(host) {
        super();
        const tempHost = new HostTree(host);
        tempHost.visit((path) => {
            const content = tempHost.read(path);
            if (content) {
                this.create(path, content);
            }
        });
    }
}
exports.HostCreateTree = HostCreateTree;
class FilterHostTree extends HostTree {
    constructor(tree, filter = () => true) {
        const newBackend = new core_1.virtualFs.SimpleMemoryHost();
        // cast to allow access
        const originalBackend = tree._backend;
        const recurse = (base) => {
            return originalBackend.list(base).pipe((0, operators_1.mergeMap)((x) => x), (0, operators_1.map)((path) => (0, core_1.join)(base, path)), (0, operators_1.concatMap)((path) => {
                let isDirectory = false;
                originalBackend.isDirectory(path).subscribe((val) => (isDirectory = val));
                if (isDirectory) {
                    return recurse(path);
                }
                let isFile = false;
                originalBackend.isFile(path).subscribe((val) => (isFile = val));
                if (!isFile || !filter(path)) {
                    return rxjs_1.EMPTY;
                }
                let content = null;
                originalBackend.read(path).subscribe((val) => (content = val));
                if (!content) {
                    return rxjs_1.EMPTY;
                }
                return newBackend.write(path, content);
            }));
        };
        recurse((0, core_1.normalize)('/')).subscribe();
        super(newBackend);
        for (const action of tree.actions) {
            if (!filter(action.path)) {
                continue;
            }
            switch (action.kind) {
                case 'c':
                    this.create(action.path, action.content);
                    break;
                case 'd':
                    this.delete(action.path);
                    break;
                case 'o':
                    this.overwrite(action.path, action.content);
                    break;
                case 'r':
                    this.rename(action.path, action.to);
                    break;
            }
        }
    }
}
exports.FilterHostTree = FilterHostTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9zdC10cmVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5ndWxhcl9kZXZraXQvc2NoZW1hdGljcy9zcmMvdHJlZS9ob3N0LXRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7R0FNRzs7O0FBRUgsK0NBVThCO0FBQzlCLCtDQUFvRjtBQUNwRiwrQkFBeUM7QUFDekMsOENBQTBEO0FBQzFELCtCQUFtQztBQUNuQyxzREFPZ0M7QUFRaEMseUNBQTBDO0FBQzFDLG1DQUF3QztBQUN4QywyQ0FVcUI7QUFDckIseUNBQWdEO0FBQ2hELHFDQUFzQztBQUV0QyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7QUFFbEIsTUFBYSxZQUFZO0lBQ3ZCLFlBQ1csTUFBdUIsRUFDdkIsSUFBVSxFQUNULEtBQWlDLEVBQ2pDLEtBQVc7UUFIWixXQUFNLEdBQU4sTUFBTSxDQUFpQjtRQUN2QixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1QsVUFBSyxHQUFMLEtBQUssQ0FBNEI7UUFDakMsVUFBSyxHQUFMLEtBQUssQ0FBTTtJQUNwQixDQUFDO0lBRUosSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsS0FBSzthQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2YsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFBLFdBQUksRUFBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBQ0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsS0FBSzthQUNkLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2FBQ2YsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FB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O29CQUNOLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzVDLE1BQU07Z0JBQ1IsS0FBSyxHQUFHO29CQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3BDLE1BQU07YUFDVDtTQUNGO0lBQ0gsQ0FBQztDQUNGO0FBM0RELHdDQTJEQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge1xuICBKc29uVmFsdWUsXG4gIFBhdGgsXG4gIFBhdGhGcmFnbWVudCxcbiAgUGF0aElzRGlyZWN0b3J5RXhjZXB0aW9uLFxuICBQYXRoSXNGaWxlRXhjZXB0aW9uLFxuICBkaXJuYW1lLFxuICBqb2luLFxuICBub3JtYWxpemUsXG4gIHZpcnR1YWxGcyxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuaW1wb3J0IHsgUGFyc2VFcnJvciwgcGFyc2UgYXMganNvbmNQYXJzZSwgcHJpbnRQYXJzZUVycm9yQ29kZSB9IGZyb20gJ2pzb25jLXBhcnNlcic7XG5pbXBvcnQgeyBFTVBUWSwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgY29uY2F0TWFwLCBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgVGV4dERlY29kZXIgfSBmcm9tICd1dGlsJztcbmltcG9ydCB7XG4gIENvbnRlbnRIYXNNdXRhdGVkRXhjZXB0aW9uLFxuICBGaWxlQWxyZWFkeUV4aXN0RXhjZXB0aW9uLFxuICBGaWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uLFxuICBJbnZhbGlkVXBkYXRlUmVjb3JkRXhjZXB0aW9uLFxuICBNZXJnZUNvbmZsaWN0RXhjZXB0aW9uLFxuICBTY2hlbWF0aWNzRXhjZXB0aW9uLFxufSBmcm9tICcuLi9leGNlcHRpb24vZXhjZXB0aW9uJztcbmltcG9ydCB7XG4gIEFjdGlvbixcbiAgQ3JlYXRlRmlsZUFjdGlvbixcbiAgRGVsZXRlRmlsZUFjdGlvbixcbiAgT3ZlcndyaXRlRmlsZUFjdGlvbixcbiAgUmVuYW1lRmlsZUFjdGlvbixcbn0gZnJvbSAnLi9hY3Rpb24nO1xuaW1wb3J0IHsgRGVsZWdhdGVUcmVlIH0gZnJvbSAnLi9kZWxlZ2F0ZSc7XG5pbXBvcnQgeyBMYXp5RmlsZUVudHJ5IH0gZnJvbSAnLi9lbnRyeSc7XG5pbXBvcnQge1xuICBEaXJFbnRyeSxcbiAgRmlsZUVudHJ5LFxuICBGaWxlUHJlZGljYXRlLFxuICBGaWxlVmlzaXRvcixcbiAgRmlsZVZpc2l0b3JDYW5jZWxUb2tlbixcbiAgTWVyZ2VTdHJhdGVneSxcbiAgVHJlZSxcbiAgVHJlZVN5bWJvbCxcbiAgVXBkYXRlUmVjb3JkZXIsXG59IGZyb20gJy4vaW50ZXJmYWNlJztcbmltcG9ydCB7IFVwZGF0ZVJlY29yZGVyQmFzZSB9IGZyb20gJy4vcmVjb3JkZXInO1xuaW1wb3J0IHsgU2NvcGVkVHJlZSB9IGZyb20gJy4vc2NvcGVkJztcblxubGV0IF91bmlxdWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBIb3N0RGlyRW50cnkgaW1wbGVtZW50cyBEaXJFbnRyeSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHJlYWRvbmx5IHBhcmVudDogRGlyRW50cnkgfCBudWxsLFxuICAgIHJlYWRvbmx5IHBhdGg6IFBhdGgsXG4gICAgcHJvdGVjdGVkIF9ob3N0OiB2aXJ0dWFsRnMuU3luY0RlbGVnYXRlSG9zdCxcbiAgICBwcm90ZWN0ZWQgX3RyZWU6IFRyZWUsXG4gICkge31cblxuICBnZXQgc3ViZGlycygpOiBQYXRoRnJhZ21lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2hvc3RcbiAgICAgIC5saXN0KHRoaXMucGF0aClcbiAgICAgIC5maWx0ZXIoKGZyYWdtZW50KSA9PiB0aGlzLl9ob3N0LmlzRGlyZWN0b3J5KGpvaW4odGhpcy5wYXRoLCBmcmFnbWVudCkpKTtcbiAgfVxuICBnZXQgc3ViZmlsZXMoKTogUGF0aEZyYWdtZW50W10ge1xuICAgIHJldHVybiB0aGlzLl9ob3N0XG4gICAgICAubGlzdCh0aGlzLnBhdGgpXG4gICAgICAuZmlsdGVyKChmcmFnbWVudCkgPT4gdGhpcy5faG9zdC5pc0ZpbGUoam9pbih0aGlzLnBhdGgsIGZyYWdtZW50KSkpO1xuICB9XG5cbiAgZGlyKG5hbWU6IFBhdGhGcmFnbWVudCk6IERpckVudHJ5IHtcbiAgICByZXR1cm4gdGhpcy5fdHJlZS5nZXREaXIoam9pbih0aGlzLnBhdGgsIG5hbWUpKTtcbiAgfVxuICBmaWxlKG5hbWU6IFBhdGhGcmFnbWVudCk6IEZpbGVFbnRyeSB8IG51bGwge1xuICAgIHJldHVybiB0aGlzLl90cmVlLmdldChqb2luKHRoaXMucGF0aCwgbmFtZSkpO1xuICB9XG5cbiAgdmlzaXQodmlzaXRvcjogRmlsZVZpc2l0b3IpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgdGhpcy5nZXRTdWJmaWxlc1JlY3Vyc2l2ZWx5KCkuZm9yRWFjaCgoZmlsZSkgPT4gdmlzaXRvcihmaWxlLnBhdGgsIGZpbGUpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSAhPT0gRmlsZVZpc2l0b3JDYW5jZWxUb2tlbikge1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0U3ViZmlsZXNSZWN1cnNpdmVseSgpIHtcbiAgICBmdW5jdGlvbiBfcmVjdXJzZShlbnRyeTogRGlyRW50cnkpOiBGaWxlRW50cnlbXSB7XG4gICAgICByZXR1cm4gZW50cnkuc3ViZGlycy5yZWR1Y2UoXG4gICAgICAgIChmaWxlcywgc3ViZGlyKSA9PiBbLi4uZmlsZXMsIC4uLl9yZWN1cnNlKGVudHJ5LmRpcihzdWJkaXIpKV0sXG4gICAgICAgIGVudHJ5LnN1YmZpbGVzLm1hcCgoc3ViZmlsZSkgPT4gZW50cnkuZmlsZShzdWJmaWxlKSBhcyBGaWxlRW50cnkpLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gX3JlY3Vyc2UodGhpcyk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEhvc3RUcmVlIGltcGxlbWVudHMgVHJlZSB7XG4gIHByaXZhdGUgcmVhZG9ubHkgX2lkID0gLS1fdW5pcXVlSWQ7XG4gIHByaXZhdGUgX3JlY29yZDogdmlydHVhbEZzLkNvcmRIb3N0O1xuICBwcml2YXRlIF9yZWNvcmRTeW5jOiB2aXJ0dWFsRnMuU3luY0RlbGVnYXRlSG9zdDtcbiAgcHJpdmF0ZSBfYW5jZXN0cnkgPSBuZXcgU2V0PG51bWJlcj4oKTtcblxuICBwcml2YXRlIF9kaXJDYWNoZSA9IG5ldyBNYXA8UGF0aCwgSG9zdERpckVudHJ5PigpO1xuXG4gIFtUcmVlU3ltYm9sXSgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHN0YXRpYyBpc0hvc3RUcmVlKHRyZWU6IFRyZWUpOiB0cmVlIGlzIEhvc3RUcmVlIHtcbiAgICBpZiAodHJlZSBpbnN0YW5jZW9mIEhvc3RUcmVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHRyZWUgPT09ICdvYmplY3QnICYmIHR5cGVvZiAodHJlZSBhcyBIb3N0VHJlZSkuX2FuY2VzdHJ5ID09PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIF9iYWNrZW5kOiB2aXJ0dWFsRnMuUmVhZG9ubHlIb3N0PHt9PiA9IG5ldyB2aXJ0dWFsRnMuRW1wdHkoKSkge1xuICAgIHRoaXMuX3JlY29yZCA9IG5ldyB2aXJ0dWFsRnMuQ29yZEhvc3QobmV3IHZpcnR1YWxGcy5TYWZlUmVhZG9ubHlIb3N0KF9iYWNrZW5kKSk7XG4gICAgdGhpcy5fcmVjb3JkU3luYyA9IG5ldyB2aXJ0dWFsRnMuU3luY0RlbGVnYXRlSG9zdCh0aGlzLl9yZWNvcmQpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF9ub3JtYWxpemVQYXRoKHBhdGg6IHN0cmluZyk6IFBhdGgge1xuICAgIHJldHVybiBub3JtYWxpemUoJy8nICsgcGF0aCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3dpbGxDcmVhdGUocGF0aDogUGF0aCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmQud2lsbENyZWF0ZShwYXRoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBfd2lsbE92ZXJ3cml0ZShwYXRoOiBQYXRoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY29yZC53aWxsT3ZlcndyaXRlKHBhdGgpO1xuICB9XG5cbiAgcHJvdGVjdGVkIF93aWxsRGVsZXRlKHBhdGg6IFBhdGgpIHtcbiAgICByZXR1cm4gdGhpcy5fcmVjb3JkLndpbGxEZWxldGUocGF0aCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX3dpbGxSZW5hbWUocGF0aDogUGF0aCkge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmQud2lsbFJlbmFtZShwYXRoKTtcbiAgfVxuXG4gIGJyYW5jaCgpOiBUcmVlIHtcbiAgICBjb25zdCBicmFuY2hlZFRyZWUgPSBuZXcgSG9zdFRyZWUodGhpcy5fYmFja2VuZCk7XG4gICAgYnJhbmNoZWRUcmVlLl9yZWNvcmQgPSB0aGlzLl9yZWNvcmQuY2xvbmUoKTtcbiAgICBicmFuY2hlZFRyZWUuX3JlY29yZFN5bmMgPSBuZXcgdmlydHVhbEZzLlN5bmNEZWxlZ2F0ZUhvc3QoYnJhbmNoZWRUcmVlLl9yZWNvcmQpO1xuICAgIGJyYW5jaGVkVHJlZS5fYW5jZXN0cnkgPSBuZXcgU2V0KHRoaXMuX2FuY2VzdHJ5KS5hZGQodGhpcy5faWQpO1xuXG4gICAgcmV0dXJuIGJyYW5jaGVkVHJlZTtcbiAgfVxuXG4gIHByaXZhdGUgaXNBbmNlc3Rvck9mKHRyZWU6IFRyZWUpOiBib29sZWFuIHtcbiAgICBpZiAodHJlZSBpbnN0YW5jZW9mIEhvc3RUcmVlKSB7XG4gICAgICByZXR1cm4gdHJlZS5fYW5jZXN0cnkuaGFzKHRoaXMuX2lkKTtcbiAgICB9XG4gICAgaWYgKHRyZWUgaW5zdGFuY2VvZiBEZWxlZ2F0ZVRyZWUpIHtcbiAgICAgIHJldHVybiB0aGlzLmlzQW5jZXN0b3JPZigodHJlZSBhcyB1bmtub3duIGFzIHsgX290aGVyOiBUcmVlIH0pLl9vdGhlcik7XG4gICAgfVxuICAgIGlmICh0cmVlIGluc3RhbmNlb2YgU2NvcGVkVHJlZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaXNBbmNlc3Rvck9mKCh0cmVlIGFzIHVua25vd24gYXMgeyBfYmFzZTogVHJlZSB9KS5fYmFzZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgbWVyZ2Uob3RoZXI6IFRyZWUsIHN0cmF0ZWd5OiBNZXJnZVN0cmF0ZWd5ID0gTWVyZ2VTdHJhdGVneS5EZWZhdWx0KTogdm9pZCB7XG4gICAgaWYgKG90aGVyID09PSB0aGlzKSB7XG4gICAgICAvLyBNZXJnaW5nIHdpdGggeW91cnNlbGY/IFRzayB0c2suIE5vdGhpbmcgdG8gZG8gYXQgbGVhc3QuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNBbmNlc3Rvck9mKG90aGVyKSkge1xuICAgICAgLy8gV29ya2Fyb3VuZCBmb3IgbWVyZ2luZyBhIGJyYW5jaCBiYWNrIGludG8gb25lIG9mIGl0cyBhbmNlc3RvcnNcbiAgICAgIC8vIE1vcmUgY29tcGxldGUgYnJhbmNoIHBvaW50IHRyYWNraW5nIGlzIHJlcXVpcmVkIHRvIGF2b2lkXG4gICAgICBzdHJhdGVneSB8PSBNZXJnZVN0cmF0ZWd5Lk92ZXJ3cml0ZTtcbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdGlvbkNvbmZsaWN0QWxsb3dlZCA9XG4gICAgICAoc3RyYXRlZ3kgJiBNZXJnZVN0cmF0ZWd5LkFsbG93Q3JlYXRpb25Db25mbGljdCkgPT0gTWVyZ2VTdHJhdGVneS5BbGxvd0NyZWF0aW9uQ29uZmxpY3Q7XG4gICAgY29uc3Qgb3ZlcndyaXRlQ29uZmxpY3RBbGxvd2VkID1cbiAgICAgIChzdHJhdGVneSAmIE1lcmdlU3RyYXRlZ3kuQWxsb3dPdmVyd3JpdGVDb25mbGljdCkgPT0gTWVyZ2VTdHJhdGVneS5BbGxvd092ZXJ3cml0ZUNvbmZsaWN0O1xuICAgIGNvbnN0IGRlbGV0ZUNvbmZsaWN0QWxsb3dlZCA9XG4gICAgICAoc3RyYXRlZ3kgJiBNZXJnZVN0cmF0ZWd5LkFsbG93RGVsZXRlQ29uZmxpY3QpID09IE1lcmdlU3RyYXRlZ3kuQWxsb3dEZWxldGVDb25mbGljdDtcblxuICAgIG90aGVyLmFjdGlvbnMuZm9yRWFjaCgoYWN0aW9uKSA9PiB7XG4gICAgICBzd2l0Y2ggKGFjdGlvbi5raW5kKSB7XG4gICAgICAgIGNhc2UgJ2MnOiB7XG4gICAgICAgICAgY29uc3QgeyBwYXRoLCBjb250ZW50IH0gPSBhY3Rpb247XG5cbiAgICAgICAgICBpZiAodGhpcy5fd2lsbENyZWF0ZShwYXRoKSB8fCB0aGlzLl93aWxsT3ZlcndyaXRlKHBhdGgpIHx8IHRoaXMuZXhpc3RzKHBhdGgpKSB7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0NvbnRlbnQgPSB0aGlzLnJlYWQocGF0aCk7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdDb250ZW50ICYmIGNvbnRlbnQuZXF1YWxzKGV4aXN0aW5nQ29udGVudCkpIHtcbiAgICAgICAgICAgICAgLy8gSWRlbnRpY2FsIG91dGNvbWU7IG5vIGFjdGlvbiByZXF1aXJlZFxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghY3JlYXRpb25Db25mbGljdEFsbG93ZWQpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IE1lcmdlQ29uZmxpY3RFeGNlcHRpb24ocGF0aCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3JlY29yZC5vdmVyd3JpdGUocGF0aCwgY29udGVudCBhcyB7fSBhcyB2aXJ0dWFsRnMuRmlsZUJ1ZmZlcikuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3JlY29yZC5jcmVhdGUocGF0aCwgY29udGVudCBhcyB7fSBhcyB2aXJ0dWFsRnMuRmlsZUJ1ZmZlcikuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAnbyc6IHtcbiAgICAgICAgICBjb25zdCB7IHBhdGgsIGNvbnRlbnQgfSA9IGFjdGlvbjtcbiAgICAgICAgICBpZiAodGhpcy5fd2lsbERlbGV0ZShwYXRoKSAmJiAhb3ZlcndyaXRlQ29uZmxpY3RBbGxvd2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWVyZ2VDb25mbGljdEV4Y2VwdGlvbihwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBJZ25vcmUgaWYgY29udGVudCBpcyB0aGUgc2FtZSAoY29uc2lkZXJlZCB0aGUgc2FtZSBjaGFuZ2UpLlxuICAgICAgICAgIGlmICh0aGlzLl93aWxsT3ZlcndyaXRlKHBhdGgpKSB7XG4gICAgICAgICAgICBjb25zdCBleGlzdGluZ0NvbnRlbnQgPSB0aGlzLnJlYWQocGF0aCk7XG4gICAgICAgICAgICBpZiAoZXhpc3RpbmdDb250ZW50ICYmIGNvbnRlbnQuZXF1YWxzKGV4aXN0aW5nQ29udGVudCkpIHtcbiAgICAgICAgICAgICAgLy8gSWRlbnRpY2FsIG91dGNvbWU7IG5vIGFjdGlvbiByZXF1aXJlZFxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghb3ZlcndyaXRlQ29uZmxpY3RBbGxvd2VkKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBNZXJnZUNvbmZsaWN0RXhjZXB0aW9uKHBhdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBXZSB1c2Ugd3JpdGUgaGVyZSBhcyBtZXJnZSB2YWxpZGF0aW9uIGhhcyBhbHJlYWR5IGJlZW4gZG9uZSwgYW5kIHdlIHdhbnQgdG8gbGV0XG4gICAgICAgICAgLy8gdGhlIENvcmRIb3N0IGRvIGl0cyBqb2IuXG4gICAgICAgICAgdGhpcy5fcmVjb3JkLndyaXRlKHBhdGgsIGNvbnRlbnQgYXMge30gYXMgdmlydHVhbEZzLkZpbGVCdWZmZXIpLnN1YnNjcmliZSgpO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FzZSAncic6IHtcbiAgICAgICAgICBjb25zdCB7IHBhdGgsIHRvIH0gPSBhY3Rpb247XG4gICAgICAgICAgaWYgKHRoaXMuX3dpbGxEZWxldGUocGF0aCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBNZXJnZUNvbmZsaWN0RXhjZXB0aW9uKHBhdGgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0aGlzLl93aWxsUmVuYW1lKHBhdGgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fcmVjb3JkLndpbGxSZW5hbWVUbyhwYXRoLCB0bykpIHtcbiAgICAgICAgICAgICAgLy8gSWRlbnRpY2FsIG91dGNvbWU7IG5vIGFjdGlvbiByZXF1aXJlZFxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE5vIG92ZXJyaWRlIHBvc3NpYmxlIGZvciByZW5hbWluZy5cbiAgICAgICAgICAgIHRocm93IG5ldyBNZXJnZUNvbmZsaWN0RXhjZXB0aW9uKHBhdGgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnJlbmFtZShwYXRoLCB0byk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdkJzoge1xuICAgICAgICAgIGNvbnN0IHsgcGF0aCB9ID0gYWN0aW9uO1xuICAgICAgICAgIGlmICh0aGlzLl93aWxsRGVsZXRlKHBhdGgpKSB7XG4gICAgICAgICAgICAvLyBUT0RPOiBUaGlzIHNob3VsZCB0ZWNobmljYWxseSBjaGVjayB0aGUgY29udGVudCAoZS5nLiwgaGFzaCBvbiBkZWxldGUpXG4gICAgICAgICAgICAvLyBJZGVudGljYWwgb3V0Y29tZTsgbm8gYWN0aW9uIHJlcXVpcmVkXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCF0aGlzLmV4aXN0cyhwYXRoKSAmJiAhZGVsZXRlQ29uZmxpY3RBbGxvd2VkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgTWVyZ2VDb25mbGljdEV4Y2VwdGlvbihwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLl9yZWNvcmRTeW5jLmRlbGV0ZShwYXRoKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0IHJvb3QoKTogRGlyRW50cnkge1xuICAgIHJldHVybiB0aGlzLmdldERpcignLycpO1xuICB9XG5cbiAgLy8gUmVhZG9ubHkuXG4gIHJlYWQocGF0aDogc3RyaW5nKTogQnVmZmVyIHwgbnVsbCB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmdldChwYXRoKTtcblxuICAgIHJldHVybiBlbnRyeSA/IGVudHJ5LmNvbnRlbnQgOiBudWxsO1xuICB9XG5cbiAgcmVhZFRleHQocGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBjb25zdCBkYXRhID0gdGhpcy5yZWFkKHBhdGgpO1xuICAgIGlmIChkYXRhID09PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRmlsZURvZXNOb3RFeGlzdEV4Y2VwdGlvbihwYXRoKTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcsIHsgZmF0YWw6IHRydWUgfSk7XG5cbiAgICB0cnkge1xuICAgICAgLy8gV2l0aCB0aGUgYGZhdGFsYCBvcHRpb24gZW5hYmxlZCwgaW52YWxpZCBkYXRhIHdpbGwgdGhyb3cgYSBUeXBlRXJyb3JcbiAgICAgIHJldHVybiBkZWNvZGVyLmRlY29kZShkYXRhKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBpZiAoZSBpbnN0YW5jZW9mIFR5cGVFcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEZhaWxlZCB0byBkZWNvZGUgXCIke3BhdGh9XCIgYXMgVVRGLTggdGV4dC5gKTtcbiAgICAgIH1cbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG5cbiAgcmVhZEpzb24ocGF0aDogc3RyaW5nKTogSnNvblZhbHVlIHtcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5yZWFkVGV4dChwYXRoKTtcbiAgICBjb25zdCBlcnJvcnM6IFBhcnNlRXJyb3JbXSA9IFtdO1xuICAgIGNvbnN0IHJlc3VsdCA9IGpzb25jUGFyc2UoY29udGVudCwgZXJyb3JzLCB7IGFsbG93VHJhaWxpbmdDb21tYTogdHJ1ZSB9KTtcblxuICAgIC8vIElmIHRoZXJlIGlzIGEgcGFyc2UgZXJyb3IgdGhyb3cgd2l0aCB0aGUgZXJyb3IgaW5mb3JtYXRpb25cbiAgICBpZiAoZXJyb3JzWzBdKSB7XG4gICAgICBjb25zdCB7IGVycm9yLCBvZmZzZXQgfSA9IGVycm9yc1swXTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYEZhaWxlZCB0byBwYXJzZSBcIiR7cGF0aH1cIiBhcyBKU09OLiAke3ByaW50UGFyc2VFcnJvckNvZGUoZXJyb3IpfSBhdCBvZmZzZXQ6ICR7b2Zmc2V0fS5gLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZXhpc3RzKHBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZWNvcmRTeW5jLmlzRmlsZSh0aGlzLl9ub3JtYWxpemVQYXRoKHBhdGgpKTtcbiAgfVxuXG4gIGdldChwYXRoOiBzdHJpbmcpOiBGaWxlRW50cnkgfCBudWxsIHtcbiAgICBjb25zdCBwID0gdGhpcy5fbm9ybWFsaXplUGF0aChwYXRoKTtcbiAgICBpZiAodGhpcy5fcmVjb3JkU3luYy5pc0RpcmVjdG9yeShwKSkge1xuICAgICAgdGhyb3cgbmV3IFBhdGhJc0RpcmVjdG9yeUV4Y2VwdGlvbihwKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLl9yZWNvcmRTeW5jLmV4aXN0cyhwKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5ldyBMYXp5RmlsZUVudHJ5KHAsICgpID0+IEJ1ZmZlci5mcm9tKHRoaXMuX3JlY29yZFN5bmMucmVhZChwKSkpO1xuICB9XG5cbiAgZ2V0RGlyKHBhdGg6IHN0cmluZyk6IERpckVudHJ5IHtcbiAgICBjb25zdCBwID0gdGhpcy5fbm9ybWFsaXplUGF0aChwYXRoKTtcbiAgICBpZiAodGhpcy5fcmVjb3JkU3luYy5pc0ZpbGUocCkpIHtcbiAgICAgIHRocm93IG5ldyBQYXRoSXNGaWxlRXhjZXB0aW9uKHApO1xuICAgIH1cblxuICAgIGxldCBtYXliZUNhY2hlID0gdGhpcy5fZGlyQ2FjaGUuZ2V0KHApO1xuICAgIGlmICghbWF5YmVDYWNoZSkge1xuICAgICAgbGV0IHBhcmVudDogUGF0aCB8IG51bGwgPSBkaXJuYW1lKHApO1xuICAgICAgaWYgKHAgPT09IHBhcmVudCkge1xuICAgICAgICBwYXJlbnQgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICBtYXliZUNhY2hlID0gbmV3IEhvc3REaXJFbnRyeShwYXJlbnQgJiYgdGhpcy5nZXREaXIocGFyZW50KSwgcCwgdGhpcy5fcmVjb3JkU3luYywgdGhpcyk7XG4gICAgICB0aGlzLl9kaXJDYWNoZS5zZXQocCwgbWF5YmVDYWNoZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1heWJlQ2FjaGU7XG4gIH1cbiAgdmlzaXQodmlzaXRvcjogRmlsZVZpc2l0b3IpOiB2b2lkIHtcbiAgICB0aGlzLnJvb3QudmlzaXQoKHBhdGgsIGVudHJ5KSA9PiB7XG4gICAgICB2aXNpdG9yKHBhdGgsIGVudHJ5KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIENoYW5nZSBjb250ZW50IG9mIGhvc3QgZmlsZXMuXG4gIG92ZXJ3cml0ZShwYXRoOiBzdHJpbmcsIGNvbnRlbnQ6IEJ1ZmZlciB8IHN0cmluZyk6IHZvaWQge1xuICAgIGNvbnN0IHAgPSB0aGlzLl9ub3JtYWxpemVQYXRoKHBhdGgpO1xuICAgIGlmICghdGhpcy5fcmVjb3JkU3luYy5leGlzdHMocCkpIHtcbiAgICAgIHRocm93IG5ldyBGaWxlRG9lc05vdEV4aXN0RXhjZXB0aW9uKHApO1xuICAgIH1cbiAgICBjb25zdCBjID0gdHlwZW9mIGNvbnRlbnQgPT0gJ3N0cmluZycgPyBCdWZmZXIuZnJvbShjb250ZW50KSA6IGNvbnRlbnQ7XG4gICAgdGhpcy5fcmVjb3JkLm92ZXJ3cml0ZShwLCBjIGFzIHt9IGFzIHZpcnR1YWxGcy5GaWxlQnVmZmVyKS5zdWJzY3JpYmUoKTtcbiAgfVxuICBiZWdpblVwZGF0ZShwYXRoOiBzdHJpbmcpOiBVcGRhdGVSZWNvcmRlciB7XG4gICAgY29uc3QgZW50cnkgPSB0aGlzLmdldChwYXRoKTtcbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICB0aHJvdyBuZXcgRmlsZURvZXNOb3RFeGlzdEV4Y2VwdGlvbihwYXRoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gVXBkYXRlUmVjb3JkZXJCYXNlLmNyZWF0ZUZyb21GaWxlRW50cnkoZW50cnkpO1xuICB9XG4gIGNvbW1pdFVwZGF0ZShyZWNvcmQ6IFVwZGF0ZVJlY29yZGVyKTogdm9pZCB7XG4gICAgaWYgKHJlY29yZCBpbnN0YW5jZW9mIFVwZGF0ZVJlY29yZGVyQmFzZSkge1xuICAgICAgY29uc3QgcGF0aCA9IHJlY29yZC5wYXRoO1xuICAgICAgY29uc3QgZW50cnkgPSB0aGlzLmdldChwYXRoKTtcbiAgICAgIGlmICghZW50cnkpIHtcbiAgICAgICAgdGhyb3cgbmV3IENvbnRlbnRIYXNNdXRhdGVkRXhjZXB0aW9uKHBhdGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbmV3Q29udGVudCA9IHJlY29yZC5hcHBseShlbnRyeS5jb250ZW50KTtcbiAgICAgICAgaWYgKCFuZXdDb250ZW50LmVxdWFscyhlbnRyeS5jb250ZW50KSkge1xuICAgICAgICAgIHRoaXMub3ZlcndyaXRlKHBhdGgsIG5ld0NvbnRlbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBJbnZhbGlkVXBkYXRlUmVjb3JkRXhjZXB0aW9uKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gU3RydWN0dXJhbCBtZXRob2RzLlxuICBjcmVhdGUocGF0aDogc3RyaW5nLCBjb250ZW50OiBCdWZmZXIgfCBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBwID0gdGhpcy5fbm9ybWFsaXplUGF0aChwYXRoKTtcbiAgICBpZiAodGhpcy5fcmVjb3JkU3luYy5leGlzdHMocCkpIHtcbiAgICAgIHRocm93IG5ldyBGaWxlQWxyZWFkeUV4aXN0RXhjZXB0aW9uKHApO1xuICAgIH1cbiAgICBjb25zdCBjID0gdHlwZW9mIGNvbnRlbnQgPT0gJ3N0cmluZycgPyBCdWZmZXIuZnJvbShjb250ZW50KSA6IGNvbnRlbnQ7XG4gICAgdGhpcy5fcmVjb3JkLmNyZWF0ZShwLCBjIGFzIHt9IGFzIHZpcnR1YWxGcy5GaWxlQnVmZmVyKS5zdWJzY3JpYmUoKTtcbiAgfVxuICBkZWxldGUocGF0aDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVjb3JkU3luYy5kZWxldGUodGhpcy5fbm9ybWFsaXplUGF0aChwYXRoKSk7XG4gIH1cbiAgcmVuYW1lKGZyb206IHN0cmluZywgdG86IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlY29yZFN5bmMucmVuYW1lKHRoaXMuX25vcm1hbGl6ZVBhdGgoZnJvbSksIHRoaXMuX25vcm1hbGl6ZVBhdGgodG8pKTtcbiAgfVxuXG4gIGFwcGx5KGFjdGlvbjogQWN0aW9uLCBzdHJhdGVneT86IE1lcmdlU3RyYXRlZ3kpOiB2b2lkIHtcbiAgICB0aHJvdyBuZXcgU2NoZW1hdGljc0V4Y2VwdGlvbignQXBwbHkgbm90IGltcGxlbWVudGVkIG9uIGhvc3QgdHJlZXMuJyk7XG4gIH1cblxuICBwcml2YXRlICpnZW5lcmF0ZUFjdGlvbnMoKTogSXRlcmFibGU8QWN0aW9uPiB7XG4gICAgZm9yIChjb25zdCByZWNvcmQgb2YgdGhpcy5fcmVjb3JkLnJlY29yZHMoKSkge1xuICAgICAgc3dpdGNoIChyZWNvcmQua2luZCkge1xuICAgICAgICBjYXNlICdjcmVhdGUnOlxuICAgICAgICAgIHlpZWxkIHtcbiAgICAgICAgICAgIGlkOiB0aGlzLl9pZCxcbiAgICAgICAgICAgIHBhcmVudDogMCxcbiAgICAgICAgICAgIGtpbmQ6ICdjJyxcbiAgICAgICAgICAgIHBhdGg6IHJlY29yZC5wYXRoLFxuICAgICAgICAgICAgY29udGVudDogQnVmZmVyLmZyb20ocmVjb3JkLmNvbnRlbnQpLFxuICAgICAgICAgIH0gYXMgQ3JlYXRlRmlsZUFjdGlvbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnb3ZlcndyaXRlJzpcbiAgICAgICAgICB5aWVsZCB7XG4gICAgICAgICAgICBpZDogdGhpcy5faWQsXG4gICAgICAgICAgICBwYXJlbnQ6IDAsXG4gICAgICAgICAgICBraW5kOiAnbycsXG4gICAgICAgICAgICBwYXRoOiByZWNvcmQucGF0aCxcbiAgICAgICAgICAgIGNvbnRlbnQ6IEJ1ZmZlci5mcm9tKHJlY29yZC5jb250ZW50KSxcbiAgICAgICAgICB9IGFzIE92ZXJ3cml0ZUZpbGVBY3Rpb247XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3JlbmFtZSc6XG4gICAgICAgICAgeWllbGQge1xuICAgICAgICAgICAgaWQ6IHRoaXMuX2lkLFxuICAgICAgICAgICAgcGFyZW50OiAwLFxuICAgICAgICAgICAga2luZDogJ3InLFxuICAgICAgICAgICAgcGF0aDogcmVjb3JkLmZyb20sXG4gICAgICAgICAgICB0bzogcmVjb3JkLnRvLFxuICAgICAgICAgIH0gYXMgUmVuYW1lRmlsZUFjdGlvbjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICB5aWVsZCB7XG4gICAgICAgICAgICBpZDogdGhpcy5faWQsXG4gICAgICAgICAgICBwYXJlbnQ6IDAsXG4gICAgICAgICAgICBraW5kOiAnZCcsXG4gICAgICAgICAgICBwYXRoOiByZWNvcmQucGF0aCxcbiAgICAgICAgICB9IGFzIERlbGV0ZUZpbGVBY3Rpb247XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFjdGlvbnMoKTogQWN0aW9uW10ge1xuICAgIC8vIENyZWF0ZSBhIGxpc3Qgb2YgYWxsIHJlY29yZHMgdW50aWwgd2UgaGl0IG91ciBvcmlnaW5hbCBiYWNrZW5kLiBUaGlzIGlzIHRvIHN1cHBvcnQgYnJhbmNoZXNcbiAgICAvLyB0aGF0IGRpdmVyZ2UgZnJvbSBlYWNoIG90aGVycy5cbiAgICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmdlbmVyYXRlQWN0aW9ucygpKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSG9zdENyZWF0ZVRyZWUgZXh0ZW5kcyBIb3N0VHJlZSB7XG4gIGNvbnN0cnVjdG9yKGhvc3Q6IHZpcnR1YWxGcy5SZWFkb25seUhvc3QpIHtcbiAgICBzdXBlcigpO1xuXG4gICAgY29uc3QgdGVtcEhvc3QgPSBuZXcgSG9zdFRyZWUoaG9zdCk7XG4gICAgdGVtcEhvc3QudmlzaXQoKHBhdGgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSB0ZW1wSG9zdC5yZWFkKHBhdGgpO1xuICAgICAgaWYgKGNvbnRlbnQpIHtcbiAgICAgICAgdGhpcy5jcmVhdGUocGF0aCwgY29udGVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIEZpbHRlckhvc3RUcmVlIGV4dGVuZHMgSG9zdFRyZWUge1xuICBjb25zdHJ1Y3Rvcih0cmVlOiBIb3N0VHJlZSwgZmlsdGVyOiBGaWxlUHJlZGljYXRlPGJvb2xlYW4+ID0gKCkgPT4gdHJ1ZSkge1xuICAgIGNvbnN0IG5ld0JhY2tlbmQgPSBuZXcgdmlydHVhbEZzLlNpbXBsZU1lbW9yeUhvc3QoKTtcbiAgICAvLyBjYXN0IHRvIGFsbG93IGFjY2Vzc1xuICAgIGNvbnN0IG9yaWdpbmFsQmFja2VuZCA9ICh0cmVlIGFzIEZpbHRlckhvc3RUcmVlKS5fYmFja2VuZDtcblxuICAgIGNvbnN0IHJlY3Vyc2U6IChiYXNlOiBQYXRoKSA9PiBPYnNlcnZhYmxlPHZvaWQ+ID0gKGJhc2UpID0+IHtcbiAgICAgIHJldHVybiBvcmlnaW5hbEJhY2tlbmQubGlzdChiYXNlKS5waXBlKFxuICAgICAgICBtZXJnZU1hcCgoeCkgPT4geCksXG4gICAgICAgIG1hcCgocGF0aCkgPT4gam9pbihiYXNlLCBwYXRoKSksXG4gICAgICAgIGNvbmNhdE1hcCgocGF0aCkgPT4ge1xuICAgICAgICAgIGxldCBpc0RpcmVjdG9yeSA9IGZhbHNlO1xuICAgICAgICAgIG9yaWdpbmFsQmFja2VuZC5pc0RpcmVjdG9yeShwYXRoKS5zdWJzY3JpYmUoKHZhbCkgPT4gKGlzRGlyZWN0b3J5ID0gdmFsKSk7XG4gICAgICAgICAgaWYgKGlzRGlyZWN0b3J5KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVjdXJzZShwYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgaXNGaWxlID0gZmFsc2U7XG4gICAgICAgICAgb3JpZ2luYWxCYWNrZW5kLmlzRmlsZShwYXRoKS5zdWJzY3JpYmUoKHZhbCkgPT4gKGlzRmlsZSA9IHZhbCkpO1xuICAgICAgICAgIGlmICghaXNGaWxlIHx8ICFmaWx0ZXIocGF0aCkpIHtcbiAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgY29udGVudDogQXJyYXlCdWZmZXIgfCBudWxsID0gbnVsbDtcbiAgICAgICAgICBvcmlnaW5hbEJhY2tlbmQucmVhZChwYXRoKS5zdWJzY3JpYmUoKHZhbCkgPT4gKGNvbnRlbnQgPSB2YWwpKTtcbiAgICAgICAgICBpZiAoIWNvbnRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBFTVBUWTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gbmV3QmFja2VuZC53cml0ZShwYXRoLCBjb250ZW50IGFzIHt9IGFzIHZpcnR1YWxGcy5GaWxlQnVmZmVyKTtcbiAgICAgICAgfSksXG4gICAgICApO1xuICAgIH07XG5cbiAgICByZWN1cnNlKG5vcm1hbGl6ZSgnLycpKS5zdWJzY3JpYmUoKTtcblxuICAgIHN1cGVyKG5ld0JhY2tlbmQpO1xuXG4gICAgZm9yIChjb25zdCBhY3Rpb24gb2YgdHJlZS5hY3Rpb25zKSB7XG4gICAgICBpZiAoIWZpbHRlcihhY3Rpb24ucGF0aCkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAoYWN0aW9uLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgdGhpcy5jcmVhdGUoYWN0aW9uLnBhdGgsIGFjdGlvbi5jb250ZW50KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgdGhpcy5kZWxldGUoYWN0aW9uLnBhdGgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvJzpcbiAgICAgICAgICB0aGlzLm92ZXJ3cml0ZShhY3Rpb24ucGF0aCwgYWN0aW9uLmNvbnRlbnQpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyJzpcbiAgICAgICAgICB0aGlzLnJlbmFtZShhY3Rpb24ucGF0aCwgYWN0aW9uLnRvKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==