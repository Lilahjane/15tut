import { TestBed } from '@angular/core/testing';

import { AssignmnentSService } from './assignmnent-s.service';

describe('AssignmnentSService', () => {
  let service: AssignmnentSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignmnentSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
