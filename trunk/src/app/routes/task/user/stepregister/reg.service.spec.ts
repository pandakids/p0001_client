import { TestBed } from '@angular/core/testing';

import { RegService } from './reg.service';

describe('RegService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegService = TestBed.get(RegService);
    expect(service).toBeTruthy();
  });
});
