import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then(m => m.SearchModule)
  }
];
