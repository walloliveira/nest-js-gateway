import {
  Controller,
  Get,
  HttpException,
  Logger,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { catchError, map, throwError } from 'rxjs';
import { Micro1Repository, Micro2Repository } from './app.repository';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(
    private readonly client1: Micro1Repository,
    private readonly client2: Micro2Repository,
  ) {}

  @Get('1')
  get1(@Req() req: Request, @Res() res: Response) {
    return this.client1.get(req).pipe(
      map((it) => {
        Object.keys(it.headers).forEach((h) => res.set(h, it.headers[h]));
        res.status(it.status);
        res.send(it.data);
      }),
      catchError((err) => {
        this.logger.error('DEU PAU AQUI vi', err);
        if (err && err.response && err.response.data && err.response.status)
          return throwError(
            () => new HttpException(err.response.data, err.response.status),
          );
        return throwError(
          () => new HttpException('Não poissível processar', 500),
        );
      }),
    );
  }

  @Get('2')
  get2() {
    return this.client2.get().pipe(
      map((it) => it.data),
      catchError((err) => {
        this.logger.error('DEU PAU AQUI', err);
        if (err && err.response && err.status)
          return throwError(() => new HttpException(err.response, err.status));
        return throwError(
          () => new HttpException('Não poissível processar', 500),
        );
      }),
    );
  }
}
