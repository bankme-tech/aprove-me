import { BinaryType as BinaryType_2 } from '@prisma/fetch-engine';
import { enginesVersion } from '@prisma/engines-version';

export declare const DEFAULT_CLI_QUERY_ENGINE_BINARY_TYPE = BinaryType.libqueryEngine;

export { enginesVersion }

export declare function ensureBinariesExist(): Promise<void>;

/**
 * Checks if the env override `PRISMA_CLI_QUERY_ENGINE_TYPE` is set to `library` or `binary`
 * Otherwise returns the default
 */
export declare function getCliQueryEngineBinaryType(): BinaryType_2.libqueryEngine | BinaryType_2.queryEngine;

export declare function getEnginesPath(): string;

export { }
