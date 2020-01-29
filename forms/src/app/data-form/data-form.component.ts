import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { DropdownService } from './../shared/services/dropdown.service';

import { EstadosBr } from './../shared/models/estados-br';
import { FormValidations } from '../shared/form-validations';
import { VerificaEmailService } from './services/verifica-email.service';

import { Observable, empty } from 'rxjs';
import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {

  formulario: FormGroup;
  //estados: EstadosBr[];
  estados: Observable<EstadosBr[]>
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];
  frameworksOp: any[];

  constructor(private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService) { }

  ngOnInit() {

    //podemos escutar eventos em qualquer lugar, porem a recomendação da equipe do angular é no ngOnInit, porém é interessante escutar os eventos apos a criação do formulario

    this.estados = this.dropDownService.getEstadosBr();
    this.cargos = this.dropDownService.getCargos();
    this.tecnologias = this.dropDownService.getTecnologias();
    this.newsletterOp = this.dropDownService.getNewletter();
    this.frameworksOp = this.dropDownService.getFrameworks();

    // segunda maneiras de criar um data driven utilizando FormBuilder (melhor)
    this.formulario = this.formBuilder.group({
      cnpj: [null, [Validators.required, Validators.pattern('^[0-9]{14}$|^[0-9]{2}[.]{1}[0-9]{3}[.]{1}[0-9]{3}[/]{1}[0-9]{4}[-]{1}[0-9]{2}$')]],
      razaoSocial: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email], this.validarEmail.bind(this)], //poderia colocar essa validação no serviço de formValidation e passar o serviço como parametro
      confirmarEmail: [null, FormValidations.equalsTo('email')],
      endereco: this.formBuilder.group({
        numero: [null, Validators.required],
        cep: [null, [Validators.required, FormValidations.validarCep]],
        complemento: [null],
        rua: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        uf: [null, Validators.required]
      }),
      cargo: [null, Validators.required],
      tecnologias: [null, Validators.required],
      newsletter: ['s'],
      termo: [false, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });

    this.formulario.get('endereco.cep').statusChanges
      .pipe(
        //o operador distinctUntilChanged, emite um observable somente quando o valor mudar
        distinctUntilChanged(),
        switchMap(status => status === 'VALID' ?
          this.cepService.consultaCEP(this.formulario.get('endereco.cep').value)
          : empty())
      )
      .subscribe(dados => dados ? this.populaEnderecoForm(dados) : {});
  }

  buildFrameworks() {
    //O metodo buildFrameworks, retorna um new FormControl(false) para cada valor do array frameworksOp, definindo a função requiredMinCheckbox() como validador de pelo menos um checkbox
    const arrayFrameworks = this.frameworksOp.map(dados => new FormControl(false));
    return this.formBuilder.array(arrayFrameworks, FormValidations.requiredMinCheckbox(1));

    //poderia ser feito assim, mas a utilização de map segue o padrao da ecmascript
    // let arrayFrameworks = [];
    // this.frameworksOp.forEach(dados => {
    //   arrayFrameworks.push(new FormControl(false))
    // })
    // return arrayFrameworks;
  }

  onSubmit() {
    //copia os valores do formulario para um objeto vazio
    let valuesSubmit = Object.assign({}, this.formulario.value);
    //faz uma nova copia dos objetos, realizando o map onde tem a função de interar os valores do campo framerworks, passando pela condição de verdadeiro, caso seja 
    //verdadeiro retorna o nome com base no index 'i' recuperando do array this.framework, se for falso retorna null
    //então é chamado a função filter, que tem como objetivo filtrar todos os valores diferentes de null.
    valuesSubmit = Object.assign(valuesSubmit, {
      frameworks: valuesSubmit.frameworks
        .map((v, i) => v ? this.frameworksOp[i] : null)
        .filter(v => v !== null)
    });

    if (this.formulario.valid) {
      this.http.post('https://httpbin.org/post', JSON.stringify(valuesSubmit))
        .subscribe(dados => {
          console.log(dados);
          //reseta todos os campos do formulario
          this.resetarTodosFormulario();
        },
          (error: any) => alert('Erro'));
    }
    else {
      console.log(this.formulario);
      this.verificaValidacoesFormulario(this.formulario);
    }
  }

  verificaValidacoesFormulario(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsDirty();

      if (controle instanceof FormGroup) {
        this.verificaValidacoesFormulario(controle);
      }
    });
  }

  resetarTodosFormulario() {
    this.formulario.reset();
    console.log('reset');
  }

  resetaEnderecoFormulario() {
    this.formulario.patchValue({
      endereco: {
        complemento: null,
        rua: null,
        bairro: null,
        cidade: null,
        uf: null
      }
    });
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

  populaEnderecoForm(dados) {
    if ('erro' in dados) {
      alert('CEP não encontrado.')
    }
    else {
      this.formulario.patchValue({
        endereco: {
          complemento: dados.complemento,
          rua: dados.logradouro,
          bairro: dados.bairro,
          cidade: dados.localidade,
          uf: dados.uf
        }
      });
      //exemplo de setar valor no campo utilizando a propriedade setValue
      //this.formulario.get('razaoSocial').setValue('thomas');
    }
  }

  setarCargo() {
    const cargo = { nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl' };
    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obj1, obj2) {
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologias() {
    this.formulario.get('tecnologias').setValue(['java', 'javascript', 'c#']);
  }

  validarEmail(formControl: FormControl) {
    return this.verificaEmailService.verificarEmail(formControl.value)
      .pipe(
        map(emailExiste => emailExiste ? { emailExiste: true } : null)
      );
  }
}
