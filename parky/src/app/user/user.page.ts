import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {

  constructor(
    public router: Router
  ) { }

  backToHome() {
    this.router.navigate(['/tabs/tab4']);
  }
  ngOnInit() {
  }

  registroBusca() {
    this.router.navigate(['/tabs/tab4']);
  }

  registroDuenio() {
    this.router.navigate(['/login']);
  }

}
