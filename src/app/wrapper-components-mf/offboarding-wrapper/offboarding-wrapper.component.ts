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
import { LoaderService } from '../../serivces/loader.service';
import { getSubModuleUrlFromStorage } from '../../utils/runtime-util';

@Component({
  selector: 'landing-offboarding-wrapper',
  standalone: true,
  template: `<div #container class="offboarding-app-wrapper"></div>`,
  styles: [`
    .offboarding-app-wrapper {
      width: 100%;
      height: 100%;
      min-height: calc(100vh - 100px);
    }
  `],
})
export class OffboardingWrapperComponent implements OnInit, OnDestroy {
  private readonly loaderService = inject(LoaderService);
  remoteEntry: string = getSubModuleUrlFromStorage("workforce", "offboarding");
  exposedModule = './App';

  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;

  private root?: any;

  async ngOnInit() {
    try {
      this.loaderService.setLoading(true);
      // Load the remote Offboarding module
      const m = await loadRemoteModule({
        type: 'module',
        remoteEntry: this.remoteEntry,
        exposedModule: this.exposedModule,
      });

      // The React component is assumed to be the default export
      const ReactComponent = m.default;
      if (!ReactComponent) {
        console.error('No default export found in offboarding module');
        return;
      }

      // Render the React component
      this.root = createRoot(this.container.nativeElement);
      this.root.render(React.createElement(ReactComponent));
    } catch (err) {
      console.error('Failed to load offboarding module:', err);
    } finally {
      this.loaderService.setLoading(false);
    }
  }

  ngOnDestroy() {
    // Unmount the React component and clean up
    if (this.root) {
      this.root.unmount();
    }
  }
}