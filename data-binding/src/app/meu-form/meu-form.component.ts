import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meu-form',
  templateUrl: './meu-form.component.html',
  styleUrls: ['./meu-form.component.css']
})
export class MeuFormComponent implements OnInit {

  nome: string = "abc";

  pessoa: any = {
    nome: 'Thomas E. Pimentel',
    idade: 29,
    endereco: {
      rua: 'Cristiano Angeli',
      numero: 1387,
      bairro: 'Assunção'
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
