import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    public auth: AuthenticationService,
    public router: Router
  ) { }

  logout() {
    this.auth.logOut()
    this.router.navigate(['/login'])
  }

  miCuenta() {
    this.router.navigate(['profile']);
  }

  backToHome() {
    this.router.navigate(['home']);
  }

  cambioUsuario() {
    this.router.navigate(['/user']);
  }

}


