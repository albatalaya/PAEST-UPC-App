import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  // loginPublicUser() {
  //   try {
  //     const userCredentials = {
  //       username: environment.publicUser,
  //       password: environment.publicUser
  //     };
  //     console.log('PUBLIC LOGIN', userCredentials);
      
  //     return this.httpClient.post(environment.urlServer + 'user/login', userCredentials).toPromise();
  //   } catch (error) {
  //     console.log('Error getNews', error);

  //   }
  // }

  
}
