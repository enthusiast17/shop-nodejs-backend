export class PolicyService {

  create({ isAuthorized }) {
    return {
      "isAuthorized": isAuthorized,
      "context": {
        "stringKey": "value",
        "numberKey": 1,
        "booleanKey": true,
        "arrayKey": ["value1", "value2"],
        "mapKey": { "value1": "value2" }
      },
    };
  }
}
