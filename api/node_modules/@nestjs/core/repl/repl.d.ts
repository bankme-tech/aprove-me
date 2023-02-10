/// <reference types="node" />
import { DynamicModule, Type } from '@nestjs/common';
export declare function repl(module: Type | DynamicModule): Promise<import("repl").REPLServer>;
