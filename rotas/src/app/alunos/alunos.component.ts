import { Component, OnInit } from '@angular/core';

import { AlunosService } from './alunos.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  private alunos: any[] = [];
  private filtro: string = '';  

  constructor(private alunoService: AlunosService) {     
  }

  ngOnInit() {
    this.alunos = this.alunoService.getAlunos();
  }

  filtrarAluno() {
    if(this.alunos.length === 0 || this.filtro == undefined || this.filtro.trim() === ''){
      return this.alunos;
    }

    return this.alunos.filter(v => {      
      if(String(v.nome).toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0){        
        return true;
      }        
      return false;
    });
  }

}
