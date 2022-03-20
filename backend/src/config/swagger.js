const { SERVER_HOST, PORT } = process.env;
export const options = {
  swaggerDefinition: {
    info: {
      title: 'Vaccine Appointments API',
      version: '1.0.0',
      description: 'APIs for vaccine appointments management',
    },
    host: `${SERVER_HOST}:${PORT}`,
    basePath: '/',
    produces: ['application/json'],
  },
  apis: ['src/routes/*.js'],
};
export default options;