import { ConfigService } from '@nestjs/config';

/**
 * class containing common helper methods.
 */
export class CommonHelper {
	/**
	 * method to get value of an environment variable.
	 *
	 * @param environmentVariableName: name of the environment variable.
	 * @param configService: instance of ConfigService.
	 *
	 * @returns the value of the environment variable if found any, else an empty string
	 * if no value is found or the value is empty.
	 */
	public static getEnvironmentVariableValue = (
		environmentVariableName: string,
		configService: ConfigService,
	) => {
		// read value of the given environment variable
		const value = configService.get<string>(environmentVariableName);

		// check if the given environment variable don't have any value associated with it,
		// or if the given environment variable value is empty
		if (value === undefined || value.trim().length === 0) {
			// return an empty string
			return '';
		} else {
			// return the value of the environment variable after trimming the white spaces
			return value.trim();
		}
	};

	/**
	 * method to get the current timestamp in ISO format
	 * @returns current timestamp in ISO format as string
	 */
	public static getCurrentTimestampInISOFormat = (): string =>
		new Date().toISOString();

	/**
	 * method to get the uptime of the application in HH:MM:SS format.
	 *
	 * @returns uptime of the application in HH:MM:SS format as string.
	 */
	public static getApplicationUptime = (): string => {
		// get current uptime of the application in seconds
		const applicationUptimeInSeconds = Math.floor(process.uptime());

		// calculate number of hours
		let hours = Math.floor(applicationUptimeInSeconds / 3600);

		// calculate number of minutes
		let minutes = Math.floor(
			(applicationUptimeInSeconds - hours * 3600) / 60,
		);

		// calculate number of seconds
		let seconds = applicationUptimeInSeconds - hours * 3600 - minutes * 60;

		// return uptime of the application in HH:MM:SS format
		return (
			(hours < 10 ? '0' + hours : hours.toString()) +
			':' +
			(minutes < 10 ? '0' + minutes : minutes.toString()) +
			':' +
			(seconds < 10 ? '0' + seconds : seconds.toString())
		);
	};
}
