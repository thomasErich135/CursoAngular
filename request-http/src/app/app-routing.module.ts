import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'cursos', 
    loadChildren: () => import('./cursos/cursos.module').then(m => m.CursosModule)
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'cursos'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
