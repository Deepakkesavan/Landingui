import { Routes } from '@angular/router';
import { OverviewComponent } from './components/overview/overview.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { TmsWrapperComponent } from './wrapper-components-mf/tms-wrapper/tms-wrapper.component';
import { EmsWrapperComponent } from './wrapper-components-mf/ems-wrapper/ems-wrapper.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { OrgWrapperComponent } from './wrapper-components-mf/org-wrapper.component';
import { getRemoteEntry } from '../assets/global-configs/configs/runtime-config';

export const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: getRemoteEntry('sso'),
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
            remoteEntry: getRemoteEntry('lms'),
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
            remoteEntry: getRemoteEntry('rrf'),
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
            remoteEntry: getRemoteEntry('pm'),
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
      { path: '**', redirectTo: 'ems' },
    ],
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
