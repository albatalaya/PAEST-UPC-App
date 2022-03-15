import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-subjects-list',
  templateUrl: './subjects-list.component.html',
  styleUrls: ['./subjects-list.component.scss'],
})
export class SubjectsListComponent implements OnInit {

  @Input() subjects;

  constructor(
    public translate: TranslateService
  ) { }

  ngOnInit() {
    let language = '';

    switch (this.translate.currentLang) {
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

    this.subjects.forEach(subject => {
      subject['expanded'] = false;

      subject['name'] = subject[language];

      subject.convocatories = subject.convocatories.sort((c1, c2) => c1.numConvocatoria > c2.numConvocatoria ? -1 : 1);
    });
  }

  expandItem(id) {
    this.subjects.map((subject) => {

      if (id === subject.codiUPC) {
        subject.expanded = !subject.expanded;
      } else {
      }
      return subject;

    });
  }

}
