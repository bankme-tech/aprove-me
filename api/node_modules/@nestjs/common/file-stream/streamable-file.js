"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StreamableFile = void 0;
const stream_1 = require("stream");
const util_1 = require("util");
const enums_1 = require("../enums");
const shared_utils_1 = require("../utils/shared.utils");
/**
 * @see [Streaming files](https://docs.nestjs.com/techniques/streaming-files)
 *
 * @publicApi
 */
class StreamableFile {
    constructor(bufferOrReadStream, options = {}) {
        var _a;
        var _b;
        this.options = options;
        this.handleError = (err, res) => {
            if (res.destroyed) {
                return;
            }
            if (res.headersSent) {
                res.end();
                return;
            }
            res.statusCode = enums_1.HttpStatus.BAD_REQUEST;
            res.send(err.message);
        };
        if (util_1.types.isUint8Array(bufferOrReadStream)) {
            this.stream = new stream_1.Readable();
            this.stream.push(bufferOrReadStream);
            this.stream.push(null);
            (_a = (_b = this.options).length) !== null && _a !== void 0 ? _a : (_b.length = bufferOrReadStream.length);
        }
        else if (bufferOrReadStream.pipe && (0, shared_utils_1.isFunction)(bufferOrReadStream.pipe)) {
            this.stream = bufferOrReadStream;
        }
    }
    getStream() {
        return this.stream;
    }
    getHeaders() {
        const { type = 'application/octet-stream', disposition = undefined, length = undefined, } = this.options;
        return {
            type,
            disposition,
            length,
        };
    }
    get errorHandler() {
        return this.handleError;
    }
    setErrorHandler(handler) {
        this.handleError = handler;
        return this;
    }
}
exports.StreamableFile = StreamableFile;
