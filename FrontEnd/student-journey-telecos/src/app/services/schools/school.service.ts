import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  constructor(
    private httpClient: HttpClient
  ) { }

  // JSON
  getSchools() {
    return this.httpClient.get<any[]>('../../../assets/data/schools/get-schools.json')
  }


}
