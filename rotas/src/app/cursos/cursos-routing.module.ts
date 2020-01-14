import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CursosGuard } from './guards/cursos.guard';

import { CursosComponent } from './cursos.component';
import { CursoDetalheComponent } from './curso-detalhe/curso-detalhe.component';

const cursosroutes: Routes = [
  { path: '', component: CursosComponent, 
    canActivateChild: [CursosGuard],
    children:[
      { path: ':id', component: CursoDetalheComponent }
    ]}  
];

@NgModule({
  imports: [RouterModule.forChild(cursosroutes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
