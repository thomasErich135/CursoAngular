import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { EstadosBr } from '../models/estados-br';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) { }

  getEstadosBr() {
    return this.http.get<EstadosBr[]>('assets/dados/estadosBr.json');
  }

  getCargos() {
    return [
      { nome: 'Dev', nivel: 'Junior', desc: 'Desenvolvedor Junior'},
      { nome: 'Dev', nivel: 'Pleno', desc: 'Desenvolvedor Pleno'},
      { nome: 'Dev', nivel: 'Senior', desc: 'Desenvolvedor Senior'}
    ];
  }

  getTecnologias() {
    return [
      { nome: 'java', desc: 'Java'},
      { nome: 'javascript', desc: 'JavaScript'},
      { nome: 'php', desc: 'PHP'},
      { nome: 'ruby', desc: 'Ruby'},
      { nome: 'c#', desc: 'C#'}
    ];
  }

  getNewletter() {
    return [
      { valor: 's', desc: 'Sim'},
      { valor: 'n', desc: 'Não'}
    ]
  }

  getFrameworks() {
    return [
      'Angular', 
      'React', 
      'Vue', 
      'Sencha'
    ];
  }
}
