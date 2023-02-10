"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBuffer2 = exports.UpdateBuffer = exports.UpdateBufferBase = exports.Chunk = exports.ContentCannotBeRemovedException = exports.IndexOutOfBoundException = void 0;
const core_1 = require("@angular-devkit/core");
const magic_string_1 = __importDefault(require("magic-string"));
const environment_options_1 = require("./environment-options");
const linked_list_1 = require("./linked-list");
class IndexOutOfBoundException extends core_1.BaseException {
    constructor(index, min, max = Infinity) {
        super(`Index ${index} outside of range [${min}, ${max}].`);
    }
}
exports.IndexOutOfBoundException = IndexOutOfBoundException;
/** @deprecated Since v13.0 */
class ContentCannotBeRemovedException extends core_1.BaseException {
    constructor() {
        super(`User tried to remove content that was marked essential.`);
    }
}
exports.ContentCannotBeRemovedException = ContentCannotBeRemovedException;
/**
 * A Chunk description, including left/right content that has been inserted.
 * If _left/_right is null, this means that content was deleted. If the _content is null,
 * it means the content itself was deleted.
 *
 * @see UpdateBuffer
 * @deprecated Since v13.0
 */
class Chunk {
    constructor(start, end, originalContent) {
        this.start = start;
        this.end = end;
        this.originalContent = originalContent;
        this._left = Buffer.alloc(0);
        this._right = Buffer.alloc(0);
        this._assertLeft = false;
        this._assertRight = false;
        this.next = null;
        this._content = originalContent.slice(start, end);
    }
    get length() {
        return ((this._left ? this._left.length : 0) +
            (this._content ? this._content.length : 0) +
            (this._right ? this._right.length : 0));
    }
    toString(encoding = 'utf-8') {
        return ((this._left ? this._left.toString(encoding) : '') +
            (this._content ? this._content.toString(encoding) : '') +
            (this._right ? this._right.toString(encoding) : ''));
    }
    slice(start) {
        if (start < this.start || start > this.end) {
            throw new IndexOutOfBoundException(start, this.start, this.end);
        }
        // Update _content to the new indices.
        const newChunk = new Chunk(start, this.end, this.originalContent);
        // If this chunk has _content, reslice the original _content. We move the _right so we are not
        // losing any data here. If this chunk has been deleted, the next chunk should also be deleted.
        if (this._content) {
            this._content = this.originalContent.slice(this.start, start);
        }
        else {
            newChunk._content = this._content;
            if (this._right === null) {
                newChunk._left = null;
            }
        }
        this.end = start;
        // Move _right to the new chunk.
        newChunk._right = this._right;
        this._right = this._right && Buffer.alloc(0);
        // Update essentials.
        if (this._assertRight) {
            newChunk._assertRight = true;
            this._assertRight = false;
        }
        // Update the linked list.
        newChunk.next = this.next;
        this.next = newChunk;
        return newChunk;
    }
    append(buffer, essential) {
        if (!this._right) {
            if (essential) {
                throw new ContentCannotBeRemovedException();
            }
            return;
        }
        const outro = this._right;
        this._right = Buffer.alloc(outro.length + buffer.length);
        outro.copy(this._right, 0);
        buffer.copy(this._right, outro.length);
        if (essential) {
            this._assertRight = true;
        }
    }
    prepend(buffer, essential) {
        if (!this._left) {
            if (essential) {
                throw new ContentCannotBeRemovedException();
            }
            return;
        }
        const intro = this._left;
        this._left = Buffer.alloc(intro.length + buffer.length);
        intro.copy(this._left, 0);
        buffer.copy(this._left, intro.length);
        if (essential) {
            this._assertLeft = true;
        }
    }
    assert(left, _content, right) {
        if (left && this._assertLeft) {
            throw new ContentCannotBeRemovedException();
        }
        if (right && this._assertRight) {
            throw new ContentCannotBeRemovedException();
        }
    }
    remove(left, content, right) {
        if (left) {
            if (this._assertLeft) {
                throw new ContentCannotBeRemovedException();
            }
            this._left = null;
        }
        if (content) {
            this._content = null;
        }
        if (right) {
            if (this._assertRight) {
                throw new ContentCannotBeRemovedException();
            }
            this._right = null;
        }
    }
    copy(target, start) {
        if (this._left) {
            this._left.copy(target, start);
            start += this._left.length;
        }
        if (this._content) {
            this._content.copy(target, start);
            start += this._content.length;
        }
        if (this._right) {
            this._right.copy(target, start);
            start += this._right.length;
        }
        return start;
    }
}
exports.Chunk = Chunk;
/**
 * Base class for an update buffer implementation that allows buffers to be inserted to the _right
 * or _left, or deleted, while keeping indices to the original buffer.
 */
