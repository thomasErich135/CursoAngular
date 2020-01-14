import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';

import { AlunosService } from '../alunos.service';

import { Aluno } from '../aluno';

@Injectable({ 
    providedIn: 'root' 
})
export class AlunoDetalheResolver implements Resolve<Aluno> {

    constructor(private alunoService: AlunosService){        
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<Aluno> | Promise<Aluno> | Aluno {

        console.log('alunos resolve');

        let id = route.params['id'];
        return this.alunoService.getAluno(id);
    }
}