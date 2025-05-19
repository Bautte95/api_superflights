import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtServices: JwtService,
  ) {}

  async signIn(
    username: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new NotFoundException('El usuario ingresado no existe.');
    }

    const isValidPassword = await this.userService.checkPassword(
      password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user._id, username: user.username };

    return { access_token: await this.jwtServices.signAsync(payload) };
  }

  async signUp(createUser: CreateUserDto) {
    return await this.userService.create(createUser);
  }
}
