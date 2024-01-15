import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getStorage, provideStorage } from '@angular/fire/storage';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'gesto-d6223',
          appId: '1:772924726267:web:fe4485d308822b59bec95e',
          databaseURL:
            'https://gesto-d6223-default-rtdb.asia-southeast1.firebasedatabase.app',
          storageBucket: 'gesto-d6223.appspot.com',
          // locationId: 'us-central',
          apiKey: 'AIzaSyAddK_k3o5pebPzBrTOdJl3XcT9qpnAUZc',
          authDomain: 'gesto-d6223.firebaseapp.com',
          messagingSenderId: '772924726267',
          measurementId: 'G-SNWQNS7GMV',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideDatabase(() => getDatabase())),
    importProvidersFrom(provideStorage(() => getStorage())),
  ],
});
