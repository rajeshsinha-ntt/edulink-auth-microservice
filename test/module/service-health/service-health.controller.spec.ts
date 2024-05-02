import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { ServiceHealthService } from '../../../src/service-health/service-health.service';
import { ServiceHealthController } from '../../../src/service-health/service-health.controller';
import { HealthDataModel } from '../../../src/models/response/health.model';
import { ApplicationStatus } from '../../../src/types/enums/application-status.enum';
import { CommonHelper } from '../../../src/helpers/common.helper';
import { THealthResponse } from '../../../src/types/service-health-response.type';

describe('test method: getServiceHealth', () => {
	// create reference for instance of HealthService
	let mockHealthService: ServiceHealthService;

	// create reference for instance of HealthController
	let mockHealthController: ServiceHealthController;

	// create mock current timestamp value
	const mockCurrentTimeStampString = '2024-04-23T07:21:10.731Z';

	// mock health data with status UP
	const mockHealthDataStatusUp = new HealthDataModel(
		'application-name',
		'application-version',
		'application-uptime',
		ApplicationStatus.UP,
	);

	beforeEach(async () => {
		// create test module
		const moduleRef = await Test.createTestingModule({
			controllers: [ServiceHealthController],
			providers: [ConfigService, ServiceHealthService],
		}).compile();

		// get mock instances of controllers and services
		mockHealthService = moduleRef.get<ServiceHealthService>(ServiceHealthService);
		mockHealthController =
			moduleRef.get<ServiceHealthController>(ServiceHealthController);

		// mock CommonHelper to get mocked timestamp
		jest.spyOn(
			CommonHelper,
			'getCurrentTimestampInISOFormat',
		).mockReturnValueOnce(mockCurrentTimeStampString);
	});

	it('the method should return health check response when dependency-health requirement is false', async () => {
		// mock HealthService to get mocked health data with status UP
		jest.spyOn(
			mockHealthService,
			'getHealthInformation',
		).mockResolvedValueOnce(mockHealthDataStatusUp);

		// create expected response
		const expectedResponse: THealthResponse = {
			'response-timestamp': mockCurrentTimeStampString,
			'response-data': mockHealthDataStatusUp.jsonify(),
		};

		// test
		expect(
			await mockHealthController.getServiceHealth(false),
		).toStrictEqual(expectedResponse);
	});

	it('the method should return health check response when dependency-health requirement is true', async () => {
		// mock HealthService to get mocked health data with status UP
		jest.spyOn(
			mockHealthService,
			'getHealthInformation',
		).mockResolvedValueOnce(mockHealthDataStatusUp);

		// create expected response
		const expectedResponse: THealthResponse = {
			'response-timestamp': mockCurrentTimeStampString,
			'response-data': mockHealthDataStatusUp.jsonify(),
		};

		// test
		expect(await mockHealthController.getServiceHealth(true)).toStrictEqual(
			expectedResponse,
		);
	});

	afterEach(() => {
		// clear all mocks
		jest.clearAllMocks();
	});
});
