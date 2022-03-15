import { Component, OnInit, Input } from '@angular/core';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import * as NotesActions from '../../pages/notes/notes.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grade-detail-list',
  templateUrl: './grade-detail-list.component.html',
  styleUrls: ['./grade-detail-list.component.scss'],
})
export class GradeDetailListComponent implements OnInit {

  @Input() grade: any = {};
  @Input() expand: boolean = false;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.grade['percent'] = this.getPercentCredits();
  }

  getPercentCredits() {
    return (this.grade['creditsSuperats'] * 100) / this.grade['creditsTotals'];
  }

  async selectGrade(subject) {
    const subjects: [{}] = [{}];

    subjects.shift();

    this.grade['subjects'].forEach(subject => {
      const professors = subject.professors.filter(p => p.grup === subject.grup);

      subjects.push({
        codiUPC: subject.codiUPC,
        gradeTitle: subject.name,
        profesors: professors,
        grup: subject.grup,
        curs: subject.curs,
        semester: subject.semester
      });
    });

    await this.store.dispatch(new NotesActions.SetCodiUPC(subject.codiUPC));
    await this.store.dispatch(new NotesActions.SetSubjectList(subjects));

    this.router.navigate(['/pages/grades/detail-grade']);
  }
}
