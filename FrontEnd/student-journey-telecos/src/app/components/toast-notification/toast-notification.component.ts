import { Store } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';
import { AppState } from 'src/app/app.state';
import * as AppActions from '../../app.actions';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss'],
})
export class ToastNotificationComponent implements OnInit {
  @Input() public title: string;
  @Input() public text: string;
  @Input() public icon: any;
  @Input() public backgroundColor: string;

  constructor(
    private store: Store<AppState>,
    private storage: Storage,
    ) { }

  ngOnInit() {
    
  }

  close() {
    this.store.dispatch(new AppActions.SetNotification(null));
    this.storage.set('notification', null);
  }

}
