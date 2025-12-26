import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { createRoot } from 'react-dom/client';
import React from 'react';

@Component({
  selector: 'landing-ems-wrapper',
  standalone: true,
  template: `<div #container class="ems-app-wrapper"></div>`,
  styleUrls: ['./ems-wrapper.component.scss'],
})
export class EmsWrapperComponent implements OnInit, OnDestroy {
  remoteEntry: string = environment.remotes.ems;
  exposedModule = './App';
  @ViewChild('container', { static: true })
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

      // Extract primary color from the host Angular app
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--primary')
        .trim();

      // Render the React component with the primary color as a prop
      const ReactComponent = m.default;
      this.root = createRoot(this.container.nativeElement);
      this.root.render(React.createElement(ReactComponent, { primaryColor }));
    } catch (err) {}
  }

  ngOnDestroy() {
    // Unmount the React component when this component is destroyed
    if (this.root) {
      this.root.unmount();
    }
  }
}
