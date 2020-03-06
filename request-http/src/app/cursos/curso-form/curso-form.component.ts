import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common'

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { AlertModalService } from './../../shared/alert-modal/alert-modal.service';
import { CursosService } from '../cursos.service';
import { map, switchMap } from 'rxjs/operators';

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
    private modalService: BsModalService,
    private cursosService: CursosService,
    private alertModalService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute) { }

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

    const curso = this.route.snapshot.data['curso'];

    this.form = this.formBuilder.group({
      id: [curso.id],
      nomeCurso: [curso.curso, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    })
  }

  // updateForm(curso) {
  //   console.log(curso);
  //   this.form.patchValue({
  //     nomeCurso:  curso.curso,
  //     id: curso.id
  //   })
  // }

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
      if(this.form.value['id']){
        msgSuccess = 'Curso atualizado com sucesso.';
        msgError = 'Erro ao atualizar curso.';
      }

      this.cursosService.save(cursoAux)
        .subscribe(
          success => {
            this.alertModalService.showAlertSuccess(msgSuccess);
            this.location.back();
          },
          error => {
            this.alertModalService.showAlertDanger(msgError)
          }
        )
    }
  }

  onCancel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  
}
