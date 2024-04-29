
import { ApplicationStatus } from '../../types/enums/application-status.enum';
import { IBaseResponseModel } from './base.model';

/**
 * model class representing structure of an object containing
 * health information of an application.
 */
export class HealthDataModel implements IBaseResponseModel {
	/**
	 * name of the application.
	 */
	private applicationName: string;

	/**
	 * current version of the application.
	 */
	private applicationVersion: string;

	/**
	 * current uptime of the application.
	 */
	private applicationUptime: string;

	/**
	 * current status of the application.
	 */
	private applicationStatus: ApplicationStatus;

	/**
	 * array containing health information of the external dependencies.
	 */
	private dependencyHealth: Array<HealthDataModel>;

	/**
	 * initializes an instance of the class: HealthCheckData.
	 *
	 * @param applicationName - name of the application.
	 * @param applicationVersion - current version of the application.
	 * @param applicationUptime - current uptime of the application.
	 * @param applicationStatus - current status of the application
	 */
	constructor(
		applicationName: string,
		applicationVersion: string,
		applicationUptime: string,
		applicationStatus: ApplicationStatus,
	) {
		this.applicationName = applicationName;
		this.applicationVersion = applicationVersion;
		this.applicationUptime = applicationUptime;
		this.applicationStatus = applicationStatus;
		this.dependencyHealth = [];
	}

	/**
	 * method to add dependency health information.
	 *
	 * @param dependencyHealth - instance of HealthDataModel containing health information of
	 * a dependency.
	 */
	public addDependencyHealthData(dependencyHealth: HealthDataModel): void {
		// add provided dependency health information
		this.dependencyHealth.push(dependencyHealth);
	}

	jsonify(): object {
		return {
			'application-name': this.applicationName,
			'application-version': this.applicationVersion,
			'application-uptime': this.applicationUptime,
			'application-status': this.applicationStatus,
			'dependency-health': this.dependencyHealth.map((health) =>
				health.jsonify(),
			),
		};
	}
}
