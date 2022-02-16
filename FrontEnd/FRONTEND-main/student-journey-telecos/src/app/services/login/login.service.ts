import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient,
    ) { }

  // JSON
  loginPrivateCredentials() {
      return this.httpClient.get<any[]>('../../../assets/data/login/login-credentials.json')
  }

  // loginPrivateUserCode(code, language, eventsInHome, tokenFireBase) {
  //   try {
  //     const body = {
  //       settings : {
  //         language,
  //         eventsInHome,
  //       }
  //     };

  //     return this.httpClient.post(environment.urlServer + 'login/exchange-code/' + code, body).toPromise();
  //   } catch (error) {
  //     console.log('Login private', error);
  //   }
  // }

  // logOutPrivateUser(idStudent, idFirebase) {
  //   try {
  //     const body = {
  //       id : idStudent,
  //       idFirebase
  //     };

  //     return this.httpClient.put(environment.urlServer + 'login/logout', body).toPromise();
  //   } catch (error) {
  //     console.log('LogOut private', error);
  //   }
  // }

  // getRefreshToken(code) {
  //   try {
  //     return this.httpClient.post(environment.urlServer + 'login/credentials/refresh-token/' + code, {}).toPromise();
  //   } catch (error) {
  //     console.log('getRefreshToken', error);
  //   }
  // }
}
