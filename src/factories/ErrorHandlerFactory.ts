import ErrorHandler from '../interfaces/ErrorHandler';
import ErrorResponse from '../interfaces/ErrorResponse';

abstract class ErrorHandlerFactory {
	public abstract errorHandlerFactoryMethod(): ErrorHandler;

	public getError({ ...err }: any | ErrorResponse): void {
		const errorHandler = this.errorHandlerFactoryMethod();
		const errorResponse: ErrorResponse = {
			message: err.message,
			requestId: err.requestId,
			statusCode: err.statusCode,
			exceptionType: err.exceptionType,
		};

		errorHandler.throwError(errorResponse);
	}
}

export default ErrorHandlerFactory;
