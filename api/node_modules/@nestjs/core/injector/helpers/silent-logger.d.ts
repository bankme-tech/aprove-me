import { Logger } from '@nestjs/common';
export declare class SilentLogger extends Logger {
    log: () => void;
    error: () => void;
    warn: () => void;
    debug: () => void;
    verbose: () => void;
    setLogLevels: () => void;
}
