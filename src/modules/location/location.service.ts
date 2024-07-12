import { HttpService } from '@nestjs/axios';
import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { IResponseData } from '../shared/interfaces/response-data.interface';
import { AxiosError } from 'axios';
import { State } from './interfaces/state.interface';
import { City } from './interfaces/city.interface';
import { CepInfo } from './interfaces/cep-info.interface';

@Injectable()
export class LocationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getStates(stateId?: number): Promise<IResponseData<State[]>> {
    let apiUrl =
      this.configService.get<string>('LOCATION_PUBLIC_API') + '/estados';
    try {
      if (stateId) {
        apiUrl += `/${stateId}`;
      }
      apiUrl += '?orderBy=nome';
      const response = this.httpService.get(apiUrl);
      let data = (await lastValueFrom(response)).data;

      if (Array.isArray(data)) {
        data = data.map((state) => ({
          id: state.id,
          name: state.nome,
        }));
      } else {
        data = [
          {
            id: data.id,
            name: data.nome,
          },
        ];
      }
      return { data };
    } catch (error) {
      throw new HttpException(
        'Serviço de consulta indisponível no momento, tente novamente mais tarde!',
        500,
      );
    }
  }

  async getCitiesByState(stateId: number): Promise<IResponseData<City[]>> {
    const apiUrl =
      this.configService.get<string>('LOCATION_PUBLIC_API') +
      '/estados/' +
      stateId +
      '/municipios?orderBy=nome';
    try {
      const response = this.httpService.get(apiUrl);
      let data = (await lastValueFrom(response)).data;

      data = data.map((state) => ({
        id: state.id,
        name: state.nome,
      }));

      return { data };
    } catch (error) {
      throw new HttpException(
        'Serviço de consulta indisponível no momento, tente novamente mais tarde!',
        500,
      );
    }
  }

  async getLocationByCep(cep: string): Promise<IResponseData<CepInfo>> {
    const apiUrl = this.configService.get<string>('CEP_PUBLIC_API') + '/' + cep;

    try {
      const response = this.httpService.get(apiUrl);

      let location = (await lastValueFrom(response)).data.result;

      location = {
        address: location.street + ', ' + location.district,
        state: location.state,
        city: location.city,
      };

      return { data: location };
    } catch (e) {
      if (e instanceof AxiosError && e.response?.status === 404) {
        throw new BadRequestException('CEP informado não encontrado!');
      }
      throw new HttpException(
        'Serviço de consulta indisponível no momento, tente novamente mais tarde!',
        500,
      );
    }
  }
}
