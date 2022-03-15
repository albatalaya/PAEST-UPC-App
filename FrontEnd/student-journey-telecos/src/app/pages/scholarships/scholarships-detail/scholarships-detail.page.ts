import { NavController } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScholarshipsService } from 'src/app/services/scholarships/scholarships.service';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-scholarships-detail',
  templateUrl: './scholarships-detail.page.html',
  styleUrls: ['./scholarships-detail.page.scss'],
})
export class ScholarshipsDetailPage implements OnInit {

  scholarshipItem: any;
  status;
  idParam = null;
  scholarPath = null;
  listSections = [
    {
      id: 1,
      title: this.translate.instant('SCHOLARSHIPS.DETAIL.GENERAL_INFORMATION'),
      subsection: [],
      expanded: false
    },
    {
      id: 2,
      title: this.translate.instant('SCHOLARSHIPS.DETAIL.REQUIREMENTS'),
      subsection: [],
      expanded: false
    },
    {
      id: 3,
      title: this.translate.instant('SCHOLARSHIPS.DETAIL.SUBMISSION'),
      subsection: [],
      expanded: false
    },
    {
      id: 4,
      title: this.translate.instant('SCHOLARSHIPS.DETAIL.SCHOLARSHIP'),
      subsection: [],
      expanded: false
    },
    {
      id: 5,
      title: this.translate.instant('SCHOLARSHIPS.DETAIL.AWARD'),
      subsection: [],
      expanded: false
    },
    {
      id: 6,
      title: this.translate.instant('SCHOLARSHIPS.DETAIL.MORE_INFORMATION'),
      subsection: [],
      expanded: false
    }
  ];
  constructor(
    private scholarshipService: ScholarshipsService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private sanitizer: DomSanitizer,
    private navCtrl: NavController
    ) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      this.scholarshipService.getScholarshipsById().subscribe(
        async resp => {
          const scholarship = resp;
          this.scholarshipItem = scholarship;
          this.status = await this.scholarshipService.getStatus(this.scholarshipItem.startDate, this.scholarshipItem.endDate);
          this.buildScholarshipInterface();
        },
        error => {
          this.navCtrl.navigateRoot('pages/error/', {queryParams: {error, backPage: 'pages/scholarships'}});
        }
      );

      // console.log(this.listSections);
    }
  }

  sanitizerHTML(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  buildScholarshipInterface() {

    // Informació general
    if (this.scholarshipItem.description) {
     this.listSections[0].subsection.push({title: 'Descripció', content: this.scholarshipItem.description});
    }
    if (this.scholarshipItem.organism) {
      this.listSections[0].subsection.push({title: 'Organització responsable', content: this.scholarshipItem.organism});
    }
    if (this.scholarshipItem.recipients) {
      this.listSections[0].subsection.push({title: 'Destinataris', content: this.scholarshipItem.recipients});
    }
    if (this.scholarshipItem.others) {
      this.listSections[0].subsection.push({title: 'Altres', content: this.scholarshipItem.others});
    }

    // REquisits
    if (this.scholarshipItem.general) {
      this.listSections[1].subsection.push({title: 'Generals', content: this.scholarshipItem.general});
    }
    if (this.scholarshipItem.academic) {
      this.listSections[1].subsection.push({title: 'Acadèmics', content: this.scholarshipItem.academic});
    }
    if (this.scholarshipItem.economic) {
      this.listSections[1].subsection.push({title: 'Econòmics', content: this.scholarshipItem.economic});
    }
    if (this.scholarshipItem.incompatibilities) {
      this.listSections[1].subsection.push({title: 'Incompatibilitats', content: this.scholarshipItem.incompatibilities});
    }

    // Sol.licitut
    if (this.scholarshipItem.startDate) {
      this.listSections[2].subsection.push({title: 'Data inici', content: this.scholarshipItem.startDate});
    }
    if (this.scholarshipItem.endDate) {
      this.listSections[2].subsection.push({title: 'Data fi', content: this.scholarshipItem.endDate});
    }
    if (this.scholarshipItem.submission) {
      this.listSections[2].subsection.push({title: 'Presentació', content: this.scholarshipItem.submission});
    }
    if (this.scholarshipItem.documentation) {
      this.listSections[2].subsection.push({title: 'Documentació addicional', content: this.scholarshipItem.documentation});
    }

    // Beca
    if (this.scholarshipItem.amount) {
      this.listSections[3].subsection.push({title: 'Import general', content: this.scholarshipItem.amount});
    }
    if (this.scholarshipItem.additionalAmount) {
      this.listSections[3].subsection.push({title: 'Imports addicionals', content: this.scholarshipItem.additionalAmount});
    }
    if (this.scholarshipItem.duration) {
      this.listSections[3].subsection.push({title: 'Durada de l’ajut', content: this.scholarshipItem.duration});
    }
    if (this.scholarshipItem.payment) {
      this.listSections[3].subsection.push({title: 'Pagament', content: this.scholarshipItem.payment});
    }
    if (this.scholarshipItem.beneficiaries) {
      this.listSections[3].subsection.push({title: 'Obligacions dels beneficiaris', content: this.scholarshipItem.beneficiaries});
    }

    // Adjudicació
    if (this.scholarshipItem.criteria) {
      this.listSections[4].subsection.push({title: 'Criteris', content: this.scholarshipItem.criteria});
    }
    if (this.scholarshipItem.awardDate) {
      this.listSections[4].subsection.push({title: 'Data resolució', content: this.scholarshipItem.awardDate});
    }
    if (this.scholarshipItem.awardResolution) {
      this.listSections[4].subsection.push({title: 'Publicació de la resolució', content: this.scholarshipItem.awardResolution});
    }
    if (this.scholarshipItem.allegations) {
      this.listSections[4].subsection.push({title: 'Al·legacions', content: this.scholarshipItem.allegations});
    }

    // Més informació
    if (this.scholarshipItem.regulations) {
      this.listSections[5].subsection.push({title: 'Normativa', content: this.scholarshipItem.regulations});
    }

    this.listSections = this.listSections.filter(s => s.subsection.length > 0);
  }

  openSuportPage() {
    this.utilsService.openBrowserInApp('https://studentupc.pre.ithinkupc.com/static_files/matriculacio.html');
  }


  expandItem(item) {

    this.listSections.map((listItem) => {

      // console.log(listItem);
      if (item === listItem) {
        listItem.expanded = !listItem.expanded;
      } else {
        listItem.expanded = false;
      }
      return listItem;

    });

  }

}

export class ScholarshipVm {

  id?: string;
  absoluteUrl?: string;
  title?: string;
  description?: string;
  scolarshipType: string;
  academic?: string;
  additionalAmount?: string;
  allegations?: string;
  amount?: string;
  awardDate?: Date;
  awardResolution?: string;
  beneficiaries?: string;
  criteria?: string;
  documentation?: string;
  duration?: string;
  economic?: string;
  startDate: Date;
  endDate?: Date;
  general?: string;
  incompatibilities?: string;
  organism?: string;
  others?: string;
  path?: string;
  payment?: string;
  recipients?: string;
  regulations?: string;
  submission?: string;
  summary?: string;
}
