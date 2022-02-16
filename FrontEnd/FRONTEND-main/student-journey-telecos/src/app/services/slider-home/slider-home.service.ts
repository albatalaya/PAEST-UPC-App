import { environment } from 'src/environments/environment';
import { Cacheable } from 'ngx-cacheable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderHomeService {

  constructor(private httpClient: HttpClient) { }

  // JSON
  getSlider() {
    return this.httpClient.get<any[]>('../../../assets/data/config/slider.json')
  }

}
