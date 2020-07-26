import ErrorHandler from '../interfaces/ErrorHandler';
import ErrorResponse from '../interfaces/ErrorResponse';
import CustomException from './CustomException';
import logger from '../utils/logger';

class ValidationHandler implements ErrorHandler {
	constructor() {}

	throwError(errorResponse: ErrorResponse): never {
		const { message, requestId, statusCode } = errorResponse;

		logger.error({
			event: 'ValidationHandler',
			message,
			statusCode,
		});

		throw new CustomException(message, requestId, statusCode);
	}
}

export default ValidationHandler;
