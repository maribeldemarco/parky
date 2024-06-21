import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(private auth: AuthenticationService) {}
  currentUserData: any;
  async getData() {
    await this.getCurrentUser();
    const docSnap = await getDoc(
      doc(db, 'Usuarios', this.currentUserData['uid'])
    );
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log('No such document!');
      return undefined;
    }
  }
  async generateUser(nombre: string, apellido: string, celular: string) {
    await this.getCurrentUser();
    if (this.currentUserData) {
      setDoc(doc(db, 'Usuarios', this.currentUserData['uid']), {
        Nombre: nombre,
        Apellido: apellido,
        Email: this.currentUserData['email'],
        Celular: celular
      });
    }
  }
  async getCurrentUser() {
    await this.auth.currentUser().then((userData) => {
      this.currentUserData = userData;
    });
  }
}
