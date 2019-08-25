import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  user;
  constructor(private api: ApiService, private route: Router) { }

  ngOnInit() {
    this.user = localStorage.getItem('username');
  }

  logout() {
    this.api.logout((err, res) => {
      if (err) {
        return;
      }

      this.route.navigate(['/login']);
    });
  }
}
