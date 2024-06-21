import { Component, OnInit } from '@angular/core';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import {Geocoder, geocoders} from 'leaflet-control-geocoder';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  documentos: any[] = [];
  obtenerestacionamiento=false;
  //map: L.Map | undefined;
  geocoder: any;
  map: any;
  constructor() { }

  ngOnInit() {
    this.obtenerDocumentosFirestore();
    this.initMap();
  }

  private initMap(): void {
    // Inicializar el mapa con Leaflet
    this.map = L.map('map').setView([ -34.599553, -58.503610], 13);

    // Añadir capa de mapa base de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

     // Configurar el control de geocodificación con Nominatim de OpenStreetMap
     this.geocoder = new Geocoder({
      geocoder: new geocoders.Nominatim(),
      position: 'topright',
    }).addTo(this.map);

    // Manejar el evento de resultado de geocodificación
    if (this.geocoder) {
      this.geocoder.on('markgeocode', (event: { geocode: { latlng: any; }; }) => {
        const { latlng } = event.geocode;
        this.addMarker(latlng);
      });
    }
  }

  private addMarker(coordinates: L.LatLng): void {
    // Añadir marcador en las coordenadas geocodificadas
    L.marker(coordinates).addTo(this.map)
      .bindPopup('Ubicación encontrada!')
      .openPopup();
  }

  //estacionamientos guardados

  


  obtenerdatos(){
    this.obtenerestacionamiento=true;

  }

   // Método para buscar la ubicación en el mapa
   async searchLocation(event: any) {
    const query = event.target.value;
    
    if (!query) return;

    try {
      const results = await this.geocoder?.geocoder.geocode(query);

      if (results.length > 0) {
        const { lat, lng } = results[0].center;
        const coordinates = L.latLng(lat, lng);

        this.map?.setView(coordinates, 13);
        this.addMarker(coordinates);
      }
    } catch (error) {
      console.error('Error al geocodificar:', error);
    }
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


