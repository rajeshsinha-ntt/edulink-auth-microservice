import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateTokenDto } from './dtos/create-token.dto';
import { VerifyTokenDto } from './dtos/verify-token.dto';

@Controller('/api/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('create-token')
	async createToken(
		@Body() body: CreateTokenDto,
	): Promise<{ token: string }> {
		const token = await this.authService.createToken(body.id);
		console.log(`token: ${token}`);

		return { token };
	}
	@Post('verify-token')
	async verifyToken(
		@Body() body: VerifyTokenDto,
	): Promise<{ valid: boolean }> {
		const isValid = await this.authService.verifyToken(body.token);
		return { valid: isValid };
	}
}
