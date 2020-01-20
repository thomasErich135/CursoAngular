import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient) { }

  ngOnInit() {
    // this.formulario = new  FormGroup({
    //   razaoSocial: new FormControl(null),
    //   email: new FormControl(null)
    // })

    this.formulario = this.formBuilder.group({
      cnpj: [null, [Validators.required, Validators.pattern('^[0-9]{14}$|^[0-9]{2}[.]{1}[0-9]{3}[.]{1}[0-9]{3}[/]{1}[0-9]{4}[-]{1}[0-9]{2}$')]],
      razaoSocial: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      numero: [null, Validators.required],
      cep: [null, Validators.required],
      complemento: [null],
      rua: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      uf: [null, Validators.required]
    })
  }

  onSubmit() {
    console.log(this.formulario);

    this.http.post('https://httpbin.org/post', JSON.stringify(this.formulario.value))
      .subscribe(dados => {
        console.log(dados);
        //reseta o form
        //this.resetarForm();
      }, 
      (error: any) => alert('Erro'));
  }

  resetarForm() {
    this.formulario.reset();
  }

  verificaValidTouched(campo, validInvalid: boolean) {
    if(validInvalid) {
      return this.formulario.get(campo).valid && this.formulario.get(campo).touched;
    }      
    else {
      return this.formulario.get(campo).invalid && this.formulario.get(campo).touched;
    }      
  }

  aplicaCssErro(campo) {
    return {
      'is-invalid': this.verificaValidTouched(campo, false),
      'is-valid': this.verificaValidTouched(campo, true)
   };
  }
}
