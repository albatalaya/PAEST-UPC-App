import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import * as moment from 'moment';
import * as JsBarcode from 'jsbarcode';

@Component({
  selector: 'app-student-card',
  templateUrl: 'student-card.page.html',
  styleUrls: ['student-card.page.scss'],
})

export class StudentCardPage implements OnInit {

  user: any

  card: any;
  valueBarcode: any;
  isIos:any;

  counterDate;
  changeComp:any

  constructor(
    private utilsService: UtilsService,
    private store: Store<AppState>,
    public translate: TranslateService,
    public platform: Platform
  ) {
    this.store.subscribe(state => console.log());

    // this.language = this.store.select(state => this.language = state.configuration.language);
  }

  ionViewWillEnter() {
    // this.changeComp = setInterval(()=>{
    //   this.counterDate = moment().add(1, 's').format('DD/MM/YYYY HH:mm:ss');
    //   // console.log('counterDate', this.counterDate);
    // },1000)
  }

  ionViewDidLeave() {

    // clearInterval(this.changeComp)
  }

  async ngOnInit() {

    // this.isIos = this.platform.is('ios');

    this.getUser();

  }

  async getUser() {
    this.store.select('student').subscribe(student => {
      this.user = student;

      if(this.user.student.role === 'Tester') {
        this.card = [
                      {
                      estat: 'ACT',
                      tipus: 'D',
                      pan: 'PANPAN TIRURI',
                      codiBarres: '2044456688',
                      rfid: '8DA5C8F6',
                      dataCaducitat: '2225-07-30'
                      }
                    ];
      } else {
        this.card = this.user.student.card;
      }
      this.valueBarcode = this.card[0].codiBarres;

      // https://www.npmjs.com/package/jsbarcode
      JsBarcode('#barcode', this.valueBarcode, {format: 'ITF', width: 3, height: 80, displayValue: true, fontSize: 12 });
    });
  }

  sanitizeImageUrl(photo) {
    return this.utilsService.sanitizeImageUrl(photo);
  }

  


};
