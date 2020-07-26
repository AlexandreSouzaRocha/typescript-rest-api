import ErrorHandlerFactory from './ErrorHandlerFactory';
import ErrorHandler from '../interfaces/ErrorHandler';
import ValidationHandler from '../errors/ValidationHandler';

class ValidationHandlerFactory extends ErrorHandlerFactory {
	public errorHandlerFactoryMethod(): ErrorHandler {
		return new ValidationHandler();
	}
}

export default ValidationHandlerFactory;
