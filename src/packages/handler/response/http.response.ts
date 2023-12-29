export class HttpResponse {
  status_code;

  data: Array<any>;

  message;

  constructor(status, data, message) {
    this.status_code = status;
    this.message = message;
    this.data = data;
  }

  toResponse(res) {
    return res.status(this.status_code).message(this.message).json(this.data);
  }
}
