import { AlunosService } from './../alunos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit, OnDestroy {

  inscricao: Subscription;
  aluno: any = '';

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
}
