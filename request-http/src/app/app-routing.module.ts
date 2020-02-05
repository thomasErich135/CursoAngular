import { NgModule } from '@angular/core';
import { Routes, RouterModule, UrlSerializer } from '@angular/router';

import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  { 
    path: 'cursos', 
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cursos'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    malformedUriErrorHandler: (error: URIError, urlSerializer: UrlSerializer, url: string) => {      
      return urlSerializer.parse('/not-found')
    }
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
