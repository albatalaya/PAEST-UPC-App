import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Router } from '@angular/router';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  hideTabBar;
  user;
  constructor(
    private store: Store<AppState>,
    private ngZone: NgZone,
    private router: Router,
    // private storage: Storage,
  ) { }

  @ViewChild('tabBar', {read: IonTabs, static: true})
  private tabBarRef: IonTabs;
  ngOnInit() {
    this.getUser();
    this.store.select('isShownTabBar').subscribe(async isShownTabBar => {
      this.ngZone.run(() => {
        // console.log(isShownTabBar)

        if (isShownTabBar !== undefined) {
          this.hideTabBar = !isShownTabBar;
        }
      });
    });
  }

  async getUser() {
    // this.storage.get('student').
    this.store.select('student').subscribe(student => {
      // console.log('getUser- menuSideBar', student);
      
      this.user = student;
    });
  }

  goTo(page: string) {
    this.router.navigate([page]);
  }
}
