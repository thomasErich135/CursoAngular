import { HttpClient } from '@angular/common/http';
import { delay, take, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

export class CrudService<T> {

  constructor(protected http: HttpClient,
    private API_URL) {
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.API_URL}`)
      .pipe(
        delay(1000)
      );
  }

  getById(id: string) {
    return this.http.get<T>(`${this.API_URL}/${id}`)
      .pipe(
        take(1)
      );
  }

  private post(record: T) {
    return this.http.post(`${this.API_URL}`, record)
      .pipe(
        take(1)
      );
  }

  private put(record: T) {
    return this.http.put(`${this.API_URL}/${record['id']}`, record)
      .pipe(
        take(1)
      );
  }

  save(record: T) {
    if (record['id']) {
      return this.put(record);
    }
    return this.post(record);
  }

  delete(id: string) {
    return this.http.delete(`${this.API_URL}/${id}`)
      .pipe(
        take(1)
      );
  }
}