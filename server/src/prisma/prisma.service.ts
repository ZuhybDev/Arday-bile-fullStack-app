import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    });

    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Prisma connected');
    } catch (err) {
      console.error('Prisma connection error', err);
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log('🔌 Prisma disconnected');
    } catch (err) {
      console.error('Prisma disconnection error', err);
    }
  }
}
