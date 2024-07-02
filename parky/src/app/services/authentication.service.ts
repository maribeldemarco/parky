import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  tabnuevo: boolean = false;

  private auth = getAuth();
  private provider = new GoogleAuthProvider();

  constructor() {
    this.provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  }

  async logIn(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async logInGoogle() {
    return signInWithPopup(this.auth, this.provider);
  }

  async logOut() {
    return signOut(this.auth);
  }

  async signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          resolve(user);
        } else {
          reject('No user logged in');
        }
      });
    });
  }
}


