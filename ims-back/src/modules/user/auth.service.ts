import {
  BadRequestException,
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { SignInDto } from './dtos/sign-in.dto';
import { GetUser } from './decorators/get-user.decorator';
import { MailerService } from '@nestjs-modules/mailer';
import { OtpService } from 'src/modules/otp/otp.service';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { PhotoService } from 'src/modules/photo/photo.service';
import { RoleService } from '../role/role.service';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly mailService: MailerService,
    private jwtService: JwtService,
    private otpService: OtpService,
    private photoService: PhotoService,
    private roleService: RoleService,
  ) {}

  /**********************SIGN-UP***********************************/
  async createUser(userData: CreateUserDto, @GetUser() currentuser: User) {
    const {
      name,
      email,
      password,
      privateEmail,
      contactNo,
      organizationId,
      image,
      departmentId,
    } = userData;

    const { role } = currentuser.roles;
    const searchRole = role === 'superadmin' ? 'admin' : 'employee';
    const [rolesId, myImage] = await Promise.all([
      this.roleService.getRole(searchRole),
      image ? this.photoService.createPhoto({ image }) : null,
    ]);

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      privateEmail,
      contactNo,
      organizationId:
        role === 'admin' ? currentuser.organizationId : organizationId,
      rolesId,
      departmentId,
      image: myImage,
    });

    try {
      const emailBody = this.emailBody(privateEmail, user.email, password);
      if (await this.mailService.sendMail(emailBody)) {
        return await this.userRepository.save(user);
      } else {
        throw new InternalServerErrorException();
      }
    } catch (error) {
      if (error.code === '23505') {
        console.log({
          user: { message: 'user already exists', statusCode: '400' },
        });
        return { message: 'user already exists', statusCode: '400' };
      }
    }
  }

  /********************************VALIDATE PASSWORD FUNCTION************************************/
  async validateUserPassowrd(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const user = await this.userRepository.findOneBy({ email });
    if (user && (await user.validatePassword(password))) {
      const payLoad = { email };
      const accessToken = await this.jwtService.sign(payLoad);
      return { accessToken, user };
    } else {
      return null;
    }
  }
  /********************************reset pasword*******************/
  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, otp, password } = resetPasswordDto;
    const data = await this.otpService.valdiateOtp(email, otp);
    if (data) {
      const currentTime = new Date().getTime();
      let diff = data.expiresIn - currentTime;
      if (diff < 0) throw new BadRequestException('OTP EXPIRED');
      const user = await this.userRepository.findOne({ where: { email } });
      const salt = await bcrypt.genSalt(); //gen salt
      const hashedPassword = await this.hashPassword(password, salt); //hasing password recvied from body
      user.password = hashedPassword;
      return {
        user: await this.userRepository.save(user),
        message: 'password rest',
      };
    }
  }

  /***************************************PRIVATE FUNCTION TO HASH PASSWORD**********************/
  private async hashPassword(password: string, salt: string) {
    return await bcrypt.hash(password, salt);
  }

  private emailBody = (privateEmail, userEmail, password) => {
    return {
      to: privateEmail,
      from: 'm.ibtisam@gigalabs.co',
      subject: 'Hurray you are registered!!!',
      html: `<p> Email:${userEmail}</p><p> Password:${password}</p>`,
    };
  };
}
