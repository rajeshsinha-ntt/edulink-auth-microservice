import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { ServiceHealthModule } from './service-health/service-health.module';

/**
 * class for the app module.
 */
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		ServiceHealthModule,
	],
})
export class AppModule {}
