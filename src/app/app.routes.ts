import { Routes } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../environments/environment';
import { TmsWrapperComponent } from './wrapper-components-mf/tms-wrapper/tms-wrapper.component';
import { EmsWrapperComponent } from './wrapper-components-mf/ems-wrapper/ems-wrapper.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { OrgWrapperComponent } from './wrapper-components-mf/org-wrapper.component';
import { OffboardingWrapperComponent } from './wrapper-components-mf/offboarding-wrapper/offboarding-wrapper.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: environment.remotes.sso,
        exposedModule: './Routes',
      }).then((m) => m.routes),
  },

  {
    path: 'overview',
    component: OverviewComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full',
      },
      {
        path: 'lms',
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: environment.remotes.lms,
            exposedModule: './Routes',
          }).then((m) => {
            return m.routes;
          }),
      },
      {
        path: 'rrf',
        loadChildren: () => {
          return loadRemoteModule({
            type: 'module',
            remoteEntry: environment.remotes.rrf,
            exposedModule: './Routes',
          })
            .then((m) => {
              return m.rrfRoutes;
            })
            .catch((err) => {});
        },
      },

      {
        path: 'pm',
        loadChildren: () => {
          return loadRemoteModule({
            type: 'module',
            remoteEntry: environment.remotes.pm,
            exposedModule: './RouteModule',
          })
            .then((m) => m.AppRoutingModule)
            .catch((err) => {
              throw err;
            });
        },
      },

      { path: 'tms', component: TmsWrapperComponent },
      { path: 'ems', component: EmsWrapperComponent },
      {
        path: 'orgchart',
        component: OrgWrapperComponent,
      },
      {
        path: 'offboarding',
        component: OffboardingWrapperComponent, // NEW ROUTE
      },
      { path: '**', redirectTo: 'ems' },
    ],
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
