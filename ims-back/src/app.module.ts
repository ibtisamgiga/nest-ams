import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './configure/typeorm.config';
import { UserModule } from './user/user.module';
import { OrganizationModule } from './organization/organization.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { OtpModule } from './otp/otp.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ComplaintModule } from './complaint/complaint.module';
import { CategoryModule } from './category/category.module';
import { VendorModule } from './vendor/vendor.module';
import { ItemModule } from './item/item.module';
import { RequestModule } from './request/request.module';
import { RoleModule } from './role/role.module';
import { PhotoModule } from './photo/photo.module';
import { DepartmentModule } from './department/department.module';
import * as config from 'config'
const mailConfig=config.get('mail')
@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        auth: {
          user: mailConfig.user,
          pass: mailConfig.pass,
        },
      },
    }),
    TypeOrmModule.forRoot(typeOrmConfig), //setting up db
    ScheduleModule.forRoot(),
    UserModule,
    OrganizationModule,
    OtpModule,
    ComplaintModule,
    CategoryModule,
    VendorModule,
    ItemModule,
    RequestModule,
    RoleModule,
    PhotoModule,
    DepartmentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

