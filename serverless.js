'use strict';

module.exports = {
  service: 'nestjs-serverless',

  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    stage: 'dev',
    region: 'eu-central-1',
    timeout: 30,
  },

  plugins: ['serverless-offline'],

  functions: {
    app: {
      handler: 'dist/src/main.handler',
      events: [
        {
          http: {
            path: '/',
            method: 'any',
          },
        },
        {
          http: {
            path: '/{proxy+}',
            method: 'any',
          },
        },
      ],
    },
  },
};
