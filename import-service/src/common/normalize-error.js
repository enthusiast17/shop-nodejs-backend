import { INTERNAL_ERROR_CODE, INTERNAL_ERROR_BODY } from "../constants/http.constants.js";

export const normalizeError = (error) => {
  if (error?.isHttpError && error?.statusCode && error?.body) {
    const { statusCode, body } = error;
    return { statusCode, body: JSON.stringify(body) };
  }

  console.error(error);
  return { statusCode: INTERNAL_ERROR_CODE, body: JSON.stringify(INTERNAL_ERROR_BODY) };
};
