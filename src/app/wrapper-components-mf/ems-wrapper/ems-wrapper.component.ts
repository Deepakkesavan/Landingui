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
import { AppConfigService } from '../../../assets/global-configs/app-config.service';

@Component({
  selector: 'landing-ems-wrapper',
  standalone: true,
  template: `<div #emsContainer class="ems-app-wrapper"></div>`,
})
export class EmsWrapperComponent implements OnInit, OnDestroy {
  private readonly config = inject(AppConfigService);
  remoteEntry: string = this.config.remotes.ems;
  exposedModule = './App';
  @ViewChild('emsContainer', { static: true })
  container!: ElementRef<HTMLDivElement>;
  private root?: any;

  async ngOnInit() {
    try {
      // Load the remote EMS module and extract the exposed component
      const m = await loadRemoteModule({
        type: 'module',
        remoteEntry: this.remoteEntry,
        exposedModule: this.exposedModule,
      });

      // // Extract primary color from the host Angular app
      // const primaryColor = getComputedStyle(document.documentElement)
      //   .getPropertyValue('--primary')
      //   .trim();

      // Render the React component with the primary color as a prop
      const emsComponent = m.default;
      this.root = createRoot(this.container.nativeElement);
      // this.root.render(React.createElement(ReactComponent, { primaryColor }));

      this.root.render(React.createElement(emsComponent));
    } catch (err) {}
  }

  ngOnDestroy() {
    // Unmount the React component when this component is destroyed
    if (this.root) {
      this.root.unmount();
    }
  }
}