class UpdateBufferBase {
    constructor(_originalContent) {
        this._originalContent = _originalContent;
    }
    /**
     * Creates an UpdateBufferBase instance. Depending on the NG_UPDATE_BUFFER_V2
     * environment variable, will either create an UpdateBuffer or an UpdateBuffer2
     * instance.
     *
     * See: https://github.com/angular/angular-cli/issues/21110
     *
     * @param originalContent The original content of the update buffer instance.
     * @returns An UpdateBufferBase instance.
     */
    static create(originalContent) {
        return environment_options_1.updateBufferV2Enabled
            ? new UpdateBuffer2(originalContent)
            : new UpdateBuffer(originalContent);
    }
}
exports.UpdateBufferBase = UpdateBufferBase;
/**
 * An utility class that allows buffers to be inserted to the _right or _left, or deleted, while
 * keeping indices to the original buffer.
 *
 * The constructor takes an original buffer, and keeps it into a linked list of chunks, smaller
 * buffers that keep track of _content inserted to the _right or _left of it.
 *
 * Since the Node Buffer structure is non-destructive when slicing, we try to use slicing to create
 * new chunks, and always keep chunks pointing to the original content.
 *
 * @deprecated Since v13.0
 */
class UpdateBuffer extends UpdateBufferBase {
    constructor(originalContent) {
        super(originalContent);
        this._linkedList = new linked_list_1.LinkedList(new Chunk(0, originalContent.length, originalContent));
    }
    _assertIndex(index) {
        if (index < 0 || index > this._originalContent.length) {
            throw new IndexOutOfBoundException(index, 0, this._originalContent.length);
        }
    }
    _slice(start) {
        let index;
        if (start >= this._originalContent.length) {
            index = start;
        }
        else if (start < 0) {
            index = this._originalContent.length + start;
        }
        else {
            index = this._getTextPosition(start);
        }
        this._assertIndex(index);
        // Find the chunk by going through the list.
        const h = this._linkedList.find((chunk) => index <= chunk.end);
        if (!h) {
            throw Error('Chunk cannot be found.');
        }
        if (index == h.end && h.next !== null) {
            return [h, h.next];
        }
        return [h, h.slice(index)];
    }
    /**
     * Gets the position in the content based on the position in the string.
     * Some characters might be wider than one byte, thus we have to determine the position using
     * string functions.
     */
    _getTextPosition(index) {
        return Buffer.from(this._originalContent.toString().substring(0, index)).length;
    }
    get length() {
        return this._linkedList.reduce((acc, chunk) => acc + chunk.length, 0);
    }
    get original() {
        return this._originalContent;
    }
    toString(encoding = 'utf-8') {
        return this._linkedList.reduce((acc, chunk) => acc + chunk.toString(encoding), '');
    }
    generate() {
        const result = Buffer.allocUnsafe(this.length);
        let i = 0;
        this._linkedList.forEach((chunk) => {
            chunk.copy(result, i);
            i += chunk.length;
        });
        return result;
    }
    insertLeft(index, content, assert = false) {
        this._slice(index)[0].append(content, assert);
    }
    insertRight(index, content, assert = false) {
        this._slice(index)[1].prepend(content, assert);
    }
    remove(index, length) {
        if (length === 0) {
            return;
        }
        const end = index + length;
        const first = this._slice(index)[1];
        const last = this._slice(end)[1];
        let curr;
        for (curr = first; curr && curr !== last; curr = curr.next) {
            curr.assert(curr !== first, curr !== last, curr === first);
        }
        for (curr = first; curr && curr !== last; curr = curr.next) {
            curr.remove(curr !== first, curr !== last, curr === first);
        }
        if (curr) {
            curr.remove(true, false, false);
        }
    }
}
exports.UpdateBuffer = UpdateBuffer;
/**
 * An utility class that allows buffers to be inserted to the _right or _left, or deleted, while
 * keeping indices to the original buffer.
 */
