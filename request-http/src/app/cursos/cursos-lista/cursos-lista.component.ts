import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { CursosService } from '../cursos.service';
import { AlertModalService } from './../../shared/alert-modal/alert-modal.service';

import { Curso } from 'src/app/shared/interfaces/curso';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

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
  modalRef: BsModalRef;

  cursoSelecionado: Curso;

  @ViewChild('template') template;

  constructor(private cursosService: CursosService,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService) {}

  ngOnInit() {
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.cursosService.getCursos()
      .pipe(
        catchError(error => {
          //emite o valor de true para o Observable error$
          //this.error$.next(true);
          this.handleError('Erro ao carregar cursos.');
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

  handleError(messageError: string) {
   this.alertModalService.showAlertDanger(messageError);
  }

  onEdit(id: number) {
    this.router.navigate(['editar/', id], { relativeTo: this.route });
    // ou pode ser feito do jeito abaixo.
    // this.router.navigate(['cursos/editar/', id]);
  }
 
  onDelete(curso, template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    this.cursoSelecionado = curso;
  }

  onConfirmDelete() {
    this.cursosService.deleteCurso(this.cursoSelecionado.id)
      .subscribe(
        success =>  {
          this.onRefresh(),
          this.modalRef.hide();
        },
        error => this.handleError('Erro ao deletar curso.')
      );   
  }
}
