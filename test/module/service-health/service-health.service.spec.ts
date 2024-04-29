import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { ServiceHealthService } from '../../../src/service-health/service-health.service';
import { ServiceHealthController } from '../../../src/service-health/service-health.controller';
import { HealthDataModel } from '../../../src/models/response/health.model';
import { ApplicationStatus } from '../../../src/types/enums/application-status.enum';
import { CommonHelper } from '../../../src/helpers/common.helper';
import { HealthResponse } from '../../../src/types/service-health-response.type';


describe('test method: getHealthInformation', () => {
	// create reference for instance of HealthService
	let mockHealthService: ServiceHealthService;

	// mock application uptime value
	const mockApplicationUptime = '00:00:01';

	// mock environment variable value
	const mockNotEmptyEnvironmentVariableValue = 'mock';

	// default name of the application
	const defaultNameOfApplication = 'edulink-auth-microservice';

	// default version of the application
	const defaultVersionOfApplication = 'version data not available';

	beforeEach(async () => {
		// create test module
		const testModule = await Test.createTestingModule({
			providers: [ConfigService, ServiceHealthService],
		}).compile();

		// get mock instance of HealthService
		mockHealthService = testModule.get<ServiceHealthService>(ServiceHealthService);

		// mock common helper to get mocked uptime value
		jest.spyOn(CommonHelper, 'getApplicationUptime').mockReturnValueOnce(
			mockApplicationUptime,
		);
	});

	it('the method should return health information data without dependency health information', async () => {
		// mock common helper to get mock environment variable value which is not empty
		jest.spyOn(CommonHelper, 'getEnvironmentVariableValue').mockReturnValue(
			mockNotEmptyEnvironmentVariableValue,
		);

		// expected response
		const expectedResponse = new HealthDataModel(
			mockNotEmptyEnvironmentVariableValue,
			mockNotEmptyEnvironmentVariableValue,
			mockApplicationUptime,
			ApplicationStatus.UP,
		);

		// test
		expect(
			await mockHealthService.getHealthInformation(false),
		).toStrictEqual(expectedResponse);
	});

	it('the method should return health information data with dependency health information', async () => {
		// mock common helper to get mock environment variable value which is not empty
		jest.spyOn(CommonHelper, 'getEnvironmentVariableValue').mockReturnValue(
			mockNotEmptyEnvironmentVariableValue,
		);

		// expected response
		const expectedResponse = new HealthDataModel(
			mockNotEmptyEnvironmentVariableValue,
			mockNotEmptyEnvironmentVariableValue,
			mockApplicationUptime,
			ApplicationStatus.UP,
		);

		// test
		expect(
			await mockHealthService.getHealthInformation(true),
		).toStrictEqual(expectedResponse);
	});

	it('the method should return health information data without dependency health information', async () => {
		// mock common helper to get mock environment variable value which is empty
		jest.spyOn(CommonHelper, 'getEnvironmentVariableValue').mockReturnValue(
			'',
		);

		// expected response
		const expectedResponse = new HealthDataModel(
			defaultNameOfApplication,
			defaultVersionOfApplication,
			mockApplicationUptime,
			ApplicationStatus.UP,
		);

		// test
		expect(
			await mockHealthService.getHealthInformation(false),
		).toStrictEqual(expectedResponse);
	});

	it('the method should return health information data with dependency health information', async () => {
		// mock common helper to get mock environment variable value which is empty
		jest.spyOn(CommonHelper, 'getEnvironmentVariableValue').mockReturnValue(
			'',
		);

		// expected response
		const expectedResponse = new HealthDataModel(
			defaultNameOfApplication,
			defaultVersionOfApplication,
			mockApplicationUptime,
			ApplicationStatus.UP,
		);

		// test
		expect(
			await mockHealthService.getHealthInformation(true),
		).toStrictEqual(expectedResponse);
	});

	afterEach(() => {
		// clear all mocks
		jest.clearAllMocks();
	});
});
