import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotFoundComponent } from './shared/not-found/not-found.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { 
    path: 'cursos', 
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)
  },
  { 
    path: 'upload', 
    loadChildren: () => import('./upload-file/upload-file.module').then(m => m.UploadFileModule)
  },
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled'
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
