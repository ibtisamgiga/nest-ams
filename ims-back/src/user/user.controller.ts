import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  SerializeOptions,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorator';
import { Role } from './decorators/user-role.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { Roles } from './enums/roles.enum';
import { RolesGuard } from './guards/role.gaurd';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { SendOtpDto } from 'src/otp/dtos/send-otp.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import {  RoleSerialize, Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { GetUsersDto } from './dtos/get-users.dto';
import { GetSingleUsersDto } from './dtos/get-single-user.dto';
import { GetEmployeeDto } from './dtos/get-employee.dto';

@Controller('users')
export class UserController {

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  @Role(Roles.SuperAdmin, Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  signUp(@Body() createUserDto: CreateUserDto, @GetUser() user: User) {
    console.log(createUserDto);
    return this.authService.createUser(createUserDto, user);
  }

  @Post('/signin')
  @Serialize(UserDto)
  async signIn(@Body() signInDto: SignInDto) {
    const user = await this.authService.validateUserPassowrd(signInDto);
    if (!user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }

  @Get('count')
  @UseGuards(AuthGuard(), RolesGuard)
  @Role(Roles.SuperAdmin, Roles.Admin)
  async getMonthlyUsers(@GetUser() user: User) {
    return await this.userService.getCount(user);
  }

  @Get()
  @Role(Roles.SuperAdmin, Roles.Admin)
  @RoleSerialize(GetUsersDto,GetEmployeeDto,Roles.Admin)
  //@Serialize(GetUsersDto)
  @UseGuards(AuthGuard(), RolesGuard)
  getUsers(@GetUser() user: User) {
    //console.log(user)
    return this.userService.getUsers(user);
    //return this.userService.getMonthlyUsers()
  }
  @Get('/:id')
  @Role(Roles.SuperAdmin, Roles.Admin)
  @Serialize(GetSingleUsersDto)
  @UseGuards(AuthGuard(), RolesGuard)
  getUser(@Param('id', ParseIntPipe) id, @GetUser() user: User) {
    return this.userService.getUserById(id, user);
  }

  @Delete('/:id')
  @Role(Roles.SuperAdmin, Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  deleteTask(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.userService.deleteUser(id, user);
  }

  @Patch('/:id')
  @Role(Roles.SuperAdmin, Roles.Admin)
  @UseGuards(AuthGuard(), RolesGuard)
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
    @GetUser() user: User,
  ) {
    return this.userService.updateUser(id, body, user);
  }

  @Post('send-otp')
  async sendOtp(@Body() sendOtpDto: SendOtpDto) {
    return await this.userService.sendOtp(sendOtpDto);
  }

  @Put('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPasswordDto);
  }
}

// @Role(Roles.SuperAdmin)
// @UseGuards(RolesGuard)
// @Post('/test')
// @UseGuards(AuthGuard())
// async test() {
//   /***********iwas here */
// }
