import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CommonHelper } from './helpers/common.helper';
import { ConfigService } from '@nestjs/config';
import { ValidationHelper } from './helpers/helper.validation';
import { ConstantHelper } from './helpers/helper.constant';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.enableCors();
	const PORT = Number(
		CommonHelper.getEnvironmentVariableValue(
			'PORT',
			app.get(ConfigService),
		),
	);

	await app.listen(
		ValidationHelper.isValidPortNumber(PORT)
			? PORT
			: ConstantHelper.DEFAULT_PORT,
	);
}
bootstrap();
