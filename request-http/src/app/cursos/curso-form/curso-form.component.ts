import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common'

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { AlertModalService } from './../../shared/alert-modal/alert-modal.service';
import { CursosService } from '../cursos.service';

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
    private location: Location) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nomeCurso: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]]
    })
  }

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {

      const cursoAux: any = {
        curso: this.form.value['nomeCurso']
      }

      this.cursosService.postCurso(cursoAux)
        .subscribe(
          success => {
            this.alertModalService.showAlertSuccess('Curso salvo com sucesso.');
            this.location.back();
          },
          error => this.alertModalService.showAlertDanger('Erro ao salvar curso.'),
          () => console.log('complete')
        );
    }
  }

  onCancel(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
