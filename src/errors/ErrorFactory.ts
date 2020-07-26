import uuidV4 from '../utils/globals';
import ErrorHandlerFactory from '../factories/ErrorHandlerFactory';
import ErrorResponse from '../interfaces/ErrorResponse';
import logger from '../utils/logger';
import Constants from '../utils/constants';

class ErrorFactory {
	errorResponse!: ErrorResponse;

	constructor() {}

	getError(errorHandlerFactory: ErrorHandlerFactory, error: ErrorResponse): void {
		logger.info({ event: 'ErrorFactory.getError', error });

		errorHandlerFactory.getError(error);
	}

	getResponse = (err: any): ErrorResponse | undefined => {
		const messages: string[] = [];

		if (err && typeof err.message !== 'string') {
			err.message.forEach((message) => {
				messages.push(message);
			});
			this.errorResponse = {
				message: messages,
				statusCode: err.statusCode || Constants.HTTPSTATUS.BAD_REQUEST,
				requestId: err.requestId || uuidV4,
				exceptionType: err.exceptionType,
			};
			return this.errorResponse;
		}
		this.errorResponse = {
			message: err.message,
			statusCode: err.statusCode || Constants.HTTPSTATUS.BAD_REQUEST,
			requestId: err.requestId || uuidV4,
			exceptionType: err.exceptionType,
		};

		return this.errorResponse;
	};
}

export default ErrorFactory;
