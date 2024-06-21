import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  documentos: any[] = [];
  obtenerestacionamiento=false;
  constructor() { }

  ngOnInit() {
    this.obtenerDocumentosFirestore();
  }

  obtenerdatos(){
    this.obtenerestacionamiento=true;

  }
  async obtenerDocumentosFirestore() {
    const db = getFirestore(); // Obtén la instancia de Firestore
    try {
      const unsub = onSnapshot(collection(db, 'profile'), (querySnapshot) => {
        this.documentos = []; // Vaciamos el array para evitar duplicados

        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          this.documentos.push({
            id: doc.id,
            ...doc.data()
          });
        });

        console.log('Documentos:', this.documentos);
      });

    } catch (error) {
      console.error('Error obteniendo documentos:', error);
    }


  }

}


