import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-profile',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],

})
export class ProfilePage {

  constructor(
    public auth: AuthenticationService,
    public router: Router
  ) { }

  logout() {
    this.auth.logOut()
    this.router.navigate(['/login'])
  }

  miCuenta() {
    this.router.navigate(['/profile']);
  }

  backToHome() {
    this.router.navigate(['/home']);
  }



}
