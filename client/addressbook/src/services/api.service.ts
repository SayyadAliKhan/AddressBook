import { Injectable } from '@angular/core';
import { constants } from './constant.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  server = 'http://localhost:3001';
  constructor(
    private http: HttpClient
  ) { }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  getHeaderToken() {
    const headerToken = new HttpHeaders;
    headerToken.set('X-Access-Token', this.getAccessToken());
    return headerToken;
  }

  login(loginCreds, cb) {
    this.http.post(this.server + constants.APIS.LOGIN, loginCreds)
      .subscribe(res => {
        cb(null, res);
      }, err => {
          cb(err);
      });
  }

  logout(cb) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    cb(null);
  }

  // Get all addresses
  getAllAddress(cb) {
    this.http.post(this.server + constants.APIS.GETALLPROFILE,
    { 'user_id': localStorage.getItem('user_id') }, { headers: this.getHeaderToken() })
    .subscribe(res => {
      cb(null, res);
    }, err => {
      cb(err);
    });
  }

  // Save a particular address
  saveAddress(address, cb) {
    this.http.post(this.server + constants.APIS.SAVEPROFILE,
      address, { headers: this.getHeaderToken() })
      .subscribe(res => {
        cb(null, res);
      }, err => {
        cb(err);
      });
  }


  // Delete a particular address
  deleteAddress(address, cb) {
    this.http.delete(this.server + constants.APIS.DELETEPROFILE + address._id, { headers: this.getHeaderToken() })
    .subscribe(res => {
      cb(null, res);
    }, err => {
      cb(err);
    });
  }

  // Edit a particular address
  editAddress(address, cb) {
    this.http.put(this.server + constants.APIS.EDITPROFILE + address._id, address, { headers: this.getHeaderToken() })
      .subscribe(res => {
        cb(null, res);
      }, err => {
        cb(err);
      });
  }
}
