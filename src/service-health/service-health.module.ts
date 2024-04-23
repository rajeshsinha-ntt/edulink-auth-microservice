import { Module } from '@nestjs/common';
import { ServiceHealthController } from './service-health.controller';
import { ServiceHealthService } from './service-health.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    controllers: [ServiceHealthController],
    providers: [ServiceHealthService],
    imports: [ConfigModule]
})
export class ServiceHealthModule {}
