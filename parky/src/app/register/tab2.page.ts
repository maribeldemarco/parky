import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  password: string = '';
  email: string = '';
  constructor(
    public auth: AuthenticationService,
    public router: Router
  ) { }

  logout() {
    this.auth.logOut()
    this.router.navigate(['/login'])
  }
  register() {
    this.auth.signUp(this.email, this.password).then(() => {
      this.router.navigate(['/tabs'])
    }).catch((error) => {
      console.log(error.code);
      alert('Email ya registrado.');
    });
  }

  backToLogin() {
    this.router.navigate(['/login'])
  }


}
