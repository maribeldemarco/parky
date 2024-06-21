import { Injectable } from '@angular/core';
import { addDoc, collection, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { FormGroup } from '@angular/forms';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private auth: AuthenticationService) { }

    async loadProfile(formLogin: FormGroup<any>, uid: string) {
      try {
        const userDocRef = doc(db, `profile/${uid}`);
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
  
    async onSubmit(formLogin: FormGroup<any>, uid: string) {
      if (formLogin.valid) {
        try {
          const userDocRef = doc(db, `profile/${uid}`);
          await setDoc(userDocRef, formLogin.value);
          console.log('Perfil actualizado correctamente');
        } catch (error) {
          console.error('Error :', error);
        }
      }
    }
  async addUserToFirestore() {
    try {
      const docRef = await addDoc(collection(db, "Estacionamiento"), {
        estacionamiento: "San juan",
        direccion:"avenida san juan 3410",
        telefono: 1180022393,
        horario: "24 hs",
        tarifa: "$5000 por hora",
        lugaresdisponibles: 5,
      });
    } catch (error) {
      console.error("Error  ", error);
    }
  }
}
