import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService) {}
	async createToken(userId: string): Promise<string> {
		const payload = { userId };
		return this.jwtService.sign(payload);
	}
	async verifyToken(token: string) {
		try {
			const res = this.jwtService.verify(token);
			const validResponse = { valid: true, userId: res.userId };
			console.debug(
				`Token verified respone: ${JSON.stringify(validResponse)}`,
			);
			return validResponse;
		} catch (e) {
			console.error(`Error: ${JSON.stringify(e)}`);
			return { valid: false, message: e.message };
		}
	}
}
