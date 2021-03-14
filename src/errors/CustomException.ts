import Constants from '../utils/constants';

class CustomException extends Error {
	message: string;

	exceptionType: string;

	statusCode: number;

	requestId: string;

	constructor({
		message,
		exceptionType,
		statusCode,
		requestId,
	}: {
		message: string;
		exceptionType: string;
		statusCode: number;
		requestId: string;
	}) {
		super();
		this.message = message || Constants.MESSAGE.DEFUALT.BAD_REQUEST;
		this.exceptionType = exceptionType || Constants.EXCEPTION.CANDIDATE;
		this.statusCode = statusCode || Constants.HTTPSTATUS.BAD_REQUEST;
		this.requestId = requestId;
	}
}

export default CustomException;
