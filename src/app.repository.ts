import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

type ColorResponse = {
  name: string;
  rgb: string;
};

type PencilResponse = {
  name: string;
};

@Injectable()
export class Micro1Repository {
  constructor(private readonly client: HttpService) {}

  get(req: Request) {
    return this.client.get('http://localhost:3001/v1/color', {
      headers: { ...req.headers },
      params: { ...req.params },
      data: { ...req.body },
    });
  }
}

@Injectable()
export class Micro2Repository {
  constructor(private readonly client: HttpService) {}

  get() {
    return this.client.get<PencilResponse>('http://localhost:3002/v1/pencil');
  }
}
