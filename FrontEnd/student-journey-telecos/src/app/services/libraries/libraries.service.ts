import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Cacheable } from 'ngx-cacheable';

@Injectable({
  providedIn: 'root'
})
export class LibrariesService {

  constructor(private httpClient: HttpClient) { }


  // JSON
  getLibraries() {
    return this.httpClient.get<any[]>('../../../assets/data/biblioteques/libraries.json')
  }

  // JSON
  getLibrariesOccupancyRate() {
    return this.httpClient.get<any[]>('../../../assets/data/biblioteques/occupancy.json')
  }

  // JSON
  getLibraryById() {
    return this.httpClient.get<any[]>('../../../assets/data/biblioteques/libraries-id.json')
  }

}
