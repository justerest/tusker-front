import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

export const BASE_URL = new InjectionToken('Base Url for Http Requests');

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  constructor(@Inject(BASE_URL) private baseUrl: string) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request.clone({ url: this.baseUrl + request.url }));
  }
}
