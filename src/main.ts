import { NestFactory } from '@nestjs/core';
import serverlessExpress from '@codegenie/serverless-express';
import { Context, Handler } from 'aws-lambda';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as AWS from 'aws-sdk';

const secretsManager = new AWS.SecretsManager();
let cachedServer: Handler;

async function getDatabaseCredentials() {
  const secretArn = process.env.DB_SECRET_ARN;
  if (!secretArn) {
    throw new Error('DB_SECRET_ARN environment variable is not set');
  }

  const secretValue = await secretsManager
    .getSecretValue({ SecretId: secretArn })
    .promise();
  if (!secretValue.SecretString) {
    throw new Error('SecretString is empty');
  }

  return JSON.parse(secretValue.SecretString);
}

async function bootstrap() {
  if (!cachedServer) {
    const dbCredentials = await getDatabaseCredentials();

    process.env.DATABASE_HOST = dbCredentials.host;
    process.env.DATABASE_PORT = dbCredentials.port;
    process.env.DATABASE_USERNAME = dbCredentials.username;
    process.env.DATABASE_PASSWORD = dbCredentials.password;
    process.env.DATABASE_NAME = dbCredentials.dbname;

    const expressApp = express();
    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    nestApp.enableCors();

    await nestApp.init();

    cachedServer = serverlessExpress({ app: expressApp });
  }

  return cachedServer;
}

export const handler = async (event: any, context: Context, callback: any) => {
  const server = await bootstrap();
  return server(event, context, callback);
};
