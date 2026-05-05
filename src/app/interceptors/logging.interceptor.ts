import { HttpInterceptorFn } from '@angular/common/http';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const started = Date.now();
  
  console.log(`Petición saliente: ${req.method} ${req.url}`);

  return next(req); 
};