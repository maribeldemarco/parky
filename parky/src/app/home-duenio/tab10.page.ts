import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-duenio',
  templateUrl: './tab10.page.html',
  styleUrls: ['./tab10.page.scss'],
})
export class Tab10Page implements OnInit {
  uid: string = '';
  datosAutos: FormGroup;
  datosEstacionamiento: FormGroup;
  datosMotos: FormGroup;
  datosBicis: FormGroup;
  constructor(
    private database: DatabaseService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.datosAutos = new FormGroup({
      cupo: new FormControl(''),
      disponible: new FormControl(''),
      tarifaXHora: new FormControl(''),
      tarifaXDia: new FormControl(''),
      tarifaXMes: new FormControl(''),
    });
    this.datosMotos = new FormGroup({
      cupo: new FormControl(''),
      disponible: new FormControl(''),
      tarifaXHora: new FormControl(''),
      tarifaXDia: new FormControl(''),
      tarifaXMes: new FormControl(''),
    });
    this.datosBicis = new FormGroup({
      cupo: new FormControl(''),
      disponible: new FormControl(''),
      tarifaXHora: new FormControl(''),
      tarifaXDia: new FormControl(''),
      tarifaXMes: new FormControl(''),
    });
    this.datosEstacionamiento = new FormGroup({
      nombre: new FormControl({ value: '', disabled: true }),
      direccion: new FormControl({ value: '', disabled: true }),
      horario: new FormControl(''),
      telefono: new FormControl(''),
    });
  }

  ngOnInit() {
    this.authService
      .getCurrentUser()
      .then((user: any) => {
        if (user) {
          this.uid = user.uid;
          this.load();
        } else {
          this.router.navigate(['/login']);
        }
      })
      .catch((error) => {
        console.error('Error getting user:', error);
        this.router.navigate(['/login']);
      });
  }

  onSubmit(datos: FormGroup, carpeta: string) {
    this.database.onSubmit(datos, this.uid, carpeta);
  }

  load() {
    this.database.load(this.datosAutos, this.uid, 'Autos');
    this.database.load(this.datosMotos, this.uid, 'Motos');
    this.database.load(this.datosBicis, this.uid, 'Bicis');
    this.database.load(this.datosEstacionamiento, this.uid, 'Estacionamientos');
  }
}
