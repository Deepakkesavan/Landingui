import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LocationStrategy } from '@angular/common';
import { ShellLocationStrategyService } from './serivces/shell-location-strategy.service';
import { modelInterceptor } from '../interceptors/model-interceptor/model.interceptor';
import { globalErrorHandlerInterceptor } from '../interceptors/global-err-handling-interceptor/global-error-handler.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { THEME_CONFIG } from '@clarium/ngce-components';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([modelInterceptor, globalErrorHandlerInterceptor])
    ),
    provideAnimations(),
    { provide: LocationStrategy, useClass: ShellLocationStrategyService },
    {
      provide: THEME_CONFIG,
      useValue: {
        theme: 'rrf-root',
      },
    },
  ],
};
