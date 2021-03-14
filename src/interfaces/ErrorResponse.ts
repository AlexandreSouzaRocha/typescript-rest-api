interface ErrorResponse {
	message: string;
	requestId: string;
	statusCode: number;
	exceptionType: string;
}

export default ErrorResponse;
