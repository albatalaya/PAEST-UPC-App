import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailGradePage } from './detail-grade.page';

describe('DetailGradePage', () => {
  let component: DetailGradePage;
  let fixture: ComponentFixture<DetailGradePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailGradePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailGradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
