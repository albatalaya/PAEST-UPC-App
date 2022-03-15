import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ComponentsModule } from './components/components.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptService } from './shared/interceptor/intercept.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { IonicStorageModule } from '@ionic/storage';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { ErrorInterceptService } from './shared/interceptor/error-intercept.service';
import { CacheModule } from 'ionic-cache';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { Network } from '@ionic-native/network/ngx';


import * as AppReducer from './app.reducer';
import * as ConfigurationReducer from './pages/configuration/configuration.reducer';
import * as EventsReducer from './pages/events/events.reducer';
import * as NotesReducer from './pages/notes/notes.reducer';
import { SafariViewController } from '@ionic-native/safari-view-controller/ngx';
// Load json for
export function customTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    //IonicModule.forRoot(),
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: customTranslateLoader,
        deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot(),
    CacheModule.forRoot(),
    StoreModule.forRoot({
        isShownTabBar: AppReducer.tabBarReducer,
        language: AppReducer.languageReducer,
        events: EventsReducer.eventsReducer,
        notes: NotesReducer.notesReducer,
        student: AppReducer.studentReducer,
        tokenFireBase: AppReducer.tokenFireBaseReducer,
        configuration: ConfigurationReducer.configurationReducer,
        notification: AppReducer.notificationReducer,
        /*runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
        }*/
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
  ],
  providers: [
    StatusBar,
    ScreenOrientation,
    Network,
    SafariViewController,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptService,
      multi: true
    },
    InAppBrowser,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
  ],
})
export class AppModule {}
