import ErrorResponse from '../interfaces/ErrorResponse';
import logger from '../utils/logger';
import Constants from '../utils/constants';
import CustomException from './CustomException';
import ErrorHandler from '../interfaces/ErrorHandler';

class ErrorFactory implements ErrorHandler {
	private errorResponse!: ErrorResponse;

	getErrorResponse(error: CustomException): ErrorResponse {
		const { exceptionType, message, requestId, statusCode } = error;
		this.errorResponse = {
			message,
			statusCode,
			requestId,
			exceptionType,
		};

		return this.errorResponse;
	}

	throwError(error: ErrorResponse | Error): void {
		logger.error({ event: 'ErrorFactory.throwError', error: error.message });

		if (error instanceof Error) {
			const { message, name } = error;
			logger.error({ event: 'ErrorFactory.throwError', error: { message, name } });

			this.errorResponse = {
				message: Constants.MESSAGE.DEFUALT.SERVER_ERROR,
				exceptionType: Constants.EXCEPTION.SERVER_ERROR,
				statusCode: Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				requestId: global.requestId,
			};
		} else {
			logger.error({ event: 'ErrorFactory.throwError', error });
			const { message, exceptionType, requestId, statusCode } = error;
			this.errorResponse = {
				message,
				exceptionType,
				statusCode,
				requestId,
			};
			throw new CustomException(this.errorResponse);
		}
	}
}

export default ErrorFactory;
