import { Routes } from '@angular/router';
import { Org1Component } from './components/org1/org1.component';
import { DynamicPageComponent } from './components/dynamic-page/dynamic-page.component';

export const routes: Routes = [
  { path: '', component: Org1Component },
  {
    path: 'admin',
    loadChildren: () =>
      import('./components/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'page',
    loadChildren: () =>
      import('./components/dynamic-page/dynamic-page.module').then((m) => m.DynamicPageModule),
  },
//   {
//     path: 'page/:parent/:child/:sub',
//     component: DynamicPageComponent,
//   },
  { path: '**', redirectTo: '/' },
];
