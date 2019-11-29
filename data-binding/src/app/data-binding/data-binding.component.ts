import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-binding',
  templateUrl: './data-binding.component.html',
  styleUrls: ['./data-binding.component.css']
})
export class DataBindingComponent implements OnInit {

  url: string = 'http://loiane.com';
  cursoAngular: boolean = true;
  urlImage: string = 'http://lorempixel.com/400/200/nature/';

  contadorCaracteres: number = 0;
  valorAtual: string;

  erro: boolean = false;

  isMouseOver: boolean = false;

  nomeDoCurso: string = 'Angular'; 

  valorInicial = 15;

  getValor() {
    return 1;
  }

  getCurtirCurso(){
    return true;
  }  

  botaoClicado(valorTextBox: string){
    if(valorTextBox.length < 10)
    {
      this.erro = true;
      alert('A observação deve conter 10 ou mais caracteres.');
    }      
    else
    {
      this.erro = false;
      this.valorAtual = valorTextBox;
    }      
  }

  onKeyUp(evento: KeyboardEvent) {   
    this.contadorCaracteres = (<HTMLInputElement>evento.target).value.length;
  }

  onMouseOverOut(){
    this.isMouseOver = !this.isMouseOver;
  }

  onMudouValor(evento){
    console.log(evento.novoValor);
  }

  constructor() { }

  ngOnInit() {
  }

}
