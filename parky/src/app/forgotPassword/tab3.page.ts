import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastController } from '@ionic/angular';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  email: string = '';

  constructor(
    public auth: AuthenticationService,
    public router: Router,
    private toastController: ToastController
  ) { }

  async recoverPassword() {
    try {
      const auth = getAuth(); //
      await sendPasswordResetEmail(auth, this.email);
      await this.presentToast('Contraseña recuperada', 'Link de recuperación enviado a su correo electrónico');
      setTimeout(() => {
        this.router.navigate(['/tabs/tab1']); // 
      }, 2000);
    } catch (error: any) {
      if ( error.code === 'auth/user-not-found') {
        console.log('Correo electrónico no registrado:', error);
        await this.presentToast('Error', 'Correo electrónico no registrado');
      } else {
        // Otros errores generales
        console.log('Error al enviar el correo electrónico de restablecimiento:', error);
        await this.presentToast('Error', 'No se pudo enviar el correo electrónico de restablecimiento');
      }
    }
  }

  async presentToast(header: string, message: string) {
    const toast = await this.toastController.create({
      header: header,
      message: message,
      duration: 4500,
      position: 'top',
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
        }
      ]
    });
    toast.present();
  }

  backToLogin() {
    this.router.navigate(['/tabs/tab1']);
  }
}
