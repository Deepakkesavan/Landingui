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
  selector: 'landing-tms-wrapper',
  standalone: true,
  template: `<div #container></div>`,
  styleUrls: ['./tms-wrapper.component.scss'],
})
export class TmsWrapperComponent implements OnInit, OnDestroy {
  remoteEntry: string = environment.remotes.tms;
  exposedModule = './App';
  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;
  private root?: any;

  async ngOnInit() {
    try {
      // Load the remote module and its exposed component
      const m = await loadRemoteModule({
        type: 'module',
        remoteEntry: this.remoteEntry,
        exposedModule: this.exposedModule,
      });

      // The React component is assumed to be the default export
      const ReactComponent = m.default;
      if (!ReactComponent) {
        return;
      }

      // Render the React component
      this.root = createRoot(this.container.nativeElement);
      this.root.render(React.createElement(ReactComponent));
    } catch (err) {}
  }

  ngOnDestroy() {
    // Unmount the React component and clean up
    if (this.root) {
      this.root.unmount();
    }
  }
}
