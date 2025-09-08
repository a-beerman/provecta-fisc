import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { routes } from './app.routes';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot({
        fallbackLang: 'ro',
      })
    ),
  ],
};
