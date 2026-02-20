import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { map } from 'rxjs';
import { AppConfigService } from '../../assets/global-configs/app-config.service';

export const modelInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Get token from window (Host set) or localStorage (Fallback)
  const token =
    (window as any).__JWT_TOKEN__ || sessionStorage.getItem('jwtToken');

    let modifiedReq;

  // 2. If token exists (Local Dev), inject into Authorization header
  if (token) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: false,
    });
  }else{
    modifiedReq = req.clone({
      withCredentials: true,
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
