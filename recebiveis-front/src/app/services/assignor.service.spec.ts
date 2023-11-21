import { TestBed } from '@angular/core/testing';

import { AssignorService } from './assignor.service';

describe('AssignorService', () => {
  let service: AssignorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
