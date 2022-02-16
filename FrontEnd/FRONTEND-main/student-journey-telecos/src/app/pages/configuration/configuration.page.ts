import { StudentsService } from './../../services/students/students.service';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as AppActions from '../../app.actions';
import * as ConfigurationActions from './configuration.actions';
import { Storage } from '@ionic/storage';
import { Plugins } from '@capacitor/core';
import { UserService } from 'src/app/services/user/user.service';

const { Device } = Plugins;
@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
  styleUrls: ['./configuration.page.scss'],
})
export class ConfigurationPage implements OnInit {
  appVersion;
  language;
  customPopoverOptions: any;
  configuration: any;
  constructor(
    public translate: TranslateService,
    private store: Store<AppState>,
    private storage: Storage,
    private studentsService: StudentsService,
    ) {
      // this.store.subscribe( state => console.log('App State: ', state));
      this.customPopoverOptions = {
        header: this.translate.instant('CONFIGURATION.LANGUAGES.TITLE'),
        // subHeader: 'Select your hair color',
        // message: 'Only select your dominant hair color'
      };
    }


  async ngOnInit() {
    this.store.select('language')
    .subscribe( language => this.language = language);
    this.store.select('configuration').subscribe( result => this.configuration = result);
    this.appVersion = await (await Device.getInfo()).appVersion;
  }

  changeLanguage(event) {
    switch (event.detail.value) {
      case 'ca': this.setCatalan();
                 break;
      case 'es': this.setSpanish();
                 break;
      case 'en': return this.setEnglish();
      default: this.setCatalan();
    }
  }

  async setSpanish() {
    await this.store.dispatch(new AppActions.SetLanguageSpanishAction());
    await this.storage.set('lang', this.language);
    this.translate.use(this.language);

    this.setSettings();
  }
  async setCatalan() {
    await this.store.dispatch(new AppActions.SetLanguageCatalanAction());
    await this.storage.set('lang', this.language);
    this.translate.use(this.language);

    this.setSettings();
  }
  async setEnglish() {
    await this.store.dispatch(new AppActions.SetLanguageEnglishAction());
    await this.storage.set('lang', this.language);
    this.translate.use(this.language);

    this.setSettings();
  }

  changeShowEventsInHome(event) {
    this.setEventsInHome(event.detail.checked);
  }
  async setEventsInHome(condition) {
    if (condition) {
      await this.store.dispatch(new ConfigurationActions.ShowEventsInHome(condition));
      await this.storage.set('isEventsInHome', true);
    } else {
      await this.store.dispatch(new ConfigurationActions.HideEventsInHome(condition));
      this.storage.set('isEventsInHome', false);
    }

    this.setSettings();
  }

  async setSettings() {
    const student = await this.storage.get('student');

    if (student) {
      const settings = {
        language: this.language,
        eventsInHome: this.configuration.isEventsInHome
      };

      await this.studentsService.setStudentSettings();
    }
  }
}
