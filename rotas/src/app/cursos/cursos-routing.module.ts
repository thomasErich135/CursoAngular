import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';
import { CursoNotFoundComponent } from './curso-not-found/curso-not-found.component';

const cursosroutes: Routes = [
  { path: 'cursos', component: CursosComponent },
  { path: 'curso/:id', component: CursoDetalheComponent },
  { path: 'notFound', component: CursoNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(cursosroutes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
