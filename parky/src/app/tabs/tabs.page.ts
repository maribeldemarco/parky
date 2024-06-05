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
    this.router.navigate(['/tabs/tabs/tab5']);
  }

  backToHome() {
    this.router.navigate(['/tabs/tabs/tab4']);
  }

  cambioUsuario() {
    this.router.navigate(['/user']);
  }

}


