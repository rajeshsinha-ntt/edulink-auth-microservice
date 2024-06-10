import { Module, ValidationPipe } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { ServiceHealthModule } from './service-health/service-health.module';
import { AuthModule } from './auth/auth.module';
import { APP_PIPE } from '@nestjs/core';

/**
 * class for the app module.
 */
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env`,
		}),
		ServiceHealthModule,
		AuthModule,
	],
	providers: [
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({
				whitelist: true,
			}),
		},
	],
})
export class AppModule {}
