import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';
import { join } from 'path';

export class CartServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Lambda function
    const nestLambda = new lambda.Function(this, 'NestLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'dist/main.handler',
      code: lambda.Code.fromAsset(join(__dirname, '..', '..', 'function.zip')),
    });

    // API Gateway to trigger the Lambda function
    new apigateway.LambdaRestApi(this, 'NestApi', {
      handler: nestLambda,
      proxy: true,
    });
  }
}
