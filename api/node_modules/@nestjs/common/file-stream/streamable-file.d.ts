/// <reference types="node" />
import { Readable } from 'stream';
import { StreamableFileOptions, StreamableHandlerResponse } from './interfaces';
/**
 * @see [Streaming files](https://docs.nestjs.com/techniques/streaming-files)
 *
 * @publicApi
 */
export declare class StreamableFile {
    readonly options: StreamableFileOptions;
    private readonly stream;
    protected handleError: (err: Error, response: StreamableHandlerResponse) => void;
    constructor(buffer: Uint8Array, options?: StreamableFileOptions);
    constructor(readable: Readable, options?: StreamableFileOptions);
    getStream(): Readable;
    getHeaders(): {
        type: string;
        disposition: string;
        length: number;
    };
    get errorHandler(): (err: Error, response: StreamableHandlerResponse) => void;
    setErrorHandler(handler: (err: Error, response: StreamableHandlerResponse) => void): this;
}
