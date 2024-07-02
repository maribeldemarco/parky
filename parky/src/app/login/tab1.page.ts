import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  showPassword = false;

  password: string = '';
  email: string = '';
  tipoerrorlogin:any='';
  constructor(
    public auth: AuthenticationService,
    public router: Router,
    private toastController: ToastController
  ) { }

  async loginUser() {
    this.auth.logIn(this.email, this.password).then((userCredential) => {
      this.router.navigate(['/tabs/tab10'])
    
    }).catch((error: any) => {
      console.log(error.code);
      this.tipoerrorlogin = error.code;
    this.ErrorToastlogin(this.tipoerrorlogin);
    });



  }
  async loginGoogle() {
    this.auth.logInGoogle().then((userCredential) => {
      this.router.navigate(['/tabs/tab10'])
    }).catch((error) => {
      console.log(error.code);
      alert('Google Error.');
    });
  }
  register() {
    this.router.navigate(['crearcuenta'])
  }
  goToRecover() {
    this.router.navigate(['recuperarclave'])
  }


  async ErrorToastlogin(tipoerror:any) {
    let message = 'Contraseña o correo electrónico inválidos';

    

    const toast = await this.toastController.create({
      header: 'Registro fallido',
      message: message,
      duration: 4500,
      position: 'top', // Posición del toast
      buttons: [
        {
          icon: 'close',
          role: 'cancel', // Botón de cerrar el toast
        }
      ]
    });
    toast.present(); // Muestra el toast
  }

  VolverAtras() {
    this.router.navigate(['/user']);
  }


}
