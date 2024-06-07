import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../helpers/jwt.helper';
import { CommonHelper } from '../helpers/common.helper';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (configService: ConfigService) => ({
				secret: CommonHelper.getEnvironmentVariableValue(
					'JWT_SECRET_KEY',
					configService,
				),
				signOptions: { expiresIn: '1h' },
			}),
		}),
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
