import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { EmployeeModel } from './models/employee.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseURL = 'http://localhost:51274/api/employees';
  private httpOptions = {
    headers: new HttpHeaders({ 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('credential')).token}` })
  };

  constructor(private httpClient: HttpClient) { }

  getEmployee(): Observable<EmployeeModel[]> {
    return this.httpClient.get<EmployeeModel[]>(this.baseURL).pipe(catchError(this.handleError));
  }

  addEmployee(employee: EmployeeModel): Observable<any> {
    return this.httpClient.post(this.baseURL, employee).pipe(catchError(this.handleError));
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
      'Something bad happened; please try again later.');
  }
}
