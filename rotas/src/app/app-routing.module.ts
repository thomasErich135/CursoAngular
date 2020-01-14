
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [  
  { path: 'cursos', 
    loadChildren: 'src/app/cursos/cursos.module#CursosModule', 
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },
  { path: 'alunos', 
    loadChildren: 'src/app/alunos/alunos.module#AlunosModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard]
  },     
  // { path: '', 
  //   redirectTo: '/home', 
  //   pathMatch: 'full'
  // },
  { path: '**', 
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
