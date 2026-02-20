import { bootstrapApplication } from '@angular/platform-browser';
import { createApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { AppConfigService } from './assets/global-configs/app-config.service';
import { firstValueFrom } from 'rxjs';

async function startApp() {
  const app = await createApplication(appConfig);

  const configService = app.injector.get(AppConfigService);

  await firstValueFrom(configService.load());

  app.bootstrap(AppComponent);
}

startApp();
