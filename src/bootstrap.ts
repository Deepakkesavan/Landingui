import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { AppConfigService } from './assets/global-configs/app-config.service';

async function startApp() {
  const configService = new AppConfigService();

  await configService.load();

  (window as any).MF_RunTime_Config = configService.configuration;

  await bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
      ...(appConfig.providers ?? []),
      { provide: AppConfigService, useValue: configService },
    ],
  });
}

startApp();
