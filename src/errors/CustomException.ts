import Constants from '../utils/constants';

class CustomException extends Error {
  message!: string;

  exceptionType!: string;

  statusCode!: number;

  constructor(message: string, exceptionType: string, statusCode: number) {
    super();
    this.message = message || Constants.MESSAGE.DEFUALT.BAD_REQUEST;
    this.exceptionType = exceptionType || Constants.EXCEPTION.CANDIDATE;
    this.statusCode = statusCode || Constants.HTTPSTATUS.BAD_REQUEST;
  }
}

export default CustomException;
