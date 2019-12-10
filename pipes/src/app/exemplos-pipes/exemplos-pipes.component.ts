import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exemplos-pipes',
  templateUrl: './exemplos-pipes.component.html',
  styleUrls: ['./exemplos-pipes.component.css']
})
export class ExemplosPipesComponent implements OnInit {

  livro: any = {
    titulo: 'Estruturas de dados e algoritmos com JavaScript: Escreva um código JavaScript complexo e eficaz usando a mais recente ECMAScript',
    rating: 18884.54321,
    numeroPaginas: 453,
    preco: 76.97,
    moeda: 'Real R$',
    dataLancamento: new Date(2019, 2, 11),
    url: 'https://www.amazon.com.br/Estruturas-dados-algoritmos-com-JavaScript-ebook/dp/B07P6SZJVQ/ref=sr_1_1?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=19QX26PO25G62&keywords=loiane+groner&qid=1575981228&sprefix=loiane%2Caps%2C252&sr=8-1'
  };

  constructor() { }

  ngOnInit() {
  }

}
