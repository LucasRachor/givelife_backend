import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import * as bcrypt from 'bcrypt'


@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) { }

  async createUser(createUserDto: CreateUserDto) {
    try {
      await this.prismaService.user.create({
        data: {
          email: createUserDto.email,
          username: createUserDto.username,
          password: await bcrypt.hash(createUserDto.password, 10)
        },
      });

    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new HttpException(
          'Usuário já cadastrado!',
          HttpStatus.BAD_REQUEST,
        );
      }
      console.log(error)
      throw new HttpException(
        'Erro ao cadastrar o usuário!',
        HttpStatus.BAD_REQUEST,
      );
    }
    return {
      msg: 'usuário cadastrado com sucesso!'
    }
  };

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email }
    })
  }

}

