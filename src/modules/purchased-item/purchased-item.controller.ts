import { Request } from 'express';
import { CreatePurchasedDto } from './dto/create-purchased.dto';
import { PurchasedItemService } from './purchased-item.service';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { JwtPayload } from '../shared/interfaces/jwt-payload.interface';

@Controller('purchase')
export class PurchasedItemController {
  constructor(private purchasedItemService: PurchasedItemService) {}

  @Post()
  async insertPurchase(
    @Req() req: Request,
    @Body() createPurchasedDto: CreatePurchasedDto,
  ) {
    const userId = (req.user as JwtPayload).sub;
    return this.purchasedItemService.insertPurchase(userId, createPurchasedDto);
  }
}
