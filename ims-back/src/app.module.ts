import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './configure/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { OrganizationModule } from './modules/organization/organization.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { OtpModule } from './modules/otp/otp.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ComplaintModule } from './modules/complaint/complaint.module';
import { CategoryModule } from './modules/category/category.module';
import { VendorModule } from './modules/vendor/vendor.module';
import { ItemModule } from './modules/item/item.module';
import { RequestModule } from './modules/request/request.module';
import { RoleModule } from './modules/role/role.module';
import { PhotoModule } from './modules/photo/photo.module';
import { DepartmentModule } from './modules/department/department.module';
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

