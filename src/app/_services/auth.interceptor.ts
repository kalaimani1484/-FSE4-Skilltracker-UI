import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountService } from '../_services'

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        debugger;
        const currentUser = this.authenticationService.userValue;
        if (currentUser && currentUser.expires) {
            request = request.clone({
                setHeaders: { 
                    Authorization: `bearer ${currentUser.token}`
                }
            });
        }

        return next.handle(request);
    }
}