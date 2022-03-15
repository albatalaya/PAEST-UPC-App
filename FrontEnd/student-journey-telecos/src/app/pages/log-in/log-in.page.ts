import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform, LoadingController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import * as AppActions from './../../app.actions';
import * as ConfigurationActions from '../../pages/configuration/configuration.actions';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  
  todo: FormGroup;

  loading

  error;

  backRoute;

  constructor(
    private storage: Storage,
    private store: Store<AppState>,
    private userService: UserService,
    private platform: Platform,
    private utilsService: UtilsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    public loadingController: LoadingController,
    private router: Router,
    private loginService: LoginService,
  ) {
    this.todo = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params && params.special) {
        this.backRoute = params.special;
      }
    });
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: ''
    });
    await this.loading.present();
  }

 logIn() {
    this.error = undefined;
    
      this.loginService.loginPrivateCredentials().subscribe( (res) => {
        this.todo.reset();

        if (res) {

          this.store.dispatch(new AppActions.SetStudent(res));
          this.storage.set('student', res);
          if (res['student'].settings.eventsInHome === true) {
            this.store.dispatch(new ConfigurationActions.ShowEventsInHome(true));
          } else {
            this.store.dispatch(new ConfigurationActions.HideEventsInHome(false));
          }
          this.translate.use(res['student'].settings.language);

          this.store.dispatch(new AppActions.ShowTabBar());
          if (res['student'].settings.language === 'ca') {
            this.store.dispatch(new AppActions.SetLanguageCatalanAction());
          } else if (res['student'].settings.language === 'es') {
            this.store.dispatch(new AppActions.SetLanguageSpanishAction());
          } else if (res['student'].settings.language === 'en') {
            this.store.dispatch(new AppActions.SetLanguageEnglishAction());
          }
          this.router.navigate(['/pages/home']);
        }
        

    })

  }

  openForgot() {
    if (this.platform.is('cordova')) {
      this.utilsService.openBrowserInApp('https://identitatdigital.upc.edu/gcredencials/init/');
    }
  }
}
