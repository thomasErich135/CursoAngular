import { Component, OnInit } from '@angular/core';

import { CursosService } from '../cursos.service';
import { AlertModalService } from './../../shared/alert-modal/alert-modal.service';

import { Curso } from 'src/app/shared/interfaces/curso';

import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styles: [],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //Notação filandesa, $ identifica que a variavel é um Observable
  cursos$: Observable<Curso[]>;

  constructor(private cursosService: CursosService,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.cursosService.getCursos()
      .pipe(
        catchError(error => {
          console.error(error);
          //emite o valor de true para o Observable error$
          //this.error$.next(true);
          this.handleError();
          return empty();
        })
      );
    
      // outra maneira de gerenciar erros
      // this.cursosService.getCursos()
      // .subscribe(
      //   dados => console.log(dados),
      //   error => console.error(error),
      //   () => console.log('Observable Completo!');
      // );
  }

  handleError() {
   this.alertModalService.showAlertDanger('Erro ao carregar cursos.');
  }

  onEdit(id: number) {
    this.router.navigate(['editar/', id], { relativeTo: this.route });
    // ou pode ser feito do jeito abaixo.
    // this.router.navigate(['cursos/editar/', id]);
  }

  onDelete(id: number) {

  }
}
