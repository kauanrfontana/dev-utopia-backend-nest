import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { AuthDataDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../user/entities/user.entity';
import { TokenService } from '../token/tokens.service';
import { TokenEntity } from '../token/entities/token.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private jwtService: JwtService,
  ) {}

  private async validateUser({
    email,
    password,
  }: AuthDataDto): Promise<UserEntity> {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      return null;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return null;
    }

    return user;
  }

  async login(authData: AuthDataDto): Promise<Record<string, string>> {
    const user = await this.validateUser(authData);
    if (!user) return null;
    const { token, refreshToken } = await this.setTokens(user);

    return { token, refreshToken };
  }

  async setTokens(userEntity: UserEntity): Promise<Record<string, string>> {
    const expiredAt = new Date();
    expiredAt.setHours(expiredAt.getHours() + 1);

    const tokenPayload = {
      sub: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
    };
    const refreshTokenPayload = { email: userEntity.email, random: uuid() };
    const token = this.jwtService.sign(tokenPayload);
    const refreshToken = this.jwtService.sign(refreshTokenPayload);

    const tokenEntity = new TokenEntity();

    tokenEntity.user = userEntity;
    tokenEntity.token = token;
    tokenEntity.refreshToken = refreshToken;
    tokenEntity.expiredAt = expiredAt;

    await this.tokenService.createToken(tokenEntity);

    return { token, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<Record<string, string>> {
    const refreshTokenDecoded = this.jwtService.decode(refreshToken);

    const refreshTokenExists =
      this.tokenService.verifyRefreshToken(refreshToken);

    if (!refreshTokenExists) return null;
    const user = await this.userService.getUserByEmail(
      refreshTokenDecoded.email,
    );

    if (!user) return null;

    const tokens = await this.setTokens(user);

    await this.tokenService.deactiveToken(refreshToken);

    return tokens;
  }
}
