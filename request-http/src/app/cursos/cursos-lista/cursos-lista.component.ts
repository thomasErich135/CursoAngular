import { Component, OnInit } from '@angular/core';

import { CursosService } from '../cursos.service';
import { AlertModalService } from './../../shared/alert-modal/alert-modal.service';

import { Curso } from 'src/app/shared/interfaces/curso';

import { Observable, empty, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styles: [],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  //Notação filandesa, $ identificado que a variavel é um Observable
  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();  

  constructor(private cursosService: CursosService,
    private alertModalService: AlertModalService) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.error$.next(false);
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

}
