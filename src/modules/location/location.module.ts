import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { HttpModule } from '@nestjs/axios';
import { LocationService } from './location.service';

@Module({
  imports: [HttpModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
