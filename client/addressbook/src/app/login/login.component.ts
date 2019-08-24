import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookiesService } from 'src/services/cookies.service';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authError: string = undefined;
  authErrorStatus = false;
  requiredFieldError: string = undefined;
  showEye = false;
  type = 'password';
  isValid = true;
  loader = false;
  isUsernameEmpty = false;
  isPasswordEmpty = false;

  constructor(
    private router: Router,
    private _api: ApiService,
    private _cookie: CookiesService
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    this._cookie.removeAllCookies();
    this.isUsernameEmpty = false;
    this.isPasswordEmpty = false;
    this.isValid = true;

    if (form.username === '') {
      this.isUsernameEmpty = true;
      this.requiredFieldError = '*Required field cannot be left blank';
      this.isValid = false;
    }
    if (form.password === '') {
      this.isPasswordEmpty = true;
      this.requiredFieldError = '*Required field cannot be left blank';
      this.isValid = false;
    }

    if (this.isValid) {
      this.loader = true;
      this._api.login(form, (err, res) => {
        this.loader = false;
        if (err) {
              this.authErrorStatus = true;
              this.authError = err.msg;
          return false;
        }
          this.authErrorStatus = false;
          this._cookie.setCookie('user_id', form.email);
          this._cookie.setCookie('access_token', res.token);

          // if (res.message === 'Authentication Failed') {
          //   this.authErrorStatus = true;
          //   this.authError = 'Invalid username/email or password';
          //   //this.invalidCred.emit();
          //   this.isPasswordEmpty = false;
          //   this.isUsernameEmpty = false;
          // }

          this.router.navigate(['/profiles']);
      });
    }
    return true;
  }

  toggleShow() {
    this.showEye = !this.showEye;
    if (this.showEye) {
      this.type = 'text';
    } else {
      this.type = 'password';
    }
  }

}
