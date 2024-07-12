import { Controller, Get, Param, Query } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {
  constructor(private locationService: LocationService) {}
  @Get('states')
  async getStates(@Query('stateId') stateId?: number) {
    return this.locationService.getStates(stateId);
  }

  @Get('cities')
  async getCitiesByState(@Query('stateId') stateId: number) {
    return this.locationService.getCitiesByState(stateId);
  }

  @Get('cep/:cep')
  async getLocationByCep(@Param('cep') cep: string) {
    return this.locationService.getLocationByCep(cep);
  }
}
