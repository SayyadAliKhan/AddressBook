import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {

  constructor(public _cookieService: CookieService) { }
  /**
    * @returns {Object} All cookies
    */
  getAllCookies() {
    return this._cookieService.getAll();
  }

  /**
  * @param {string} key Id to use for lookup.
  * @returns {Object} Deserialized cookie value.
  */
  getCookieObject(key: string) {
    return this._cookieService.getObject(key);
  }

  /**
  * @param {string} key Id to use for lookup.
  * @returns {string} Raw cookie value.
  */
  public getCookie(key: string) {
    return this._cookieService.get(key);
  }

  /**
  * @param {string} key Id for the `value`.
  * @param {string} value Raw value to be stored.
  * @param {CookieOptionsArgs} options (Optional) Options object.
  */
  setCookie(key: string, val: any, options?: any) {
    this._cookieService.put(key, val, options);
  }

  /**
  * @param {string} key Id for the `value`.
  * @param {Object} value Value to be stored.
  * @param {CookieOptionsArgs} options (Optional) Options object.
  */
  setCookieObject(key: string, val: any, options?: any) {
    this._cookieService.putObject(key, val, options);
  }

  /**
  * removes all cookies
  */
  removeCookie(key: string, options?: any) {
    this._cookieService.remove(key, options);
  }

  /**
  * @param {string} key Id of the key-value pair to delete.
  * @param {CookieOptionsArgs} options (Optional) Options object.
  */
  removeAllCookies() {
    this._cookieService.removeAll();
  }

  /**
  * @param {string} key Id of the item to be put in localstorage
  * @param {value} value to be assigned to the key
  */
  setLocalItem(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  /**
  * @param {string} key Id of the item to be put in localstorage
  * @param {value} value to be assigned to the key
  */
  setLocalItemObject(key: string, value: any) {

    value = (value && JSON.stringify(value));

    localStorage.setItem(key, value);
  }

  /**
  * @param {string} key Id of the item to be retrieved from localstorage
  */
  getLocalItem(key: string) {
    return localStorage.getItem(key);
  }

  /**
  * @param {string} key Id of the item to be retrieved from localstorage
  */
  getLocalItemObject(key: string) {

    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    }
    return '';
  }
}
