interface ErrorResponse {
	message: string | string[];
	requestId: string;
	statusCode: number;
	exceptionType: string;
}

export default ErrorResponse;
