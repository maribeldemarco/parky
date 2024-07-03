import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import { Geocoder, geocoders } from 'leaflet-control-geocoder';


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

  geocoder: any;
  map: any;

  constructor(public router: Router) {}

  ngOnInit() {
    this.obtenerDocumentosFirestore();

    setTimeout(() => {
      this.initMap();
    }, 500);
  }

  obtenerdatos() {
    this.obtenerestacionamiento = true;
    this.geocodeDirecciones();
  }
  async obtenerDocumentosFirestore() {
    const db = getFirestore(); // Obtén la instancia de Firestore
    try {
      const unsub = onSnapshot(collection(db, 'Estacionamientos'), (querySnapshot) => {
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
      console.log(searchTerm)
      
      this.filteredDocumentos = this.documentos.filter((documento) => {
        console.log(documento)
        return (
          documento.nombre.toLowerCase().includes(searchTerm) ||
          documento.direccion.toLowerCase().includes(searchTerm)
        );
      });
      console.log(this.filteredDocumentos)
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


  private initMap(): void {
    this.map = L.map('map').setView([-34.599553, -58.503610], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

   /* this.geocoder = new Geocoder({
      geocoder: new geocoders.Nominatim(),
      position: 'topright',
    }).addTo(this.map);*/

    if (this.geocoder) {
      this.geocoder.on('markgeocode', (event: { geocode: { center: any; }; }) => {
        const { center } = event.geocode;
        this.addMarker(center);
      });
    }
  }

  private addMarker(coordinates: L.LatLng): void {
    const marker = L.marker(coordinates).addTo(this.map);
    marker.bindPopup('Estacionamiento Disponible').openPopup();
  }

  async searchLocation(event: any) {
    const query = event.target.value;
    
    if (!query) return;

    try {
      const results = await this.geocoder.geocoder.geocode(query);

      if (results.length > 0) {
        const { lat, lng } = results[0].center;
        const coordinates = L.latLng(lat, lng);

        if (this.esCABA(coordinates)) {
          this.map.setView(coordinates, 13);
          this.addMarker(coordinates);
        } else {
          console.log('La dirección está fuera de CABA');
        }
      }
    } catch (error) {
      console.error('Error al geocodificar:', error);
    }
  }

  private geocodeDirecciones(): void {
    this.documentos.forEach((documento) => {
      const direccion = documento.direccion;
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccion)}`;

      fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data.length > 0) {
            const latlng = new L.LatLng(data[0].lat, data[0].lon);
            if (this.esCABA(latlng)) {
              this.addMarker(latlng);
            } else {
              console.log('La dirección está fuera de CABA:', direccion);
            }
          }
        })
        .catch(error => {
          console.error('Error al geocodificar la dirección:', error);
        });
    });
  }

//ASEGURARSE DE QUE LAS DRECCIONES SEAN DE CABA

  private esCABA(latlng: L.LatLng): boolean {
    const minLat = -34.705;
    const maxLat = -34.52;
    const minLng = -58.531;
    const maxLng = -58.335;

    const { lat, lng } = latlng;

    return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
  }
}


