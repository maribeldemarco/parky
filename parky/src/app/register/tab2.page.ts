import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  showPassword = false;

  password: string = '';
  email: string = '';
  tipoerror: any = '';
  constructor(
    public auth: AuthenticationService,
    public router: Router,
    private toastController: ToastController
  ) {}
  async register() {
    this.auth
      .signUp(this.email, this.password)
      .then((userCredential) => {
        this.presentToast();

        setTimeout(() => {
          this.router.navigate(['registroPropietario']);
        }, 3000);
      })

      .catch((error: any) => {
        console.log(error.code);
        this.tipoerror = error.code;
        this.ErrorToast(this.tipoerror);
      });
  }

  backToLogin() {
    this.router.navigate(['login']);
  }

  async presentToast() {
    const toast = await this.toastController.create({
      header: 'Registro exitoso',
      message: 'Bienvenido.',
      duration: 4500,
      position: 'top', // Posición del toast
      buttons: [
        {
          icon: 'close',
          role: 'cancel', // Botón de cerrar el toast
        },
      ],
    });
    toast.present(); // Muestra el toast
  }

  async ErrorToast(tipoerror: any) {
    let message = 'Registro fallido';

    if (tipoerror === 'auth/invalid-email') {
      message = 'Correo electrónico inválido.';
    } else if (tipoerror === 'auth/email-already-in-use') {
      message = 'El correo electrónico ya está registrado.';
    } else if (tipoerror === 'auth/weak-password') {
      message = 'La contraseña debe tener mínimo 6 caracteres.';
    } else {
      message = 'Error en el resgistro, verifique los datos: ';
    }

    const toast = await this.toastController.create({
      header: 'Registro fallido',
      message: message,
      duration: 4500,
      position: 'top', // Posición del toast
      buttons: [
        {
          icon: 'close',
          role: 'cancel', // Botón de cerrar el toast
        },
      ],
    });
    toast.present(); // Muestra el toast
  }
}
