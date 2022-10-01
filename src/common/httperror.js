import {
  INTERNAL_ERROR_BODY,
  INTERNAL_ERROR_CODE,
  NOT_FOUND_CODE
} from "../constants/http.constants.js";

export class HttpError extends Error {
  constructor({ statusCode, body }) {
    super(JSON.stringify({ statusCode, body }));
    this.statusCode = statusCode;
    this.body = body;
    this.isHttpError = true;
  }
}

export class NotFoundHttpError extends HttpError {
  constructor({ body }) {
    super({
      statusCode: NOT_FOUND_CODE,
      body,
    });
  }
}

export class InternalHttpError extends HttpError {
  constructor() {
    super({
      statusCode: INTERNAL_ERROR_CODE,
      body: INTERNAL_ERROR_BODY,
    });
  }
}
