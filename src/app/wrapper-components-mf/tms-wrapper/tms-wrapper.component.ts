import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
  inject,
} from '@angular/core';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../serivces/loader.service';
import { getSubModuleUrlFromStorage } from '../../utils/runtime-util';

@Component({
  selector: 'landing-tms-wrapper',
  standalone: true,
  template: `<div #tmsContainer></div>`,
})
export class TmsWrapperComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly loaderService = inject(LoaderService);

  remoteEntry: string = getSubModuleUrlFromStorage("workforce", "tms");
  exposedModule = './App';

  @ViewChild('tmsContainer', { static: true })
  container!: ElementRef<HTMLDivElement>;

  private root?: any;
  private routeSub?: Subscription;
  private tmsComponent: any;

  async ngOnInit() {
    try {
      this.loaderService.setLoading(true);
      const m = await loadRemoteModule({
        type: 'module',
        remoteEntry: this.remoteEntry,
        exposedModule: this.exposedModule,
      });

      this.tmsComponent = m.default;
      this.root = createRoot(this.container.nativeElement);
      this.renderApp();

      // Listen for route changes to re-sync React app
      this.routeSub = this.router.events
        .pipe(filter((event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.renderApp();
        });
    } catch (err) {
      console.error('Error loading TMS remote:', err);
    } finally {
      this.loaderService.setLoading(false);
    }
  }

  private renderApp() {
    if (this.tmsComponent && this.container) {
      if (this.root) {
        try {
          this.root.unmount();
        } catch (e) {
          console.warn('TMS unmount failed', e);
        }
      }

      // Explicitly clear the container to avoid any React/DOM residue
      this.container.nativeElement.innerHTML = '';

      this.root = createRoot(this.container.nativeElement);
      this.root.render(
        React.createElement(this.tmsComponent, {
          key: this.router.url,
          path: this.router.url,
        })
      );

      // Force a popstate event so the internal React Router wakes up
      window.dispatchEvent(new Event('popstate'));
    }
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
    if (this.root) {
      this.root.unmount();
    }
  }
}
