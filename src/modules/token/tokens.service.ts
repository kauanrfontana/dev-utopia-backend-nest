import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenEntity } from './entities/token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(TokenEntity)
    private tokenRepository: Repository<TokenEntity>,
  ) {}

  async getTokens() {
    return this.tokenRepository.find({
      select: ['token'],
    });
  }

  async createToken(token: TokenEntity) {
    await this.tokenRepository.save(token);
  }

  async verifyRefreshToken(refreshToken: string): Promise<boolean> {
    const refreshTokensActive = await this.tokenRepository.count({
      where: { refreshToken: refreshToken },
    });

    return refreshTokensActive > 0;
  }
}
