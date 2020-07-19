import Constants from '../utils/constants';
import CustomException from './CustomException';
import { logger } from '../utils/logger';

const uuid = require('../utils/globals').uuid;

class ErrorHandler {
    err: any;
    code!: number;
    exceptionType!: string;

    constructor() { }

    errorHandler = (err: any, code: number, exceptionType: string) => {
        this.code = code || Constants.HTTPSTATUS.BAD_REQUEST;
        this.err = err || err.message || Constants.MESSAGE.DEFUALT.BAD_REQUEST;

        if (exceptionType === Constants.EXCEPTION.CANDIDATE) {
            this.code = code;
            this.err = err;
            this.exceptionType = exceptionType;
        }
        if (exceptionType === Constants.EXCEPTION.DATABASE) {
            this.code = code || Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR;
            this.err = err || Constants.MESSAGE.DEFUALT.DATABASE_ERROR;
            this.exceptionType = exceptionType;
        }

        logger.error({
            event: 'ErrorHandler.errorHandler',
            message: this.err,
            statusCode: this.code,
            exceptionType: this.exceptionType
        });

        throw new CustomException(this.err, this.exceptionType, this.code);
    }

    errorResponse = (error: any): object => {
        const responseError: any = {};

        if (error && typeof error !== "string") {
            if (Array.isArray(error.details)) {
                const messageArray: any[] =[];
                
                error.forEach((message: any) => messageArray.push(message));
                responseError.message = messageArray;
            }
            if (error.message) responseError.message = error.message;
        }
        responseError.message = error;
        responseError.requestId = uuid;

        logger.error({
            event: 'ErrorHandler.errorResponse',
            responseBody: responseError
        });
        
        return responseError;
    }
}

export default ErrorHandler;