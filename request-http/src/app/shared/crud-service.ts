import { HttpClient } from '@angular/common/http';
import { delay, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class CrudService<T> {

    constructor(protected http: HttpClient,
        private API_URL) {

    }

    getCursos(): Observable<T[]> {
        return this.http.get<T[]>(`${this.API_URL}`)
          .pipe(
            delay(1000)
          );
      }
    
      getCursoById(id: string) {
        return this.http.get<T>(`${this.API_URL}/${id}`)
          .pipe(
            take(1)
          );
      }
    
      private postCurso(record: T) {
        return this.http.post(`${this.API_URL}`, record)
          .pipe(
            take(1)
          );
      }
    
      private putCurso(record: T) {
        return this.http.put(`${this.API_URL}/${record['id']}`, record)
          .pipe(
            take(1)
          );
      }
    
      save(record: T) {
        if(record['id']) {
          return this.putCurso(record);
        }
        return this.postCurso(record);
      }
    
      deleteCurso(id: string) {
        return this.http.delete(`${this.API_URL}/${id}`)
          .pipe(
            take(1)
          );
      }
}