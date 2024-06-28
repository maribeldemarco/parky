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
      estacionamiento: new FormControl(''),
      direccion: new FormControl(''),
      telefono: new FormControl(''),
      horario: new FormControl(''),
      tarifa: new FormControl(''),
      lugaresdisponibles: new FormControl(''),
    });
  }

  ngOnInit() {
    this.authService.getCurrentUser().then((user: any) => {
      if (user) {
        this.uid = user.uid;
        this.loadEstacionamientoProfile();
      } else {
        this.router.navigate(['/login']);
      }
    }).catch(error => {
      console.error('Error getting user:', error);
      this.router.navigate(['/login']);
    });
  }

  loadEstacionamientoProfile() {
    this.database.loadEstacionamientoProfile(this.formLogin, this.uid)
  }

  onSubmit() {
    this.database.onSubmitEstacionamiento(this.formLogin, this.uid)
  }

  logOut() {this.authService.logOut();
    this.authService.logOut();
    this.router.navigate(['/login']);
  }


}
