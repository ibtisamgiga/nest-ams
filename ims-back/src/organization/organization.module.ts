import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesGuard } from 'src/user/guards/role.gaurd';
import { JwtStrategy } from 'src/user/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { Organization } from './entity/organization.entity';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';
import { PhotoModule } from 'src/photo/photo.module';

@Module({
  imports:[ TypeOrmModule.forFeature([Organization]),UserModule,PhotoModule],
  controllers: [OrganizationController],
  providers: [OrganizationService]
})
export class OrganizationModule {}
