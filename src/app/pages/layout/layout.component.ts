import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HostloaderComponent } from '../../components/hostloader/hostloader.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { LoaderService } from '../../serivces/loader.service';
import { NoContentComponent } from '../no-content/no-content.component';
import { LayoutStateService } from '../../serivces/layout-state.service';
import { filter } from 'rxjs';

@Component({
  selector: 'landing-layout',
  imports: [
    SidebarComponent,
    HostloaderComponent,
    RouterOutlet,
    CommonModule,
    HeaderComponent,
    FooterComponent,
  ],
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  username = '';
  greeting = '';
  private loaderService = inject(LoaderService);
  public layoutState = inject(LayoutStateService);
  private router = inject(Router);

  isLoading$ = this.loaderService.loading$;

  ngOnInit() {
    this.setupRouterMonitoring();

    const hour = new Date().getHours();
    // ... rest of greeting logic

    if (hour >= 5 && hour < 12) {
      this.greeting = 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
      this.greeting = 'Good Afternoon';
    } else {
      this.greeting = 'Good Evening';
    }

    const stored = sessionStorage.getItem('module-config');
    if (stored) {
      this.layoutState.initialize(JSON.parse(stored));
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;
        if (url === '/home') {
          this.layoutState.clear();
          return;
        }

        let route = this.router.routerState.root;

        while (route.firstChild) {
          route = route.firstChild;
        }

        const moduleKey = route.snapshot.data['moduleKey'];
        const subModuleKey = route.snapshot.data['subModuleKey'];

        if (moduleKey) {
          this.layoutState.selectModule(moduleKey);
        }

        if (subModuleKey) {
          this.layoutState.selectSubModule(subModuleKey);
        }
      });
  }

  private setupRouterMonitoring() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.setLoading(true);
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel
      ) {
        this.loaderService.setLoading(false);
      } else if (event instanceof NavigationError) {
        this.loaderService.setLoading(false);
        console.error('Remote loading error:', event.error);
      }
    });
  }
}
