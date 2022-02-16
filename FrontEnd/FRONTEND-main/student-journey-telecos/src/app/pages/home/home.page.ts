import { SliderHomeDTO } from './../../interfaces/slider-home.interface';
import { SliderHomeService } from './../../services/slider-home/slider-home.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { NewsService } from 'src/app/services/news/news.service';
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';
import { extendMoment } from 'moment-range';
import { EventsService } from 'src/app/services/events/events.service';
import { UtilsService } from 'src/app/shared/utils/utils.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as ConfigurationActions from '../../app.actions';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'src/app/services/user/user.service';
import { UserTokenDTO } from 'src/app/interfaces/user.interface';
import { Plugins, PushNotification, PushNotificationActionPerformed } from '@capacitor/core';
import { AnnouncementService } from 'src/app/services/announcement/announcement.service';
import { ApiErrors } from 'src/app/shared/api-errors.enum';
const { PushNotifications } = Plugins;
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  news;
  urlNextNews = null;
  urlNextEvents = null;
  selectedTab = 'news';
  todayDate;
  events;
  errorEvents;
  errorNews;
  language;
  configuration;
  slideOpts: any;
  notification;
  slider: any;

  announcementsFiltered;
  announcements;

  constructor(
    private newsService: NewsService,
    private eventsService: EventsService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private storage: Storage,
    public translate: TranslateService,
    private userService: UserService,
    private zone: NgZone,
    private sliderHomeService: SliderHomeService,
    private announcementService: AnnouncementService,
    private ngZone: NgZone
  ) {
    this.store.subscribe(state => console.log());
    this.store.select('notification').subscribe(async notification => {
      if (notification) {
        this.createNotification(notification);
      } else {
        this.deleteNotification();
      }
      this.ngOnInit();
    });
    // this.language = this.store.select(state => this.language = state.configuration.language);
  }

  async ngOnInit() {

    // await this.checkUserToken();

    this.store.select('student').subscribe( async student => {
      this.ngZone.run(async () => {
        if (student) {
          const res = await this.announcementService.getPage();
          const announcementsIdDeleted = await this.storage.get('announcements');

          this.announcements = res['docs'];
          this.announcementsFiltered = announcementsIdDeleted !== null ? this.announcements.filter( a => !announcementsIdDeleted.includes(a.id)) : this.announcements;
        } else {
          this.announcements = undefined;
        }
        
      });
    });

    // this.navCtrl.navigateRoot('home');
    this.language = await this.storage.get('lang');
    if (this.language) {
      this.translate.use(this.language); // Languaje by default (ca -> català)
    } else {
      this.storage.set('lang', 'ca');
      this.translate.use('ca'); // Languaje by default (ca -> català)
      this.language = 'ca';
      this.store.dispatch(new ConfigurationActions.SetLanguageCatalanAction());
    }
    this.slider = await this.sliderHomeService.getSlider().toPromise();
    this.slider.slides = this.slider.slides.filter(slide => slide.visibility);
    const notification = await this.storage.get('notification');
    if (notification) {
      this.zone.run(() => {
        this.createNotification(notification);
      });
    } else {
      this.deleteNotification();
    }

    this.store.select('configuration').subscribe(async config => {
      this.configuration = config;
    });
    // La configuración está en el State de la App y en el LocalStorage
    // this.configuration = await this.storage.get('isEventsInHome');

    const news = this.newsService.getNews().toPromise().catch(
      error => {
        this.errorNews = error.error;
      }
    );
    const events = await this.eventsService.getEventsDate().toPromise().catch(
      error => {
        this.errorEvents = error.error;
      }
    );

    news.then(promise => {
      this.news = promise ? promise['data'] : undefined;
      this.urlNextNews = promise ? promise['batching']['next'] : undefined;
      // console.log(this.news)
    });

    if (events) {
      // console.log('home ------------------->', events)
      this.events = events;
    }

    if (events && events['data'].length === 0) {
      this.errorEvents = ApiErrors.NO_EVENTS;
    }
  }

  announcementDeleted(id) {
    this.announcementsFiltered = this.announcementsFiltered.filter( a => a.id !== id);
  }

  deleteNotification() {
    this.notification = null;
  }
  createNotification(notification: any) {
    this.zone.run(async () => {
      // console.log('<=============================== test ===============================>');
      // this.announcements = await this.announcementService.getAll();
      if (notification['type'] === '1') {
        this.notification = {
          title: notification['title'],
          text: notification['text'],
          backgroundColor: '#00C2DE', // #00C2DE #FF793C
          icon: ['fas', 'bell'], // ['fas', 'lightbulb'] ['fas', 'bell']
        };
      } else {
        this.notification = null;
      }
    });
  }

  // async checkUserToken() {
  //   let userHasToken = false;
  //   if (await this.storage.get('token')) {
  //     userHasToken = true;
  //   } else {
  //     // Login public user to keep save server endpoints
  //     userHasToken = await this.userService.loginPublicUser().then(async (res: UserTokenDTO) => {
  //       await this.storage.set('token', res.token);
  //       return true;
  //     });
  //   }
  //   return userHasToken;
  // }

  async loadMoreNews(event) {
    const moreNews = await this.newsService.getNewsByUrl().toPromise();
    this.urlNextNews = moreNews['batching']['next'];
    await this.news.push(...moreNews['data']);
    event.target.complete();
  }

  async segmentChanged(event) {
    this.selectedTab = event.detail.value;
  }

  truncate(text, numLength: number) {
    return this.utilsService.truncate(text, numLength);
  }

  setSpanish() {
    this.store.dispatch(new ConfigurationActions.SetLanguageSpanishAction());
  }
  setCatalan() {
    this.store.dispatch(new ConfigurationActions.SetLanguageCatalanAction());
  }
  setEnglish() {
    this.store.dispatch(new ConfigurationActions.SetLanguageEnglishAction());
  }

  async openExternalLink(link: string) {
    this.utilsService.openBrowserInApp(link);
  }

}

