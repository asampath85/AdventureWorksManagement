import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router, private toastr: ToastrService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (localStorage.getItem('credential')) {
            req = req.clone({
                setHeaders: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('credential')).token}` }
            });
        }

        return next.handle(req).pipe(catchError(this.handleError.bind(this)));

    }

    handleError(error: any) {
        if (error.status === 401) {
            // localStorage.removeItem('credential');
            this.toastr.error('Session expired... Please login again', 'SESSION EXPIRED');
            this.router.navigate(['/login']);
            return of(error);
        }
        return throwError('something bad happened; please try again later.');
    }
}
