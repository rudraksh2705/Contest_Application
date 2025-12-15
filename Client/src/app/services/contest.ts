import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContestService {
  constructor(private http: HttpClient) {

  }

  createContest(data: any) {
    const url = `http://localhost:3000/api/v1/contest`
    return this.http.post(url, data , {withCredentials : true}).pipe(catchError((err) => {
      return throwError(() => {
        return err.error.message;
      });
    })
    );
  }

  getContests() {
    const url = `http://localhost:3000/api/v1/contest`
    return this.http.get<any>(url , {withCredentials : true}).pipe(catchError((err) => {
      return throwError(() => err.error.message);
    }));
  }

  getContest(id: any) {
    const url = `http://localhost:3000/api/v1/contest/${id}`
    return this.http.get<any>(url , {withCredentials : true}).pipe(catchError((err) => {
      return throwError(() => err.error.message)
    }));
  }
}
