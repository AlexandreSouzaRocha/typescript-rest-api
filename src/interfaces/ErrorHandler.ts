import ErorrResponse from './ErrorResponse';

interface ErrorHandler {
	throwError(errorResponse: ErorrResponse): void;
}

export default ErrorHandler;
