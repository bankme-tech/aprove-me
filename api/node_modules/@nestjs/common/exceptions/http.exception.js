"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
const services_1 = require("../services");
const shared_utils_1 = require("../utils/shared.utils");
/**
 * Defines the base Nest HTTP exception, which is handled by the default
 * Exceptions Handler.
 *
 * @see [Built-in HTTP exceptions](https://docs.nestjs.com/exception-filters#built-in-http-exceptions)
 *
 * @publicApi
 */
class HttpException extends Error {
    /**
     * Instantiate a plain HTTP Exception.
     *
     * @example
     * throw new HttpException()
     * throw new HttpException('message', HttpStatus.BAD_REQUEST)
     * throw new HttpException({ reason: 'this can be a human readable reason' }, HttpStatus.BAD_REQUEST)
     * throw new HttpException(new Error('Cause Error'), HttpStatus.BAD_REQUEST)
     * throw new HttpException('custom message', HttpStatus.BAD_REQUEST, {
     *  cause: new Error('Cause Error'),
     * })
     *
     *
     * @usageNotes
     * The constructor arguments define the response and the HTTP response status code.
     * - The `response` argument (required) defines the JSON response body. alternatively, it can also be
     *  an error object that is used to define an error [cause](https://nodejs.org/en/blog/release/v16.9.0/#error-cause).
     * - The `status` argument (required) defines the HTTP Status Code.
     * - The `options` argument (optional) defines additional error options. Currently, it supports the `cause` attribute,
     *  and can be used as an alternative way to specify the error cause: `const error = new HttpException('description', 400, { cause: new Error() });`
     *
     * By default, the JSON response body contains two properties:
     * - `statusCode`: the Http Status Code.
     * - `message`: a short description of the HTTP error by default; override this
     * by supplying a string in the `response` parameter.
     *
     * To override the entire JSON response body, pass an object to the `createBody`
     * method. Nest will serialize the object and return it as the JSON response body.
     *
     * The `status` argument is required, and should be a valid HTTP status code.
     * Best practice is to use the `HttpStatus` enum imported from `nestjs/common`.
     *
     * @param response string, object describing the error condition or the error cause.
     * @param status HTTP response status code.
     * @param options An object used to add an error cause.
     */
    constructor(response, status, options) {
        super();
        this.response = response;
        this.status = status;
        this.options = options;
        this.initMessage();
        this.initName();
        this.initCause();
    }
    /**
     * Configures error chaining support
     *
     * See:
     * - https://nodejs.org/en/blog/release/v16.9.0/#error-cause
     * - https://github.com/microsoft/TypeScript/issues/45167
     */
    initCause() {
        var _a;
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.cause) {
            this.cause = this.options.cause;
            return;
        }
        if (this.response instanceof Error) {
            services_1.Logger.warn('DEPRECATED! Passing the error cause as the first argument to HttpException constructor is deprecated. You should use the "options" parameter instead: new HttpException("message", 400, { cause: new Error("Some Error") }) ');
            this.cause = this.response;
        }
    }
    initMessage() {
        var _a, _b;
        if ((0, shared_utils_1.isString)(this.response)) {
            this.message = this.response;
        }
        else if ((0, shared_utils_1.isObject)(this.response) &&
            (0, shared_utils_1.isString)(this.response.message)) {
            this.message = this.response.message;
        }
        else if (this.constructor) {
            this.message =
                (_b = (_a = this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g)) === null || _a === void 0 ? void 0 : _a.join(' ')) !== null && _b !== void 0 ? _b : 'Error';
        }
    }
    initName() {
        this.name = this.constructor.name;
    }
    getResponse() {
        return this.response;
    }
    getStatus() {
        return this.status;
    }
    static createBody(objectOrErrorMessage, description, statusCode) {
        if (!objectOrErrorMessage) {
            return { statusCode, message: description };
        }
        return (0, shared_utils_1.isObject)(objectOrErrorMessage) &&
            !Array.isArray(objectOrErrorMessage)
            ? objectOrErrorMessage
            : { statusCode, message: objectOrErrorMessage, error: description };
    }
    static getDescriptionFrom(descriptionOrOptions) {
        return (0, shared_utils_1.isString)(descriptionOrOptions)
            ? descriptionOrOptions
            : descriptionOrOptions === null || descriptionOrOptions === void 0 ? void 0 : descriptionOrOptions.description;
    }
    static getHttpExceptionOptionsFrom(descriptionOrOptions) {
        return (0, shared_utils_1.isString)(descriptionOrOptions) ? {} : descriptionOrOptions;
    }
    /**
     * Utility method used to extract the error description and httpExceptionOptions from the given argument.
     * This is used by inheriting classes to correctly parse both options.
     * @returns the error description and the httpExceptionOptions as an object.
     */
    static extractDescriptionAndOptionsFrom(descriptionOrOptions) {
        const description = (0, shared_utils_1.isString)(descriptionOrOptions)
            ? descriptionOrOptions
            : descriptionOrOptions === null || descriptionOrOptions === void 0 ? void 0 : descriptionOrOptions.description;
        const httpExceptionOptions = (0, shared_utils_1.isString)(descriptionOrOptions)
            ? {}
            : descriptionOrOptions;
        return {
            description,
            httpExceptionOptions,
        };
    }
}
exports.HttpException = HttpException;
