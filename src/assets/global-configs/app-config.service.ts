import { Injectable } from '@angular/core';
import { isDevMode } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private config: any;

  //isDevmode is inbuilt method
  mode = isDevMode() ? 'dev' : 'prod';
  async load() {
    const res = await fetch(
      `/assets/global-configs/configs/config.${this.mode}.json`
    );
    this.config = await res.json();
  }

  get remotes() {
    return this.config.remotes;
  }
  get configuration() {
    return this.config;
  }
}
