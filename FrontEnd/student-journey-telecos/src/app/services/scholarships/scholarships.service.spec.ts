import { TestBed } from '@angular/core/testing';

import { ScholarshipsService } from './scholarships.service';

describe('ScholarshipsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScholarshipsService = TestBed.get(ScholarshipsService);
    expect(service).toBeTruthy();
  });
});
