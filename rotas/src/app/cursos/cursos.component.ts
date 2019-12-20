import { Component, OnInit, OnDestroy, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';

import { CursosService } from './cursos.service';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit, OnDestroy {

  @Output() pagina: number = 1;

  inscricaoQueryParms: Subscription;

  cursos: any[];
  filtro: string = '';  
  
  constructor(private cursosService: CursosService,
    private route: ActivatedRoute,
    private router: Router) {    
   }

  ngOnInit() {
    this.cursos = this.cursosService.getCursos();
    this.inscricaoQueryParms = this.route.queryParams.subscribe((queryParms: any) =>{
      this.pagina = queryParms['pagina'];
    });
  }

  ngOnDestroy() {
    this.inscricaoQueryParms.unsubscribe();
  }

  filtrarCursos() {
    if(this.cursos.length === 0 || this.filtro == undefined || this.filtro.trim() === ''){
      return this.cursos;
    }
    return this.cursos.filter(v => {      
      if(String(v.nome).toLowerCase().indexOf(this.filtro.toLowerCase()) >= 0){        
        return true;
      }        
      return false;
    });
  }

  onClickProximaPagina() {
    this.router.navigate(['/cursos'], {
      queryParams: {'pagina': ++this.pagina}
    })
  }

  onClickPaginaAnterior() {
    this.router.navigate(['/cursos'], {
      queryParams: {'pagina': --this.pagina}
    })
  }
}
