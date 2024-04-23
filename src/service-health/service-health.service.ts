import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CommonHelper } from '../helpers/common.helper';
import { HealthDataModel } from '../models/response/health.model';
import { ApplicationStatus } from '../types/enums/application-status.enum';

@Injectable()
export class ServiceHealthService {
    constructor(private configService: ConfigService) {}

    getHealthInformation(
		dependency: boolean,
	): HealthDataModel {
		// retrieve name of the application
		const applicationName = CommonHelper.getEnvironmentVariableValue(
			'npm_package_name',
			this.configService,
		);

		// retrieve current version of the application
		const applicationVersion = CommonHelper.getEnvironmentVariableValue(
			'npm_package_version',
			this.configService,
		);

		// generate health information of the application
		const applicationHealth = new HealthDataModel(
			applicationName.length === 0
				? 'edulink-auth-microservice'
				: applicationName,
			applicationVersion.length === 0
				? 'version data not available'
				: applicationVersion,
			CommonHelper.getApplicationUptime(),
			ApplicationStatus.UP,
		);

		// check if we need to include health information of external dependencies
		// if (dependency) {
		// 	// add health information of the external dependencies
		// }

		// return health information of the application
		return applicationHealth;
	}
}
