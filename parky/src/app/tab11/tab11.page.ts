import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab11',
  templateUrl: 'tab11.page.html',
  styleUrls: ['tab11.page.scss']
})
export class Tab11Page {
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  consulta: string = '';
  soyCliente: boolean = false;
  soyDueno: boolean = false;

  constructor(
    public router: Router,
    private toastController: ToastController
  ) { }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = new FormData();
      formData.append('nombre', this.nombre);
      formData.append('apellido', this.apellido);
      formData.append('email', this.email);
      formData.append('consulta', this.consulta);
      formData.append('soyCliente', this.soyCliente.toString());
      formData.append('soyDueno', this.soyDueno.toString());

      fetch('https://formspree.io/f/xdknngor', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          this.presentToast('Formulario enviado exitosamente');
        } else {
          this.presentToast('Error al enviar el formulario');
        }
      })
      .catch(error => {
        console.error('Error en el envío del formulario:', error);
        this.presentToast('Error al enviar el formulario');
      });
    } else {
      this.presentToast('Por favor completa todos los campos');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
}


