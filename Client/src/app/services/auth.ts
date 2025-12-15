import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) { }

  registerUser(userData: any) {
    const url = `http://localhost:3000/api/v1/users/register`;
    return this.http.post(url, userData, { withCredentials: true }).pipe(
      catchError((err) => {
        return throwError(() => err.error.message);
      })
    );
  }

  getUser() {
    const url = `http://localhost:3000/api/v1/users`;
    return this.http.get(url, { withCredentials: true }).pipe(
      catchError((err) => {
        return throwError(() => err.error.message);
      })
    );
  }

  logOutUser() {
    const url = `http://localhost:3000/api/v1/users/logOut`;
    return this.http.post(url, {}, { withCredentials: true }).pipe(
      catchError((err) => {
        return throwError(() => err.error.message);
      })
    );
  }

  verifyOtp(data: any) {
    const url = `http://localhost:3000/api/v1/users/verifyOtp`;
    return this.http.post(url, data, { withCredentials: true }).pipe(
      catchError((error) => {
        return throwError(() => error.error.message);
      })
    );
  }

  login(data: any) {
    const url = `http://localhost:3000/api/v1/users/signIn`;
    return this.http.post(url, data, { withCredentials: true }).pipe(
      catchError((error) => {
        return throwError(() => error.error.message);
      })
    );
  }

}
