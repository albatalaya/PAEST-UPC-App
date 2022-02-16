import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AppActions from './../../app.actions';
import { NavController, MenuController } from '@ionic/angular';
import { AppState } from '../../../app/app.state';
@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss'],
})
export class ErrorPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private zone: NgZone,
    private store: Store<AppState>,
    private navCtrl: NavController,
    private menu: MenuController) { 
      this.menu.enable(false, 'sidebar');
    }
  errorCodeApp: any;
  backPage: any;
  ngOnInit() {
    this.zone.run(() => {
      this.store.dispatch(new AppActions.HideTabBar());
      this.errorCodeApp = this.route.snapshot.queryParams.error.error;
      this.backPage = this.route.snapshot.queryParams.backPage;

    });
    document.addEventListener('ionBackButton', (ev) => {
      ev['detail'].register(10, () => {
        this.navCtrl.navigateRoot(this.backPage)
      });
    });
  }
  ionViewWillLeave() {
    this.store.dispatch(new AppActions.ShowTabBar());
  
    document.removeEventListener('ionBackButton', (ev) => {
    });
  }

}
