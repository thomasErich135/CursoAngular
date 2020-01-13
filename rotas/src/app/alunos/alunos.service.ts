import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlunosService {

private alunos: any[] = [
  {id: 1, nome: 'Thomas Erich', sobrenome: 'Pimentel', email: 'thomas@brayton.com.br'},
  {id: 2, nome: 'Mayara', sobrenome: 'Alves Ribeiro', email: 'maiiiara@gmail.com'},
  {id: 3, nome: 'Rafael', sobrenome: 'Matsuki', email: 'rafael@brayton.com.br'},
  {id: 4, nome: 'Danielle', sobrenome: 'Mendonça', email: 'vendas@brayton.com.br'}
]

getAlunos() {
  return this.alunos;
}

getAluno(id: number){
  let aluno = this.getAlunos().find(aluno => aluno.id == id);
  return aluno;
}

  constructor() { }
}
