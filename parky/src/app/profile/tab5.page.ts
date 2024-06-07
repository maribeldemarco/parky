import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';

const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app);

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page {
  currentUserData: any;
  constructor(private auth: AuthenticationService) {  }
  async getData() {
    await this.getCurrentUser();
    const docSnap = await getDoc(doc(db, 'Usuario', this.currentUserData["uid"]));
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data()["Nombre"]);
    } else {
      console.log("No such document!");
    }
  }
  async generateUser() {
    await this.getCurrentUser();
    if (this.currentUserData) {
      setDoc(doc(db, 'Usuario', this.currentUserData['uid']), {
        Nombre: 'Pedro',
        Apellido: 'Fernandez',
        mail: this.currentUserData['email'],
        birthdate: '14/10/1995',
        Contraseña: 'probando',
      });
    }
  }
  async getCurrentUser() {
    this.auth.currentUser().then((userData) => {
      this.currentUserData = userData;
    });
  }
}
