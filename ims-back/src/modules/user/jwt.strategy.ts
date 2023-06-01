import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Repository } from 'typeorm';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from './entity/user.entity';
import * as config from 'config';
const jwtConfig = config.get('jwt');
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:process.env.JWT_SECRET||jwtConfig.secret,
    });
  }
  async validate(payLoad: JwtPayload) {
    const { email } = payLoad;
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['roles'],
    });
    
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
