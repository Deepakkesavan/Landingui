import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { authGuard } from './guards/auth.guard';
import { LayoutComponent } from './pages/layout/layout.component';
import { getModuleUrlFromStorage, getSubModuleUrlFromStorage } from './utils/runtime-util';
import { EmsWrapperComponent } from './wrapper-components-mf/ems-wrapper/ems-wrapper.component';
import { TmsWrapperComponent } from './wrapper-components-mf/tms-wrapper/tms-wrapper.component';
import { OrgWrapperComponent } from './wrapper-components-mf/org-wrapper.component';
import { OffboardingWrapperComponent } from './wrapper-components-mf/offboarding-wrapper/offboarding-wrapper.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: getModuleUrlFromStorage("sso"),
        exposedModule: './Routes'
      })
        .then((m) => {
          return m.routes
        })
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'workforce',
        data: {
          moduleKey: "workforce"
        },
        children: [
          {
            path: '',
            redirectTo: 'ems',
            pathMatch: 'full'
          },
          {
            path: 'lms',
            data: {
              moduleKey: "workforce",
              subModuleKey: "lms"
            },
            loadChildren: () =>
              loadRemoteModule({
                type: 'module',
                remoteEntry: getSubModuleUrlFromStorage('workforce', 'lms'),
                exposedModule: './Routes',
              })
                .then((m) => {
                  return m.lmsRoutes;
                })
                .catch((err) => {
                  console.error('Error loading LMS:', err);
                  throw err;
                }),
          },
          {
            path: 'rrf',
            data: {
              moduleKey: "workforce",
              subModuleKey: "rrf"
            },
            loadChildren: () => {
              return loadRemoteModule({
                type: 'module',
                remoteEntry: getSubModuleUrlFromStorage('workforce', 'rrf'),
                exposedModule: './Routes',
              })
                .then((m) => {
                  return m.rrfRoutes;
                });
            },
          },

          {
            path: 'pm',
            data: {
              moduleKey: "workforce",
              subModuleKey: "pm"
            },
            loadChildren: () => {
              return loadRemoteModule({
                type: 'module',
                remoteEntry: getSubModuleUrlFromStorage('workforce', 'pm'),
                exposedModule: './RouteModule',
              })
                .then((m) => m.AppRoutingModule)
                .catch((err) => {
                  throw err;
                });
            },
          },
          {
            path: 'ems',
            data: {
              moduleKey: "workforce",
              subModuleKey: "ems"
            },
            children: [
              { path: '', component: EmsWrapperComponent },
              { path: '**', component: EmsWrapperComponent },
            ],
          },
          {
            path: 'tms',
            data: {
              moduleKey: "workforce",
              subModuleKey: "tms"
            },
            children: [
              { path: '', component: TmsWrapperComponent },
              { path: '**', component: TmsWrapperComponent },
            ],
          },
          {
            path: 'orgchart',
            data: {
              moduleKey: "workforce",
              subModuleKey: "orgchart"
            },
            children: [
              { path: '', component: OrgWrapperComponent },
              { path: '**', component: OrgWrapperComponent },
            ],
          },
          {
            path: 'offboarding',
            data: {
              moduleKey: "workforce",
              subModuleKey: "offboarding"
            },
            children: [
              { path: '', component: OffboardingWrapperComponent },
              { path: '**', component: OffboardingWrapperComponent },
            ],
          },
        ]
      },
      { path: '**', redirectTo: 'home' },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
