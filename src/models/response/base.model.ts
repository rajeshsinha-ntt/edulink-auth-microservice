/**
 * interface to be implemented by all response model classes.
 */
export interface IBaseResponseModel {
	/**
	 * method to create a JSON representation of the current object.
	 *
	 * @returns a JSON representation of the current object.
	 */
	jsonify(): object;
}
