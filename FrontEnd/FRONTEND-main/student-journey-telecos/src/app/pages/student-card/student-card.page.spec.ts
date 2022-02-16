import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentCardPage } from './student-card.page';

describe('StudentCardPage', () => {
  let component: StudentCardPage;
  let fixture: ComponentFixture<StudentCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StudentCardPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
