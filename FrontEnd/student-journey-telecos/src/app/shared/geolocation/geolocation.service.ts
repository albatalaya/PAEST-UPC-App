import { Injectable } from '@angular/core';
import { Plugins, GeolocationOptions, GeolocationPosition } from '@capacitor/core';
import { Platform } from '@ionic/angular';
const { Geolocation } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private platform: Platform,
    ) { }

  getCurrentPosition() {
    const coordinates = Geolocation.getCurrentPosition();
    return coordinates;
  }

  internalGetCurrentPosition = async (options: GeolocationOptions = { enableHighAccuracy: false, timeout: 15000, maximumAge: 3000}): Promise<GeolocationPosition> => {
    if (this.platform.is('ios')) {
      return new Promise<GeolocationPosition>((resolve, reject) => {
        const id = Geolocation.watchPosition(options, (position, err) => {
          Geolocation.clearWatch({ id });
          if (err) {
            reject(err);
            return;
          }
          resolve(position);
        });
      });
    } else {
      return this.getCurrentPosition();
    }
  }
}
