import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	Logger,
} from '@nestjs/common';

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
	private readonly logger = new Logger(ExceptionsFilter.name);

	public catch(exception: any, host: ArgumentsHost) {
		this.logger.error(exception?.message, exception?.stack);

		const context = host.switchToHttp();
		const response = context.getResponse();
		const request = context.getRequest();

		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		const message = this.getErrorMessage(exception);

		response.status(status).json({
			timestamp: new Date().toISOString(),
			path: request.url,
			method: request.method,
			error: message,
		});
	}

	private getErrorMessage(exception) {
		if (exception instanceof HttpException) {
			if (typeof exception.getResponse() === 'object') {
				return exception.getResponse()['message'];
			}
			return exception.getResponse();
		} else if (exception.message) {
			return exception.message;
		} else {
			return exception;
		}
	}
}