class UpdateBuffer2 extends UpdateBufferBase {
    constructor() {
        super(...arguments);
        this._mutatableContent = new magic_string_1.default(this._originalContent.toString());
    }
    _assertIndex(index) {
        if (index < 0 || index > this._originalContent.length) {
            throw new IndexOutOfBoundException(index, 0, this._originalContent.length);
        }
    }
    get length() {
        return this._mutatableContent.length();
    }
    get original() {
        return this._originalContent;
    }
    toString() {
        return this._mutatableContent.toString();
    }
    generate() {
        return Buffer.from(this.toString());
    }
    insertLeft(index, content) {
        this._assertIndex(index);
        this._mutatableContent.appendLeft(index, content.toString());
    }
    insertRight(index, content) {
        this._assertIndex(index);
        this._mutatableContent.appendRight(index, content.toString());
    }
    remove(index, length) {
        this._assertIndex(index);
        this._mutatableContent.remove(index, index + length);
    }
}
exports.UpdateBuffer2 = UpdateBuffer2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLWJ1ZmZlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L3NjaGVtYXRpY3Mvc3JjL3V0aWxpdHkvdXBkYXRlLWJ1ZmZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7OztHQU1HOzs7Ozs7QUFFSCwrQ0FBcUQ7QUFDckQsZ0VBQXVDO0FBQ3ZDLCtEQUE4RDtBQUM5RCwrQ0FBMkM7QUFFM0MsTUFBYSx3QkFBeUIsU0FBUSxvQkFBYTtJQUN6RCxZQUFZLEtBQWEsRUFBRSxHQUFXLEVBQUUsR0FBRyxHQUFHLFFBQVE7UUFDcEQsS0FBSyxDQUFDLFNBQVMsS0FBSyxzQkFBc0IsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUNGO0FBSkQsNERBSUM7QUFDRCw4QkFBOEI7QUFDOUIsTUFBYSwrQkFBZ0MsU0FBUSxvQkFBYTtJQUNoRTtRQUNFLEtBQUssQ0FBQyx5REFBeUQsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FDRjtBQUpELDBFQUlDO0FBRUQ7Ozs7Ozs7R0FPRztBQUNILE1BQWEsS0FBSztJQVVoQixZQUFtQixLQUFhLEVBQVMsR0FBVyxFQUFTLGVBQXVCO1FBQWpFLFVBQUssR0FBTCxLQUFLLENBQVE7UUFBUyxRQUFHLEdBQUgsR0FBRyxDQUFRO1FBQVMsb0JBQWUsR0FBZixlQUFlLENBQVE7UUFSNUUsVUFBSyxHQUFrQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLFdBQU0sR0FBa0IsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV4QyxnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQUU3QixTQUFJLEdBQWlCLElBQUksQ0FBQztRQUd4QixJQUFJLENBQUMsUUFBUSxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMs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QyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssR0FBRyxNQUFNLENBQUMsQ0FBQztJQUN2RCxDQUFDO0NBQ0Y7QUF0Q0Qsc0NBc0NDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7IEJhc2VFeGNlcHRpb24gfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgTWFnaWNTdHJpbmcgZnJvbSAnbWFnaWMtc3RyaW5nJztcbmltcG9ydCB7IHVwZGF0ZUJ1ZmZlclYyRW5hYmxlZCB9IGZyb20gJy4vZW52aXJvbm1lbnQtb3B0aW9ucyc7XG5pbXBvcnQgeyBMaW5rZWRMaXN0IH0gZnJvbSAnLi9saW5rZWQtbGlzdCc7XG5cbmV4cG9ydCBjbGFzcyBJbmRleE91dE9mQm91bmRFeGNlcHRpb24gZXh0ZW5kcyBCYXNlRXhjZXB0aW9uIHtcbiAgY29uc3RydWN0b3IoaW5kZXg6IG51bWJlciwgbWluOiBudW1iZXIsIG1heCA9IEluZmluaXR5KSB7XG4gICAgc3VwZXIoYEluZGV4ICR7aW5kZXh9IG91dHNpZGUgb2YgcmFuZ2UgWyR7bWlufSwgJHttYXh9XS5gKTtcbiAgfVxufVxuLyoqIEBkZXByZWNhdGVkIFNpbmNlIHYxMy4wICovXG5leHBvcnQgY2xhc3MgQ29udGVudENhbm5vdEJlUmVtb3ZlZEV4Y2VwdGlvbiBleHRlbmRzIEJhc2VFeGNlcHRpb24ge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihgVXNlciB0cmllZCB0byByZW1vdmUgY29udGVudCB0aGF0IHdhcyBtYXJrZWQgZXNzZW50aWFsLmApO1xuICB9XG59XG5cbi8qKlxuICogQSBDaHVuayBkZXNjcmlwdGlvbiwgaW5jbHVkaW5nIGxlZnQvcmlnaHQgY29udGVudCB0aGF0IGhhcyBiZWVuIGluc2VydGVkLlxuICogSWYgX2xlZnQvX3JpZ2h0IGlzIG51bGwsIHRoaXMgbWVhbnMgdGhhdCBjb250ZW50IHdhcyBkZWxldGVkLiBJZiB0aGUgX2NvbnRlbnQgaXMgbnVsbCxcbiAqIGl0IG1lYW5zIHRoZSBjb250ZW50IGl0c2VsZiB3YXMgZGVsZXRlZC5cbiAqXG4gKiBAc2VlIFVwZGF0ZUJ1ZmZlclxuICogQGRlcHJlY2F0ZWQgU2luY2UgdjEzLjBcbiAqL1xuZXhwb3J0IGNsYXNzIENodW5rIHtcbiAgcHJpdmF0ZSBfY29udGVudDogQnVmZmVyIHwgbnVsbDtcbiAgcHJpdmF0ZSBfbGVmdDogQnVmZmVyIHwgbnVsbCA9IEJ1ZmZlci5hbGxvYygwKTtcbiAgcHJpdmF0ZSBfcmlnaHQ6IEJ1ZmZlciB8IG51bGwgPSBCdWZmZXIuYWxsb2MoMCk7XG5cbiAgcHJpdmF0ZSBfYXNzZXJ0TGVmdCA9IGZhbHNlO1xuICBwcml2YXRlIF9hc3NlcnRSaWdodCA9IGZhbHNlO1xuXG4gIG5leHQ6IENodW5rIHwgbnVsbCA9IG51bGw7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHN0YXJ0OiBudW1iZXIsIHB1YmxpYyBlbmQ6IG51bWJlciwgcHVibGljIG9yaWdpbmFsQ29udGVudDogQnVmZmVyKSB7XG4gICAgdGhpcy5fY29udGVudCA9IG9yaWdpbmFsQ29udGVudC5zbGljZShzdGFydCwgZW5kKTtcbiAgfVxuXG4gIGdldCBsZW5ndGgoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLl9sZWZ0ID8gdGhpcy5fbGVmdC5sZW5ndGggOiAwKSArXG4gICAgICAodGhpcy5fY29udGVudCA/IHRoaXMuX2NvbnRlbnQubGVuZ3RoIDogMCkgK1xuICAgICAgKHRoaXMuX3JpZ2h0ID8gdGhpcy5fcmlnaHQubGVuZ3RoIDogMClcbiAgICApO1xuICB9XG4gIHRvU3RyaW5nKGVuY29kaW5nOiBCdWZmZXJFbmNvZGluZyA9ICd1dGYtOCcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMuX2xlZnQgPyB0aGlzLl9sZWZ0LnRvU3RyaW5nKGVuY29kaW5nKSA6ICcnKSArXG4gICAgICAodGhpcy5fY29udGVudCA/IHRoaXMuX2NvbnRlbnQudG9TdHJpbmcoZW5jb2RpbmcpIDogJycpICtcbiAgICAgICh0aGlzLl9yaWdodCA/IHRoaXMuX3JpZ2h0LnRvU3RyaW5nKGVuY29kaW5nKSA6ICcnKVxuICAgICk7XG4gIH1cblxuICBzbGljZShzdGFydDogbnVtYmVyKSB7XG4gICAgaWYgKHN0YXJ0IDwgdGhpcy5zdGFydCB8fCBzdGFydCA+IHRoaXMuZW5kKSB7XG4gICAgICB0aHJvdyBuZXcgSW5kZXhPdXRPZkJvdW5kRXhjZXB0aW9uKHN0YXJ0LCB0aGlzLnN0YXJ0LCB0aGlzLmVuZCk7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIF9jb250ZW50IHRvIHRoZSBuZXcgaW5kaWNlcy5cbiAgICBjb25zdCBuZXdDaHVuayA9IG5ldyBDaHVuayhzdGFydCwgdGhpcy5lbmQsIHRoaXMub3JpZ2luYWxDb250ZW50KTtcblxuICAgIC8vIElmIHRoaXMgY2h1bmsgaGFzIF9jb250ZW50LCByZXNsaWNlIHRoZSBvcmlnaW5hbCBfY29udGVudC4gV2UgbW92ZSB0aGUgX3JpZ2h0IHNvIHdlIGFyZSBub3RcbiAgICAvLyBsb3NpbmcgYW55IGRhdGEgaGVyZS4gSWYgdGhpcyBjaHVuayBoYXMgYmVlbiBkZWxldGVkLCB0aGUgbmV4dCBjaHVuayBzaG91bGQgYWxzbyBiZSBkZWxldGVkLlxuICAgIGlmICh0aGlzLl9jb250ZW50KSB7XG4gICAgICB0aGlzLl9jb250ZW50ID0gdGhpcy5vcmlnaW5hbENvbnRlbnQuc2xpY2UodGhpcy5zdGFydCwgc3RhcnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdDaHVuay5fY29udGVudCA9IHRoaXMuX2NvbnRlbnQ7XG4gICAgICBpZiAodGhpcy5fcmlnaHQgPT09IG51bGwpIHtcbiAgICAgICAgbmV3Q2h1bmsuX2xlZnQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmVuZCA9IHN0YXJ0O1xuXG4gICAgLy8gTW92ZSBfcmlnaHQgdG8gdGhlIG5ldyBjaHVuay5cbiAgICBuZXdDaHVuay5fcmlnaHQgPSB0aGlzLl9yaWdodDtcbiAgICB0aGlzLl9yaWdodCA9IHRoaXMuX3JpZ2h0ICYmIEJ1ZmZlci5hbGxvYygwKTtcblxuICAgIC8vIFVwZGF0ZSBlc3NlbnRpYWxzLlxuICAgIGlmICh0aGlzLl9hc3NlcnRSaWdodCkge1xuICAgICAgbmV3Q2h1bmsuX2Fzc2VydFJpZ2h0ID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2Fzc2VydFJpZ2h0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIHRoZSBsaW5rZWQgbGlzdC5cbiAgICBuZXdDaHVuay5uZXh0ID0gdGhpcy5uZXh0O1xuICAgIHRoaXMubmV4dCA9IG5ld0NodW5rO1xuXG4gICAgcmV0dXJuIG5ld0NodW5rO1xuICB9XG5cbiAgYXBwZW5kKGJ1ZmZlcjogQnVmZmVyLCBlc3NlbnRpYWw6IGJvb2xlYW4pIHtcbiAgICBpZiAoIXRoaXMuX3JpZ2h0KSB7XG4gICAgICBpZiAoZXNzZW50aWFsKSB7XG4gICAgICAgIHRocm93IG5ldyBDb250ZW50Q2Fubm90QmVSZW1vdmVkRXhjZXB0aW9uKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvdXRybyA9IHRoaXMuX3JpZ2h0O1xuICAgIHRoaXMuX3JpZ2h0ID0gQnVmZmVyLmFsbG9jKG91dHJvLmxlbmd0aCArIGJ1ZmZlci5sZW5ndGgpO1xuICAgIG91dHJvLmNvcHkodGhpcy5fcmlnaHQsIDApO1xuICAgIGJ1ZmZlci5jb3B5KHRoaXMuX3JpZ2h0LCBvdXRyby5sZW5ndGgpO1xuXG4gICAgaWYgKGVzc2VudGlhbCkge1xuICAgICAgdGhpcy5fYXNzZXJ0UmlnaHQgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBwcmVwZW5kKGJ1ZmZlcjogQnVmZmVyLCBlc3NlbnRpYWw6IGJvb2xlYW4pIHtcbiAgICBpZiAoIXRoaXMuX2xlZnQpIHtcbiAgICAgIGlmIChlc3NlbnRpYWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IENvbnRlbnRDYW5ub3RCZVJlbW92ZWRFeGNlcHRpb24oKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGludHJvID0gdGhpcy5fbGVmdDtcbiAgICB0aGlzLl9sZWZ0ID0gQnVmZmVyLmFsbG9jKGludHJvLmxlbmd0aCArIGJ1ZmZlci5sZW5ndGgpO1xuICAgIGludHJvLmNvcHkodGhpcy5fbGVmdCwgMCk7XG4gICAgYnVmZmVyLmNvcHkodGhpcy5fbGVmdCwgaW50cm8ubGVuZ3RoKTtcblxuICAgIGlmIChlc3NlbnRpYWwpIHtcbiAgICAgIHRoaXMuX2Fzc2VydExlZnQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGFzc2VydChsZWZ0OiBib29sZWFuLCBfY29udGVudDogYm9vbGVhbiwgcmlnaHQ6IGJvb2xlYW4pIHtcbiAgICBpZiAobGVmdCAmJiB0aGlzLl9hc3NlcnRMZWZ0KSB7XG4gICAgICB0aHJvdyBuZXcgQ29udGVudENhbm5vdEJlUmVtb3ZlZEV4Y2VwdGlvbigpO1xuICAgIH1cblxuICAgIGlmIChyaWdodCAmJiB0aGlzLl9hc3NlcnRSaWdodCkge1xuICAgICAgdGhyb3cgbmV3IENvbnRlbnRDYW5ub3RCZVJlbW92ZWRFeGNlcHRpb24oKTtcbiAgICB9XG4gIH1cblxuICByZW1vdmUobGVmdDogYm9vbGVhbiwgY29udGVudDogYm9vbGVhbiwgcmlnaHQ6IGJvb2xlYW4pIHtcbiAgICBpZiAobGVmdCkge1xuICAgICAgaWYgKHRoaXMuX2Fzc2VydExlZnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IENvbnRlbnRDYW5ub3RCZVJlbW92ZWRFeGNlcHRpb24oKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2xlZnQgPSBudWxsO1xuICAgIH1cbiAgICBpZiAoY29udGVudCkge1xuICAgICAgdGhpcy5fY29udGVudCA9IG51bGw7XG4gICAgfVxuICAgIGlmIChyaWdodCkge1xuICAgICAgaWYgKHRoaXMuX2Fzc2VydFJpZ2h0KSB7XG4gICAgICAgIHRocm93IG5ldyBDb250ZW50Q2Fubm90QmVSZW1vdmVkRXhjZXB0aW9uKCk7XG4gICAgICB9XG4gICAgICB0aGlzLl9yaWdodCA9IG51bGw7XG4gICAgfVxuICB9XG5cbiAgY29weSh0YXJnZXQ6IEJ1ZmZlciwgc3RhcnQ6IG51bWJlcikge1xuICAgIGlmICh0aGlzLl9sZWZ0KSB7XG4gICAgICB0aGlzLl9sZWZ0LmNvcHkodGFyZ2V0LCBzdGFydCk7XG4gICAgICBzdGFydCArPSB0aGlzLl9sZWZ0Lmxlbmd0aDtcbiAgICB9XG4gICAgaWYgKHRoaXMuX2NvbnRlbnQpIHtcbiAgICAgIHRoaXMuX2NvbnRlbnQuY29weSh0YXJnZXQsIHN0YXJ0KTtcbiAgICAgIHN0YXJ0ICs9IHRoaXMuX2NvbnRlbnQubGVuZ3RoO1xuICAgIH1cbiAgICBpZiAodGhpcy5fcmlnaHQpIHtcbiAgICAgIHRoaXMuX3JpZ2h0LmNvcHkodGFyZ2V0LCBzdGFydCk7XG4gICAgICBzdGFydCArPSB0aGlzLl9yaWdodC5sZW5ndGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YXJ0O1xuICB9XG59XG5cbi8qKlxuICogQmFzZSBjbGFzcyBmb3IgYW4gdXBkYXRlIGJ1ZmZlciBpbXBsZW1lbnRhdGlvbiB0aGF0IGFsbG93cyBidWZmZXJzIHRvIGJlIGluc2VydGVkIHRvIHRoZSBfcmlnaHRcbiAqIG9yIF9sZWZ0LCBvciBkZWxldGVkLCB3aGlsZSBrZWVwaW5nIGluZGljZXMgdG8gdGhlIG9yaWdpbmFsIGJ1ZmZlci5cbiAqL1xuZXhwb3J0IGFic3RyYWN0IGNsYXNzIFVwZGF0ZUJ1ZmZlckJhc2Uge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgX29yaWdpbmFsQ29udGVudDogQnVmZmVyKSB7fVxuICBhYnN0cmFjdCBnZXQgbGVuZ3RoKCk6IG51bWJlcjtcbiAgYWJzdHJhY3QgZ2V0IG9yaWdpbmFsKCk6IEJ1ZmZlcjtcbiAgYWJzdHJhY3QgdG9TdHJpbmcoZW5jb2Rpbmc/OiBzdHJpbmcpOiBzdHJpbmc7XG4gIGFic3RyYWN0IGdlbmVyYXRlKCk6IEJ1ZmZlcjtcbiAgYWJzdHJhY3QgaW5zZXJ0TGVmdChpbmRleDogbnVtYmVyLCBjb250ZW50OiBCdWZmZXIsIGFzc2VydD86IGJvb2xlYW4pOiB2b2lkO1xuICBhYnN0cmFjdCBpbnNlcnRSaWdodChpbmRleDogbnVtYmVyLCBjb250ZW50OiBCdWZmZXIsIGFzc2VydD86IGJvb2xlYW4pOiB2b2lkO1xuICBhYnN0cmFjdCByZW1vdmUoaW5kZXg6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIpOiB2b2lkO1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGFuIFVwZGF0ZUJ1ZmZlckJhc2UgaW5zdGFuY2UuIERlcGVuZGluZyBvbiB0aGUgTkdfVVBEQVRFX0JVRkZFUl9WMlxuICAgKiBlbnZpcm9ubWVudCB2YXJpYWJsZSwgd2lsbCBlaXRoZXIgY3JlYXRlIGFuIFVwZGF0ZUJ1ZmZlciBvciBhbiBVcGRhdGVCdWZmZXIyXG4gICAqIGluc3RhbmNlLlxuICAgKlxuICAgKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXItY2xpL2lzc3Vlcy8yMTExMFxuICAgKlxuICAgKiBAcGFyYW0gb3JpZ2luYWxDb250ZW50IFRoZSBvcmlnaW5hbCBjb250ZW50IG9mIHRoZSB1cGRhdGUgYnVmZmVyIGluc3RhbmNlLlxuICAgKiBAcmV0dXJucyBBbiBVcGRhdGVCdWZmZXJCYXNlIGluc3RhbmNlLlxuICAgKi9cbiAgc3RhdGljIGNyZWF0ZShvcmlnaW5hbENvbnRlbnQ6IEJ1ZmZlcik6IFVwZGF0ZUJ1ZmZlckJhc2Uge1xuICAgIHJldHVybiB1cGRhdGVCdWZmZXJWMkVuYWJsZWRcbiAgICAgID8gbmV3IFVwZGF0ZUJ1ZmZlcjIob3JpZ2luYWxDb250ZW50KVxuICAgICAgOiBuZXcgVXBkYXRlQnVmZmVyKG9yaWdpbmFsQ29udGVudCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBbiB1dGlsaXR5IGNsYXNzIHRoYXQgYWxsb3dzIGJ1ZmZlcnMgdG8gYmUgaW5zZXJ0ZWQgdG8gdGhlIF9yaWdodCBvciBfbGVmdCwgb3IgZGVsZXRlZCwgd2hpbGVcbiAqIGtlZXBpbmcgaW5kaWNlcyB0byB0aGUgb3JpZ2luYWwgYnVmZmVyLlxuICpcbiAqIFRoZSBjb25zdHJ1Y3RvciB0YWtlcyBhbiBvcmlnaW5hbCBidWZmZXIsIGFuZCBrZWVwcyBpdCBpbnRvIGEgbGlua2VkIGxpc3Qgb2YgY2h1bmtzLCBzbWFsbGVyXG4gKiBidWZmZXJzIHRoYXQga2VlcCB0cmFjayBvZiBfY29udGVudCBpbnNlcnRlZCB0byB0aGUgX3JpZ2h0IG9yIF9sZWZ0IG9mIGl0LlxuICpcbiAqIFNpbmNlIHRoZSBOb2RlIEJ1ZmZlciBzdHJ1Y3R1cmUgaXMgbm9uLWRlc3RydWN0aXZlIHdoZW4gc2xpY2luZywgd2UgdHJ5IHRvIHVzZSBzbGljaW5nIHRvIGNyZWF0ZVxuICogbmV3IGNodW5rcywgYW5kIGFsd2F5cyBrZWVwIGNodW5rcyBwb2ludGluZyB0byB0aGUgb3JpZ2luYWwgY29udGVudC5cbiAqXG4gKiBAZGVwcmVjYXRlZCBTaW5jZSB2MTMuMFxuICovXG5leHBvcnQgY2xhc3MgVXBkYXRlQnVmZmVyIGV4dGVuZHMgVXBkYXRlQnVmZmVyQmFzZSB7XG4gIHByb3RlY3RlZCBfbGlua2VkTGlzdDogTGlua2VkTGlzdDxDaHVuaz47XG5cbiAgY29uc3RydWN0b3Iob3JpZ2luYWxDb250ZW50OiBCdWZmZXIpIHtcbiAgICBzdXBlcihvcmlnaW5hbENvbnRlbnQpO1xuICAgIHRoaXMuX2xpbmtlZExpc3QgPSBuZXcgTGlua2VkTGlzdChuZXcgQ2h1bmsoMCwgb3JpZ2luYWxDb250ZW50Lmxlbmd0aCwgb3JpZ2luYWxDb250ZW50KSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgX2Fzc2VydEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID4gdGhpcy5fb3JpZ2luYWxDb250ZW50Lmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEluZGV4T3V0T2ZCb3VuZEV4Y2VwdGlvbihpbmRleCwgMCwgdGhpcy5fb3JpZ2luYWxDb250ZW50Lmxlbmd0aCk7XG4gICAgfVxuICB9XG5cbiAgcHJvdGVjdGVkIF9zbGljZShzdGFydDogbnVtYmVyKTogW0NodW5rLCBDaHVua10ge1xuICAgIGxldCBpbmRleDogbnVtYmVyO1xuXG4gICAgaWYgKHN0YXJ0ID49IHRoaXMuX29yaWdpbmFsQ29udGVudC5sZW5ndGgpIHtcbiAgICAgIGluZGV4ID0gc3RhcnQ7XG4gICAgfSBlbHNlIGlmIChzdGFydCA8IDApIHtcbiAgICAgIGluZGV4ID0gdGhpcy5fb3JpZ2luYWxDb250ZW50Lmxlbmd0aCArIHN0YXJ0O1xuICAgIH0gZWxzZSB7XG4gICAgICBpbmRleCA9IHRoaXMuX2dldFRleHRQb3NpdGlvbihzdGFydCk7XG4gICAgfVxuXG4gICAgdGhpcy5fYXNzZXJ0SW5kZXgoaW5kZXgpO1xuXG4gICAgLy8gRmluZCB0aGUgY2h1bmsgYnkgZ29pbmcgdGhyb3VnaCB0aGUgbGlzdC5cbiAgICBjb25zdCBoID0gdGhpcy5fbGlua2VkTGlzdC5maW5kKChjaHVuaykgPT4gaW5kZXggPD0gY2h1bmsuZW5kKTtcbiAgICBpZiAoIWgpIHtcbiAgICAgIHRocm93IEVycm9yKCdDaHVuayBjYW5ub3QgYmUgZm91bmQuJyk7XG4gICAgfVxuXG4gICAgaWYgKGluZGV4ID09IGguZW5kICYmIGgubmV4dCAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIFtoLCBoLm5leHRdO1xuICAgIH1cblxuICAgIHJldHVybiBbaCwgaC5zbGljZShpbmRleCldO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIHBvc2l0aW9uIGluIHRoZSBjb250ZW50IGJhc2VkIG9uIHRoZSBwb3NpdGlvbiBpbiB0aGUgc3RyaW5nLlxuICAgKiBTb21lIGNoYXJhY3RlcnMgbWlnaHQgYmUgd2lkZXIgdGhhbiBvbmUgYnl0ZSwgdGh1cyB3ZSBoYXZlIHRvIGRldGVybWluZSB0aGUgcG9zaXRpb24gdXNpbmdcbiAgICogc3RyaW5nIGZ1bmN0aW9ucy5cbiAgICovXG4gIHByb3RlY3RlZCBfZ2V0VGV4dFBvc2l0aW9uKGluZGV4OiBudW1iZXIpOiBudW1iZXIge1xuICAgIHJldHVybiBCdWZmZXIuZnJvbSh0aGlzLl9vcmlnaW5hbENvbnRlbnQudG9TdHJpbmcoKS5zdWJzdHJpbmcoMCwgaW5kZXgpKS5sZW5ndGg7XG4gIH1cblxuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2xpbmtlZExpc3QucmVkdWNlKChhY2MsIGNodW5rKSA9PiBhY2MgKyBjaHVuay5sZW5ndGgsIDApO1xuICB9XG4gIGdldCBvcmlnaW5hbCgpOiBCdWZmZXIge1xuICAgIHJldHVybiB0aGlzLl9vcmlnaW5hbENvbnRlbnQ7XG4gIH1cblxuICB0b1N0cmluZyhlbmNvZGluZzogQnVmZmVyRW5jb2RpbmcgPSAndXRmLTgnKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbGlua2VkTGlzdC5yZWR1Y2UoKGFjYywgY2h1bmspID0+IGFjYyArIGNodW5rLnRvU3RyaW5nKGVuY29kaW5nKSwgJycpO1xuICB9XG4gIGdlbmVyYXRlKCk6IEJ1ZmZlciB7XG4gICAgY29uc3QgcmVzdWx0ID0gQnVmZmVyLmFsbG9jVW5zYWZlKHRoaXMubGVuZ3RoKTtcbiAgICBsZXQgaSA9IDA7XG4gICAgdGhpcy5fbGlua2VkTGlzdC5mb3JFYWNoKChjaHVuaykgPT4ge1xuICAgICAgY2h1bmsuY29weShyZXN1bHQsIGkpO1xuICAgICAgaSArPSBjaHVuay5sZW5ndGg7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaW5zZXJ0TGVmdChpbmRleDogbnVtYmVyLCBjb250ZW50OiBCdWZmZXIsIGFzc2VydCA9IGZhbHNlKSB7XG4gICAgdGhpcy5fc2xpY2UoaW5kZXgpWzBdLmFwcGVuZChjb250ZW50LCBhc3NlcnQpO1xuICB9XG4gIGluc2VydFJpZ2h0KGluZGV4OiBudW1iZXIsIGNvbnRlbnQ6IEJ1ZmZlciwgYXNzZXJ0ID0gZmFsc2UpIHtcbiAgICB0aGlzLl9zbGljZShpbmRleClbMV0ucHJlcGVuZChjb250ZW50LCBhc3NlcnQpO1xuICB9XG5cbiAgcmVtb3ZlKGluZGV4OiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKSB7XG4gICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGVuZCA9IGluZGV4ICsgbGVuZ3RoO1xuICAgIGNvbnN0IGZpcnN0ID0gdGhpcy5fc2xpY2UoaW5kZXgpWzFdO1xuICAgIGNvbnN0IGxhc3QgPSB0aGlzLl9zbGljZShlbmQpWzFdO1xuXG4gICAgbGV0IGN1cnI6IENodW5rIHwgbnVsbDtcbiAgICBmb3IgKGN1cnIgPSBmaXJzdDsgY3VyciAmJiBjdXJyICE9PSBsYXN0OyBjdXJyID0gY3Vyci5uZXh0KSB7XG4gICAgICBjdXJyLmFzc2VydChjdXJyICE9PSBmaXJzdCwgY3VyciAhPT0gbGFzdCwgY3VyciA9PT0gZmlyc3QpO1xuICAgIH1cbiAgICBmb3IgKGN1cnIgPSBmaXJzdDsgY3VyciAmJiBjdXJyICE9PSBsYXN0OyBjdXJyID0gY3Vyci5uZXh0KSB7XG4gICAgICBjdXJyLnJlbW92ZShjdXJyICE9PSBmaXJzdCwgY3VyciAhPT0gbGFzdCwgY3VyciA9PT0gZmlyc3QpO1xuICAgIH1cblxuICAgIGlmIChjdXJyKSB7XG4gICAgICBjdXJyLnJlbW92ZSh0cnVlLCBmYWxzZSwgZmFsc2UpO1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEFuIHV0aWxpdHkgY2xhc3MgdGhhdCBhbGxvd3MgYnVmZmVycyB0byBiZSBpbnNlcnRlZCB0byB0aGUgX3JpZ2h0IG9yIF9sZWZ0LCBvciBkZWxldGVkLCB3aGlsZVxuICoga2VlcGluZyBpbmRpY2VzIHRvIHRoZSBvcmlnaW5hbCBidWZmZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBVcGRhdGVCdWZmZXIyIGV4dGVuZHMgVXBkYXRlQnVmZmVyQmFzZSB7XG4gIHByb3RlY3RlZCBfbXV0YXRhYmxlQ29udGVudDogTWFnaWNTdHJpbmcgPSBuZXcgTWFnaWNTdHJpbmcodGhpcy5fb3JpZ2luYWxDb250ZW50LnRvU3RyaW5nKCkpO1xuXG4gIHByb3RlY3RlZCBfYXNzZXJ0SW5kZXgoaW5kZXg6IG51bWJlcikge1xuICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPiB0aGlzLl9vcmlnaW5hbENvbnRlbnQubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgSW5kZXhPdXRPZkJvdW5kRXhjZXB0aW9uKGluZGV4LCAwLCB0aGlzLl9vcmlnaW5hbENvbnRlbnQubGVuZ3RoKTtcbiAgICB9XG4gIH1cblxuICBnZXQgbGVuZ3RoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX211dGF0YWJsZUNvbnRlbnQubGVuZ3RoKCk7XG4gIH1cbiAgZ2V0IG9yaWdpbmFsKCk6IEJ1ZmZlciB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWdpbmFsQ29udGVudDtcbiAgfVxuXG4gIHRvU3RyaW5nKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX211dGF0YWJsZUNvbnRlbnQudG9TdHJpbmcoKTtcbiAgfVxuXG4gIGdlbmVyYXRlKCk6IEJ1ZmZlciB7XG4gICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHRoaXMudG9TdHJpbmcoKSk7XG4gIH1cblxuICBpbnNlcnRMZWZ0KGluZGV4OiBudW1iZXIsIGNvbnRlbnQ6IEJ1ZmZlcik6IHZvaWQge1xuICAgIHRoaXMuX2Fzc2VydEluZGV4KGluZGV4KTtcbiAgICB0aGlzLl9tdXRhdGFibGVDb250ZW50LmFwcGVuZExlZnQoaW5kZXgsIGNvbnRlbnQudG9TdHJpbmcoKSk7XG4gIH1cblxuICBpbnNlcnRSaWdodChpbmRleDogbnVtYmVyLCBjb250ZW50OiBCdWZmZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9hc3NlcnRJbmRleChpbmRleCk7XG4gICAgdGhpcy5fbXV0YXRhYmxlQ29udGVudC5hcHBlbmRSaWdodChpbmRleCwgY29udGVudC50b1N0cmluZygpKTtcbiAgfVxuXG4gIHJlbW92ZShpbmRleDogbnVtYmVyLCBsZW5ndGg6IG51bWJlcikge1xuICAgIHRoaXMuX2Fzc2VydEluZGV4KGluZGV4KTtcbiAgICB0aGlzLl9tdXRhdGFibGVDb250ZW50LnJlbW92ZShpbmRleCwgaW5kZXggKyBsZW5ndGgpO1xuICB9XG59XG4iXX0=