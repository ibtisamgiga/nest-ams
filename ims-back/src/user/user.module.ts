import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './guards/role.gaurd';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { OtpModule } from 'src/otp/otp.module';
import * as config from 'config';
import { PhotoModule } from 'src/photo/photo.module';
const jwtConfig = config.get('jwt');

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions: {
        expiresIn: jwtConfig.expiresIn,
      },
    }),
    TypeOrmModule.forFeature([User]),
    OtpModule,
    PhotoModule
  ],
  providers: [
    JwtStrategy,
    PassportModule,
    AuthService,
    RolesGuard,
    UserService,

  ],
  controllers: [UserController],
  exports: [UserService, JwtStrategy, PassportModule, RolesGuard, AuthService,UserService], //JwtStrategy, PassportModule, RolesGuard,
})
export class UserModule {}
