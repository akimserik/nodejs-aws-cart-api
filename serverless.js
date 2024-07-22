'use strict';

module.exports = {
  service: 'nestjs-serverless',

  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    stage: 'dev',
    region: 'us-central-1',
  },

  plugins: ['serverless-offline'],

  functions: {
    app: {
      handler: 'dist/main.handler',
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
