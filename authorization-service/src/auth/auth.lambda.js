import { UNAUTHORIZED_BODY } from "../constants/http.constants.js";
import { PolicyService } from "../policy/policy.service.js";
import { AuthController } from "./auth.controller.js";
import { AuthService } from "./auth.service.js";

export const basicAuthorizer = (event, context, callback) => {
  try {
    const authController = new AuthController(
      new AuthService(),
      new PolicyService(),
    );

    const policy = authController.validate({
      authorization: event?.headers?.authorization,
      routeArn: event?.routeArn,
    });
    callback(null, policy);
  } catch (error) {
    callback(UNAUTHORIZED_BODY);
  }
};
