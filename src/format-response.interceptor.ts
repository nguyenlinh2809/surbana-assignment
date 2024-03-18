import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

interface Response<T> {
  code: number;
  data: T;
}

@Injectable()
export class FormatResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    return next.handle().pipe(map((data) => ({ data, code: statusCode })));
  }
}