const slideOpts = {
  slidesPerView: 1.1,
  spaceBetween: -20,
  autoplay: true,
  speed: 1000,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
  },
  on: {
    beforeInit() {
      const swiper = this;

      swiper.classNames.push(`${swiper.params.containerModifierClass}coverflow`);
      swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);

      swiper.params.watchSlidesProgress = true;
      swiper.originalParams.watchSlidesProgress = true;
    },
    setTranslate() {
      const swiper = this;
      const {
        width: swiperWidth, height: swiperHeight, slides, $wrapperEl, slidesSizesGrid, $
      } = swiper;
      const params = swiper.params.coverflowEffect;
      const isHorizontal = swiper.isHorizontal();
      const transform$$1 = swiper.translate;
      const center = isHorizontal ? -transform$$1 + (swiperWidth / 2) : -transform$$1 + (swiperHeight / 2);
      const rotate = isHorizontal ? params.rotate : -params.rotate;
      const translate = params.depth;
      // Each slide offset from center
      for (let i = 0, length = slides.length; i < length; i += 1) {
        const $slideEl = slides.eq(i);
        const slideSize = slidesSizesGrid[i];
        const slideOffset = $slideEl[0].swiperSlideOffset;
        const offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

        let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
        let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
        // var rotateZ = 0
        let translateZ = -translate * Math.abs(offsetMultiplier);

        let translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
        let translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

        // Fix for ultra small values
        if (Math.abs(translateX) < 0.001) translateX = 0;
        if (Math.abs(translateY) < 0.001) translateY = 0;
        if (Math.abs(translateZ) < 0.001) translateZ = 0;
        if (Math.abs(rotateY) < 0.001) rotateY = 0;
        if (Math.abs(rotateX) < 0.001) rotateX = 0;

        const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

        $slideEl.transform(slideTransform);
        $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
        if (params.slideShadows) {
          // Set shadows
          let $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          let $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if ($shadowBeforeEl.length === 0) {
            $shadowBeforeEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
            $slideEl.append($shadowBeforeEl);
          }
          if ($shadowAfterEl.length === 0) {
            $shadowAfterEl = swiper.$(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
            $slideEl.append($shadowAfterEl);
          }
          if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
          if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
        }
      }

      // Set correct perspective for IE10
      if (swiper.support.pointerEvents || swiper.support.prefixedPointerEvents) {
        const ws = $wrapperEl[0].style;
        ws.perspectiveOrigin = `${center}px 50%`;
      }
    },
    setTransition(duration) {
      const swiper = this;
      swiper.slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
    }

    
  }

};
