import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    private _api: ApiService
  ) { }

  ngOnInit() {
  }

  onSubmit(form) {
    localStorage.clear(); // using clear in dev environment or just for assignment purpose,must not be done in prod
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
              this.authError = err.msg || err.error.msg;
          return false;
        }
          this.authErrorStatus = false;
          localStorage.setItem('user_id', res.data._id);
          localStorage.setItem('username', res.data.username);
          localStorage.setItem('access_token', res.token);
          this.router.navigate(['/dashboard']);
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
