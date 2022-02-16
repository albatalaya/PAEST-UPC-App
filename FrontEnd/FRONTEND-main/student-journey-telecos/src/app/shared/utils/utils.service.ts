import { TranslateService } from '@ngx-translate/core';
import { VersionApp, VersionAppDTO, CRITICAL, ANNOYING } from './../../interfaces/version-app.interface';
import { ModalErrorComponent } from './../../components/modal-error/modal-error.component';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
const { Browser, Filesystem, App } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  toastInstance: any;

  constructor(
    public toastController: ToastController,
    private safariViewController: SafariViewController,
    private sanitizer: DomSanitizer,
    private router: Router,
    private modalController: ModalController,
    private alertController: AlertController,
    private translate: TranslateService,
    ) { }

  getTodayDate() {
    return moment().format('YYYY-MM-DD');
  }

  formatDate(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  formatDateWithTime(date, isStartDate) {
    return isStartDate ? moment(date).endOf('day').format('YYYY-MM-DDTHH:mm:ss') : moment(date).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
  }

  getHour(date) {
    return moment(date).format('HH:mm');
  }

  getTodayDateWithTime(isStartDate) {
    return isStartDate ? moment().endOf('day').format('YYYY-MM-DDTHH:mm:ss') : moment().startOf('day').format('YYYY-MM-DDTHH:mm:ss');
  }

  formatDateToCalendar(date) {
    return moment(date).format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
  }

  formatDateToCalendarWithoutTime(date) {
    return moment(date).format('ddd MMM DD YYYY 01:00:00 [GMT]ZZ');
  }

  truncate(text, numLength: number) {
    if (text.length > numLength) {
      return text.substring(0, numLength) + '...';
    } else {
      return text;
    }
  }

  manageToast(message) {
    this.toastInstance = this.toastController.create({
      message,
      duration: 3000,
      animated: true,
      color: 'tertiary'
      // cssClass: "my-toast",
      // position: "middle"
    }).then((obj) => {
      obj.present();
    });
  }

  showOnceToast(message) {
    this.toastController.dismiss().then((obj) => {
    }).catch(() => {
    }).finally(() => {
      this.manageToast(message);
    });
  }

  openBrowserInApp(urlWeb) {
    // const browser = this.iab.create(url, '_blank', this.options);

    this.safariViewController.isAvailable().then((available: boolean) => {
      if (available) {
          this.safariViewController.show({
            url: urlWeb,
            hidden: false,
            animated: false,
            transition: 'curl',
            enterReaderModeIfAvailable: true,
            tintColor: '#007BC0'
          }).subscribe((result: any) => {
              if (result.event === 'opened') {
                //  console.log('Opened');
                } else if (result.event === 'loaded') {
                  //  console.log('Loaded');
                } else if (result.event === 'closed') {
                  //  console.log('Closed');
                }
            },
            (error: any) => console.error(error)
          );

        } else {
          // use fallback browser, example InAppBrowser
        }
      }
    );
  }

  async openMapsSystem(urlMaps) {
    // console.log(urlMaps);
    const browser = await Browser.open({ url: urlMaps, windowName: '_system' });
    Browser.addListener('browserPageLoaded', (data) => {
      // console.log('Data - browserPageLoaded: ' + JSON.stringify(data));
    });
    Browser.addListener('browserFinished', (data) => {
      // console.log('Data - browserFinished: ' + JSON.stringify(data));
    });
  }

  sanitizeImageUrl(photo: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + photo);
  }

  async openModal(error) {
    // console.log(error)
    const modal = await this.modalController.create({
      component: ModalErrorComponent,
      cssClass: 'error-modal',
      backdropDismiss: true,
      componentProps: {
        'error': error,
      }
    });
    
    modal.present();
    return modal;
  }

  stringToVersionObject(version: any): VersionApp {
    if (version) {
      return new VersionApp(version[1] ? Number(version[1]) : null, version[2] ? Number(version[2]) : null,
                          version[3] ? Number(version[3]) : null, version[4] ? Number(version[4]) : null)
    } else {
      return null;
    }
  }

  async showUpdateVersionAlert(appVersionMarket: VersionApp, appVersionDevice: VersionApp, rule: string) {
    let alertOptions;
    if (rule === CRITICAL) {
      alertOptions = {
        cssClass: 'alert-update-version',
        header: this.translate.instant('ALERT_UPDATE.HEADER'),
        message: this.translate.instant('ALERT_UPDATE.MESSAGES.CRITICAL', {version: appVersionMarket.toString()}),
        backdropDismiss: false,
        animated: true,
        keyboardClose: true,
        mode: 'md',
        buttons: [
          {
            text: this.translate.instant('ALERT_UPDATE.BUTTONS.UPDATE'),
            role: 'update',
            handler: (blah) => {
              // console.log(blah)
              this.goToMarket()
            }
          }
        ]
      }
    } else if (rule === ANNOYING) {
      alertOptions = {
        cssClass: 'alert-update-version',
        header: this.translate.instant('ALERT_UPDATE.HEADER'),
        message: this.translate.instant('ALERT_UPDATE.MESSAGES.ANNOYING', {version: appVersionMarket.toString()}),
        backdropDismiss: true,
        animated: true,
        keyboardClose: true,
        mode: 'md',
        buttons: [
          {
            text: this.translate.instant('ALERT_UPDATE.BUTTONS.NOT_NOW'),
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              // console.log('Confirm Cancel: blah');
            }
          }, {
            text: this.translate.instant('ALERT_UPDATE.BUTTONS.UPDATE'),
            role: 'update',
            handler: () => {
              this.goToMarket()
            }
          }
        ]
      }
    }
    const alert = await this.alertController.create(alertOptions);
    await alert.present();
  }

  async goToMarket() {
    const openStore = await App.openUrl({
      url:
        'https://play.google.com/store/apps/details?id=com.upc.estudiants',
    });
  }
}
