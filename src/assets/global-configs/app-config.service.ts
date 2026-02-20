import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModuleConfig } from '../../app/models/layout.model';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import localConfigData from './config.dev.json';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private config!: ModuleConfig;
  constructor(private http: HttpClient) {}
  domain = 'https://workforce-dev.clarium.tech';
  apiUrl = `${this.domain}/config/api/ClariumConfiguration/modules`;
  private localConfig: any = localConfigData;

  load(): Observable<ModuleConfig> {
    if (window.location.origin.includes('localhost')) {
      this.config = this.localConfig;
      sessionStorage.setItem('module-config', JSON.stringify(this.localConfig));
      (window as any).__APP_CONFIG__ = this.localConfig;
      if (this.localConfig.dummyJwtAccessToken) {
        sessionStorage.setItem(
          'jwtToken',
          this.localConfig.dummyJwtAccessToken
        );
        (window as any).__JWT_TOKEN__ = this.localConfig.dummyJwtAccessToken;
      }
      return of(this.localConfig);
    } else {
      return this.http.post<ModuleConfig>(this.apiUrl, {}).pipe(
        tap((res) => {
          this.config = res;
          sessionStorage.setItem('module-config', JSON.stringify(res));
          (window as any).__APP_CONFIG__ = res;
        })
      );
    }
  }
  getConfig(): any {
    return this.config;
  }
}
