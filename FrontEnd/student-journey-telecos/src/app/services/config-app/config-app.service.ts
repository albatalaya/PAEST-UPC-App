import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cacheable } from 'ngx-cacheable';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigAppService {

  constructor(private httpClient: HttpClient) { }


  // JSON
  // getAppVersionObject() {
  //     return this.httpClient.get<any[]>('../../../assets/data/config/app-service.json')
  // }


}
