import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ScholarshipsService {

  constructor(private httpClient: HttpClient) { }


  // JSON
  getScholarships() {
    return this.httpClient.get<any[]>('../../../assets/data/scholarships/get-scholarships.json')
  }

  // JSON
  getScholarshipsById() {
    return this.httpClient.get<any[]>('../../../assets/data/scholarships/get-scholarships-id.json')
  }


  async getStatus(startDate, endDate) {
    let state = 0;
    const start = startDate ? moment(startDate, 'DD/MM/YYYY').format('YYYY/MM/DD') : null;
    const end = endDate ? moment(endDate, 'DD/MM/YYYY').format('YYYY/MM/DD') : null;
    const currentDay = moment();
    if (startDate && endDate) {
      if (currentDay.isBefore(start)) {
        state = 1;
      } else if (currentDay.isBetween(start, end)) {
        state = 2;
      } else if (currentDay.isAfter(end)) {
        state = 3;
      }
    } else {
      state = 0;
    }
    return state;
  }

  getOrder(startDate, endDate) {
    let state = 0;
    const start = startDate ? moment(startDate, 'DD/MM/YYYY').format('YYYY/MM/DD') : null;
    const end = endDate ? moment(endDate, 'DD/MM/YYYY').format('YYYY/MM/DD') : null;
    const currentDay = moment();
    if (startDate && endDate) {
      if (currentDay.isBefore(start)) {
        state = 1;
      } else if (currentDay.isBetween(start, end)) {
        state = 0;
      } else if (currentDay.isAfter(end)) {
        state = 2;
      }
    } else {
      state = 3;
    }
    return state;
  }
}
