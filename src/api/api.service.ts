import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private httpService: HttpService) {}

  fetch(url: string): Observable<AxiosResponse<{ keys: Array<{ [key: string]: string }> }>> {
    return this.httpService.get(url);
  }
}
