import { Component, OnInit, NgZone } from '@angular/core';
import { NotesService } from 'src/app/services/notes/notes.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.page.html',
  styleUrls: ['./all-notes.page.scss'],
})
export class AllNotesPage implements OnInit {

  grade;

  subjectsObligatories;
  subjectsOptatives;
  errorGrades;
  constructor(
    public translate: TranslateService,
    private notesService: NotesService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private storage: Storage,
    private zone: NgZone,
  ) { }

  async ngOnInit() {
    const idGrade: number = this.route.snapshot.params.idGrade;
    let language = '';

    const student = await this.storage.get('student');

    this.notesService.getExpedient().subscribe(
      res => {
        this.store.select('language').subscribe( lang => {
          switch (lang) {
            case 'ca':
              language = 'name_ca';
              break;
            case 'es':
              language = 'name_es';
              break;
            case 'en':
              language = 'name_en';
              break;
          }

          this.grade = res;
          this.grade = this.grade.filter(g => g.id == idGrade)[0];

          this.grade['name'] = this.grade[language];

          this.subjectsObligatories = this.grade.subjects.filter(s => s.tipus === 'OB');
          this.subjectsOptatives = this.grade.subjects.filter(s => s.tipus === 'OP');
        });
      }
    );
  }

  filterItems(text) {
    const val = text.detail.value.trim().toLowerCase();

    if (val === '') {
      this.subjectsObligatories = this.grade.subjects.filter(s => s.tipus === 'OB');
      this.subjectsOptatives = this.grade.subjects.filter(s => s.tipus === 'OP');
    }

    const subjects = this.grade.subjects.filter( s => s.name.toLowerCase().includes(val));

    this.subjectsObligatories = subjects.filter(s => s.tipus === 'OB');
    this.subjectsOptatives = subjects.filter(s => s.tipus === 'OP');
  }
}
