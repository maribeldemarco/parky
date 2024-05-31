import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, createUserWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// Esto requiere de mejora de seguridad... no deberia de estar publico :S
const firebaseConfig = {
  apiKey: "AIzaSyAIeokwp0IGLSh2c5KXZwMEnmca3Q3-V0U",
  authDomain: "parky-d6de6.firebaseapp.com",
  projectId: "parky-d6de6",
  storageBucket: "parky-d6de6.appspot.com",
  messagingSenderId: "776592776393",
  appId: "1:776592776393:web:154b2178447f1614634118",
  measurementId: "G-FQ3M3GL61M"
};
const app = initializeApp(firebaseConfig);
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
