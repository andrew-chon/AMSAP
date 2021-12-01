import { Prisma } from '@prisma/client';
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    switch (exception.code) {
      case 'P2025':
        const statusCode = HttpStatus.NOT_FOUND;
        // const message = exception.message.replace(/\n/g, '');
        const message = 'Record to update not found.';
        response.status(statusCode).json({
          statusCode,
          message,
        });
        break;
      default:
        super.catch(exception, host);
        break;
    }
  }
}
