import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) { }

  consultaCEP(cep: string) {   
    //Variável "cep" somente com dígitos, substitui qualquer caracter que nao for digito para ''
    cep.replace(/\D/g, '');
    //Verifica se campo cep possui valor informado.
    if (cep !== '') {
      //Expressão regular para validar o CEP.
      var validacep = /^[0-9]{8}$/g;
      //Valida o formato do CEP.
      if (validacep.test(cep)) {  
        return this.http.get(`//viacep.com.br/ws/${cep}/json`);
      };
    };
    //retorna um objeto vazio caso o cep não passe nas validações acima.
    return of({});
  }
}
