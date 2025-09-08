import { TestBed } from '@angular/core/testing';

import { MevService } from './mev.service';

describe('MevService', () => {
  let service: MevService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MevService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
