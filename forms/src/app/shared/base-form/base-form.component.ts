import { FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  abstract submit();

  onSubmit() {
    if (this.formulario.valid){
      this.submit();
    } 
    else {
      console.log(this.formulario);
      this.verificaValidacoesFormulario(this.formulario);
    }
  }

  verificaValidacoesFormulario(formGroup: FormGroup | FormArray) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();

      if (controle instanceof FormGroup || controle instanceof FormArray) {
        this.verificaValidacoesFormulario(controle);
      }
    });
  }

  resetarTodosFormulario() {
    this.formulario.reset();
    console.log('reset');
  }

  verificaValidTouched(campo: string, validInvalid: boolean) {
    if (validInvalid) {
      return this.formulario.get(campo).valid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
    }
    else {
      return this.formulario.get(campo).invalid && (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
    }
  }

  aplicaCssErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo, false),
      'is-valid': this.verificaValidTouched(campo, true)
    };
  }
}
