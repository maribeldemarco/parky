import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {
  public formLogin: FormGroup;
  uid: string = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private database: DatabaseService
  ) {
    this.formLogin = new FormGroup({
      cupoTotal: new FormControl(''),
      disponibilidad: new FormControl(''),
      tarifaHora: new FormControl(''),
      tarifaDia: new FormControl(''),
      tarifaMes: new FormControl(''),
    });
  }

  ngOnInit() {
    this.authService.getCurrentUser().then((user: any) => {
      if (user) {
        this.uid = user.uid;
        this.loadProfile();
      } else {
        this.router.navigate(['/login']);
      }
    }).catch(error => {
      console.error('Error getting user:', error);
      this.router.navigate(['/login']);
    });
  }

  loadProfile() {
    this.database.loadProfile(this.formLogin, this.uid)
  }

  onSubmit() {
    this.database.actualizar(this.formLogin, this.uid)
  }

  logOut() {this.authService.logOut();
    this.router.navigate(['/login']);
  }

  atras() {
    this.router.navigate(['/tabs/tab8']);
  }


}
