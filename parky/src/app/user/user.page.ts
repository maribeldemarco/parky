import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage {
  constructor(public router: Router) {}
  registroBusca() {
    this.router.navigate(['home']);
  }

  registroDuenio() {
    this.router.navigate(['/login']);
  }
}
