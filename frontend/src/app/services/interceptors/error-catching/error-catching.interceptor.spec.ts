import { TestBed } from '@angular/core/testing';

import { ErrorCatchingInterceptor } from './error-catching.interceptor';

describe('ErrorCatchingInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ErrorCatchingInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ErrorCatchingInterceptor = TestBed.inject(ErrorCatchingInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
