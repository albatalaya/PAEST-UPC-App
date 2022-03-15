import { UtilsService } from './../utils/utils.service';
import { LoginService } from 'src/app/services/login/login.service';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { UserService } from 'src/app/services/user/user.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import * as AppActions from '../../app.actions';
import * as ConfigurationActions from '../../pages/configuration/configuration.actions';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptService implements HttpInterceptor {

  constructor(
    private storage: Storage, 
    private loginService: LoginService,
    private store: Store<AppState>, 
    public translate: TranslateService, 
    private navCtrl: NavController,
    private utilsService: UtilsService,
    ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {


      if (err.status === 400) {
        this.error400(err);
      } else if (err.status === 401) {
        this.error401(err);
      } else if (err.status === 402) {
        this.error402(err);
      } else if (err.status === 403) {
        this.error403(err);
      } else if (err.status === 404) {
        this.error404(err);
      } else if (err.status === 500) {
        this.error500(err);
      }

      // if (request.url.indexOf('/oauth/token?grant_type=password') !== -1) {
      //   this.manageLoginError(err);
      // } else if (request.url.indexOf('/oauth/token?grant_type=refresh_token') !== -1 ) {

      //   if (err.status === 403) {
      //     this.showError('Error de Server', 'No tienes acceso al servidor, conéctate a la red Eduroam para testear uPlay').then(() => {
      //       this.router.navigate(['/login']);
      //     });
      //   } else if (err.status === 401) {
      //     this.showError('Error de Server', 'No tienes acceso al servidor').then(() => {
      //       this.router.navigate(['/login']);
      //     });
      //   } else {
      //     this.authService.logout().then(async () => {

      //       console.log('Error en refresh token --> va a login');

      //      });
      //   }
      // } else if (request.url.indexOf('engine/user/llorenc.vaquer/image') !== -1) {

      //   console.log('Request post image fail', request);

      // } else {

      //     this.manageHttpError(err);

      // }


      //   const error = err.error.message || err.statusText;
      return throwError(err);
    }));
}

  error400(err) {
    console.log('ERROR BAD REQUEST', err);
    // alert('ERROR BAD REQUEST 400');
  }

  async error401(err) {
    let student = await this.storage.get('student');
    if (student) {
      this.storage.remove('student');
      // student = await this.loginService.getRefreshToken(student.refreshSSOToken).catch(async err => {
      //   const modal = await this.utilsService.openModal(err.error)
      //   await modal.onDidDismiss().then(async data => {
      //     await this.navCtrl.navigateRoot('pages/home');
      //     return;
      //   });
      // });
      await this.store.dispatch(new AppActions.SetStudent(student));
      this.storage.set('student', student);

      if (student.student.settings.eventsInHome === true) {
        this.store.dispatch(new ConfigurationActions.ShowEventsInHome(true));
      } else {
        this.store.dispatch(new ConfigurationActions.HideEventsInHome(false));
      }
      this.translate.use(student.student.settings.language);
      if (student.student.settings.language === 'ca') {
        this.store.dispatch(new AppActions.SetLanguageCatalanAction());
      } else if (student.student.settings.language === 'es') {
        this.store.dispatch(new AppActions.SetLanguageSpanishAction());
      } else if (student.student.settings.language === 'en') {
        this.store.dispatch(new AppActions.SetLanguageEnglishAction());
      }
      await this.navCtrl.navigateRoot('pages/home');
      
    }
    // alert('ERROR UNAUTHORIZED 401');
  }

  error402(err) {
    // alert('ERROR UNAUTHORIZED 402');
  }

  error403(err) {
    // alert('ERROR UNAUTHORIZED 403');
  }

  error404(err) {
    // alert('ERROR UNAUTHORIZED 404');
  }

  error500(err) {
    // alert('ERROR UNAUTHORIZED 500');
  }

}
