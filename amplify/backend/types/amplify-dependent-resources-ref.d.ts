export type AmplifyDependentResourcesAttributes = {
  "api": {
    "getbrands": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "vintedscrapperapi": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    }
  },
  "function": {
    "getBrands": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "vintedscrapper": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  }
}