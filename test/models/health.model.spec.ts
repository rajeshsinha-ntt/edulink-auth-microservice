
import { ApplicationStatus } from '../../src/types/enums/application-status.enum';
import { HealthDataModel } from '../../src/models/response/health.model';

describe('test method: jsonify', () => {
	// mock application name
	const mockApplicationName = 'mock-name';

	// mock application version
	const mockApplicationVersion = 'mock-version';

	// mock application uptime
	const mockApplicationUptime = 'mock-uptime';

	it('the method should return a JSON object with correct attribute values', () => {
		// expected response
		const expectedResponse = {
			'application-name': mockApplicationName,
			'application-version': mockApplicationVersion,
			'application-uptime': mockApplicationUptime,
			'application-status': ApplicationStatus.UP,
			'dependency-health': [],
		};

		// test
		expect(
			new HealthDataModel(
				mockApplicationName,
				mockApplicationVersion,
				mockApplicationUptime,
				ApplicationStatus.UP,
			).jsonify(),
		).toStrictEqual(expectedResponse);
	});

	it('the method should return a JSON object with correct attribute values', () => {
		// expected response
		const expectedResponse = {
			'application-name': mockApplicationName,
			'application-version': mockApplicationVersion,
			'application-uptime': mockApplicationUptime,
			'application-status': ApplicationStatus.DOWN,
			'dependency-health': [],
		};

		// test
		expect(
			new HealthDataModel(
				mockApplicationName,
				mockApplicationVersion,
				mockApplicationUptime,
				ApplicationStatus.DOWN,
			).jsonify(),
		).toStrictEqual(expectedResponse);
	});

	it('the method should return a JSON object with correct attribute values, along with dependency health', () => {
		// expected response
		const expectedResponse = {
			'application-name': mockApplicationName,
			'application-version': mockApplicationVersion,
			'application-uptime': mockApplicationUptime,
			'application-status': ApplicationStatus.UP,
			'dependency-health': [
				{
					'application-name': mockApplicationName,
					'application-version': mockApplicationVersion,
					'application-uptime': mockApplicationUptime,
					'application-status': ApplicationStatus.UP,
					'dependency-health': [],
				},
			],
		};

		// create instance of HealthDataModel
		const healthDataModelInstance = new HealthDataModel(
			mockApplicationName,
			mockApplicationVersion,
			mockApplicationUptime,
			ApplicationStatus.UP,
		);

		healthDataModelInstance.addDependencyHealthData(
			new HealthDataModel(
				mockApplicationName,
				mockApplicationVersion,
				mockApplicationUptime,
				ApplicationStatus.UP,
			),
		);

		// test
		expect(healthDataModelInstance.jsonify()).toStrictEqual(
			expectedResponse,
		);
	});

	it('the method should return a JSON object with correct attribute values, along with dependency health', () => {
		// expected response
		const expectedResponse = {
			'application-name': mockApplicationName,
			'application-version': mockApplicationVersion,
			'application-uptime': mockApplicationUptime,
			'application-status': ApplicationStatus.DOWN,
			'dependency-health': [
				{
					'application-name': mockApplicationName,
					'application-version': mockApplicationVersion,
					'application-uptime': mockApplicationUptime,
					'application-status': ApplicationStatus.DOWN,
					'dependency-health': [],
				},
			],
		};

		// create instance of HealthDataModel
		const healthDataModelInstance = new HealthDataModel(
			mockApplicationName,
			mockApplicationVersion,
			mockApplicationUptime,
			ApplicationStatus.DOWN,
		);

		healthDataModelInstance.addDependencyHealthData(
			new HealthDataModel(
				mockApplicationName,
				mockApplicationVersion,
				mockApplicationUptime,
				ApplicationStatus.DOWN,
			),
		);

		// test
		expect(healthDataModelInstance.jsonify()).toStrictEqual(
			expectedResponse,
		);
	});
});
