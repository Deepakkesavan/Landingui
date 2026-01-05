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
  selector: 'landing-tms-wrapper',
  standalone: true,
  template: `<div #tmsContainer></div>`,
})
export class TmsWrapperComponent implements OnInit, OnDestroy {
  private readonly config = inject(AppConfigService);
  remoteEntry: string = this.config.remotes.tms;
  exposedModule = './App';
  @ViewChild('tmsContainer', { static: true })
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
      const tmsComponent = m.default;

      // Render the React component
      this.root = createRoot(this.container.nativeElement);
      this.root.render(React.createElement(tmsComponent));
    } catch (err) {}
  }

  ngOnDestroy() {
    // Unmount the React component and clean up
    if (this.root) {
      this.root.unmount();
    }
  }
}
