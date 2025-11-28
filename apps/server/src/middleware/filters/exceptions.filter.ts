import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from "@nestjs/common";

@Catch()
export class ExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      response.status(status).json({
        code: exceptionResponse["code"] || "INTERNAL_ERROR",
        message: exceptionResponse["message"] || "An error occurred",
        error: exceptionResponse["error"] || "Internal Server Error",
      });
    } else {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      response.status(500).json({
        code: "INTERNAL_ERROR",
        message: "An error occurred",
        error: "Internal Server Error",
      });
    }

  }
}
