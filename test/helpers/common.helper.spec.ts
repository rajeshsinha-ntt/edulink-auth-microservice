import { ConfigService } from '@nestjs/config';

import { Test } from '@nestjs/testing';
import { CommonHelper } from '../../src/helpers/common.helper';

describe('test method: getEnvironmentVariableValue', () => {
	// create mock ConfigService
	let mockConfigService: ConfigService;

	beforeEach(async () => {
		// create test module
		const testModule = await Test.createTestingModule({
			providers: [ConfigService],
		}).compile();

		// get mock ConfigService instance
		mockConfigService = testModule.get<ConfigService>(ConfigService);
	});

	it('the method should return an empty string if an environment variable is missing value', async () => {
		// mock get method of ConfigService
		jest.spyOn(ConfigService.prototype, 'get').mockReturnValueOnce(
			undefined,
		);

		// test
		expect(
			CommonHelper.getEnvironmentVariableValue('key', mockConfigService),
		).toStrictEqual('');
	});

	it('the method should return an empty string if an environment variable is empty', async () => {
		// mock get method of ConfigService
		jest.spyOn(ConfigService.prototype, 'get').mockReturnValueOnce('');

		// test
		expect(
			CommonHelper.getEnvironmentVariableValue('key', mockConfigService),
		).toStrictEqual('');
	});

	it('the method should return the trimmed value associated with the environment variable', async () => {
		// mock get method of ConfigService
		jest.spyOn(ConfigService.prototype, 'get').mockReturnValueOnce(
			' value ',
		);

		// test
		expect(
			CommonHelper.getEnvironmentVariableValue('key', mockConfigService),
		).toStrictEqual('value');
	});

	afterEach(() => {
		// clear all mocks
		jest.clearAllMocks();
	});
});

describe('test method: getCurrentTimestampInISOFormat', () => {
	it('the method should return a valid timestamp in ISO format', async () => {
		// create mock date object
		const mockDate = new Date('2024-04-23T07:21:10.731Z');

		// setup mock on Date class constructor
		jest.spyOn(global, 'Date').mockImplementationOnce(() => mockDate);

		// test
		expect(CommonHelper.getCurrentTimestampInISOFormat()).toStrictEqual(
			mockDate.toISOString(),
		);
	});

	afterEach(() => {
		// clear all mocks
		jest.clearAllMocks();
	});
});

describe('test method: getApplicationUptime', () => {
	it('the method should return a valid uptime in HH:MM:SS format', () => {
		// create mock uptime value in seconds where the value of hour, minute,
		// and second is less than 10
		const mockUptimeInSeconds = 3661;

		// setup mock on uptime function of process module
		jest.spyOn(process, 'uptime').mockReturnValueOnce(mockUptimeInSeconds);

		// test
		expect(CommonHelper.getApplicationUptime()).toStrictEqual('01:01:01');
	});

	it('the method should return a valid uptime in HH:MM:SS format', () => {
		// create mock uptime value in seconds where the value of hour, minute,
		// and second is greater than 10
		const mockUptimeInSeconds = 43932;

		// setup mock on uptime function of process module
		jest.spyOn(process, 'uptime').mockReturnValueOnce(mockUptimeInSeconds);

		// test
		expect(CommonHelper.getApplicationUptime()).toStrictEqual('12:12:12');
	});

	afterEach(() => {
		// clear all mocks
		jest.clearAllMocks();
	});
});
