import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { effects, metaReducers, reducers } from './app.state';
import { EffectsModule } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideRouter(routes),
    importProvidersFrom(
      StoreModule.forRoot(reducers, { metaReducers }),
      EffectsModule.forRoot(effects),
      StoreDevtoolsModule.instrument({
        maxAge: 25,
        logOnly: false,
      }),
    ),
  ]
};
