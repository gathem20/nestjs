import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signupDto } from './dto/signup-dto';
import { LoginDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {
    constructor(private authService:AuthService){}


    @Post('/signup')
    SignUp(@Body() signup:signupDto):Promise<{token:string}>{
        return this.authService.signUp(signup)
    }
    @Get('/login')
    Login(@Body() login:LoginDto):Promise<{token:string}>{
        return this.authService.Login(login)
    }
}
