
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';

import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'cursos', 
    loadChildren: 'src/app/cursos/cursos.module#CursosModule', 
    canActivate: [AuthGuard]
  },
  { path: 'alunos', 
    loadChildren: 'src/app/alunos/alunos.module#AlunosModule',
    canActivate: [AuthGuard]
  },      
  { path: 'not-found', component: NotFoundComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
