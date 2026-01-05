import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptors,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { modelInterceptor } from '../interceptors/model-interceptor/model.interceptor';
import { globalErrorHandlerInterceptor } from '../interceptors/global-err-handling-interceptor/global-error-handler.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([modelInterceptor, globalErrorHandlerInterceptor]),
      withInterceptorsFromDi()
    ),
  ],
};
