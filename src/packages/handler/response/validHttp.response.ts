import { CREATED, OK } from 'http-status';
import { HttpResponse } from './http.response';

export class ValidHttpResponse extends HttpResponse {
  static toOkResponse(message, data) {
    return new HttpResponse(OK, data, message);
  }

  static toCreatedResponse(message, data) {
    return new HttpResponse(CREATED, data, message);
  }
}

export class ErrorHttpResponse {
  static errorResponse(errorId, title, message) {
    const response = {
      error: {
        error_id: errorId,
        title: title,
        message: message,
      },
      errors: [],
    };
    return response;
  }
}
