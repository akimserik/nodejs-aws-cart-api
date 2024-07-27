import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { Construct } from 'constructs';
import { join } from 'path';

export class CartServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const dbSecret = secretsmanager.Secret.fromSecretCompleteArn(
      this,
      'DBCredentialsSecret',
      'arn:aws:secretsmanager:eu-central-1:767397742395:secret:rs-aws-nest-rds-db-secret-jT0Gqu',
    );

    // Lambda function
    const nestLambda = new lambda.Function(this, 'NestLambda', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'dist/main.handler',
      code: lambda.Code.fromAsset(join(__dirname, '..', '..', 'function.zip')),
      environment: {
        DB_SECRET_ARN: dbSecret.secretArn,
      },
      timeout: cdk.Duration.seconds(30),
    });

    dbSecret.grantRead(nestLambda);

    // API Gateway to trigger the Lambda function
    new apigateway.LambdaRestApi(this, 'NestApi', {
      handler: nestLambda,
      proxy: true,
    });
  }
}
