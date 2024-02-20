import { CallHandler, ExecutionContext, Injectable, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToInstance } from 'class-transformer';

interface Dto {
  new (...args: any[]): {};
}
export function TransformResponse(dto: Dto) {
  return UseInterceptors(new TransformInterceptor(dto));
}

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true
        });
      }),
    );
  }
}
