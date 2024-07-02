import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab8',
  templateUrl: './tab8.page.html',
  styleUrls: ['./tab8.page.scss'],
})
export class Tab8Page implements OnInit {
  public formLogin: FormGroup;
  uid: string = '';

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private database: DatabaseService
  ) {
    this.formLogin = new FormGroup({
      nombre: new FormControl(''),
      apellido: new FormControl(''),
      correo: new FormControl(''),
      telefono: new FormControl(''),
    });
  }

  ngOnInit() {
    this.authService.getCurrentUser().then((user: any) => {
      if (user) {
        this.uid = user.uid;
        this.loadUserProfile();
      } else {
        this.router.navigate(['/login']);
      }
    }).catch(error => {
      console.error('Error getting user:', error);
      this.router.navigate(['/login']);
    });
  }

  loadUserProfile() {
    this.database.load(this.formLogin, this.uid, 'Propietarios')
  }

  onSubmit() {
    this.database.onSubmit(this.formLogin, this.uid, 'Propietarios');
  }

}
