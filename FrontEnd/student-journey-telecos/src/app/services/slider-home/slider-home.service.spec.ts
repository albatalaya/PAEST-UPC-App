import { TestBed } from '@angular/core/testing';

import { SliderHomeService } from './slider-home.service';

describe('SliderHomeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SliderHomeService = TestBed.get(SliderHomeService);
    expect(service).toBeTruthy();
  });
});
