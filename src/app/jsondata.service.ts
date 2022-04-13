import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JsondataService {

  constructor(private http: HttpClient) {
  }


  getData(): Observable<Object> {
    return this.http.get('https://jsonplaceholder.typicode.com/users').pipe(
      catchError(error => {
        return throwError(() => { return new Error(error.message || 'Server Error'); });
      })
    );
  }
}
