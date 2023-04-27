import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs';
  import { plainToInstance } from 'class-transformer';
import { GetUser } from 'src/user/decorators/get-user.decorator';
  
  interface ClassConstructor{
      new(...args:any[]):{}
  }
  
  export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializerInterceptor(dto));
  } 
  
  export class SerializerInterceptor implements NestInterceptor {
    constructor(private dto: any) {}
    intercept(context: ExecutionContext, next: CallHandler<any>) {
      //RUN something before a request is handled
      //by the request handler
      //    console.log('i am running before handler',context)
      return next.handle().pipe(
        map((data: any) => {
          //run something before response is send out
          return plainToInstance(this.dto, data, {
            excludeExtraneousValues: true,
          });
        }),
      );
    }
  }
  


  export function RoleSerialize(dto: ClassConstructor,dto2:ClassConstructor,role) {
    return UseInterceptors(new RoleSerializerInterceptor(dto,dto2,role));
  } 
  
  export class RoleSerializerInterceptor implements NestInterceptor {
    constructor(private dto: any,private dto2: any,private role:any) {}
    intercept(context: ExecutionContext, next: CallHandler<any>) {
      const request = context.switchToHttp().getRequest();
      const currentRole=request.user.roles.role
      //RUN something before a request is handled
      //by the request handler
      //    console.log('i am running before handler',context)
      return next.handle().pipe(
        map((data: any) => {
          //run something before response is send out
          return plainToInstance(currentRole==this.role?this.dto2:this.dto, data, {
            excludeExtraneousValues: true,
          });
        }),
      );
    }
  }
  
  // export class SerializerInterceptor implements NestInterceptor {
  //   constructor(private dto: any) {}
  //   intercept(context: ExecutionContext, next: CallHandler<any>) {
  //     return next.handle().pipe(
  //       map((data: any) => {
  //         return plainToInstance(this.dto, data, {
  //           excludeExtraneousValues: true,
  //         });
  //       })
  //     );
  //   }
  // }
  