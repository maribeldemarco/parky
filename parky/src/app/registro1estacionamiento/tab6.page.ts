import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {
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
      } else {
        this.router.navigate(['/login']);
      }
    }).catch(error => {
      console.error('Error getting user:', error);
      this.router.navigate(['/login']);
    });
  }

  onSubmit() {
    this.database.onSubmit(this.formLogin, this.uid, 'Propietarios');
    this.router.navigate(['registroEstacionamientoAutos']);
  }
}
