import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { Firestore, doc, setDoc, getDoc, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-tab8',
  templateUrl: './tab8.page.html',
  styleUrls: ['./tab8.page.scss'],
})
export class Tab8Page implements OnInit {
  public formLogin: FormGroup;
  uid: string = '';

  constructor(
    private authService: AuthenticationService,
    private firestore: Firestore,
    private router: Router,
  ) {
    this.formLogin = new FormGroup({
      estacionamiento: new FormControl(''),
      direccion: new FormControl(''),
      telefono: new FormControl(''),
      horario: new FormControl(''),
      tarifa: new FormControl(''),
      lugaresdisponibles: new FormControl(''),
    });
  }

  ngOnInit() {
    this.authService.getCurrentUser().then((user: any) => {
      if (user) {
        this.uid = user.uid;
        this.loadProfile();
      } else {
        this.router.navigate(['/login']);
      }
    }).catch(error => {
      console.error('Error getting user:', error);
      this.router.navigate(['/login']);
    });
  }

  async loadProfile() {
    try {
      const userDocRef = doc(this.firestore, `profile/${this.uid}`);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        this.formLogin.patchValue(userDoc.data() as any);
      } else {
        console.error('Document does not exist');
      }
    } catch (error) {
      console.error('Error ', error);
    }
  }

  async onSubmit() {
    if (this.formLogin.valid) {
      try {
        const userDocRef = doc(this.firestore, `profile/${this.uid}`);
        await setDoc(userDocRef, this.formLogin.value);
        console.log('Perfil actualizado correctamente');
      } catch (error) {
        console.error('Error :', error);
      }
    }
  }

  async addUserToFirestore() {
    try {
      const docRef = await addDoc(collection(this.firestore, "Estacionamiento"), {
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
