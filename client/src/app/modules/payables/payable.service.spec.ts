import { TestBed } from '@angular/core/testing';

import { PayableService } from './payable.service';

describe('PayableService', () => {
  let service: PayableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PayableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
