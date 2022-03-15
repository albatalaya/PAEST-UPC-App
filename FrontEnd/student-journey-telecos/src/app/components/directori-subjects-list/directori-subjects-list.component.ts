import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AppState } from 'src/app/app.state';
import * as NotesActions from '../../pages/notes/notes.actions';

@Component({
  selector: 'app-directori-subjects-list',
  templateUrl: './directori-subjects-list.component.html',
  styleUrls: ['./directori-subjects-list.component.scss'],
})
export class DirectoriSubjectsListComponent implements OnInit {

  @Input() matricula: any = {};
  @Input() expand: boolean = false;

  constructor(
    private store: Store<AppState>,
    private router: Router) { }

  ngOnInit() {}
  
  
  async selectGrade(subject) {
    /*const subjects: [{}] = [{}];

    subjects.shift();

    this.matricula['subjects'].forEach(subject => {
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
*/
    this.router.navigate(['/pages/grades/detail-grade']);
  }



  expandItem(id) {
    this.matricula.subjects.map((subject) => {

      if (id === subject.codiUPC) {
        subject.expanded = !subject.expanded;
      } else {
      }
      return subject;

    });
  }
}
