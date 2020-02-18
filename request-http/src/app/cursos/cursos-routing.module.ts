import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosListaComponent } from './cursos-lista/cursos-lista.component';
import { CursoFormComponent } from './curso-form/curso-form.component';

const routes: Routes = [
  { path: '', component: CursosListaComponent},
  { path: 'novo', component: CursoFormComponent},
  { path: 'editar/:id', component: CursoFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
