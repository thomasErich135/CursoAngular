import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { ConsultaCepService } from '../shared/services/consulta-cep.service';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  constructor(private http: HttpClient,
    private cepService: ConsultaCepService) { }

  ngOnInit() {
  }

  onSubmit(formulario){   

    this.http.post('https://httpbin.org/post', JSON.stringify(formulario.value))
      .subscribe(dados => {
        console.log(dados);
        formulario.form.reset();
      });
  }
  
  verificaValidTouched(campo, validInvalid: boolean) {
    if(validInvalid) {
      return campo.valid && campo.touched;
    }      
    else {
      return campo.invalid && campo.touched;
    }      
  }

  aplicaCssErro(campo) {
    return {
      'is-invalid': this.verificaValidTouched(campo, false),
      'is-valid': this.verificaValidTouched(campo, true)
   };
  }

  consultaCEP(cep, form) {    
    if (cep != null && cep !== '') {
      //resta os campos input do endereço
      this.resetaEnderecoFormulario(form);
      //faz o subscribe no observable retornado pelo serviço de consulta cep
      this.cepService.consultaCEP(cep)
        .subscribe(dados => this.populaEnderecoForm(dados, form));
    };
  }

  consultaCnpj(cnpj, form) {
    //o consumo da API receitaws nao é possivel diretamente daqui, pois conforme politica CORS o navegador nao pode consumir
    //dados que esteja fora do seu proprio dominio, sendo o correto, realizar uma chamada para o backed-end e do backed-end consumir a API da receitaws

    // //Nova variável "cep" somente com dígitos.
    // cnpj = cnpj.replace(/\D/g, '');
    // //verifica se o campo cnpj possui valor informado
    // if(cnpj != "")
    // {
    //   //expressao regular para validar CNPJ
    //   var validacnpj = /^[0-9]{14}$/;
    //   //valida o formato do CNPJ
    //   if(validacnpj.test(cnpj))
    //   {
    //     //reseta os campos de cnpj
    //     this.resetaCnpjFormulario(form);
    //     //faz a inscricao e popula os valores retornado
    //     this.http.get(`//receitaws.com.br/v1/cnpj/${cnpj}`)
    //       .subscribe(dados => console.log(dados));
    //   }
    // }
  }

  populaEnderecoForm(dados, formulario) {
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

    if('erro' in dados) {
      alert('CEP não encontrado.')
    } else if (Object.keys(dados).length == 0){
      alert('CEP inválido.')
    }
    else {
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
  }

  resetaEnderecoFormulario(formulario)  {
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

  resetaCnpjFormulario(formulario)  {
    formulario.form.patchValue({
      razaoSocial: null,
      email: null
    });
  }
}
