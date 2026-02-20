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
import { LoaderService } from '../serivces/loader.service';
import { getSubModuleUrlFromStorage } from '../utils/runtime-util';

@Component({
  selector: 'landing-org-wrapper',
  standalone: true,
  template: `<div #orgContainer></div>`,
})
export class OrgWrapperComponent implements OnInit, OnDestroy {
  private readonly loaderService = inject(LoaderService);
  remoteEntry: string = getSubModuleUrlFromStorage("workforce", "org");
  exposedModule = './App';
  @ViewChild('orgContainer', { static: true })
  container!: ElementRef<HTMLDivElement>;

  private root?: any;

  async ngOnInit() {
    try {
      this.loaderService.setLoading(true);
      // Load the remote module and its exposed component
      const m = await loadRemoteModule({
        type: 'module',
        remoteEntry: this.remoteEntry,
        exposedModule: this.exposedModule,
      });

      // The React component is assumed to be the default export
      const orgComponent = m.default;

      // Render the React component
      this.root = createRoot(this.container.nativeElement);
      this.root.render(React.createElement(orgComponent));
    } catch (err) {
      console.error('Error loading Org remote:', err);
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
