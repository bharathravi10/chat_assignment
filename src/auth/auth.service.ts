import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AuthConstants } from './constant';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(data: { name: string; email: string; password: string }) {
    const existingUser = await this.prisma.user_details.findFirst({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new HttpException(
        AuthConstants.ALREADY_EXISTS,
        HttpStatus.CONFLICT,
      );
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    await this.prisma.user_details.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });

    return {
      statusCode: HttpStatus.CREATED,
      message: AuthConstants.SUCCESS,
    };
  }

  async login(data: { email: string; password: string }) {
    const user = await this.prisma.user_details.findFirst({
      where: { email: data.email },
    });

    if (!user || !(await bcrypt.compare(data.password, user.password))) {
      throw new HttpException(
        AuthConstants.INVALID_CREDENTIALS,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const token = this.jwtService.sign({ id: user.id, email: user.email });

    return {
      statusCode: HttpStatus.OK,
      message: AuthConstants.LOGIN_SUCCESS,
      access_token: token,
    };
  }
}
