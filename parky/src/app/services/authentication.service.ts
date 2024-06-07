import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { environment } from 'src/environments/environment';

const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  async logIn(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password)
  }
  async logInGoogle() {
    return signInWithPopup(auth, provider);
  }
  async logOut(){
    signOut(auth).then(() => {
      console.log("Log out exitoso!")
    }).catch((error) => {
      console.log(error.code)
    });
  }
  async signUp(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password)
  }
  async resetPassword(email: string) {
    return sendPasswordResetEmail(auth, email)
  }
}
