import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  email: string = ''

  constructor(
    public auth: AuthenticationService,
    public router: Router
  ) { }

  recoverPassword(email: string) {
    this.auth.resetPassword(email)
  }
  backToLogin() {
    this.router.navigate(['/login'])
  }

}