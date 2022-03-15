import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryListPage } from './library-list.page';

describe('LibraryListPage', () => {
  let component: LibraryListPage;
  let fixture: ComponentFixture<LibraryListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LibraryListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LibraryListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
