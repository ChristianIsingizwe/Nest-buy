import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSigninDto } from './dto/user-signin.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() body: UserSignupDto): Promise<UserEntity> {
    return await this.usersService.signup(body);
  }

  @Post('signin')
  async signin(@Body() userSigninDto: UserSigninDto): Promise<{
    accessToken: string;
    user: UserEntity;
  }> {
    const user = await this.usersService.signin(userSigninDto);
    const accessToken = await this.usersService.accessToken(user);
    return { accessToken, user };
  }

  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
