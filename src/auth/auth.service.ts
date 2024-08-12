import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { signupDto } from './dto/signup-dto';
import { LoginDto } from './dto/login-dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private usermodel: Model<User>,
    private jwtService:JwtService
  ) {}


  async signUp(signUpDto:signupDto):Promise <{token:string}>{
    const {name , email , password }= signUpDto
    const hashedPassword = await bcrypt.hash(password , 10)


    const user = await this.usermodel.create({
        name,email,password:hashedPassword
    })
    const token = this.jwtService.sign({
        id:user._id
    })
    return {token}
  }
  async Login(login:LoginDto):Promise <{token :string}>{
    const {email , password} = login
    const user = await this.usermodel.findOne({email})

    if(!user){
        throw new UnauthorizedException('invalid email or password')
    }
    const isPassword = await bcrypt.compare(password, user.password)
    if (!isPassword) {
      throw new UnauthorizedException('invalid email or password');
    }
    const token = this.jwtService.sign({
      id: user._id,
    });
    return { token };
  }
}
