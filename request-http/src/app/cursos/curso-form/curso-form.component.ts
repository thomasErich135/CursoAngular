import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common'

import { BsModalRef } from 'ngx-bootstrap/modal';

import { AlertModalService } from './../../shared/alert-modal/alert-modal.service';
import { CursosService } from '../cursos.service';

import { Curso } from 'src/app/shared/interfaces/curso';

import { take, map, tap, catchError } from 'rxjs/operators';

import { EMPTY, throwError } from 'rxjs';

@Component({
  selector: 'app-curso-form',
  templateUrl: './curso-form.component.html',
  styles: [],
  preserveWhitespaces: true
})
export class CursoFormComponent implements OnInit {

  form: FormGroup;
  submitted: boolean = false;
  modalRef: BsModalRef;

  constructor(private formBuilder: FormBuilder,
    private cursosService: CursosService,
    private alertModalService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap(id => this.cursosService.getCursoById(id))
    //   )  
    //   .subscribe(curso => this.updateForm(curso));

    // concatMap => ordem da requisição importa
    // mergeMap => ordem não importa
    // exhaustMap => casos de login (vai faz a requisição e espera a resposta)

    const curso: Curso = this.route.snapshot.data['curso'];

    this.form = this.formBuilder.group({
      id: [curso.id],
      nomeCurso: [curso.curso, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    })
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {

      const cursoAux: any = {
        curso: this.form.value['nomeCurso'],
        id: this.form.value['id']
      }

      let msgSuccess = 'Curso salvo com sucesso.';
      let msgError = 'Erro ao salvar curso.';
      if (this.form.value['id']) {
        msgSuccess = 'Curso atualizado com sucesso.';
        msgError = 'Erro ao atualizar curso.';
      }

      this.cursosService.save(cursoAux)
        .pipe(
          map(result => {
            // if(result['code'] != 200){
            //   throw result;
            // }
          }),
          catchError(err => { throw err; })
        )
        .subscribe(
          success => {
            this.alertModalService.showAlertSuccess(msgSuccess);
            this.location.back();
          },
          error => {
            console.log(error);
            this.alertModalService.showAlertDanger(msgError)
          }
        );
    }
  }

  onCancel() {
    const result$ = this.alertModalService.showConfirm('Confirmação', 'Existem alterações não salvas, deseja cancelar?');
    result$.asObservable()
      .pipe(
        take(1),
        map(result => result ? true : EMPTY))
      .subscribe(
        success => {
          this.router.navigate(['/cursos']);
        },
        error => this.alertModalService.showAlertDanger('Erro ao deletar curso.')
      );
  }


}
