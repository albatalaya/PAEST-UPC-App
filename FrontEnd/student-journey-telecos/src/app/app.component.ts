import { VersionAppDTO, CRITICAL, VersionApp, ANNOYING } from './interfaces/version-app.interface';
import { ConfigAppService } from './services/config-app/config-app.service';
import { StudentsService } from './services/students/students.service';
import { ApiErrors } from './shared/api-errors.enum';
import { NewsService } from './services/news/news.service';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { Component, NgZone } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
// NGRX
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import * as AppActions from './app.actions';
import * as ConfigurationActions from './pages/configuration/configuration.actions';
import { UserService } from './services/user/user.service';
import { UserTokenDTO } from './interfaces/user.interface';
import { UtilsService } from './shared/utils/utils.service';
const { Device } = Plugins;

const { Network } = Plugins;
const { PushNotifications } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  previousState: boolean;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public translate: TranslateService,
    private storage: Storage,
    private store: Store<AppState>,
    private screenOrientation: ScreenOrientation,
    private navCtrl: NavController,
    private userService: UserService,
    private route: ActivatedRoute,
    private newsService: NewsService,
    private utilsService: UtilsService,
    private router: Router,
    private ngZone: NgZone,
    private studentService: StudentsService,
    private configAppService: ConfigAppService,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(async () => {
      await this.setDefaultConfiguration();
      

      this.setDefaultConfigurationStudent();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkConnectionStatus();
      this.setDefaultNotification();
      if (this.platform.is('cordova')) { // Check if is working after change Cordova --> Capacitor
        // console.log('Running on device');
        // set to portrait
        this.screenOrientation.lock('portrait');
        // Register with Apple / Google to receive push via APNS/FCM
        this.addListenersPush();
        this.registerFirebasePush();
      }

      // // Login public user to keep save server endpoints
      // this.userService.loginPublicUser().then(async (res: UserTokenDTO) => {
      //   await this.storage.set('token', res.token);
      //   this.navCtrl.navigateRoot('home');
      // });
    });
  }


  async checkConnectionStatus() {
    const state = await Network.getStatus();
    this.previousState = state['connected'];

    if (!this.previousState) {
      setTimeout(() => {
        this.navCtrl.navigateRoot('/error', {
          queryParams: {
            error: {
              error: ApiErrors.GENERAL_NO_INTERNET_CONNECTION
            }
          }
        });
      }, 1000);
    }

    Network.addListener('networkStatusChange', _ => {
      setTimeout(async () => {
        const status = await Network.getStatus();
        if (this.previousState !== status['connected']) {
          this.previousState = status['connected'];
          if (status['connected']) {
            this.navCtrl.navigateRoot('/pages/home');
          } else {
            this.navCtrl.navigateRoot('/error', {
              queryParams: {
                error: {
                  error: ApiErrors.GENERAL_NO_INTERNET_CONNECTION
                }
              }
            });
          }
        }
      }, 1000);
    });
  }

  addListenersPush() {
    // On success, we should be able to receive notifications
    PushNotifications.addListener('registration',
      async (token: PushNotificationToken) => {
        await this.store.dispatch(new AppActions.SetTokenFireBase(token.value));
      }
    );
    // Some issue with our setup and push will not work
    PushNotifications.addListener('registrationError',
      (error: any) => {
        // console.log('Error on registration', JSON.stringify(error));
      }
    );
    // Show us the notification payload if the app is open on our device
    PushNotifications.addListener('pushNotificationReceived',
      (notificationPayload: PushNotification) => {

        notificationPayload = notificationPayload['data']
        const notification = {
          title: notificationPayload['title'],
          text: notificationPayload['text'],
          type: notificationPayload['type'],
          idNew: notificationPayload['idNew'],
          backgroundColor: notificationPayload['backgroundColor'],
          icon: [notificationPayload['icon-packet'], notificationPayload['icon-name']],
        }
        /*this.store.dispatch(new AppActions.SetNotification(notification));
        this.storage.set('notification', notification);*/
      }
    );

    // Method called when app is in background or closed.
    PushNotifications.addListener('pushNotificationActionPerformed',
      async (notificationPayload: PushNotificationActionPerformed) => {
        // console.log('Push action performed', JSON.stringify(notificationPayload));
        notificationPayload = notificationPayload['notification']['data'];
        const notification = {
          /*title: notificationPayload['title'],
          text: notificationPayload['text'],*/
          type: notificationPayload['type'],
          data: notificationPayload['data']
          /*idNew: notificationPayload['idNew'],
          backgroundColor: notificationPayload['backgroundColor'],
          icon: [notificationPayload['icon-packet'], notificationPayload['icon-name']],*/
        }

        if (notification.type === '0') {
          const navigationExtras: NavigationExtras = {
            queryParams: {
              special: notification.data
            }
          };
          this.ngZone.run(() => {
            this.router.navigate(['/pages/announcement-detail/home/false'], navigationExtras);
          })
        } else if (notification.type === '1') {
          /*this.store.dispatch(new AppActions.SetNotification(notification));
          this.storage.set('notification', notification);*/
        } else if (notification.type === '3') {
          /*const lang = await this.storage.get('lang');
          this.newsService.getNewsById(notification['idNew'], lang);
          this.navCtrl.navigateRoot('news/' + notification['idNew'])*/
        }
      }
    );
  }

  registerFirebasePush() {
    PushNotifications.requestPermission().then(
      result => {
        if (result.granted) {
          PushNotifications.register();
        }
      }
    );
    // console.log('registerFirebasePush');
  }

  async setDefaultNotification() {
    const notification = await this.storage.get('notification');
    if (!notification) {
      this.store.dispatch(new AppActions.SetNotification(null));
      this.storage.set('notification', null);
    } else {
      this.store.dispatch(new AppActions.SetNotification(notification));
      this.storage.set('notification', notification);
    }
  }
  async setDefaultConfiguration() {
    const lang = await this.storage.get('lang');
    if (lang) {
      this.translate.use(lang); // Languaje by default (ca -> català)
      if (lang === 'ca') {
        this.store.dispatch(new AppActions.SetLanguageCatalanAction());
      } else if (lang === 'es') {
        this.store.dispatch(new AppActions.SetLanguageSpanishAction());
      } else if (lang === 'en') {
        this.store.dispatch(new AppActions.SetLanguageEnglishAction());
      }
    } else {
      this.storage.set('lang', 'ca');
      this.store.dispatch(new AppActions.SetLanguageCatalanAction());
      this.translate.use('ca'); // Languaje by default (ca -> català)
    }

    const configurationEventsHome = await this.storage.get('isEventsInHome');
    if (configurationEventsHome) {
      if (configurationEventsHome === true) {
        this.store.dispatch(new ConfigurationActions.ShowEventsInHome(true));
      } else if (configurationEventsHome === true) {
        this.store.dispatch(new ConfigurationActions.HideEventsInHome(false));
      }
    } else {
      this.storage.set('isEventsInHome', true);
      this.store.dispatch(new ConfigurationActions.HideEventsInHome(true));
    }

    const student = await this.storage.get('student');
    await this.store.dispatch(new AppActions.SetStudent(student));
  }

  async setDefaultConfigurationStudent() {
    const student = await this.storage.get('student');
    if (student) {
      // console.log('refreshSSOToken -> ', student.refreshSSOToken);

      if (student.refreshSSOToken) {
        this.studentService.getStudent().subscribe(async res => {
          student.student = res 
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
          this.store.dispatch(new AppActions.ShowTabBar());
        })

      } else {
        await this.store.dispatch(new AppActions.SetStudent(undefined));
        // await this.store.dispatch(new AppActions.HideTabBar());
        this.storage.remove('student');
        this.router.navigate(['/pages/home']);
      }
    }
  }
}
