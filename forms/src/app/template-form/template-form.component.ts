import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { map } from 'rxjs/operators';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: '',
    email: '',
    endereco: {
      cep: '',
      numero: '',
      complemento: '',
      rua: '',
      bairro: '',
      cidade: '',
      uf: ''
    }
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  onSubmit(form){    
    console.log(form);
  }
  
  verificaValidTouched(campo) {
    return campo.valid && campo.touched;
  }

  verificaInvalidTouched(campo) {
    return campo.invalid && campo.touched;
  }

  aplicaCssErro(campo) {
    return {
      'is-invalid': this.verificaInvalidTouched(campo),
      'is-valid': this.verificaValidTouched(campo)
   };
  }

  consultaCEP(cep, form) {
      //Nova variável "cep" somente com dígitos.
      cep = cep.replace(/\D/g, '');
      //Verifica se campo cep possui valor informado.
      if (cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
                    
          this.resetaDadosFormulario(form);

          this.http.get(`//viacep.com.br/ws/${cep}/json`)
            .subscribe(dados => this.populaDadosForm(dados, form));


        }
      }
  }

  populaDadosForm(dados, formulario) {
    //utilizando o setvalue somos obrigados a definir todos os campos, melhor utilizar o pacthvalue
    // form.setValue({
    //   nome: form.value.nome,
    //   email: form.value.email,
    //   endereco: {
    //     cep: dados.cep,
    //     numero: form.value.endereco.numero,
    //     complemento: dados.complemento,
    //     rua: dados.logradouro,
    //     bairro: dados.bairro,
    //     cidade: dados.localidade,
    //     uf: dados.uf
    //   }
    // });

    formulario.form.patchValue({
      endereco: {
        complemento: dados.complemento,
        rua: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        uf: dados.uf
      }
    });
  }

  resetaDadosFormulario(formulario)  {
    formulario.form.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        uf: null        
      }
    });
  }
}
