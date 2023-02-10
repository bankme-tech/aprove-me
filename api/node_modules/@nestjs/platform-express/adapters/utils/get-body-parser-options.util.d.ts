import type { Options } from 'body-parser';
export declare function getBodyParserOptions<ParserOptions extends Options>(rawBody: boolean, options?: ParserOptions | undefined): ParserOptions;
