import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { initializeApp } from 'firebase/app'; // Importa initializeApp desde Firebase
import { getFirestore } from 'firebase/firestore/lite'; // Importa los módulos necesarios de Firestore Lite

import { AppModule } from './app/app.module';
import { environment } from './environments/environment'; // Importa la configuración de Firebase

if (environment.production) {
  enableProdMode();
}

// Inicializa Firebase con la configuración importada
const app = initializeApp(environment.firebaseConfig);
const db = getFirestore(app); // Inicializa Firestore con la app de Firebase

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
