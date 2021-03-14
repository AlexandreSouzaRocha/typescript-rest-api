import ErrorResponse from './ErrorResponse';

interface ErrorHandler {
	throwError(error: Error | ErrorResponse): void;

	getErrorResponse(error: Error | ErrorResponse): ErrorResponse;
}

export default ErrorHandler;
