import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  documentos: any[] = [];
  obtenerestacionamiento = false;
  buscardatos = false;
  filteredDocumentos: any[] = [];

  constructor(public router: Router) {}

  ngOnInit() {
    this.obtenerDocumentosFirestore();
  }

  obtenerdatos() {
    this.obtenerestacionamiento = true;
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
            ...doc.data(),
          });
        });

        console.log('Documentos:', this.documentos);
      });
    } catch (error) {
      console.error('Error obteniendo documentos:', error);
    }
  }

  filterList(event: any) {
    const searchTerm = event.target.value;
    if (searchTerm.trim() === '') {
      this.buscardatos = false;
      this.filteredDocumentos = []; // Deja la pantalla vacía
    } else {
      this.buscardatos = true;
      const searchTerm = event.target.value.toLowerCase();
      this.filteredDocumentos = this.documentos.filter((documento) => {
        return (
          documento.estacionamiento.toLowerCase().includes(searchTerm) ||
          documento.direccion.toLowerCase().includes(searchTerm)
        );
      });
    }
  }

  borrar() {
    this.obtenerestacionamiento = false;
  }

  Profile() {
    this.router.navigate(['/profile']);
  }

  VolverAtras() {
    this.router.navigate(['/user']);
  }
}
