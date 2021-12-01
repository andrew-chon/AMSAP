import { PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super(); // pass PrismaClientOptions e.g. logging levels or error formatting
  }
}
