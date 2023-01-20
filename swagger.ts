import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app/routes.ts'];

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:3000',
  schemes: ['http'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);

