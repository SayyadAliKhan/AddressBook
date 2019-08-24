import { Injectable } from '@angular/core';
import { constants } from './constant.service';
import { CookiesService } from '../services/cookies.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private _cookie: CookiesService
  ) { }

  getAccessToken() {
    return this._cookie.getCookie('access_token');
  }

  getHeaderToken() {
    const headerToken = new HttpHeaders;
    headerToken.append('X-Access-Token', this.getAccessToken());
    return headerToken;
  }

  login(loginCreds, cb) {
    this._cookie.removeAllCookies();
    this.http.post(constants.APIS.LOGIN, loginCreds, {headers : this.getHeaderToken()})
      .subscribe(res => {
        cb(null, res);
      }, err => {
          cb(err);
      });
  }

  logout(cb) {
    this._cookie.removeAllCookies();
    cb(null);
    // this.http.post(constants.APIS.LOGOUT, { headers: this.getHeaderToken() })
    //   .subscribe(res => {
    //     this._cookie.removeAllCookies();
    //     cb(null, res);
    //   }, err => {
    //     cb(err);
    //   });
  }

  // tokenVerification(Obj, cb) {
  //   let filter = this._restangular.one(constants.APIS.TOKEN_VERIFICATION);
  //   filter
  //     .post("", Obj)
  //     .toPromise()
  //     .then(
  //       res => {
  //         if (cb) cb(null, res.plain());
  //       },
  //       err => {
  //         if (cb) cb(err, null);
  //       }
  //     );
  // }

  // checkAuth(Obj, cb) {
  //   let filter = this._restangular.one(constants.APIS.CHECK_AUTH)
  //   filter
  //     .post("", Obj, "", this.getHeaderToken())
  //     .toPromise()
  //     .then(
  //       res => {
  //         if (cb) cb(null, res.plain())
  //       }
  //     )
  //     .catch(
  //       err => {
  //         if (cb) cb(err, null)
  //       }
  //     )
  // }

}
