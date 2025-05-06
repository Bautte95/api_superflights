import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

export class AllExcepionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExcepionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status: number =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message: unknown =
      exception instanceof HttpException
        ? exception.getResponse()
        : (exception as Error)?.message || 'Internal server error';

    this.logger.error(`Status ${status} Error: ${JSON.stringify(message)}`);

    response.status(status).json({
      time: new Date().toISOString(),
      path: request.url,
      error: message,
    });
  }
}
