import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlunosComponent } from './alunos.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { AlunoDetalheComponent } from './aluno-detalhe/aluno-detalhe.component';

const alunosroutes: Routes = [
    { path: '', component: AlunosComponent, children: [
        { path: 'novo', component: AlunoFormComponent},
        { path: ':id', component: AlunoDetalheComponent },
        { path: ':id/editar', component: AlunoFormComponent}    
    ]}    
];

@NgModule({
  imports: [RouterModule.forChild(alunosroutes)],
  exports: [RouterModule]
})
export class AlunosRoutingModule { }
