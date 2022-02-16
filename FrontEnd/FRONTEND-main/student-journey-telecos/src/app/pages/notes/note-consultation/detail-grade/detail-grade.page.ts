import { Component, OnInit, NgZone } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { NotesService } from 'src/app/services/notes/notes.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-grade',
  templateUrl: './detail-grade.page.html',
  styleUrls: ['./detail-grade.page.scss'],
})
export class DetailGradePage implements OnInit {

  constructor(
    private store: Store<AppState>,
    private notesService: NotesService,
    private storage: Storage,
    private zone: NgZone,
    private router: Router,
  ) { }

  subjects = [];

  gradeDetail;
  student;
  errorNoGrades;
  ngOnInit() {
    this.store.select('notes').subscribe(async notes => {

      if (!notes.codiUPC) {
        this.router.navigate(['/pages/grades']);
      } else {
        this.subjects = notes.subjects;
        const asingn = notes.subjects.filter(g => g['codiUPC'] === notes.codiUPC)[0];

        this.student = await this.storage.get('student');

        this.notesService.getNotes().subscribe(
          res => {
            this.gradeDetail = {
              gradeInfoSubject: {}
            };

            this.gradeDetail.gradeInfoSubject = asingn;

            this.gradeDetail = {
              ...this.gradeDetail,
              ...res
            }

          },
          error => {
            this.gradeDetail = {
              gradeInfoSubject: {}
            };

            this.gradeDetail.gradeInfoSubject = asingn;

            this.gradeDetail = {
              ...this.gradeDetail,
            };

            this.zone.run(() => {
              this.errorNoGrades = error.error;
            });
          }
        );
      }
    });
  }

  previous() {
    this.errorNoGrades = undefined;

    const index = this.subjects.findIndex(s => s.codiUPC === this.gradeDetail.gradeInfoSubject['codiUPC']);
    this.gradeDetail = undefined;
    const asingn = this.subjects[index > 0 ? index - 1 : this.subjects.length - 1];

    this.notesService.getNotes().subscribe(
        res => {
          this.gradeDetail = {
            gradeInfoSubject: {}
          };
          this.gradeDetail.gradeInfoSubject = asingn;

          this.gradeDetail = {
            ...this.gradeDetail,
            ...res
          };
        },
        error => {
          this.gradeDetail = {
            gradeInfoSubject: {}
          };
          this.gradeDetail.gradeInfoSubject = asingn;

          this.gradeDetail = {
            ...this.gradeDetail
          };
          this.zone.run(() => {
            this.errorNoGrades = error.error;
          });
        }
      );
  }

  next() {
    this.errorNoGrades = undefined;

    const index = this.subjects.findIndex(s => s.codiUPC === this.gradeDetail.gradeInfoSubject['codiUPC']);
    this.gradeDetail = undefined;
    const asingn = this.subjects[index === (this.subjects.length - 1) ? 0 : index + 1];

    this.notesService.getNotes().subscribe(
      res => {
        this.gradeDetail = {
          gradeInfoSubject: {}
        };
        this.gradeDetail.gradeInfoSubject = asingn;

        this.gradeDetail = {
          ...this.gradeDetail,
          ...res
        };
      },
      error => {
        this.gradeDetail = {
          gradeInfoSubject: {}
        };
        this.gradeDetail.gradeInfoSubject = asingn;

        this.gradeDetail = {
          ...this.gradeDetail
        };
        this.zone.run(() => {
          this.errorNoGrades = error.error;
        });
      }
    );
  }

  // Return same value from API 
  round(number) {
    return number;
    // if(typeof number === 'string') {
    //   return number;
    // } else {
    //   // if (number >= 5) {
    //   //   return number.toFixed(1);
    //   // }
    //   return ( Math.floor( number * Math.pow(10, 1) ) / Math.pow(10, 1) );
    // }
  }
}
