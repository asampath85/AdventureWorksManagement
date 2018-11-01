import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Credential } from '../models/credential';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _httpClient: HttpClient;
  private baseUrl = 'http://localhost:51274/api/auth?userName=';
  constructor(private _handler: HttpBackend) {
    // passing httpbackend as handler will bypass token interceptor
    this._httpClient = new HttpClient(_handler);
  }

  login(userName: string): Observable<Credential> {
    return this._httpClient.get<Credential>(`${this.baseUrl}${userName}`, {withCredentials: true}).pipe(
      tap(credential => {
        localStorage.setItem('credential', JSON.stringify(credential));
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Authentication Error...');
  }
}
