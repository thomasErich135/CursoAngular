import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AlunosService } from './../alunos.service';

import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-detalhe',
  templateUrl: './aluno-detalhe.component.html',
  styleUrls: ['./aluno-detalhe.component.css']
})
export class AlunoDetalheComponent implements OnInit, OnDestroy {

  inscricao: Subscription;
  aluno: Aluno;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunosService) { }

  ngOnInit() {
    // this.inscricao = this.route.params.subscribe((params: any) => {
    //   this.aluno = this.alunoService.getAluno(params['id']);

    //   if(this.aluno == null)
    //     this.router.navigate(['/not-found'])
    // })

    console.log('ngOnInit - AlunoDetalheComponent');

    this.inscricao = this.route.data.subscribe((info) => {
      console.log('Recebendo o obj Aluno do resolver');
      this.aluno = info.aluno;
    });
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  editarAluno() {
    this.router.navigate(['/alunos', this.aluno.id, 'editar'])
  }
}
