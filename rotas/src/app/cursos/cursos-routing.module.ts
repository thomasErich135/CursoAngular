import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';

const cursosroutes: Routes = [
  { path: '', component: CursosComponent },
  { path: ':id', component: CursoDetalheComponent }
];

@NgModule({
  imports: [RouterModule.forChild(cursosroutes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
