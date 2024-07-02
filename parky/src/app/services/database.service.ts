import { Injectable } from '@angular/core';
import { addDoc, collection, doc, getDoc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { FormGroup } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { ToastController } from '@ionic/angular';

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private auth: AuthenticationService, private toastController: ToastController) { }

    async load(formLogin: FormGroup<any>, uid: string, carpeta: string) {
      try {
        const userDocRef = doc(db, `${carpeta}/${uid}`);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          formLogin.patchValue(userDoc.data() as any);
        } else {
          console.error('Document does not exist');
        }
      } catch (error) {
        console.error('Error ', error);
      }
    }
  
    async onSubmit(formLogin: FormGroup<any>, uid: string, carpeta: string) {
      if (formLogin.valid) {
        try {
          const userDocRef = doc(db, `${carpeta}/${uid}`);
          await setDoc(userDocRef, formLogin.value);
          
          this.presentToast();
          console.log('Perfil actualizado correctamente');
          this.load(formLogin, uid, carpeta);

        } catch (error) {
          console.error('Error :', error);
        }
      }
    }

    async presentToast() {
      const toast = await this.toastController.create({
        header: 'Datos guardados. ',
        message: 'Operación existosa',
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



}
