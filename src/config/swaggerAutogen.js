import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'My API',
    description: 'Description'
  },
  host: `${process.env.HOST}:${process.env.PORT}`
};

const outputFile = './swagger-output.json';
const routes = ['../index.js']

swaggerAutogen()(outputFile, routes, doc);