import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { CursosService } from '../cursos.service';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit, OnDestroy {

  inscricao: Subscription;
  curso: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private cursosService: CursosService) {      
  }

  ngOnInit() {
    this.inscricao = this.route.params.subscribe((params: any) => {
      this.curso = this.cursosService.getCurso(params['id']);

      if(this.curso == null){
        this.router.navigate(['/not-found'])
      }
    });
  }

  ngOnDestroy(){
    this.inscricao.unsubscribe();
  }

}
