import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/shared/utils/utils.service';

declare var google;

@Component({
  selector: 'app-library-contact',
  templateUrl: './library-contact.page.html',
  styleUrls: ['./library-contact.page.scss'],
})
export class LibraryContactPage implements OnInit {
  /*map;
  @ViewChild('mapElement', null) mapElement;*/

  library;
  // urlMaps: any;
  constructor(private route: ActivatedRoute, private utilsService: UtilsService) { }

  ngOnInit() {
    if (this.route && this.route.data) {
      const promiseObservable = this.route.data;
      if (promiseObservable) {
        promiseObservable.subscribe(promiseValue => {
          const libraryPromise = promiseValue.data.library;
          libraryPromise.then(library => {
            this.library = library;

            /*this.map = new google.maps.Map(
              this.mapElement.nativeElement,
              {
                center: {lat: Number(this.library.data.latitude), lng: Number(this.library.data.longitude)},
                zoom: 14,
                clickableIcons: false,
                disableDefaultUI: true,
              }
            );

            const marker = new google.maps.Marker({
              position: new google.maps.LatLng(this.library.data.latitude, this.library.data.longitude),
              title: this.library.data.address
            });

            marker.setMap(this.map);*/

            // this.urlMaps = this.sanitizer.bypassSecurityTrustResourceUrl(('https://maps.google.com/maps?q=' + this.library.data.latitude + ',' + this.library.data.longitude + '&z=15&output=embed'));
            // this.urlMaps = this.sanitizer.bypassSecurityTrustResourceUrl(('https://maps.googleapis.com/maps/api/staticmap?center=40.714%2c%20-73.998&zoom=12&size=400x400&key=apikye'));
          });
        });
      } else {
        console.warn('No promiseObservable coming from Route Resolver data');
      }
    } else {
      console.warn('No data coming from Route Resolver');
    }
  }

  async openMarker() {
    await this.utilsService.openMapsSystem('https://www.google.com/maps/search/' + this.library.data.latitude + ',' + this.library.data.longitude);
  }
}
