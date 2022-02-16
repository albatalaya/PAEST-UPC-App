import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteConsultationPage } from './note-consultation.page';

describe('NoteConsultationPage', () => {
  let component: NoteConsultationPage;
  let fixture: ComponentFixture<NoteConsultationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoteConsultationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoteConsultationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
