import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { AppConfigService } from '../../assets/global-configs/app-config.service';

export const modelInterceptor: HttpInterceptorFn = (req, next) => {
  const config = inject(AppConfigService);
  let modifiedReq = req.clone({
    withCredentials: true,
  });

  const token = config.configuration?.dummyJwtAccessToken;

  if (token) {
    console.log(token);

    modifiedReq = modifiedReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(modifiedReq).pipe(
    map((httpResp: any) => {
      if (httpResp.body && httpResp.body.result !== undefined) {
        return httpResp.clone({ body: httpResp.body.result });
      }

      return httpResp;
    })
  );
};
