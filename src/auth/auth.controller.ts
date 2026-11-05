import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { LoginUserDto } from './dto/login-user.dto.js';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator.js';
import { User } from './entities/user.entity.js';
import { RawHeaders } from './decorators/raw-headers.decorator.js';
import type { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role/user-role.guard.js';
import { RoleProtected } from './decorators/role-protected.decorator.js';
import { ValidRoles } from './interfaces/valid-roles.js';
import { Auth } from './decorators/auth.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }  

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  chechAuthStatus(
    @GetUser() user: User
  ){
    return this.authService.checkAuthStatus(user);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request, 
    @GetUser() user:User,
    @GetUser('email') userEmail:string,
    @RawHeaders() rawHeaders:string[],
    @Headers() headers: IncomingHttpHeaders
  ){
    // console.log({request})
    // console.log({user})
    return {
      ok: true,
      message: 'Hello word private...', 
      user,
      userEmail,
      rawHeaders,
      headers,
    };
  }

  @Get('private2')
  // @SetMetadata('roles', ['admin', 'super-user'])
  @RoleProtected(ValidRoles.superUser, ValidRoles.admin, ValidRoles.gerente)
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
    @GetUser() user: User
  ){
    return{
      ok: true,
      user,
    }
  }

  @Get('private3')
  // @Auth() //para acceso a todos los usuarios activos
  @Auth(ValidRoles.admin, ValidRoles.superUser, ValidRoles.gerente)
  privateRoute3(
    @GetUser() user: User
  ){
    return{
      ok: true,
      user,
    }
  }

}
