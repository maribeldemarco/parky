import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Geolocation } from '@capacitor/geolocation';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {
  busqueda: string = 'Buenos Aires'
  mapUrl = this.sanitice('https://www.openstreetmap.org/export/embed.html?bbox=-58.55%2C-34.77%2C-58.35%2C-34.57&amp;layer=mapnik')

  constructor(private sanitizer: DomSanitizer) { }
  sanitice(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
  async buscar() {
    Geolocation.checkPermissions().catch(
      () => Geolocation.requestPermissions()
    )
    const coordinates = await Geolocation.getCurrentPosition();
    let error = coordinates.coords.accuracy / 1000000
    let lat = coordinates.coords.latitude;
    let long = coordinates.coords.longitude;
    this.mapUrl = this.sanitice(`https://www.openstreetmap.org/export/embed.html?bbox=${long - error}%2C${lat - error}%2C${long + error * 10}%2C${lat + error}&amp;layer=mapnik`)
  }
}
