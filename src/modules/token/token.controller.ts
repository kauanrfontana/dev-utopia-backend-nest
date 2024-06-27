import { Controller, Get } from '@nestjs/common';
import { TokenService } from './tokens.service';

@Controller('tokens')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Get()
  async getTokens() {
    return this.tokenService.getTokens();
  }
}
