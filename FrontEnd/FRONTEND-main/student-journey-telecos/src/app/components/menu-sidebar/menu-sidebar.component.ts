import { LoginService } from './../../services/login/login.service';
import { NotesService } from '../../../app/services/notes/notes.service';
import { ApiErrors } from '../../../app/shared/api-errors.enum';
import { Platform, NavController, MenuController, ModalController, LoadingController } from '@ionic/angular';
import { browser } from 'protractor';
import { environment } from './../../../environments/environment';
import { Component, OnInit, NgZone } from '@angular/core';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser/ngx';
import { UserService } from 'src/app/services/user/user.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import * as AppActions from './../../app.actions';
import { timingSafeEqual } from 'crypto';
import * as ConfigurationActions from '../../pages/configuration/configuration.actions';
import { TranslateService } from '@ngx-translate/core';

import { SafeUrl } from '@angular/platform-browser';
import { NavigationOptions } from '@ionic/angular/providers/nav-controller';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';

import { ModalErrorComponent } from '../modal-error/modal-error.component';
@Component({
  selector: 'app-menu-sidebar',
  templateUrl: './menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss'],
})
export class MenuSidebarComponent implements OnInit {

  env;
  language;
  user;
  hideTabBar;

  personalBox = false;
  supportBox = false;
  institucionalBox = false;
  titulacions;

  loading;

  constructor(
    private utilsService: UtilsService,
    private storage: Storage,
    private iab: InAppBrowser,
    private userService: UserService,
    private store: Store<AppState>,
    private platform: Platform,
    private translate: TranslateService,
    private navCtrl: NavController,
    public menuCtrl: MenuController,
    private ngZone: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private modalController: ModalController,
    private notesService: NotesService,
    public loadingController: LoadingController,
    private loginService: LoginService,
    ) { }

  ngOnInit() {

    this.getUser();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: ''
    });
    await this.loading.present();
  }

  async getTitulacions() {
    if (this.user) {
      this.titulacions = this.user.student.expedients;/*await this.notesService.getTitulacions(this.user.student.idGauss).toPromise();*/
    }
  }
  async getUser() {
    this.store.select('student').subscribe(student => {
      this.updateUser(student);
      this.getTitulacions();
    });
  }

  updateUser(res) {
    this.ngZone.run(() => {
      this.user = res;
    });
  }

  async openMatricula() {
    this.menuCtrl.close();
    this.language =  await this.storage.get('lang');
    if (this.language) {
      if (this.language === 'ca') {
        this.utilsService.openBrowserInApp('https://www.upc.edu/ca/graus/matricula');
      } else if (this.language === 'es') {
        this.utilsService.openBrowserInApp('https://www.upc.edu/es/grados/matricula');
      } else if (this.language === 'en') {
        this.utilsService.openBrowserInApp('https://www.upc.edu/en/bachelors/enrolment');
      }
    } else {
      this.utilsService.openBrowserInApp('https://www.upc.edu/ca/graus');
    }

    this.router.navigate(['/pages/home']);

  }

  async openInstitucio() {
    this.menuCtrl.close();
    this.language =  await this.storage.get('lang');
    if (this.language) {
      if (this.language === 'ca') {
        this.utilsService.openBrowserInApp('https://www.upc.edu/ca/la-upc/la-institucio');
      } else if (this.language === 'es') {
        this.utilsService.openBrowserInApp('https://www.upc.edu/es/la-upc/la-institucion');
      } else if (this.language === 'en') {
        this.utilsService.openBrowserInApp('https://www.upc.edu/en/the-upc/the-institution');
      }
    } else {
      this.utilsService.openBrowserInApp('https://www.upc.edu/ca/la-upc/la-institucio');
    }
    this.router.navigate(['/pages/home']);
  }

  async openBiblioteques() {
    this.menuCtrl.close();
    this.language =  await this.storage.get('lang');
    if (this.language) {
      if (this.language === 'ca') {
        this.utilsService.openBrowserInApp('https://bibliotecnica.upc.edu/biblioteques-durant-crisi-covid-19');
      } else if (this.language === 'es') {
        this.utilsService.openBrowserInApp('https://bibliotecnica.upc.edu/es/biblioteques-durant-crisi-covid-19');
      } else if (this.language === 'en') {
        this.utilsService.openBrowserInApp('https://bibliotecnica.upc.edu/en/biblioteques-durant-crisi-covid-19');
      }
      // this.utilsService.openBrowserInApp('https://studentupc.pre.ithinkupc.com/static_files/matriculacio.html');
    } else {
      this.utilsService.openBrowserInApp('https://bibliotecnica.upc.edu/biblioteques-durant-crisi-covid-19');
    }

    this.router.navigate(['/pages/home']);
  }



  async openSSO() {
    this.menuCtrl.close();
    const navigationExtras: NavigationExtras = {
      queryParams: {
        special: this.router.url
      }
    };
    // descomentar Para usar Pantalla Login de la App
    this.router.navigate(['/pages/log-in'], navigationExtras);
    
  }

  logOut() {
    this.ngZone.run(async () => {
      this.menuCtrl.close();
      if (this.platform.is('cordova')) {
        // const tokenFireBaseSubcriber = this.store.select('tokenFireBase').subscribe( async tokenFireBase => {
        //   this.presentLoading();
        //   await this.loginService.logOutPrivateUser(this.user.student._id, tokenFireBase).catch(error => {
        //     this.utilsService.openModal(error.error);
        //   });
        //   this.loading.dismiss();

        //   await this.store.dispatch(new AppActions.SetStudent(undefined));
        //   // await this.store.dispatch(new AppActions.HideTabBar());
        //   this.storage.remove('student');
        //   this.storage.remove('announcements');
        //   this.updateUser(null);
        //   this.router.navigate(['/pages/home']);

        //   tokenFireBaseSubcriber.unsubscribe();
        //   this.loading.dismiss();
        // });
      } else {
        await this.store.dispatch(new AppActions.SetStudent(undefined));
        // await this.store.dispatch(new AppActions.HideTabBar());
        this.storage.remove('student');
        this.storage.remove('announcements');
        this.updateUser(null);
        this.router.navigate(['/pages/home']);
      }
    });
  }

  sanitizeImageUrl(photo: string): SafeUrl {
    return this.utilsService.sanitizeImageUrl(photo);
  }

}
