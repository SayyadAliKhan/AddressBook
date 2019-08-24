import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { CookiesService } from '../services/cookies.service';
import { CookieModule, CookieService } from 'ngx-cookie';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfilesComponent,
    ManageAddressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CookieModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CookiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
