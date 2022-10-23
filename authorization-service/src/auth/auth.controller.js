export class AuthController {
  constructor(authService, policyService) {
    this.authService = authService;
    this.policyService = policyService;
  }

  validate({ authorization, routeArn }) {
    const encodedUser = authorization.split(" ")[1];
    const buff = Buffer.from(encodedUser, "base64");
    const user = buff.toString("utf-8").split(":");
    const [username, password] = user;

    const isAuthorized = this.authService.compareUser({ username, password });

    const policy = this.policyService.create({
      principalId: encodedUser,
      resource: routeArn,
      isAuthorized,
    });

    return policy;
  }
}
