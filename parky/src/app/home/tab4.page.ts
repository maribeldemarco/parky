import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import { Geocoder, geocoders } from 'leaflet-control-geocoder';

L.Icon.Default.imagePath = 'assets/images/leaflet/';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  documentos: any[] = [];
  obtenerestacionamiento = false;
  geocoder: any;
  map: any;
  buscardatos= false;
  filteredDocumentos: any[] = [];
  router: any;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
    this.initMap();
  }, 500);
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

  async obtenerDocumentosFirestore() {
    const db = getFirestore();
    try {
      const unsub = onSnapshot(collection(db, 'profile'), (querySnapshot) => {
        this.documentos = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data['direccion']) {
            this.documentos.push({
              id: doc.id,
              ...data
            });
          }
        });

        console.log('Documentos:', this.documentos);
        this.geocodeDirecciones();
      });

    } catch (error) {
      console.error('Error obteniendo documentos:', error);
    }
  }

  async obtenerdatos() {
    this.obtenerestacionamiento = true;
    await this.obtenerDocumentosFirestore();
    this.geocodeDirecciones();
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

  //LUPA

filterList(event: any) {
  const searchTerm = event.target.value.toLowerCase(); // Obtener el valor del input y convertir a minúsculas
  if (searchTerm.trim() === '') {
    this.buscardatos = false;
    this.filteredDocumentos = []; // Vaciar la lista de documentos filtrados si no hay término de búsqueda
  } else {
    this.buscardatos = true;
    this.filteredDocumentos = this.documentos.filter(documento => {
      // Filtrar documentos basados en estacionamiento o dirección que contengan searchTerm
      return documento.estacionamiento.toLowerCase().includes(searchTerm) ||
             documento.direccion.toLowerCase().includes(searchTerm);

             
    });    
  }
}


borrar(){
  this.obtenerestacionamiento=false;

}


}