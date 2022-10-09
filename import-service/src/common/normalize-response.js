import { SUCCESS_CODE } from "../constants/http.constants.js";

export const normalizeResponse = ({ body }) => {
  console.log(body);
  return { statusCode: SUCCESS_CODE, body };
};
