import { NavController } from '@ionic/angular';
import { Component, OnInit, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotesService } from 'src/app/services/notes/notes.service';
import { Storage } from '@ionic/storage';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-note-consultation',
  templateUrl: './note-consultation.page.html',
  styleUrls: ['./note-consultation.page.scss'],
})
export class NoteConsultationPage implements OnInit {

  grades;
  gradesSinFiltrar;
  errorMatricula;

  hayError = false;

  constructor(
    public translate: TranslateService,
    private notesService: NotesService,
    private storage: Storage,
    private store: Store<AppState>,
    private zone: NgZone,
    private navCtrl: NavController,
  ) { }

  async ionViewDidEnter() {
    if (this.hayError) {
      await this.getGrades();
    }
  }

  async ngOnInit() {
    await this.getGrades();
  }

  async getGrades() {
    this.errorMatricula = undefined;

    let temp;

    const student = await this.storage.get('student');

    this.notesService.getMatricula().subscribe(
      res => {
        this.hayError = false;

        temp = res;

        let language = '';

        this.store.select('language').subscribe( lang => {
          switch (lang) {
            case 'ca':
              language = 'nomCat';
              break;
            case 'es':
              language = 'nomEsp';
              break;
            case 'en':
              language = 'nomEng';
              break;
          }
  
          temp.forEach(grade => {
            grade['expanded'] = false;
            grade['name'] = grade[language];
  
            let semesters = [];
  
            grade.subjects.forEach(subject => {
              subject['name'] = subject[language];
              const anySemester = subject.curs + '-' + subject.semester;
  
              const semester = semesters.filter(s => s.any === anySemester);
  
              if (semester[0]) {
                semester[0].subjects.push({
                  codiUPC: subject.codiUPC,
                  name: subject[language]
                });
              } else {
                semesters.push({
                  any: anySemester,
                  subjects: [{
                    codiUPC: subject.codiUPC,
                    name: subject[language]
                  }]
                });
              }
            });
  
            semesters = semesters.sort((s1, s2) => s1.any < s2.any ? -1 : 1);
  
            grade['semesters'] = semesters;
          });
  
          this.grades = temp.filter(g => g.estat !== 'T');
          this.gradesSinFiltrar = temp;
        });
      },
      error => {
        this.hayError = true;

        this.zone.run(() => {
          this.errorMatricula = error.error;
        })
      }
    );
  }

  expandItem(id) {
    this.grades.map((grade) => {

      // console.log(listItem);
      if (id === grade.id) {
        grade['expanded'] = !grade['expanded'];
      } else {
        //grade.expanded = false;
      }
      return grade;

    });
  }
}
