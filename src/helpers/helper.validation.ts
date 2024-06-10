/**
 * class containing all validation methods.
 */
export class ValidationHelper {
	/**
	 * method to validate a number to be used as PORT number.
	 *
	 * @param port: value to be checked if it is a valid port number or not.
	 *
	 * @returns true if the given value is a valid port number, false otherwise.
	 */
	public static isValidPortNumber(port: number) {
		// check if the given port number is valid
		return !Number.isNaN(port) && port >= 0 && port < 65536;
	}
}
