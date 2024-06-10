import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(private readonly jwtService: JwtService) {}
	async createToken(userId: string): Promise<string> {
		const payload = { userId };
		return this.jwtService.sign(payload);
	}
	async verifyToken(token: string): Promise<boolean> {
		try {
			this.jwtService.verify(token);
			return true;
		} catch (e) {
			return false;
		}
	}
}
