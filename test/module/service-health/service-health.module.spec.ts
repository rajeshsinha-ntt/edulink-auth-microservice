import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { ServiceHealthModule } from '../../../src/service-health/service-health.module';


describe('test module: HealthModule', () => {
	// create reference for module
	let module: TestingModule;

	beforeEach(async () => {
		// create test module
		module = await Test.createTestingModule({
			imports: [ConfigModule.forRoot({ isGlobal: true }), ServiceHealthModule],
		}).compile();
	});

	it('the module should be defined', () => {
		// test
		expect(module).toBeDefined();
	});
});
