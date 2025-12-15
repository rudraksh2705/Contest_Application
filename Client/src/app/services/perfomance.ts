import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Perfomance {
  constructor(private http: HttpClient) {

  }
  createPerfModel(data: any) {
    const url = `http://localhost:3000/api/v1/perfomance`;

    return this.http.post(url, data, { withCredentials: true }).pipe(
      catchError((error) => {
        const message = error?.error?.message || 'Something went wrong';
        return throwError(() => new Error(message));
      })
    );
  }

  getUserPerfomance(user: string) {
    const url = `http://localhost:3000/api/v1/perfomance/user/${user}`;
    return this.http.get(url, { withCredentials: true }).pipe(catchError((error) => {
      return throwError(() => error.error.message)
    }))
  }

  viewAllPerfomance() {
    const url = `http://localhost:3000/api/v1/perfomance`;
    return this.http.get(url, { withCredentials: true }).pipe(catchError((error) => {
      return throwError(() => {
        return error.error.message;
      })
    }));
  }

  getContestPerfomance(id: string) {
    const url = `http://localhost:3000/api/v1/perfomance/contest/${id}`;
    return this.http.get(url, { withCredentials: true });
  }

  canAttemptContest(user: string, contest: string) {
    const url = `http://localhost:3000/api/v1/perfomance/attempt/${contest}`
    return this.http.post(url, { user }, { withCredentials: true }).pipe((catchError(error => {
      return throwError(() => error.error.message);
    })));
  }
}
