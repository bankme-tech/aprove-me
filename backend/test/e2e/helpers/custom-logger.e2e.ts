import { LoggerService } from '@nestjs/common';

export class CustomLogger implements LoggerService {
  log(): void {
    return;
  }

  error(): void {
    return;
  }

  warn(): void {
    return;
  }

  debug(): void {
    return;
  }

  verbose(): void {
    return;
  }
}
