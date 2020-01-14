import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlunosService } from './../alunos.service';

import { iFormCanDeactivate } from './../guards/iform-candeactivate';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, OnDestroy, iFormCanDeactivate {

  inscricao: Subscription;
  aluno: any = '';
  private formMudou: boolean = false;

  constructor(private route: ActivatedRoute,
    private alunoService: AlunosService,
    private routed: Router) { }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe((params: any) =>{
      this.aluno = this.alunoService.getAluno(params['id']);

      if(this.aluno == null)
        this.routed.navigate(['/not-found']);
    });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  editarAluno() {
    this.routed.navigate(['/alunos', this.aluno.id])
  }

  onInput() {
    this.formMudou = true;
  }

  podeMudarRota() {
    if(this.formMudou){
      if(confirm('Tem certeza que deseja sair dessa pagina?')) {
        return true;
      }        
      else {
        return false;
      }        
    }
    else {
      return true;
    }
  }

  podeDesativarRota() {
    return this.podeMudarRota();
  }
}
