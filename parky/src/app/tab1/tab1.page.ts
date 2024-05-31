import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  password: string = '';
  email: string = '';
  constructor(
    public auth: AuthenticationService,
    public router: Router
  ) { }
  
  async loginUser() {
    this.auth.logIn(this.email, this.password).then((userCredential) => {
      console.log(userCredential);
      this.router.navigate(['/tabs'])
    }).catch((error) => {
      console.log(error.code);
      alert('Email y/o contraseña incorrecta.');
    });
  }
}
