import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignupDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSigninDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(body: UserSignupDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(body.email);
    if (userExists) throw new BadRequestException('Account already exists');
    body.password = await hash(body.password, 10);
    let user = this.usersRepository.create(body);
    user = await this.usersRepository.save(user);
    delete user.password;
    return user;
  }

  async signin(userSigninDto: UserSigninDto): Promise<UserEntity> {
    const userExists = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email=:email', { email: userSigninDto.email })
      .getOne();
    if (!userExists) throw new BadRequestException('Invalid email or password');
    const comparePassword = await compare(
      userSigninDto.password,
      userExists.password,
    );
    if (!comparePassword)
      throw new BadRequestException('Invalid Email or password');
    delete userExists.password;
    return userExists;
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number):Promise<UserEntity> {
    const user=  await this.usersRepository.findOneBy({id});
    if(!user) throw new NotFoundException("User not found");
    return user
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }

  async accessToken(user: UserEntity):Promise<string> {
    return sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME },
    );
  }
}
