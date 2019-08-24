import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from './login/login.component';
import { ProfilesComponent } from './profiles/profiles.component';
import { ManageAddressComponent } from './manage-address/manage-address.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthService]
  },
  {
    path: 'profiles',
    component: ProfilesComponent,
    canActivate: [AuthService]
  },
  {
    path: 'manageAddress',
    component: ManageAddressComponent,
    canActivate: [AuthService]
  },
  {
    path: '**',
    component: LoginComponent,
    canActivate: [AuthService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
