
import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError, tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('HTTP Request:', req.method, req.url);

  return next(req).pipe(
    tap(response => {
      console.log('HTTP Response:', response);
    }),
    catchError(error => {
      console.error('HTTP Error:', error);
      return throwError(() => error);
    })
  );
};
