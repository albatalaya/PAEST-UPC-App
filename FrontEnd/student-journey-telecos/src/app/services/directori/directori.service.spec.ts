import { TestBed } from '@angular/core/testing';

import { DirectoriService } from './directori.service';

describe('DirectoriService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DirectoriService = TestBed.get(DirectoriService);
    expect(service).toBeTruthy();
  });
});
